const db = require("../../config/connection")

module.exports = {
    serviceAddUser: (data, callBack) => {
        db.query(
            'insert into registration (firstName, lastName, gender, email, password, number) values (?,?,?,?,?,?)',
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error)
                }else{
                    return callBack(null, result)
                }
            }
        )
    },
    serviceGetUsers: callBack => {
        db.query(
            'select * from registration',
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetUserById: (id, callBack) => {
        db.query(
            'select*from registration where id = ?',
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    },
    serviceUpdateUser: (data, callBack) => {
        db.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceDeleteUser: (data, callBack) => {
        db.query(
            'delete from registration where id=?',
            [data.id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetUserbyEmail: (email, callBack) =>{
        db.query(
            'select firstName, email, password from registration where email=?',
            [email],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results[0])
                }
            }
        )
    }
}