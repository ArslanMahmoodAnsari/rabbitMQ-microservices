## Assignment

Add a microservice called data-service with no HTTP endpoint but just a MQ receiver.

Send payload received in POST requests of billing-service, shipping-service and users-service to data-service via MQ and further send all messages received by data-service to webhook-service using MQ.
