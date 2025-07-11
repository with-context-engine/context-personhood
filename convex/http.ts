import { httpRouter } from "convex/server";
import { helloHandler, receiveImageHandler } from "./handlers";

export const http = httpRouter();

http.route({
    path: "/hello",
    method: "GET",
    handler: helloHandler
});

export default http;

http.route({
    path: "/process",
    method: "POST",
    handler: receiveImageHandler
})