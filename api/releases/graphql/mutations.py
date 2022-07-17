import graphene
from graphql import GraphQLError
from ..models import Release
from ..constant import ReleaseStatus, STEPS, StepStatus
from .types import ReleaseInput, ReleaseUpdateInput, ReleaseType


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


class UpdateRelease(graphene.Mutation):
    class Arguments:
        release = ReleaseUpdateInput(required=True)

    release = graphene.Field(ReleaseType)

    @staticmethod
    def mutate(root, info, release):
        try:
            release_instance = Release.objects.get(pk=release.id)
            # count number of steps at on
            filtered = list(filter(lambda step: step.state ==
                                   StepStatus.ON.name, release.steps))
            status = ReleaseStatus.PLANNED.name
            if len(filtered) >= 1:
                status = ReleaseStatus.ON_GOING.name
            elif (len(filtered) == len(STEPS)):
                status = ReleaseStatus.DONE.name

            release_instance.info = release.info
            release_instance.steps = release.steps
            release_instance.status = status
            release_instance.save()
            return UpdateRelease(release=release_instance)
        except Exception as e:
            print(e)
            return GraphQLError("An error occured while trying to update release with id {}".format(release.id))


class Mutation(graphene.ObjectType):
    create_release = CreateRelease.Field()
    update_release = UpdateRelease.Field()
