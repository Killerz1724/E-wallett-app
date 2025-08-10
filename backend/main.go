package main

import (
	"ewallet/database"
	"log"
	"net/http"
	"os"
)

func main() {

	db, err := database.InitializeDatabase()

	if err != nil {
		log.Fatalln(err)
		return
	}

	srv := &http.Server{
		Addr: ":" + os.Getenv("SERVER_PORT"),
	}

	log.Println("Listening on port: " + os.Getenv("SERVER_PORT"))

	err = srv.ListenAndServe()

	if err != nil {
		log.Fatalln(err)
		return
	}

	defer db.Close()

}