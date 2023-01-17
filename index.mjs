import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";
import http from "http";

const webhooks = new Webhooks({
  path: "/heybuddy",
  secret: "dogburger",
});

webhooks.onAny(({ id, name, payload }) => {
  console.log(name, " event received: ", payload);
});

const middleware = createNodeMiddleware(webhooks);

http.createServer(middleware).listen(3002);
