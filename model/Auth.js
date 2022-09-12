const db = require("../helper/db_connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// const {useError} = require('../helper/message')
// const {error} = require('../helper/message')

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    return new Promise((resolve, reject) => {
        // console.log (req.body)
      db.query(
        `SELECT userID, password, role FROM users WHERE email='${email.toLowerCase()}'`,
        (err, results) => {
            // console.log (results)
          if (err) {
            console.log(err)
            reject({ message: "Something Wrong" });
          }else {
            if(!results.length) {
              reject({message: "Email/Password Salah."})
            }else {
              bcrypt.compare(password, results[0].password, (errHashing, successHashing) => {
                if(errHashing) 
                  {reject({message: "Ada Masalah Saat Login, Harap coba lagi."})} //bycript error
                if(successHashing) 
                  {const token = 
                      jwt.sign({ user_id: results[0].userID, role : results[0].role}, process.env.JWT_SECRET_KEY, {expiresIn: '1 day' });
                  // console.log(process.env.JWT_SECRET_KEY)
                  resolve({
                    message: "login success",
                    status: 200,
                    data: {
                      token,
                      user_id: results[0].userID
                    },
                  });
                }else {reject({message: "Email/Password Salah."})}
              });
            }
          }
        }
      );
    });
  },
  register: (req, res) => {
    const { email, password, phoneNumber, username, name} = req.body;
    return new Promise((resolve, reject) => {
      // if(req.body.role) {
      //   resolve({
      //     message: "hayo mau ngapain"
      //   })
      // }
      bcrypt.hash(password, 10, function (err, password) {
        if (err) {
          console.log(err)
          reject({ message: "ada error" });
        } else {
          db.query(
            `INSERT INTO users(email, password, phoneNumber, username, name) VALUES( 
            '${email}','${password}','${phoneNumber}', '${username}', '${name}')`,
            (err, results) => {
              if (err) {

                if(err.code === 'ER_DUP_ENRTY') {
                  reject({
                    message: 'Maaf Email sudah ada',
                    status: 400,
                    detail: err
                  });  
                }
                reject({
                  message: 'Ada Error',
                  status: 500,
                  detail: err
                });
              }
              resolve({
                message: "register success",
                status: 201,
                data: results,
              });
            }
          );
        }
      });
    });
  },
};