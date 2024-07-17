const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../secret");

const createJSONWebToken = (
  payload,
  secretKey = jwtSecretKey,
  expiresIn = "10m"
) => {
  try {
    if (typeof payload !== "object" || !payload) {
      throw new Error("Payload must be a non-empty object");
    }

    const token = jwt.sign(payload, secretKey, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error("Failed to sign the JWT", error);
    throw error;
  }
};

const verifyJSONWebToken = (token, secretKey = jwtSecretKey) => {
  try {
    if (typeof token !== "string" || !token) {
      throw new Error("Token must be a non-empty string");
    }

    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Failed to verify the JWT", error);
    throw error;
  }
};

module.exports = { createJSONWebToken, verifyJSONWebToken };
