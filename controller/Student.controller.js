const StudentModel = require('../model/student.model');
const GuardianModel = require('../model/guardian.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addStudent = async (req, res) => {
    try {
        const reqBody = JSON.parse(req.body.data)
        // const reqBody = req.body
        const saltRounds = 10;
        const genSalt = await bcrypt.genSalt(saltRounds);
        const passwordHashed = await bcrypt.hash(reqBody.password, genSalt);
        const addStudent = new StudentModel({
            "avatar": req.file.path,
            "name": reqBody.name,
            "rollNumber": reqBody.rollNumber,
            "age": reqBody.age,
            "password": passwordHashed
        })
        await addStudent.save().then(async savedStudent => {
            const guardianModel = new GuardianModel({
                "studentId": savedStudent.id,
                "fatherName": reqBody.guardians.fatherName,
                "motherName": reqBody.guardians.motherName,
                "mobileNumber": reqBody.guardians.mobileNumber,
                "email": reqBody.guardians.email,
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

    } catch (error) {
        console.log("Error is ", error)
    }


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