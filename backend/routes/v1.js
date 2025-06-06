const express = require("express");
const swaggerUi = require("swagger-ui-express"    );
const app = express();

// Controllers
const contact = require("../controller/contactus");
const opening = require("../controller/opening");
const openingapply = require("../controller/oppeningapply");
const work = require("../controller/work");
const createBlog = require("../controller/blog");
//multer
const upload = require("../middleware/multer");


//swagger-ui

const swaggerDocument = require('./view/swagger.json');
app.use('/swagger', swaggerUi.serve);
app.get('/swagger', swaggerUi.setup(swaggerDocument));
//Routes
// Contact Routes
app.post("/contact", contact.Contactus);
app.get("/contactdata", contact.contactData);

// Opening Routes
app.post("/opening", opening.createOpening);
app.get("/openingdata", opening.openingData);

// Openingapply Routes
app.post("/apply", upload.single("resume"), openingapply.applyToOpening);
app.get("/applydata", openingapply.applyData);

//our project
app.post("/work", upload.single("image"), work.creatework);
app.get("/workdata", work.workdata);

// Blog
app.post(
  "/blogdetails",
  upload.fields([
    { name: "banner_images", maxCount: 1 },
    { name: "blog_imaage", maxCount: 8 },
  ]),
  createBlog.createblog
);
app.post("/blog", upload.single("blog_image"), createBlog.blogs);
app.get("/blogdata/:id", createBlog.getdetailsblog);
module.exports = app;
