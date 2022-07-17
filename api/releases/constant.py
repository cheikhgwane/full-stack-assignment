from enum import Enum

STEPS = [
    'All relevant Github pull requests have been merged',
    'CHANGELOG.md files have been updated',
    'All tests are passing',
    'Releases in Github created',
    'Deployed in demo',
    'Test Thoroughly in demo',
    'Deployed in production'
]


class ReleaseStatus(Enum):
    PLANNED = 'PLANNED'
    ON_GOING = 'ON_GOING'
    DONE = 'DONE'


class StepStatus(Enum):
    OFF = 'OFF'
    ON = 'ON'
