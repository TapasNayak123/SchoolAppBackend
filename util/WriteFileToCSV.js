const EventEmitter = require('events');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const eventHandler = new EventEmitter();

eventHandler.on('onWriteData', (data)=>{
  prepareDataForWritingtoCSV(data)
 
})

function prepareDataForWritingtoCSV(data) {
  const {subjects, totalMarksObtained, maxTotalMark, percentage, division} = data;

  //  console.log("subjects ", subjects)
  // console.log("totalMarksObtained ", totalMarksObtained)
  // console.log("maxTotalMark ", maxTotalMark)
  // console.log("percentage ", percentage)
  // console.log("division ", division)

  const csvWriter = createCsvWriter({
    path: path.resolve( __dirname, 'marksheet.csv'),
    header: [
      {id: 'name', title: 'Subjects'},
      {id: 'marksObtained', title: 'MarksObtained'},
      {id: 'maxMark', title: 'MaxMark'}
    ]
  });

  const dataToAdd =[]
  subjects.forEach(element => {   
    let modifiedData = JSON.parse(JSON.stringify(element))
    delete modifiedData._id;
    dataToAdd.push(modifiedData);    
  });
  csvWriter.writeRecords(dataToAdd).then(() => {
    console.log('Done!');
  });
}

module.exports = eventHandler;