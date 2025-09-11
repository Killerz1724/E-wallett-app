package repository

import (
	"database/sql"
	"log"
	"os"
)

func ResetDatabaseRepo(db *sql.DB)  {
	log.Println("running reset database from cron")

	content, err := os.ReadFile("./database/databaseDown.sql")

		if err != nil {
			log.Fatalln("failed to read down seed file", err)
		}

		_, err = db.Exec(string(content))

		if err != nil {
			log.Fatalln("failed to execute down seed file", err)
		}

	content, err = os.ReadFile("./database/database.sql")

	if err != nil {
		log.Fatalln("failed to read seed file", err)
	}

	_, err = db.Exec(string(content))

	if err != nil {
		log.Fatalln("failed to execute seed file", err)
	}
}