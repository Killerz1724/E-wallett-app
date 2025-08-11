package constant

import "errors"

var (
	LoginError          = errors.New("invalid credentials")
	RegisterError       = errors.New("already exists")
	QueryError          = errors.New("failed to query data")
	AccountAlreadyExist = errors.New("book already exist")
	ScanError           = errors.New("failed to scan data from database")
	DecodeError         = errors.New("failed to decode data")
	NotFound            = errors.New("no product found")
	TimeOutError        = errors.New("request timeout")
	ValidationError     = errors.New("validation failed")
	CommonError         = errors.New("error internal")
	DuplicateError      = errors.New("data already exist")
	DuplicateErrorCode  = "23505"
	DataEmptyError      = errors.New("data not found")
	NullErrorPg         = errors.New("violate null constraint")
	CRYPTCOST           = 12
	JwtTokenError       = errors.New("user token error, please re-login")
	JwtTokenInvalid     = errors.New("user token is invalid, please re-login")
	JwtTokenExpired     = errors.New("user token expired, please re-login")
	TransactionFailed   = errors.New("transaction failed")
	JsonBad             = errors.New("invalid field or value input, check again")
)


type LoginErrorType struct{ Msg string }

func (d LoginErrorType) Error() string { return d.Msg }

type DataNotFound struct{ Msg string }

func (d DataNotFound) Error() string { return d.Msg }

type QueryErrorType struct{ Msg string }

func (d QueryErrorType) Error() string { return d.Msg }

type DataEmpty struct{ Msg string }

func (d DataEmpty) Error() string { return d.Msg }

type FailedToTransfer struct{ Msg string }

func (d FailedToTransfer) Error() string { return d.Msg }

type FailedJson struct{ Msg string }

func (d FailedJson) Error() string { return d.Msg }

type ExpiredToken struct{ Msg string }

func (d ExpiredToken) Error() string { return d.Msg }


