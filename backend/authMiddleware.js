const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const token = req.headers.token;

  if(!token) return res.status(401).send("No token");

  try{
    const decoded = jwt.verify(token,"secret123");
    req.user = decoded;
    next();
  }catch{
    res.status(401).send("Invalid token");
  }
};
