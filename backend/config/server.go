package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)
func ServerConfig() string {

		err := godotenv.Load()

		dbHost := os.Getenv("DBHOST")
	dbPort := os.Getenv("DBPORT")
	dbName := os.Getenv("DBNAME")
	dbUser := os.Getenv("DBUSER")
	dbPassword := os.Getenv("DBPASS")
	rdbms := os.Getenv("RDBMS")

	if err != nil {
		log.Fatalln("error loading .env file", err)
		return ""
	}

	urlCon := fmt.Sprintf("%s://%s:%s@%s:%s/%s", rdbms, dbUser, dbPassword, dbHost, dbPort, dbName)

	return urlCon

}