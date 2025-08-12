package constant

import "errors"

var (
	LoginError          = errors.New("invalid credentials")
	RegisterError       = errors.New("already exists")
	QueryError          = errors.New("failed to query data")
	AccountAlreadyExist = errors.New("account already exist")
	ScanError           = errors.New("failed to scan data from database")
	DecodeError         = errors.New("failed to decode data")
	NotFound            = errors.New("no product found")
	TimeOutError        = errors.New("request timeout")
	ValidationError     = errors.New("one of the input is invalid please check again")
	CommonError         = errors.New("error internal")
	DuplicateError      = errors.New("data already exist")
	DuplicateErrorCode  = "23505"
	DataEmptyError      = errors.New("data not found")
	NullErrorPg         = errors.New("violate null constraint")
	CRYPTCOST           = 12
	JwtTokenError       = errors.New("user token error, please re-login")
	JwtTokenInvalid     = errors.New("user token is invalid, please re-login")
	JwtTokenExpired     = errors.New("user token expired, please re-login")
	JwtTokenSubject     = errors.New("user token subject is invalid")
	TransactionFailed   = errors.New("transaction failed")
	JsonBad             = errors.New("invalid field or value input, check again")
)


type LoginErrorType struct{ Msg string }

func (d LoginErrorType) Error() string { return d.Msg }

type RegisterErrorType struct{ Msg string }

func (d RegisterErrorType) Error() string { return d.Msg }

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

type TokenProblem struct{ Msg string }

func (d TokenProblem) Error() string { return d.Msg }


