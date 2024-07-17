require("dotenv").config();

const projectName = process.env.PROJECT_NAME || "Untitled";
const port = process.env.PORT || 8000;
const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017";

const jwtSecretKey =
  process.env.JWT_ACTIVATION_KEY || "781C13ADF1668C5B47F4FA9BB924F";

const defaultImagePath =
  process.env.USER_DEFAULT_IMAGE_PATH || "public/images/users/person.png";

const smtpUserName = process.env.SMTP_USER_NAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL || "";

const steadFastBaseApiURL = process.env.STEADFAST_API_BASE_URL || "";
const steadFastApiKey = process.env.STEADFAST_API_KEY || "";
const steadFastSecretKey = process.env.STEADFAST_SECRET_KEY || "";

module.exports = {
  port,
  projectName,
  mongodbURL,
  defaultImagePath,
  jwtSecretKey,
  smtpUserName,
  smtpPassword,
  clientUrl,
  steadFastBaseApiURL,
  steadFastApiKey,
  steadFastSecretKey,
};
