"use strict";
const mongoose = require("mongoose");
const connectionString = process.env.MONGODB_URI;
const { countConnect } = require("../helpers/check.connect");
countConnect();
class Database {
    constructor() {
        this.connect();
    }

    connect(type = "mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        mongoose
            .connect(connectionString, {
                maxPoolSize: 50,
            })
            .then((_) => {
                console.log("Connected Mongodb Success", countConnect());
            })
            .catch((err) => console.log("Error connect!"));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
