# N404ErrorHandler SDK utility: make_context

from core.context import N404ErrorHandlerContext


def make_context_util(ctxmap, basectx):
    return N404ErrorHandlerContext(ctxmap, basectx)
