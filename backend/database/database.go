package database

import (
	"database/sql"
	"ewallet/config"
	"flag"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)


func InitializeDatabase() (*sql.DB,error) {
	seed := flag.Bool("seed", false, "seed the database")
	down := flag.Bool("down", false, "drop the database")
	flag.Parse()
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

	if *down {
		content, err := os.ReadFile("./database/databaseDown.sql")

		if err != nil {
			log.Fatalln("failed to read down seed file", err)
			return nil, err
		}

		_, err = db.Exec(string(content))

		if err != nil {
			log.Fatalln("failed to execute down seed file", err)
			return nil, err
		}
	}

	if *seed {
		content, err := os.ReadFile("./database/database.sql")

		if err != nil {
			log.Fatalln("failed to read seed file", err)
			return nil, err
		}

		_, err = db.Exec(string(content))

		if err != nil {
			log.Fatalln("failed to execute seed file", err)
			return nil, err
		}
	}
	return db, nil
}