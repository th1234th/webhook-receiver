import convict from "convict";

const config = convict({
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
    arg: "port",
  },
  smee: {
    doc: "The smee.io url to use for proxying webhooks",
    format: String,
    default: null,
    env: "SMEE",
    arg: "smee",
  },
});

config.validate({ allowed: "strict" });

export default config;
