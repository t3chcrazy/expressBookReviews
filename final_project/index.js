const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
  //Write the authenication mechanism here
  const bearerToken = req.headers["authorization"].match(/^Bearer\s(.+)/)?.[1];
  if (bearerToken) {
    jwt.verify(bearerToken, "fingerprint_customer", function(err, decoded) {
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        next();
      }
    });
  }
  return res.status(401).send("Unauthorized");
});
 
const PORT = 5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
