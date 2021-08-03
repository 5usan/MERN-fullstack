const multer = require('multer'); //package

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')  //null means bug free
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname) //filename is set according to date
  }
});

var upload = multer({storage: storage});

module.exports = {upload};