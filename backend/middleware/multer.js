const multer = require("multer");
const path = require('path')
const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only .pdf, .jpg, .jpeg, .png, .doc, .docx files are allowed"),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 5 * 1024 * 1024, // 5 MB limit 
  // },
});

module.exports = upload;
