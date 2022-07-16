import graphene
from graphene_django import DjangoObjectType
from .models import Release


class ReleaseType(DjangoObjectType):
    class Meta:
        model = Release
        fields = "__all__"


class Query(graphene.ObjectType):
    all_releases = graphene.List(ReleaseType)
    release = graphene.Field(ReleaseType, release_id=graphene.Int())

    def resolve_all_releases(root, info):
        return Release.objects.all()

    def resolve_releases(root, info, id):
        return Release.objects.get(pk=id)


class ReleaseInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()
    info = graphene.String()


schema = graphene.Schema(query=Query)
