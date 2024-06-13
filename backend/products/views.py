from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView,RetrieveUpdateAPIView,DestroyAPIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions,filters
from .serializers import ProductUpdateSerializer, AllOrderSerializer,CreateProductSerializer, ValidateProductSerializer, CategorySerializer, OrderSerializer,ProductSerializer,CategoryCreateSerializer,GetAllOrdersBySupplierSerializer,OrderStatusUpdateSerializer
from .models import Product,Category,Order
from .permissions import IsSupplier,IsAdmin,IsOrderOwner
from rest_framework.status import HTTP_201_CREATED
from rest_framework import serializers,status
from .utils import send_normal_email
from rest_framework.exceptions import PermissionDenied

class CreateProductView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated,IsSupplier]  
    serializer_class = CreateProductSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class ValidateProductView(APIView):
    permission_classes = [permissions.IsAuthenticated,IsAdmin]
    def put(self, request, pk):
        product = Product.objects.get(pk=pk)
        serializer = ValidateProductSerializer(product, data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
class GetAllProductsView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer 

    def get_queryset(self):
        return Product.objects.filter(is_approved=True).select_related('category')

class GetOneProductView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

class GetProductsByCategoryView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer 

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Product.objects.filter(is_approved=True,category=category_id).select_related('category')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response(response.data, status=HTTP_201_CREATED)

class GetAllCategoriesView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer 

    def get_queryset(self):
        return Category.objects.all()

class GetAllUnapprovedProductsView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    serializer_class = ProductSerializer 

    def get_queryset(self):
        return Product.objects.filter(is_approved=False)
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['name']

class CreateOrderView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        if product.quantity < quantity:
            raise serializers.ValidationError('Not enough product quantity available.')

        product.quantity -= quantity
        product.save()
        send_normal_email({"to_email": product.user.email, "email_subject": "Order Confirmation", "email_body": f"there was an order placed for {product.name} with {quantity} units"})
        send_normal_email({"to_email":self.request.user.email, "email_subject": "Order Confirmation", "email_body": f"you order an item {product.name} with {quantity} units"})

        serializer.save(user=self.request.user)

class GetOneUserAllOrdersView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AllOrderSerializer

    def get_queryset(self):
        return Order.objects.all().filter(user=self.request.user)
    
class CategoryCreateView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        request.data['user'] = user.id

        serializer = CategoryCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetAllOrdersBySupplierView(ListAPIView):
    serializer_class = GetAllOrdersBySupplierSerializer
    permission_classes = [permissions.IsAuthenticated,IsSupplier]

    def get_queryset(self):
        user_id = self.request.user.id
        return Order.objects.filter(product__user_id=user_id)

class UpdateOrderStatusView(RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated,IsSupplier,IsOrderOwner]
    lookup_field = 'id'
    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.approved == 'validated':
            send_normal_email({"to_email": instance.user.email, "email_subject": "Order Confirmation", "email_body": f"your order {instance.product.name} with {instance.quantity} units has been approved"})
            send_normal_email({"to_email":self.request.user.email, "email_subject": "Order Confirmation", "email_body": f"you confirmed an item {instance.product.name} with {instance.quantity} units"})
        if instance.approved == 'rejected':
            send_normal_email({"to_email": instance.user.email, "email_subject": "Order Confirmation", "email_body": f"your order {instance.product.name} with {instance.quantity} units has been rejected"})
            send_normal_email({"to_email":self.request.user.email, "email_subject": "Order Confirmation", "email_body": f"you rejected an item {instance.product.name} with {instance.quantity} units"})

class DeleteProductView(DestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsSupplier] 
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class GetAllOrdersAdminView(ListAPIView):
    serializer_class = GetAllOrdersBySupplierSerializer
    permission_classes = [permissions.IsAuthenticated,IsAdmin]

    def get_queryset(self):
        return Order.objects.all()

class GetProductsByUserView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated,IsSupplier]

    def get_queryset(self):
        user = self.request.user
        products =Product.objects.filter(user=user).select_related('category')
        print(products)
        return products
    
class UpdateProductView(RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductUpdateSerializer
    permission_classes = [permissions.IsAuthenticated,IsSupplier]
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(user=user)

    def perform_update(self, serializer):
        product = self.get_object()
        if product.user != self.request.user:
            raise PermissionDenied("You do not have permission to update this product.")
        serializer.save()