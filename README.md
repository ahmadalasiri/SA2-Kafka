SA2-Kafka-Microservices-Docker

## Analysis and Design of Information Systems-2 course (IS 352) (FCIA-Helwan University - Spring 2023)

## Introduction

This project aims to demonstrate the concepts of messaging queue (Kafka), microservices, and containerization (Docker) in a simple course management system. The system allows users to create, update, and delete courses using a producer-consumer architecture implemented with Kafka. The microservices are containerized using Docker for easy deployment and scalability.

## Architecture

The system follows a producer-consumer architecture, where the producer microservice is responsible for creating, updating, and deleting courses. The consumer microservice listens to Kafka topics and performs the corresponding actions based on the received messages.

![327f5cdc-dc96-4a3d-8e2a-40bf68bb48d0](https://github.com/fixflex/backend/assets/124518625/8705f021-62c8-4115-94f3-226576d73578)

## Technologies Used

- Node.js: The backend is developed using Node.js, a JavaScript runtime.
- Express.js: Express.js is used as the web framework for handling HTTP requests and routing.
- Kafka: Kafka is used as the messaging system for communication between microservices.
- Docker: Docker is used for containerization of microservices, providing easy deployment and scalability.
- MongoDB: MongoDB is used as the database for storing course data.

## Microservices

The project consists of two microservices: the producer and the consumer.

### Producer Microservice

The producer microservice is responsible for handling course creation, update, and deletion requests. It receives HTTP requests and sends corresponding messages to the Kafka topic.

#### Endpoints

- `POST /api/v1/courses`: Creates a new course.
- `PUT /api/v1/courses/:id`: Updates an existing course3.
- `DELETE /api/v1/courses/:id`: Deletes a course.

### Consumer Microservice

The consumer microservice listens to the Kafka topic and performs the necessary actions based on the received messages. It handles course creation, update, and deletion operations.

#### Kafka Configuration

- Kafka Broker: `kafka:9092`
- Kafka Topic: `test`

## Deployment

The microservices are containerized using Docker for easy deployment and scalability. The Docker images can be built using the provided Dockerfiles. The producer microservice should be deployed on port 4000, and the consumer microservice should be deployed on port 3000.

## Usage

To use the course management system, you can send HTTP requests to the producer microservice endpoints to create, update, or delete courses. The consumer microservice will listen to the Kafka topic and perform the necessary actions based on the received messages.

## Conclusion

This project demonstrates the implementation of a course management system using Kafka, microservices, and Docker. It showcases the benefits of using a messaging system like Kafka for inter-service communication and the advantages of containerization with Docker for easy deployment and scalability.
