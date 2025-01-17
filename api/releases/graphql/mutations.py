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
            if len(filtered) in range(1, len(STEPS)-1):
                status = ReleaseStatus.ONGOING.name
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


class DeleteRelease(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    release = graphene.Field(ReleaseType)

    @staticmethod
    def mutate(root, info, id):
        try:
            release = Release.objects.get(pk=id)
            release.delete()
            return None
        except:
            raise GraphQLError(
                "Release with id {} doesn't exist".format(id))


class Mutation(graphene.ObjectType):
    create_release = CreateRelease.Field()
    update_release = UpdateRelease.Field()
    delete_release = DeleteRelease.Field()
