import graphene
from graphene_django import DjangoObjectType
from ..models import Release


class ReleaseType(DjangoObjectType):
    class Meta:
        model = Release
        fields = "__all__"


class ReleaseInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    date = graphene.Date(required=True)
    info = graphene.String()
