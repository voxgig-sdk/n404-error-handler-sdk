# ProjectName SDK exists test

import pytest
from n404errorhandler_sdk import N404ErrorHandlerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = N404ErrorHandlerSDK.test(None, None)
        assert testsdk is not None
