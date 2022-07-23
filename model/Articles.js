const db = require ("../helper/db_connection");
const fs = require ('fs')
module.exports = {
    get: (req, res) => {
      return new Promise((resolve, reject) => {
    
        // const limit = req.query.limit
        const {limit=7, page=1, sortby=`categories_id`, order=`desc`, categories} = req.query
        // const page  = req.query.page
        // console.log (req.query.page)
        const offset = (page - 1) * limit;
        const sql = `SELECT * FROM articles LEFT JOIN categories on articles.categories_id = categories.categories_id
                     ${categories ? `WHERE articles.categories_id = ${categories}` : "" }
                     ORDER BY articles.${sortby} ${order} LIMIT ${limit} OFFSET ${offset}`
        // console.log (req.query) 
        db.query(sql, (err, results) => {
          // console.log (results)
          if (err) {
            console.log(err)
            reject({
              message: "Something wrong",
            });
          } else {
            db.query(`SELECT article_id from articles`, (err, result) => {
              if(err) {
                console.log(err)
                reject({
                  message: "Something wrong"
                })
              } else {
                totalPage = Math.ceil(result.length/limit)
                if(page > totalPage) {
                  reject({
                    message: "Page not found!",
                    status: 404,
                    data: []
                  })
                }
                resolve({
                  message: "Get All From Article Success",
                  status: 200,
                  data: {
                    totalRow: results.length,
                    totalPage: totalPage,
                    results: results
                  },
                });
              }
            })
              }
        });
      });
    },

    getByID : function (req,res){
      return new Promise ((resolve,reject)=>{
       db.query (`SELECT * FROM articles WHERE article_id = "${req.params.id}"`, (err,results)=>{
      //  console.log ("get by id ")
        if(err){
           reject ({
        massage : "something wrong",
        status : 500
           })
        }
        if (!results) {
           reject ({
        massage : "article not found",
        status : 500		    
            })
        }
        resolve ({
         massage :"success",
         status: 200,
         data :results
    
          })
    
    })
    
    })
    },

    add: (req, res) => {
      return new Promise((resolve, reject) => {
        const {
          title,
          categories_id,
          content,
          cover,
        } = req.body;
        console.log (req.body)
        db.query(
          `INSERT INTO articles (title, categories_id, content, cover) VALUES('${title}', '${categories_id}', '${content}', '${cover}')`,
          (err, results) => {
            if (err) {
              console.log(err);
              reject({ message: "Added Data Error" });
            }
            resolve({
              message: "Add New Article Success",
              status: 200,
              data: {
                id: results.insertId,
                ...req.body,
              },
            });
          }
        );
      });
    },
    update: (req, res) => {
      return new Promise((resolve, reject) => {
        const {article_id } = req.params;
        db.query(`SELECT * FROM articles where article_id=${article_id}`, (err, results) => {
          if (err) {
            res.send({ message: "Something wrong" });
          }
         
          const previousData = {
            ...results[0],
            ...req.body,
          };
          const {
            title,
            categories_id,
            content,
            cover,
          } = previousData;
          const tempImg = results[0].cover
          
          if (req.body.cover) {
            fs.unlink(`uploads/${tempImg}`, function (err){
              if(err){
                console.log(err)
                resolve({
                  message: "Update Article Success",
                  status: 200,
                  data: results,
                });
              }
            })
          }
           
          
         
          db.query(
              `UPDATE articles SET title='${title}', categories_id='${categories_id}',content='${content}', cover='${cover}' WHERE article_id='${article_id}'`,
              (err, results) => {
                if (err) {
                  console.log(err);
                  reject({ message: "Something wrong" });
                }
                resolve({
                  message: "Update Article Success",
                  status: 200,
                  data: results,
                });
            }
          );
        });
      });
    },
   remove: (req, res) => {
    
      // delete done
      return new Promise((resolve, reject) => {
        const { article_id } = req.params;
        console.log (article_id)
        db.query(`SELECT cover FROM articles WHERE article_id=${article_id}`, (err, results) => {
          if(!results?.length){
            reject({ message: "Data id not found" });
          }else{
            const tempImg = results[0].cover
            db.query(
              `DELETE FROM articles WHERE article_id=${article_id}`,
              (err, results) => {
                if (err) {
                  console.log(err);
                  reject({ message: "Something wrong" });
                }
                fs.unlink(`uploads/${tempImg}`, function (err){
                  if(err){
                    resolve({
                      message: "Delete Article Success",
                      status: 200,
                      data: results,
                    });
                  }
                  resolve({
                    message: "Delete Article Success",
                    status: 200,
                    data: results,
                  });
                })
              }
            );
          }
        })
        
      });
    },
  };