"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email is existed ??
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: "xxx",
                    message: "Shop already registered!",
                    status: "error",
                };
            }
            const passwordHash = bcrypt.hash(password, 10); // salt = 10 is enough
            const newShop = await shopModel.create({
                name,
                email,
                passwordHash,
                roles: [RoleShop.SHOP],
            });

            if (newShop) {
                // create privateKey and publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync(
                    "rsa",
                    {
                        modulusLength: 4096,
                    }
                );

                console.log({ privateKey, publicKey }); // save to collection KeyStore
            }
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AccessService;
