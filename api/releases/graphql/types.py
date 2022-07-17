import graphene
from graphene_django import DjangoObjectType
from graphene.types.generic import GenericScalar
from ..models import Release
from ..constant import StepStatus


class StepType(graphene.InputObjectType):
    StepStatusEnum = graphene.Enum.from_enum(StepStatus)
    name = graphene.String(required=True)
    state = StepStatusEnum(required=True)


class ReleaseType(DjangoObjectType):
    steps = GenericScalar()

    class Meta:
        model = Release
        fields = "__all__"


class ReleaseInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    date = graphene.Date(required=True)
    info = graphene.String()


class ReleaseUpdateInput(graphene.InputObjectType):
    id = graphene.ID(required=True)
    steps = graphene.List(of_type=StepType, required=True)
    info = graphene.String()
