import Raven from "raven-js";

export function configSentry() {
  return Raven.config(process.env.SENTRY_DNS, {
    environment: process.env.NODE_ENV
  }).install();
}
