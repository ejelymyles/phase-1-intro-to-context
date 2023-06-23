// Your code here

let singleEmployeeArray = [first, last, role, pay]

function createEmployeeRecord (singleEmployeeArray){
    let employeeRecordObject = {
        firstName: singleEmployeeArray[0],
        familyName: singleEmployeeArray[1],
        title: singleEmployeeArray[2],
        payPerHour: singleEmployeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
 return employeeRecordObject;
}

function createEmployeeRecords (arrayOfEmployees){
   let newRecords = arrayOfEmployees.map(createEmployeeRecord);
   return newRecords;
}


function createTimeInEvent(employeeRecord, dateStamp){
   //let [date, hour] = dateStamp.split(" ");
    //let hours = hour.substring(0, 2);
    let date = dateStamp.slice(0, 10);
   let hour = dateStamp.slice(10);

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    //let [date, hour] = dateStamp.split(" ");
    //let hours = hour.substring(0, 2);
    let date = dateStamp.slice(0, 10);
   let hour = dateStamp.slice(10);

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let hoursWorked = 0;
  
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateStamp);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateStamp);
  
    if (timeInEvent && timeOutEvent) {
      const timeIn = Math.floor(timeInEvent.hour / 100)
      const timeOut = Math.floor(timeOutEvent.hour / 100)
  
      hoursWorked = timeOut - timeIn;
    }
  
    return hoursWorked;
  }
  

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  function allWagesFor (employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages
  }

  function calculatePayroll(employeeRecords){
    const totalPayroll = employeeRecords.reduce((total, employee) => {
        const employeeWages = allWagesFor(employee);
        return total + employeeWages;
    },0);
    return totalPayroll
  }