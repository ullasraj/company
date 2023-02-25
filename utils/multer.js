const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "uploads");
  },
  filename: (req, file, next) => {
    next(null, Date.now() + path.extname(file.originalname));
  },
});

exports.uploadImage = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, next) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return next(null, true);
    }
    next("give proper file format to upload");
  },
}).single("image");
