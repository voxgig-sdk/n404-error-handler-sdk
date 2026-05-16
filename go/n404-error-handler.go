package voxgign404errorhandlersdk

import (
	"github.com/voxgig-sdk/n404-error-handler-sdk/core"
	"github.com/voxgig-sdk/n404-error-handler-sdk/entity"
	"github.com/voxgig-sdk/n404-error-handler-sdk/feature"
	_ "github.com/voxgig-sdk/n404-error-handler-sdk/utility"
)

// Type aliases preserve external API.
type N404ErrorHandlerSDK = core.N404ErrorHandlerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type N404ErrorHandlerEntity = core.N404ErrorHandlerEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type N404ErrorHandlerError = core.N404ErrorHandlerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewErrorHandlingEntityFunc = func(client *core.N404ErrorHandlerSDK, entopts map[string]any) core.N404ErrorHandlerEntity {
		return entity.NewErrorHandlingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewN404ErrorHandlerSDK = core.NewN404ErrorHandlerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
