import graphene
from .types import ReleaseType
from ..models import Release


class Query(graphene.ObjectType):
    all_releases = graphene.List(ReleaseType)
    release = graphene.Field(ReleaseType, id=graphene.ID(required=True))

    def resolve_all_releases(root, info):
        return Release.objects.all()

    def resolve_release(root, info, id):
        return Release.objects.get(pk=id)
