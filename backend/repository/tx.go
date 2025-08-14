package repository

import (
	"context"
	"database/sql"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/utils"
)

type TxItf interface {
	WithTx(c context.Context, tFunc func (c context.Context) error) error
}

type WithTx struct {
	conn *sql.DB
}

func NewRepoTx(conn *sql.DB) *WithTx {
	return &WithTx{
		conn: conn,
	}
}

func (wt *WithTx) WithTx(c context.Context, tFunc func (c context.Context) error) error{
	tx, err := wt.conn.Begin()

	if err != nil {
		return &entity.CustomError{
			Msg: constant.TransactionProblem{Msg: constant.CommonError.Error()},
			Log: err,
		}
	}

	defer func() {
		if p:= recover(); p != nil {
			_ = tx.Rollback()
			panic(p)
		} else if err != nil {
			_ = tx.Rollback()
		} else {
			err = tx.Commit()
		}
	}()

	injectTx := utils.InjectTx(c, tx)

	txErr := tFunc(injectTx)

	

	return txErr

}