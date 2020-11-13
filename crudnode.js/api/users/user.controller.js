const {
    serviceAddUser,
    serviceGetUsers,
    serviceGetUserById,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceGetUserbyEmail} = require ("./user.service")

    const { genSaltSync, hashSync, compareSync} = require ("bcrypt");
    const { sign } = require ("jsonwebtoken");
const { use } = require("./user.router");

    module.exports = {
        controllerAddUser: (req, res) => {
            const body  = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            serviceAddUser(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            })
        },
        controllerGetUsers: (req, res) => {
            serviceGetUsers((err, results)=>{
                if (err) {
                    console.log(err)
                    return
                }else{
                    return res.json({
                        success: 1,
                        data: results
                    })
                }
            })
        },
        controllerGetUserById: (req, res) => {
            const id = req.params.id;
            serviceGetUserById(id, (err, results) => {
                if (err) {
                    console.log(err)
                    return
                }else{
                    return res.json({
                        success: 1,
                        data: results
                    })
                }
            })
        },
        controllerUpdateUser: (req, res) => {
            const body = req.body
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            serviceUpdateUser(body, (err, results) => {
                if (err) {
                    console.log(err)
                    return
                }if (!results) {
                    return res.json({
                        success: 0,
                        message: "Update failed"
                    })
                } else {
                    return res.json({
                        success: 1,
                        message: "Update succesfully"
                    })
                    
                }
            })
        },
        controllerDeleteUser: (req, res) => {
            const data = req.body
            serviceDeleteUser(data, (err, results)=>{
                if (err) {
                    console.log(err)
                    return
                } if (!results) {
                    return res.json({
                        success: 0,
                        message: "Delete Failed"
                    })
                } else {
                    return res.json({
                        success: 1,
                        message: "Delete succesfully"
                    })
                    
                }
            })
        },
        controllerLogin: (req, res) => {
            const body = req.body
            serviceGetUserbyEmail(body.email, (err, results) => {
                if (err) {
                    console.log(err)
                } if (!results) {
                    return res.json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                } const result = compareSync(body.password, results.password)

                if (results) {
                    results.password = undefined
                    const jsonwebtoken = sign({result:results}, "secretkey", {
                        expiresIn: "1h"
                    })
                    return res.json({
                        success: 1,
                        message: "login succesfully, Your account alredy use",
                        account: results,
                        token: jsonwebtoken

                    })
                } else {
                    return res.json({
                        success: 0,
                        mmessage: "Email or Password invalid"
                    })
                }
            })
        }
    }