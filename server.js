const express = require("express");
const next = require("next");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const multer = require("multer");
const path=require("path");
const dotenv=require('dotenv');
dotenv.config();



const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'images/')
  },
  filename:function(req,file,cb){
     cb(null,file.fieldname + '-' +  Date.now() + '-' + file.originalname);
}
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      //reject file
      cb({message: 'Unsupported file format'}, false)
  }
}

const upload =multer({
  storage:storage,
  fileFilter: fileFilter
});

// const storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,'images/')
//   },
//   filename:function(req,file,cb){
//      cb(null,file.fieldname + '-' +  Date.now() + '-' + file.originalname);
// }
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true)
//   } else {
//       //reject file
//       cb({message: 'Unsupported file format'}, false)
//   }
// }

// const upload =multer({
//   storage:storage,
//   fileFilter: fileFilter
// });

app
  .prepare()
  .then(() => {
    const app = express();
    const http = require("http");
    const server = http.createServer(app);
    require("dotenv").config();

    const errorHandler = require("./api/middleware/error-handler");
    const errorMessage = require("./api//middleware/error-message");
    const accessControls = require("./api//middleware/access-controls");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const bodyParser = require("body-parser");
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());

    // for parsing multipart/form-data
    app.use(upload.array('myImage'));
    app.use(express.static("public"));

    // connection to mongoose
    const mongoCon = process.env.mongoCon;

    const connect = async function() {
      return mongoose.connect(mongoCon, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
    };

    (async () => {
      try {
        const connected = await connect();
      } catch (e) {
        console.log("Error happend while connecting to the DB: ", e.message);
      }
    })();
    const fs = require("fs");
    fs.readdirSync(__dirname + "/api/models").forEach(function(file) {
      require(__dirname + "/api/models/" + file);
    });
    // var key = fs.readFileSync('./new/one.txt');
    // var cert = fs.readFileSync( './new/two.txt' );
    // var ca = fs.readFileSync( './new/three.txt' );
    // console.log("key",key);
    // console.log("cert",cert);
    // console.log("ca",ca);


    // in case you want to serve images
    app.use(express.static("public"));

    app.get("/api", function(req, res) {
      res.status(200).send({
        message: "Express backend server"
      });
    });

    app.set("port", process.env.PORT);

    app.use(cors());
    app.use(accessControls);

    const UsersRoutes = require("./api/routes/users.routes");
    const ProductsRoutes = require("./api/routes/products.routes");
    const SliderRoutes = require("./api/routes/sliders.routes");
    // const Orders_Routes = require("./api/routes/orders.routes");


    app.use("/api/users", UsersRoutes);
    app.use("/api/products", ProductsRoutes);
    app.use("/api/sliders", SliderRoutes);
    // app.use("/api/orders", Orders_Routes);

    
    app.get("*", (req, res) => {
      return handle(req, res);
    });
   




   
    app.set("port", process.env.PORT);
    server.listen(app.get("port"));
    console.log("listening on port", app.get("port"));
  })
  .catch(ex => {
    console.error(ex.stack);
  });
