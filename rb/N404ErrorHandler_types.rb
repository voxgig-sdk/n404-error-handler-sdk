# frozen_string_literal: true

# Typed models for the N404ErrorHandler SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ErrorHandling entity data model.
#
# @!attribute [rw] caus
#   @return [Array, nil]
#
# @!attribute [rw] solution
#   @return [Array, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ErrorHandling = Struct.new(
  :caus,
  :solution,
  :timestamp,
  :url,
  keyword_init: true
)

# Request payload for ErrorHandling#list.
#
# @!attribute [rw] caus
#   @return [Array, nil]
#
# @!attribute [rw] solution
#   @return [Array, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ErrorHandlingListMatch = Struct.new(
  :caus,
  :solution,
  :timestamp,
  :url,
  keyword_init: true
)

