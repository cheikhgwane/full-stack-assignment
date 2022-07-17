import graphene
from graphene_django import DjangoObjectType
from ..models import Release


class ReleaseType(DjangoObjectType):
    class Meta:
        model = Release
        fields = "__all__"


class ReleaseInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()
    info = graphene.String()
