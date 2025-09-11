package entity

type CustomError struct {
	Msg error
	Log error
}

func (ce CustomError) Error() string {
	return ce.Msg.Error()
}

func (ce CustomError) ErrorLog() string {
	return ce.Log.Error()
}