const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const [name, extension] = file.originalname.split(".");
    const uniqueName = `${name}_${Date.now()}.${extension}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  try {
    const supportedTypes = ["image/jpg", "image/png", "image/JPG", "image/PNG"];
    if (supportedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error) {
    cb(error);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload;
