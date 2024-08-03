const STAGE = "stage";
const PRODUCTION = "production";
const DEVELOPMENT = "development";

module.exports = {
  STAGE,
  PRODUCTION,
  DEVELOPMENT,
  IS_PRODUCTION: process.env.NODE_ENV === PRODUCTION,
  IS_STAGE: process.env.NODE_ENV === STAGE,
  IS_DEV: process.env.NODE_ENV === DEVELOPMENT,
  ENVIRONMENT: process.env.NODE_ENV,
};
