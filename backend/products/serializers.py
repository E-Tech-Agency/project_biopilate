from accounts.models import User
from rest_framework import serializers
from .models import Product, Category, Order

class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'is_approved','category']
        read_only_fields = ['is_approved']
    def validate(self, attrs):
        price = attrs.get('price')
        name = attrs.get('name')
        image = attrs.get('image')
        Category = attrs.get('category')
        if price <= 0:
            raise serializers.ValidationError("price must be greater than 0")
        if not image:
            raise serializers.ValidationError("image is required")
        if not name:
            raise serializers.ValidationError("name is required")
        if not Category:
            raise serializers.ValidationError("category is required")
        return attrs

class ValidateProductSerializer(serializers.ModelSerializer):
    is_approved = serializers.BooleanField(default=False)
    class Meta:
        model = Product
        fields = ('is_approved',)
    def update(self, instance, validated_data):
        instance.is_approved = True
        instance.save()
        return instance

class GetAllProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class GetProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CreateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    def validate(self, attrs):
        name = attrs.get('name')
        if not name:
            raise serializers.ValidationError("name is required")
        return attrs
    
class GetAllCategoriesSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Category
        fields =  ['id', 'name', 'description', 'price', 'image', 'is_approved', 'category', 'category_name', 'quantity','created_at']



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name','id']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'is_approved', 'category', 'category_name', 'quantity','created_at']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'product', 'quantity', 'created_at']

class AllOrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.CharField(source='product.price', read_only=True)
    product_category_name = serializers.CharField(source='product.category.name', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'product', 'quantity', 'created_at', 'product_name', 'product_price', 'product_category_name', 'approved']

class CategoryCreateSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(write_only=True)

    class Meta:
        model = Category
        fields = ['name', 'user']

    def validate_name(self, value):
        if Category.objects.filter(name=value).exists():
            raise serializers.ValidationError("Category with this name already exists .")
        return value

    def create(self, validated_data):
        user_id = validated_data.pop('user')
        user = User.objects.get(id=user_id)
        category = Category.objects.create(user=user, **validated_data)
        return category

class GetAllOrdersBySupplierSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='user.first_name', read_only=True)
    client_email = serializers.CharField(source='user.email', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.CharField(source='product.price', read_only=True)
    supplier_name = serializers.CharField(source='product.user.first_name', read_only=True)
    supplier_email = serializers.CharField(source='product.user.email', read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'client_email', 'product', 'quantity', 'created_at', 'product_name', 'product_price', 'client_name', 'approved', 'supplier_name', 'supplier_email', 'product_image']

class OrderStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['approved']


class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image', 'is_approved', 'category', 'quantity']