var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'newproject_db'
});

connection.connect(function(err){
  if(!err){
    console.log("database is connected");
  } else {
    console.log("error connecting database");
  }
});

// product start

router.get('/get-all-product-api',function(req, res, next ){
  
  connection.query("select * from  tbl_product", function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      if(rows && rows.length>0){
        count = rows.length;
        console.log(rows);
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
      } else {
        res.send(JSON.stringify({"status": 200,"flag": 0, "message": "No Recoreds Found"}));
      }
    }
  })
});

router.get('/get-product-api/:id',function(req, res, next ){

  var id = req.params.id;
  console.log("Parameter Value" + id );
  
  connection.query("select * from tbl_product where product_id = ?", [id], function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      console.log(rows);
      if(Object.keys(rows).length !== 0){
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
      } else {
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data not found"}));
      }      
    }
  })
});

router.post('/add-product-api', function (req, res, next){
  //console.log("Body Data" + req.body);
  const mybodydata = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_image: req.body.product_image,
    category_id: req.body.category_id,
  }
  connection.query("insert into tbl_product set ?", mybodydata, function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.put('/update-product-api/:id', function (req, res, next){
  console.log("Parameter ID" + req.params.id);

  var product_id = req.params.id;
  var product_name = req.body.product_name;
  var product_price = req.body.product_price;
  var product_image = req.body.product_image;
  var category_id = req.body.category_id;

  connection.query("update tbl_product set product_name = ?,product_price = ?, product_image = ?, category_id = ? where product_id = ? ", [product_name, product_price, product_image, category_id, product_id], function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.delete('/delete-product-api/:id', function (req, res, next){
  var deleteid = req.params.id;
  console.log(`Parameter value is ${deleteid}`);
  connection.query("delete from tbl_product where product_id = ? ", [deleteid], function (err, rows){
    if(err){
      res.status(500).send(JSON.stringify({"status": 500, "flag": 0, "message": "Error", "Data": err}));
    } else {
      if(rows && rows.affectedRows > 0){
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data deleted", "Data": rows.affectedRows}));
      } else {
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data not found"}));
      }
    }
  })
});

//category start

router.get('/get-all-category-api',function(req, res, next ){
  
  connection.query("select * from  tbl_category", function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      if(rows && rows.length>0){
        count = rows.length;
        console.log(rows);
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
      } else {
        res.send(JSON.stringify({"status": 200,"flag": 0, "message": "No Recoreds Found"}));
      }
    }
  })
});

router.get('/get-category-api/:id',function(req, res, next ){

  var id = req.params.id;
  console.log("Parameter Value" + id );
  
  connection.query("select * from tbl_category where category_id = ?", [id], function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      console.log(rows);
      if(Object.keys(rows).length !== 0){
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
      } else {
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data not found"}));
      }      
    }
  })
});

router.post('/add-category-api', function (req, res, next){
  //console.log("Body Data" + req.body);
  const mybodydata = {
    category_name: req.body.category_name,
  }
  connection.query("insert into tbl_category set ?", mybodydata, function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.put('/update-category-api/:id', function (req, res, next){
  console.log("Parameter ID" + req.params.id);

  var category_id = req.params.id;
  var category_name = req.body.category_name;
  
  connection.query("update tbl_category set category_name = ? where category_id = ? ", [category_name, category_id], function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Updateed", "data": ''}));
    }
  })
});

router.delete('/delete-category-api/:id', function (req, res, next){
  var deleteid = req.params.id;
  console.log(`Parameter value is ${deleteid}`);
  connection.query("delete from tbl_category where category_id = ? ", [deleteid], function (err, rows){
    if(err){
      res.status(500).send(JSON.stringify({"status": 500, "flag": 0, "message": "Error", "Data": err}));
    } else {
      if(rows && rows.affectedRows > 0){
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data deleted", "Data": rows.affectedRows}));
      } else {
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data not found"}));
      }
    }
  })
});

//user start

router.get('/get-all-user-api',function(req, res, next ){
  
  connection.query("select * from tbl_user", function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      if(rows && rows.length>0){
        count = rows.length;
        console.log(rows);
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
      } else {
        res.send(JSON.stringify({"status": 200,"flag": 0, "message": "No Recoreds Found"}));
      }
    }
  })
});

