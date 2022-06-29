console.log("LET'S ROLL!");

// get time and display in header
var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);

// var saveTasks = function() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   };


var auditTime = function () {

  // get time text from hour classes
  var times = $(".hour");
  var timeNow = moment().format("ha");
// loop through hour classes and format corresponding description classes
  for (i = 0; i < times.length; i++) {
    // isolate .hour elements
    var calEl = times[i];
    var calendarTime = calEl.innerText;
    // concatenate time with date to create a valid moment input
    var momentString = today.concat(" ", calendarTime)
    //parse momentString as moment object
    var calMoment = moment(momentString, "dddd, MMMM Do YYYY ha");
    // remove tense classes and compare calendar
    $(calEl).next().removeClass("past present future");

    if (timeNow === calendarTime) {
        $(calEl).next().addClass("present");
    } else if (calMoment.isBefore()) {
        $(calEl).next().addClass("past");
    } else {
        $(calEl).next().addClass("future");
    };
  }

};

$(".time-block").on("click", ".description", function() {
     var text = $(this)
 .text()
 .trim();
    
    if (!(this).innerText) {
        var textInput = $("<textarea>").val(text);
        $(this).append(textInput);
      
        // auto focus new element
        textInput.trigger("focus");
};



});

auditTime();
