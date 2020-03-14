package main

import (
	"flag"
	"fmt"
	"net/http"

	regex "github.com/alexeykhr/link-preview-k8/websocket/helpers"

	"github.com/gorilla/websocket"
)

var (
    env = flag.String("env", "production", "Current environment")
    addr = flag.String("addr", ":8080", "http service address")
)

// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	flag.Parse()

	if *env == "development" {
		upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	}

	http.HandleFunc("/ws/domains", handleWs)

	fmt.Println("Starting:", *addr)
	if err := http.ListenAndServe(*addr, nil); err != nil {
		fmt.Println(err)
	}
}

func handleWs(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil) // error ignored for sake of simplicity
	if err != nil {
		// TODO Some logs
	}

	for {
		// Read message from browser
		_, msg, err := conn.ReadMessage()
		if err != nil {
			// TODO Some logs
			return
		}

		msgStr := string(msg)
		if regex.IsValidDomain(msgStr) {
			// TODO Check cache

			// TODO Send to queue
		}
	}
}