router.get('/get-all-user-api/:id',function(req, res, next ){

  var id = req.params.id;
  console.log("Parameter Value" + id );
  
  connection.query("select * from tbl_user where user_id = ?", [id], function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      console.log(rows);
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
    }
  })
});

router.post('/add-user-api', function (req, res, next){
  //console.log("Body Data" + req.body);
  const mybodydata = {
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_address: req.body.user_address,
  }
  connection.query("insert into tbl_user set ?", mybodydata, function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.put('/update-user-api/:id', function (req, res, next){
  console.log("Parameter ID" + req.params.id);

  var user_id = req.params.id;
  var user_name = req.body.user_name;
  var user_gender = req.body.user_gender;
  var user_email = req.body.user_email;
  var user_address = req.body.user_address;
  var user_password = req.body.user_password;
  
  connection.query("update tbl_user set user_name = ?,user_gender = ?, user_email = ?, user_address = ?,user_password = ? where user_id = ? ", [user_name, user_gender, user_email, user_address, user_password, user_id], function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.delete('/delete-user-api/:id', function (req, res, next){
  var deleteid = req.params.id;
  console.log(`Parameter value is ${deleteid}`);
  connection.query("delete from tbl_user where user_id = ? ", [deleteid], function (err, rows){
    if(err){
      res.status(500).send(JSON.stringify({"status": 500, "flag": 0, "message": "Error", "Data": err}));
    } else {
      if(rows && rows.affectedRows > 0){
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data deleted", "Data": rows.affectedRows}));
      } else {
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data not found"}));
      }
    }
  })
});

//admin start

router.get('/get-all-admin-api',function(req, res, next ){
  
  connection.query("select * from tbl_admin", function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      if(rows && rows.length>0){
        count = rows.length;
        console.log(rows);
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
      } else {
        res.send(JSON.stringify({"status": 200,"flag": 0, "message": "No Recoreds Found"}));
      }
    }
  })
});

router.get('/get-all-admin-api/:id',function(req, res, next ){

  var id = req.params.id;
  console.log("Parameter Value" + id );
  
  connection.query("select * from tbl_admin where admin_id = ?", [id], function(err, rows) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      console.log(rows);
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": rows}));
    }
  })
});

router.post('/add-admin-api', function (req, res, next){
  //console.log("Body Data" + req.body);
  const mybodydata = {
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_password: req.body.admin_password,
  }
  connection.query("insert into tbl_admin set ?", mybodydata, function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.put('/update-admin-api/:id', function (req, res, next){
  console.log("Parameter ID" + req.params.id);

  var admin_id = req.params.id;
  var admin_name = req.body.admin_name;
  var admin_email = req.body.admin_email;
  var admin_password = req.body.admin_password;
  
  connection.query("update tbl_admin set admin_name = ?, admin_email = ?, admin_password = ? where admin_id = ? ", [admin_name, admin_email, admin_password, admin_id], function(err, result) {
    if(err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
    } else {
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Added", "data": ''}));
    }
  })
});

router.delete('/delete-admin-api/:id', function (req, res, next){
  var deleteid = req.params.id;
  console.log(`Parameter value is ${deleteid}`);
  connection.query("delete from tbl_admin where admin_id = ? ", [deleteid], function (err, rows){
    if(err){
      res.status(500).send(JSON.stringify({"status": 500, "flag": 0, "message": "Error", "Data": err}));
    } else {
      if(rows && rows.affectedRows > 0){
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data deleted", "Data": rows.affectedRows}));
      } else {
        res.status(200).send(JSON.stringify({"status": 200, "flag": 1, "message": "Data not found"}));
      }
    }
  })
});

module.exports = router;

