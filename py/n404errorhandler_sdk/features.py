# N404ErrorHandler SDK feature factory

from n404errorhandler_sdk.feature.base_feature import N404ErrorHandlerBaseFeature
from n404errorhandler_sdk.feature.test_feature import N404ErrorHandlerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: N404ErrorHandlerBaseFeature(),
        "test": lambda: N404ErrorHandlerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
