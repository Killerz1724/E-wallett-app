package entity

import (
	"time"

	"github.com/shopspring/decimal"
)

type Transaction struct {
	InvoiceNumber string
	TransactionCategory string
	SourceFund          string
	Description         string
	Amount              decimal.Decimal
	TransactionTime     time.Time
	Recpient            string
}

type PageInfo struct {
	CurrentPage int 
	TotalRows   int 
	LimitDataPerPage int 
}

type ListTransactionResponse struct {
	PageInfo         PageInfo
	Transactions []Transaction
}

type ListTransactionBody struct {
	UserId int
}
type TopUpBody struct {
	InvoiceNumber string
	Amount       decimal.Decimal
	SourceOfFund int
}

type TransferBody struct {
	InvoiceNumber string
	TargetWallet int
	Amount       decimal.Decimal
	Description  string
}

type Users struct {
	WalletId int
	ImgUrl string
	Username string
}

type ListAllUsersResponse struct {
	Users []Users
	PageInfo PageInfo
}

type SourceOfFundResponse struct {
	Id int
	Name string
}


