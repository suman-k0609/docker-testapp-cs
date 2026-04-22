// const express = require("express");
// const app = express();
// const path = require("path");
// const MongoClient = require("mongodb").MongoClient;

// const PORT = 5050;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
// const client = new MongoClient(MONGO_URL);

// //GET all users
// app.get("/getUsers", async (req, res) => {
//     await client.connect(URL);
//     console.log('Connected successfully to server');

//     const db = client.db("cipherschools-db");
//     const data = await db.collection('users').find({}).toArray();

//     client.close();
//     res.send(data);
// });

// //POST new user
// app.post("/addUser", async (req, res) => {
//     const userObj = req.body;
//     console.log(req.body);
//     await client.connect(URL);
//     console.log('Connected successfully to server');

//     const db = client.db("cipherschools-db");
//     const data = await db.collection('users').insertOne(userObj);
//     console.log(data);
//     console.log("data inserted in DB");
//     client.close();
// });


// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });

// // to check available networks - docker network ls
// // create a network - docker network create Network_name

// // Docker compose
// // docker compose -f fileName.yaml up -d
// // docker compose -f fileName down

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ FIXED
const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const client = new MongoClient(MONGO_URL);

// GET users
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("cipherschools-db");
        const data = await db.collection('users').find({}).toArray();

        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching users");
    }
});

// POST user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;

        await client.connect();

        const db = client.db("cipherschools-db");
        await db.collection('users').insertOne(userObj);

        console.log("data inserted in DB");

        res.send("User added successfully");  // ✅ IMPORTANT
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving user");
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});