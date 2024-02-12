const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MarksSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    subjects: [{
        name: {
            type: String
        },
        marksObtained: {
            type: Number
        },
        maxMark: {
            type: Number
        }
    }],
    totalMarksObtained: {
        type: Number
    },
    maxTotalMark: {
        type: Number
    },
    percentage: {
        type: Number
    },
    division: {
        type: String
    }
});

MarksSchema.pre('save', function(next){
    let totalMarksObtained = 0;
    let totalMaxMarks = 0;  

    this.subjects.forEach(subject=>{
        totalMarksObtained += subject.marksObtained;
        totalMaxMarks += subject.maxMark;
    })
    let calculatePercantage = (totalMarksObtained/totalMaxMarks) *100;
    this.totalMarksObtained = totalMarksObtained;
    this.maxTotalMark = totalMaxMarks;
    this.percentage = calculatePercantage;
    let division = "";
    if(Math.floor(this.percentage)>=60) {
        division = "First"
    }else if(Math.floor(this.percentage)>=50){
        division = "Second"
    }else if(Math.floor(this.percentage)>=40) {
        division = "Third"
    }else {
        division = "Fail"
    }
    this.division = division;   
    next();

})

module.exports = mongoose.model('Marks', MarksSchema);