console.log("LET'S ROLL!");

var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);

// var saveTasks = function() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   };

var auditTime = function () {
  // get date from task element
  var times = $(".hour");
  var timeNow = moment().format("ha");

  for (i = 0; i < times.length; i++) {
    var calEl = times[i];
    console.log("+++++");
    var calendarTime = calEl.innerText;
    //remove color class
    // var nextDiv = calEl.closest(".row").find(".description")
    var timeNowMoment = moment().format("dddd, MMMM Do YYYY ha");
    var momentString = today.concat(" ", calendarTime)
    var calMoment = moment(momentString, "dddd, MMMM Do YYYY ha");
    console.log(timeNowMoment);
    console.log(momentString);
    $(calEl).next().removeClass("past present future");
    if (timeNow === calendarTime) {
        $(calEl).next().addClass("present");
    } else if (calMoment.isBefore()){
        $(calEl).next().addClass("past");
    } else {
        $(calEl).next().addClass("future");
    };


  }
  //.find("span").text().trim();
};
auditTime();


//   // convert to moment object at 5:00pm
//   var time = moment(date, "L").set("hour", 17);

//   console.log(time);

//   // remove any old classes from element
//   $(taskEl).removeClass("list-group-item-warning list-group-item-danger");

//   // apply new class if task is near/over due date
//   if (moment().isAfter(time)) {
//     $(taskEl).addClass("list-group-item-danger");
//   } else if (Math.abs(moment().diff(time, "days")) <= 2) {
//     $(taskEl).addClass("list-group-item-warning");
//   }
