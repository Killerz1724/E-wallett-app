package repository

import (
	"context"
	"database/sql"
	"errors"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/utils"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgconn"
)

type TransactionRepoItf interface {
	ListAllTransactionRepo(context.Context, string, time.Time, time.Time, string, []string, []string, int, int) (*entity.ListTransactionResponse, error)
	TopupTransactionRepo(context.Context, entity.TopUpBody, string) error
	TransferTransactionRepo(context.Context, entity.TransferBody, string) error
	ListAllUsersRepo(context.Context, string, string, int) (*entity.ListAllUsersResponse, error)
	SourceOfFundsRepo(context.Context) ([]*entity.SourceOfFundResponse, error)
}

type TransactionRepoImpl struct {
	db *sql.DB
}

func NewTransactionRepo(db *sql.DB) TransactionRepoImpl {
	return TransactionRepoImpl{db: db}
}

func (tr TransactionRepoImpl) ListAllTransactionRepo(c context.Context, email string, sd time.Time, ed time.Time, searchFilt string, order []string, sort []string, pg int, limitPg int) (*entity.ListTransactionResponse, error) {


	rowUserId := tr.db.QueryRowContext(c, `
	SELECT id
	FROM users
	WHERE email = $1
	`, email)

	var getUserId int
	err := rowUserId.Scan(&getUserId)

	if err != nil {
		var perr *pgconn.PgError
		if errors.As(err, &perr) {
			return nil, &entity.CustomError{
				Msg: constant.CommonError,
				Log: err,
			}
		}
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	q := `
	SELECT th.invoice_number, tc.name, sf.name, th.description, th.amount, th.transaction_time, th.recipient
	FROM transaction_histories th
	JOIN transaction_categories tc
	ON tc.id = th.transaction_category_id
	JOIN source_funds sf
	ON sf.id = th.source_fund_id
	WHERE th.user_id = $1
	`
	zeroTime := time.Time{}

	params := []any{}
	params = append(params, getUserId)
	idx := 2

	//Setup search filter by description
	if searchFilt != "" {
		searchFilt = "%" + searchFilt + "%"
		q += "AND th.description ILIKE" + " " + fmt.Sprintf("$%d", idx)
		idx += 1
		params = append(params, searchFilt)
	}

	//Setup date filter
	if sd != zeroTime && ed != zeroTime {
		q += " " + fmt.Sprintf("AND th.transaction_time > $%d AND th.transaction_time < $%d", idx, idx+1)
		idx += 2
		params = append(params, sd, ed)
	}

	//Setup sort and order
	var sortType, orderQuery, orderType string
	orderByCount := -1
	if len(sort) != 0 && sort[0] != "" {
		orderQuery = " " + "ORDER BY"
		for i, query := range sort {
			switch query {
			case "transaction_date":
				sortType = "th.transaction_time"
				orderByCount += 1
			case "amount":
				sortType = "th.amount"
				orderByCount += 1
			case "recipient":
				sortType = "th.recipient"
				orderByCount += 1
			}

			if orderByCount > -1 {
				switch order[orderByCount] {
				case "asc":
					orderType = "ASC"
				case "desc":
					orderType = "DESC"
				}
			}

			if sortType != "" && orderType != "" {
				orderQuery += " " + sortType + " " + orderType
			}

			if i != len(sort)-1 {
				orderQuery += ","
			}
		}
	}

	//Setup limit content per page
	contentPerPage := limitPg
	if pg > 0 {
		offsetPg := (contentPerPage * pg) - contentPerPage
		orderQuery += " " + fmt.Sprintf("LIMIT $%d OFFSET $%d", idx, idx+1)
		idx += 2
		params = append(params, contentPerPage, offsetPg)
	}

	q += orderQuery
	// log.Println(params...)

	rows, err := tr.db.QueryContext(c, q, params...)

	if err != nil {
		var perr *pgconn.PgError
		if errors.As(err, &perr) {
			return nil, &entity.CustomError{
				Msg: constant.CommonError,
				Log: err,
			}
		}
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	var transactions []entity.Transaction

	for rows.Next() {
		var trans entity.Transaction
		// var transTime string
		err = rows.Scan(
			&trans.InvoiceNumber,
			&trans.TransactionCategory,
			&trans.SourceFund,
			&trans.Description,
			&trans.Amount,
			&trans.TransactionTime,
			&trans.Recpient,
		)

		if err != nil {
			return nil, nil
		}
		

		transactions = append(transactions, trans)
	}

	return &entity.ListTransactionResponse{PageInfo: entity.PageInfo{
		CurrentPage: pg,
		TotalRows:   len(transactions),
		LimitDataPerPage: contentPerPage,
	}, Transactions: transactions}, nil
}

func (tr TransactionRepoImpl) TopupTransactionRepo(c context.Context, req entity.TopUpBody, email string) error {

	rowUserId := tr.db.QueryRowContext(c, `
	SELECT id, username
	FROM users
	WHERE email = $1
	`, email)

	var getUserId int
	var getUserName string
	err := rowUserId.Scan(&getUserId, &getUserName)

	if err != nil {
		return &entity.CustomError{Msg: constant.DataNotFound{Msg: constant.UserNotFound.Error()}, Log: err}
	}

	exTx := utils.ExtractTx(c)
	//Lock update row
	_, err = exTx.ExecContext(c, `
		SELECT balance FROM wallets WHERE user_id = $1 FOR UPDATE;
	`, getUserId)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	_, err = exTx.ExecContext(c, `
		UPDATE wallets
		SET balance = balance + $1
		WHERE user_id = $2
	`, req.Amount, getUserId)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	rowSourceFund := exTx.QueryRowContext(c, `
	SELECT name
	FROM source_funds
	WHERE id = $1
	`, req.SourceOfFund)

	var getSourceFund string

	err = rowSourceFund.Scan(&getSourceFund)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	description := fmt.Sprintf("top up from %s", getSourceFund)
	//Add to transaction histories
	_, err = exTx.ExecContext(c, `
	INSERT INTO transaction_histories(invoice_number, user_id, transaction_category_id, source_fund_id, description, recipient, amount) 
	VALUES
		($1, $2, 2,  $3, $4, $5, $6);
	`,req.InvoiceNumber, getUserId, req.SourceOfFund, description, getUserName, req.Amount)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	var minTopUpGacha int64 = 10000000

	if req.Amount.IntPart()/minTopUpGacha >= 1 {
		gachaChance := req.Amount.RoundDown(-2).IntPart() / minTopUpGacha

		if gachaChance > 0 {
			_, err := exTx.ExecContext(c, `
			UPDATE users
			SET gacha_chance = gacha_chance + $1
			WHERE id = $2
			`, gachaChance, getUserId)

			if err != nil {
				return &entity.CustomError{Msg: constant.CommonError, Log: err}
			}
		}
	}

	return nil
}

func (tr TransactionRepoImpl) TransferTransactionRepo(c context.Context, req entity.TransferBody, email string) error {

	rowUserId := tr.db.QueryRowContext(c, `
	SELECT u.id, u.username
	FROM users u
	WHERE u.email = $1
	`, email)

	var getUserId int
	var getUserName string
	err := rowUserId.Scan(&getUserId, &getUserName)

	if err != nil {
		return &entity.CustomError{Msg: constant.DataNotFound{Msg: constant.UserNotFound.Error()}, Log: err}
	}

	exTx := utils.ExtractTx(c)

	//Lock target wallet
	_, err = exTx.ExecContext(c, `
		SELECT balance FROM wallets WHERE wallet_number = $1 FOR UPDATE;
	`, req.TargetWallet)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}
	//Lock user wallet
	_, err = exTx.ExecContext(c, `
		SELECT balance FROM wallets WHERE user_id = $1 FOR UPDATE;
	`, getUserId)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	//Check user balance
	checkBalanceRow := exTx.QueryRowContext(c, `
	SELECT 1
	FROM wallets
	WHERE user_id = $1 AND balance >= $2
	`, getUserId, req.Amount)

	var checkBalance int

	if err := checkBalanceRow.Scan(&checkBalance); errors.Is(err, sql.ErrNoRows) {
		return &entity.CustomError{
			Msg: constant.FailedToTransfer{
				Msg: constant.BalanceIsInufficient.Error()}, 
				Log: err}
	}

	//Check if user transfer to themselve
	checkUserTargetTrfRow := exTx.QueryRowContext(c, `
	SELECT u.username, u.id
	FROM wallets w
	JOIN users u
	ON u.id = w.user_id
	WHERE w.wallet_number = $1
	`, req.TargetWallet)

	var getTargetName string
	var getTargetId int

	err = checkUserTargetTrfRow.Scan(&getTargetName, &getTargetId)

	if err != nil {
		return &entity.CustomError{Msg: constant.DataNotFound{Msg: constant.UserNotFound.Error()}, Log: err}
	}

	if getTargetId == getUserId {
		return &entity.CustomError{
			Msg: constant.FailedToTransfer{
				Msg: errors.New("user can't transfer to themselve").Error(), 
			},
			Log: errors.New("user can't transfer to themselve"),
	}
	}
	//Sent money to target e-wallet
	_, err = exTx.ExecContext(c, `
		UPDATE wallets
		SET balance = balance + $1
		WHERE wallet_number = $2
	`, req.Amount, req.TargetWallet)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	//Substract balance from user e-wallet
	_, err = exTx.ExecContext(c, `
		UPDATE wallets
		SET balance = balance - $1
		WHERE user_id = $2
	`, req.Amount, getUserId)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	//Add default description if no description provided
	var description string
	description = fmt.Sprintf("transfered to %s", getTargetName)
	if req.Description != "" {
		description = req.Description
	}

	//Add to transaction histories
	_, err = exTx.ExecContext(c, `
	INSERT INTO transaction_histories(invoice_number, user_id, transaction_category_id, source_fund_id, description, recipient, amount) 
	VALUES
		($1, $2, 1, $3, $4, $5, $6);
	`, req.InvoiceNumber,getUserId, constant.EWALLET_SOURCEOFFUND, description, getTargetName, req.Amount)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	return nil
}

func (tr TransactionRepoImpl) ListAllUsersRepo(c context.Context, email string, search string, page int) (*entity.ListAllUsersResponse, error) {
	
	q := `
	SELECT w.wallet_number, u.username, u.profile_image
	FROM users u
	JOIN wallets w
	ON u.id = w.user_id
	WHERE u.email != $1
	`	

	params := []any{}
	idx := 2
	params = append(params, email)
	//Setup search filter by username
	if search != "" {
		search = search + "%"
		q += " " + "AND u.username ILIKE" + " " + fmt.Sprintf("$%d", idx)
		idx += 1
		params = append(params, search)
	}


	//Setup limit content per page
	contentPerPage := 5
	var orderQuery string
	if page > 0 {
		offsetPg := (contentPerPage * page) - contentPerPage
		orderQuery += " " + fmt.Sprintf("LIMIT $%d OFFSET $%d", idx, idx+1)
		idx += 2
		params = append(params, contentPerPage, offsetPg)
	}

	q += orderQuery

	rows, err := tr.db.QueryContext(c, q, params...)

	if err!= nil {
		return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	var users entity.ListAllUsersResponse

	for rows.Next(){
		var user entity.Users

		err = rows.Scan(&user.WalletId, &user.Username, &user.ImgUrl)

		if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}

		users.Users = append(users.Users, user)
	}

	users.PageInfo.CurrentPage = page
	users.PageInfo.LimitDataPerPage = contentPerPage
	users.PageInfo.TotalRows = len(users.Users)

	return &users, nil
	

}

func (tr TransactionRepoImpl) SourceOfFundsRepo(c context.Context) ([]*entity.SourceOfFundResponse, error){
	q := `
	SELECT id, name
	FROM source_funds
	WHERE name <> 'e-wallet' AND name <> 'reward'
	`

	rows,err := tr.db.QueryContext(c, q)

	if err != nil {
		return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	var sofs []*entity.SourceOfFundResponse

	for rows.Next(){
		var sof entity.SourceOfFundResponse
		err = rows.Scan(&sof.Id, &sof.Name)

		if err !=nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}

		sofs = append(sofs, &sof)
	}	

	return sofs, nil
}