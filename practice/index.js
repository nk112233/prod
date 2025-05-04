const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();

app.use(express.static('public'));

app.get( "/api/user", (req , res) => {
    fs.readFile(path.join(__dirname , 'users.json') , 'utf-8' , (err , data ) => {
        if(err){
            res.status(500).json({"message" : "Error"});
        }
        const user = JSON.parse(data);
        res.status(200).json(user);
    })
});

app.listen(3000 , () => {
    console.log("Server is running!");
    
})