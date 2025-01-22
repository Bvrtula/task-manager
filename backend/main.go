package main

import (
	"log"

	// "github.com/bvrtula/task-manager/controllers" example of import from diff pckg
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	micro := fiber.New()

	app.Mount("/api", micro)
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, PATCH, DELETE",
		AllowCredentials: true,
	}))

	// ROUTES

	// micro.Route("/welcome/:user", func(router fiber.Router) {
	// 	router.Post("/", controllers.CreateNoteHandler)
	// 	router.Get("", controllers.Welcome)
	// })

	micro.Route()

	log.Fatal(app.Listen(":8000"))
}
