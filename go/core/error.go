package core

type N404ErrorHandlerError struct {
	IsN404ErrorHandlerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewN404ErrorHandlerError(code string, msg string, ctx *Context) *N404ErrorHandlerError {
	return &N404ErrorHandlerError{
		IsN404ErrorHandlerError: true,
		Sdk:              "N404ErrorHandler",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *N404ErrorHandlerError) Error() string {
	return e.Msg
}
