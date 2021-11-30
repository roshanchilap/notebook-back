var jwt = require("jsonwebtoken");
const JWT_SECRET = "arrssmbvkss";

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to req obj

  const token = req.header("auth_token");
  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
