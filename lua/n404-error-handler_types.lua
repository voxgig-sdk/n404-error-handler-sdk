-- Typed models for the N404ErrorHandler SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ErrorHandling
---@field caus? table
---@field solution? table
---@field timestamp? string
---@field url? string

---@class ErrorHandlingListMatch
---@field caus? table
---@field solution? table
---@field timestamp? string
---@field url? string

local M = {}

return M
