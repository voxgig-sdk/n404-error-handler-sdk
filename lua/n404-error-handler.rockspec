package = "voxgig-sdk-n404-error-handler"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/n404-error-handler-sdk.git"
}
description = {
  summary = "N404ErrorHandler SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["n404-error-handler_sdk"] = "n404-error-handler_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
