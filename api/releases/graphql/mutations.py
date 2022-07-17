from platform import release
import graphene

from ..models import Release
from .types import ReleaseInput, ReleaseType


class CreateRelease(graphene.Mutation):
    class Arguments:
        release = ReleaseInput(required=True)

    release = graphene.Field(ReleaseType)

    @staticmethod
    def mutate(root, info, release):
        release = Release(name=release.name,
                          date=release.date, info=release.info)
        release.save()
        return CreateRelease(release=release)


class Mutation(graphene.ObjectType):
    create_release = CreateRelease.Field()
