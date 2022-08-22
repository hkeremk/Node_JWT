const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req,res) => {
    res.json({message: "Welcome to the API!"});
});

app.post("/api/posts", verifyToken, (req,res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }else{
            res.json({message: "Post created..", authData});
        }
    });
});

app.post("/api/login", (req,res) => {
    // Mock User
    const user = {
    id : 24,
    username : "Jonah",
    email : "jonah_24@gmail.com"
    }

    jwt.sign({user}, "secretkey", { expiresIn: "30s"}, (err, token) => {
        res.json({token});
    });
});


    // Format of Token
    // Authorization : Bearer <access_token>

// Verify Token
 function verifyToken(req,res,next) {
     // Get auth header value
     const bearerHeader = req.headers["authorization"];
     // Chech if bearer is undefined
     if(typeof bearerHeader !== "undefined" ) {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
     }else{
         // Forbidden 
         next();
         res.sendStatus(403);
     }
 }

 app.listen(5000, () => console.log("Server is listening on port 5000.."));