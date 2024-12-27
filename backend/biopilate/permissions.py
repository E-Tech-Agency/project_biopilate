from rest_framework.permissions import BasePermission

class IsSupplier(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_supplier
    
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser
    
class IsClient(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.product.user == request.user