import graphene
from .types import ReleaseType
from ..models import Release


class Query(graphene.ObjectType):
    all_releases = graphene.List(ReleaseType)
    release = graphene.Field(ReleaseType, release_id=graphene.Int())

    def resolve_all_releases(root, info):
        return Release.objects.all()

    def resolve_releases(root, info, id):
        return Release.objects.get(pk=id)
