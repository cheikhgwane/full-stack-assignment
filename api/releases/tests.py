from multiprocessing import context
from django.test import TestCase
from datetime import date
from .models import Release
from .constant import ReleaseStatus
from .schema import schema
from graphene.test import Client

# Create your tests here.


class ReleaseModelTest(TestCase):

    def test_create_new_release(self):
        self.assertEqual(0, Release.objects.all().count())
        release = Release(name="Test 1", info="Test 2", date=date.today())
        release.save()
        self.assertEqual(1, Release.objects.all().count())
        self.assertEqual(ReleaseStatus.PLANNED.name,
                         Release.objects.get(pk=release.id).status)

    def test_find_one_success(self):
        release = Release(name="Test 1", info="Test 2", date=date.today())
        release.save()
        self.assertEqual(release, Release.objects.get(pk=release.id))

    def test_find_one_failed(self):
        with self.assertRaises(Release.DoesNotExist):
            Release.objects.get(pk=2)

    def test_delete_release(self):
        # before deletion
        release = Release(name="Test 1", info="Test 2", date=date.today())
        release.save()
        self.assertEqual(1, Release.objects.all().count())
        # deletion
        release.delete()
        self.assertEqual(0, Release.objects.all().count())

    def test_update_release(self):
        release = Release(name="Test 1", info="Test 2", date=date.today())
        release.save()
        self.assertEqual(release.info, Release.objects.get(pk=release.id).info)

        release.info = "Test update"
        release.save()
        self.assertNotEqual("Test 2", Release.objects.get(pk=release.id).info)


class GrapheneTest(TestCase):

    def test_create_new_release(self):
        client = Client(schema=schema)
        query = """
                mutation createRelease($release:ReleaseInput!){
                    createRelease(release:$release){
                       release {
                        id
                        status
                      }
                    }
                }
                """
        result = client.execute(query, variables={
            'release': {'name': 'rel1', 'info': "blabla", 'date': date.today()}})

        data = list(result.get('data').items())[0]
        self.assertEqual(ReleaseStatus.PLANNED.name,
                         data[1].get('release').get('status'))
