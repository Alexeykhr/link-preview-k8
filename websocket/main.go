package main

import (
	"crypto/md5"
	"encoding/hex"
	"flag"
	"fmt"
	"net/http"

	regex "github.com/alexeykhr/link-preview-k8/websocket/helpers"

	"github.com/go-redis/redis/v7"
	"github.com/gorilla/websocket"
	"github.com/streadway/amqp"
)

var (
	env       = flag.String("env", "production", "current environment")
	addr      = flag.String("addr", ":8080", "http service address")
	redisAddr = flag.String("redisAddr", "localhost:6379", "redis address")
	redisPass = flag.String("redisPass", "", "redis password")
	redisDb   = flag.Int("redisDb", 0, "redis database")
	amqpAddr  = flag.String("amqpAddr", "localhost:5672", "RabbitMQ address")
	amqpUser  = flag.String("amqpUser", "guest", "RabbitMQ username")
	amqpPass  = flag.String("amqpPass", "guest", "RabbitMQ password")
)

// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return *env == "development"
	},
}

type App struct {
	redis *redis.Client
	amqp  *amqp.Connection
}

func main() {
	flag.Parse()

	amqp, err := getRabbitMQ()
	if err != nil {
		panic(err)
	}

	redis, err := getRedisClient()
	if err != nil {
		panic(err)
	}

	app := &App{
		redis: redis,
		amqp:  amqp,
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		app.handleWs(w, r)
	})

	fmt.Println("Starting:", *addr, *env)
	if err := http.ListenAndServe(*addr, nil); err != nil {
		panic(err)
	}
}

func (app *App) handleWs(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		// TODO Some logs
	}
	defer conn.Close()

	ch, err := app.amqp.Channel()
	if err != nil {
		fmt.Println(err)
		// TODO Some logs
	}

	q, err := ch.QueueDeclare(
		"link-preview",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		fmt.Println(err)
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
			err = ch.Publish(
				"",
				q.Name,
				false,
				false,
				amqp.Publishing{
					ContentType: "text/plain",
					Body:        msg,
				})

			if err != nil {
				fmt.Println(err)
				// TODO Some logs
			}
			//asd := redis.Get("website."+GetMD5Hash(msg))
			// TODO Check cache

			// TODO Send to queue
		}
	}
}

func getRedisClient() (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     *redisAddr,
		Password: *redisPass,
		DB:       *redisDb,
	})

	if _, err := client.Ping().Result(); err != nil {
		return nil, err
	}

	return client, nil
}

func getRabbitMQ() (*amqp.Connection, error) {
	return amqp.Dial("amqp://" + *amqpUser + ":" + *amqpPass + "@" + *amqpAddr + "/")
}

func GetMD5Hash(text []byte) string {
	hash := md5.Sum(text)

	return hex.EncodeToString(hash[:])
}
