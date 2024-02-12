const StudentModel = require('../model/student.model');
const GuardianModel = require('../model/guardian.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const Author = require('../model/authorModel');
// const Book = require('../model/bookModel');
exports.addStudent = async (req, res) => {
    const saltRounds = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const passwordHashed = await bcrypt.hash(req.body.password, genSalt);
    const addStudent = new StudentModel({
        "name": req.body.name,
        "rollNumber": req.body.rollNumber,
        "age": req.body.age,
        "password": passwordHashed
    })
    await addStudent.save().then(async savedStudent => {
        const guardianModel = new GuardianModel({
            "studentId": savedStudent.id,
            "fatherName": req.body.guardians.fatherName,
            "motherName": req.body.guardians.motherName,
            "mobileNumber": req.body.guardians.mobileNumber,
            "email": req.body.guardians.email,
        })
        await guardianModel.save().then(guardianModel => {
            res.status(201).json({
                "msg": "Student added successfully"
            })
        }).catch(error => {
            console.log("Error ", error)
        })
    }).catch(error => {
        console.log("Print saved error ", error)
    })
    //  StudentModel.cr
    // const student = new StudentModel({
    //     "name":req.body.name,
    //     "age":req.body.age,
    //     "division":req.body.division,
    //     "percentage":req.body.percentage
    // });

    // await student.save()
    // res.json({
    //     "msg":"Student added successfully !!!"
    // })

    // const newAuthor = new Author({
    //     name: 'J.K. Rowling',
    //     country: 'United Kingdom'
    //   });

    //   newAuthor.save().then(savedAuthor=>{
    //     console.log('Author saved:', savedAuthor);

    //     const newBook = new Book({
    //         title: 'Harry Potter and the Sorcerer\'s Stone',
    //         genre: 'Fantasy',
    //         author: savedAuthor._id // Using the _id of the saved author
    //       });

    //       newBook.save();

    //       Book.findOne({genre:"Fantasy"}).populate('author').then(result=>{
    //         console.log("Result ", result)
    //       })
    //   })

}

exports.login = async (req, res) => {
    const { rollNumber, password } = req.body;
    try {
        const isUserAvailable = await StudentModel.findOne({ rollNumber: rollNumber }, 'name rollNumber age password')
        if (!isUserAvailable) {
            return res.status(201).json({
                "msg": "Username is not available!!"
            })
        } else {
            const isPasswordMatching = await bcrypt.compare(password, isUserAvailable.password);
            if (!isPasswordMatching) {
                return res.status(201).json({
                    "msg": "Password is mismatching !!"
                })
            }

            const token = jwt.sign({ studentId: isUserAvailable.id, rollNumber: isUserAvailable.rollNumber },
                process.env.JWT_SECRET_KEY, { expiresIn: '36h' });

            let updatedUser = JSON.parse(JSON.stringify(isUserAvailable))
            delete updatedUser.password;
            return res.status(201).json({
                "msg": "Loged in successfully ",
                "token": token,
                "data": updatedUser
            })
        }
    } catch (error) {
        console.log("Error is ", error)
    }

}