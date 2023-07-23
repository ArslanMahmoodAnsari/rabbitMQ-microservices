// imports
const morgan = require("morgan");
const express = require("express");
const rabbitMQ = require("../lib/rabbitmq");

let channel;
const app = express();


// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

const subscribeUserQueue = async(res) => {
  console.log('==============User QUEUE============');
  console.log(res);
  console.log('====================================');
}

const subscribeShippingQueue = async(res) => {
  console.log('============Shipping QUEUE==========');
  console.log(res);
  console.log('====================================');
}

const subscribeBillingQueue = async(res) => {
  console.log('=============Billing QUEUE==========');
  console.log(res);
  console.log('====================================');
}

const connectRabbitMQ = async () => {
  try {
    channel = await rabbitMQ.connectToRabbitMQ();
    rabbitMQ.consumeFromQueue(channel, rabbitMQ.USER_QUEUE, subscribeUserQueue)
    rabbitMQ.consumeFromQueue(channel, rabbitMQ.SHIPPING_QUEUE, subscribeShippingQueue)
    rabbitMQ.consumeFromQueue(channel, rabbitMQ.BILLING_QUEUE, subscribeBillingQueue)
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
};

app.listen(5008, () => {
  console.log("server started on port 5008");
  connectRabbitMQ();
});

process.on("SIGINT", async () => {
  try {
    await channel.close();
    console.log("RabbitMQ channel closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing RabbitMQ channel:", error);
    process.exit(1);
  }
});
