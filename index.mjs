import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";
import http from "http";
import EventSource from "eventsource";
import SmeeClient from "smee-client";
import config from "./config/config.mjs";

// Set constants based on environment variables
const port = config.get("port");
const webhookProxyURL = config.get("smee");

// Create a new SmeeClient with the given smee.io URL
const smee = new SmeeClient({
  source: webhookProxyURL,
  target: `http://localhost:${port}/heybuddy`,
  logger: console,
});

// Create a new EventSource to listen for webhook events
const source = new EventSource(webhookProxyURL);

// Create a new Webhooks instance
const webhooks = new Webhooks({
  path: "/heybuddy",
  secret: "dogburger",
});

// Listen for events from the EventSource and forward them to the Webhooks instance
source.onmessage = (event) => {
  const webhookEvent = JSON.parse(event.data);
  webhooks
    .verifyAndReceive({
      id: webhookEvent["x-request-id"],
      name: webhookEvent["x-github-event"],
      signature: webhookEvent["x-hub-signature"],
      payload: webhookEvent.body,
    })
    .catch(console.error);
};

// Log all Webhook events to the console
webhooks.onAny(({ name, payload }) => {
  console.log("Webhook event received:", name);
  console.log("Webhook payload:", payload);
});

webhooks.onAny;

// Start forwarding events
const events = smee.start();

// Listen for incoming Webhook events
const middleware = createNodeMiddleware(webhooks);
http.createServer(middleware).listen(port);

// Stop forwarding events
events.close();
