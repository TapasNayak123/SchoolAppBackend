const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const { storage } = require('./storage/storage');
const studentRouter = require('./routes/student.route');
const marksRouter = require('./routes/marks.route');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
// const imageStorage = multer.diskStorage({ 
//     destination: 'images', 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() 
//              + path.extname(file.originalname))
//             // file.fieldname is name of the field (image)
//             // path.extname get the uploaded file extension
//     }
// });

const imageUpload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

app.use(imageUpload.single('image'));

app.use('/student', studentRouter);
app.use('/marks', marksRouter);



mongoose.connect('mongodb+srv://admin:0B2aN7ZV2AT0lUq9@cluster0.uwxtpe0.mongodb.net/School?retryWrites=true&w=majority').then(result => {
    app.listen(3000, () => {
        console.log("App starts listen on ", 3000)
    })
}).catch(error => {
    console.log("Database connection error ", error)
})

