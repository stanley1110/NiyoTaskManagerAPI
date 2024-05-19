const jwt = require("jsonwebtoken");
const generatetoken = async (id, email) => {
  const payload = {
    id: id.toString(),
    email: email,
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyAccessToken = async (token) => {
  const secret = process.env.JWT_SECRET;

  try {
    const decoded = await jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { generatetoken, verifyAccessToken };
