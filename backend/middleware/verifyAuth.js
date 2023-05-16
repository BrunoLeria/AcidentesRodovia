const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid", success: false });
  }
};
