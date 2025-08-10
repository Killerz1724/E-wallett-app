package database

import (
	"database/sql"
	"ewallet/config"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
)


func InitializeDatabase() (*sql.DB,error) {

	url := config.ServerConfig()

	db, err := sql.Open("pgx", url)

	if err != nil {
		log.Fatalln("failed to connect to database", err)
		return nil, err
	}

	err = db.Ping()

	if err != nil {
		return nil, err
	}
	return db, nil
}