package dto

import (
	"time"

	"github.com/shopspring/decimal"
)

type Transaction struct {
	InvoiceNumber string          `json:"invoice_number"`
	TransactionCategory string          `json:"transaction_category"`
	SourceFund          string          `json:"source_fund"`
	Description         string          `json:"description"`
	Amount              decimal.Decimal `json:"amount"`
	TransactionTime     time.Time       `json:"transaction_time"`
	Sender string          `json:"sender"`
	Recipient            string          `json:"recipent"`
}

type PageInfo struct {
	CurrentPage int `json:"current_page"`
	TotalRows   int `json:"total_rows"`
	LimitDataPerPage int `json:"limit_data_per_page"`
}

type ListTransactionResponse struct {
	PageInfo         PageInfo           `json:"page_info"`
	Transactions []Transaction `json:"transactions"`
}

type ListTransactionBody struct {
	UserId int `form:"user_id" json:"user_id" binding:"required"`
}

type TopUpBody struct {
	Amount       decimal.Decimal `form:"amount" json:"amount" binding:"required"`
	SourceOfFund int             `form:"source_of_fund" json:"source_of_fund" binding:"required"`
}

type TransferBody struct {
	TargetWallet int             `form:"to" json:"to" binding:"required"`
	Amount       decimal.Decimal `form:"amount" json:"amount" binding:"required"`
	Description  string          `form:"description" json:"description" binding:"max=35"`
}

type Users struct {
	WalletId int `json:"wallet_id"`
	ImgUrl string `json:"img_url"`
	Username string `json:"username"`
}

type ListAllUsersResponse struct {
	PageInfo PageInfo `json:"page_info"`
	Users []Users `json:"users"`
	
}

type SourceOfFundResponse struct {
	Id int `json:"id"`
	Name string `json:"name"`
}

type Reward struct {
	Prize_id int `json:"prize_id"`
	Prize_amount int64 `json:"prize_amount"`

}

type RewardsResponse struct {
	Rewards []Reward `json:"prizes"`
}
