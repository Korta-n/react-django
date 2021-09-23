from rest_framework import viewsets
from ..models import BlogCategory, BlogPost
from .serializers import (
    BlogCategorySerializer,
    BlogPostSerializer,
    BlogPostListRetrieveSerializer,
    BlogCategoryDetailSerializer
)



class BlogCategoryViewSet(viewsets.ModelViewSet):
    
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


    action_to_serializer = {
        "retrieve" : BlogCategoryDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )





class BlogPostViewSet(viewsets.ModelViewSet):
    
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    action_to_serializer = {
        "list" : BlogPostListRetrieveSerializer,
        "retrieve" : BlogPostListRetrieveSerializer
    }


    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


