const db = require("../helper/db_connection");
const fs = require("fs")

module.exports = {
  get: (req, res) => { // get done
    return new Promise((resolve, reject) => {
      //   const { title = "", director = "" } = req.query;
      const sql = `SELECT * FROM categories`;
      db.query(sql, (err, results) => {
        if (err) {
          reject({
            message: "Something wrong",
          });
        }
        resolve({
          message: "Get all from categories success",
          status: 200,
          data: results,
        });
      });
    });
  },
  getId: (req, res) => { // get done
    return new Promise((resolve, reject) => {
        const {categories_id} = req.params;
        console.log(categories_id)
      const sql = `SELECT * FROM categories WHERE categories_id =${categories_id}`;
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({
            message: "Something wrong",
          });
        }
        resolve({
          message: "Get all from categories success",
          status: 200,
          data: results,
        });
      });
    });
  },
  add: (req, res) => { // add done
    return new Promise((resolve, reject) => {
      const { categories_name, cover } = req.body;
      const sql = `INSERT INTO categories(categories_name, cover) VALUES ('${categories_name}', '${cover}')`;
      
      db.query(sql, (err, results) => {
        console.log(results, "TEST")
        if (err) {
          console.log(err);
          reject({ message: "Something error" });
        }
        resolve({
          message: "Add new Article success",
          status: 200,
          data: {
            id: results.insertId,
            ...req.body,
          },
        });
      });
    });
  },
  update: (req, res) => { // update done
    return new Promise((resolve, reject) => {
      const { categories_id } = req.params;
      db.query(`SELECT * FROM categories WHERE categories_id=${categories_id}`, (err, results) => {
        if (err) {
          res.send({ message: "Something error" });
        }

        const previousData = {
          ...results[0],
          ...req.body,
        };
        const {
          categories_name,
          cover
        } = previousData;

        db.query(
        `UPDATE categories SET categories_name='${categories_name}', cover='${cover}' WHERE categories_id='${categories_id}'`,
          (err, results) => {
            if (err) {
              console.log(err);
              reject({ message: "Something wrong" });
            }
            resolve({
              message: "Update Article success",
              status: 200,
              data: results,
            });
          }
        );
      });
    });
  },
  remove: (req, res) => { // delete done
    return new Promise((resolve, reject) => {
      const { categories_id } = req.params;
      db.query(`SELECT * from categories WHERE categories_id=${categories_id}`, (err,results) => {
        
        if(!results) {
          reject({ 
            message: "Server Error",
            status: 500,
          }
          )
        }
        if(results?.length === 0) {
          reject(
            { message: "data not found",
              status: 400,
              data: []
          });
        } else {
          const tempImg = results[0].cover
          db.query(`DELETE FROM categories WHERE categories_id=${categories_id}`, (err, results) => {
            
            if (err) {
              reject({ message: "Something wrong" });
            }
            fs.unlink(`uploads/${tempImg}`, (err,results) => {})
            resolve({
              message: "Delete categories success",
              status: 200,
              data: results,
            });
          });
        }

      })
      
    });
  },
};