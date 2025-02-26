package main

import (
	"log"

	"github.com/bvrtula/task-manager/controllers"
	"github.com/bvrtula/task-manager/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	database.Connect()
	app := fiber.New()
	micro := fiber.New()

	app.Mount("/api", micro)
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, PATCH, DELETE",
		AllowCredentials: true,
	}))
	micro.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, PATCH, DELETE",
		AllowCredentials: true,
	}))

	// ROUTES
	micro.Route("/tasks", func(router fiber.Router) {
		// GET ALL TASKS
		router.Get("", controllers.GetTasks)
		// ADD TASK
		router.Post("", controllers.CreateTask)
	})

	micro.Route("/tasks/:id", func(router fiber.Router) {
		// EDIT TASK
		router.Put("", controllers.EditTask)
		// DELETE TASK
		router.Delete("", controllers.DeleteTask)
	})

	micro.Route("/users/signup", func(router fiber.Router) {
		// ADD USER
		router.Post("", controllers.Register)
	})

	micro.Route("/users/login", func(router fiber.Router) {
		// LOGIN USER
		router.Post("", controllers.Login)
	})

	log.Fatal(app.Listen(":8000"))
}
