package utils

import (
	"context"
	"database/sql"
)

type txKey struct{}

func InjectTx(c context.Context, tx *sql.Tx) context.Context {
	return context.WithValue(c, txKey{}, tx)
}

func ExtractTx(c context.Context) *sql.Tx {
	if tx, ok := c.Value(txKey{}).(*sql.Tx); ok {
		return tx
	}

	return nil
}
