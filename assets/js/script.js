console.log("LET'S ROLL!");
taskArr = []
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
    var momentString = today.concat(" ", calendarTime);
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
    }
  }
};

$(".time-block").on("click", ".description", function () {
  var text = $(this).text().trim();

  //detect placeholder text
  if (text === "Click to add/edit tasks") {
    var textInput = $("<textarea>").prop("placeholder", text);
    $(this).replaceWith(textInput);
  }
  // if not placeholder, load as text
  else {
    var textInput = $("<textarea>").text(text);
    $(this).replaceWith(textInput);
  }

  // auto focus new element
  textInput.trigger("focus");
  // };
});

$(".time-block").on("blur", "textarea", function () {
  var text = $(this).val();
  if (!text) {
    text = "Click to add/edit tasks";
  }


  var taskP = $("<p>").text(text);
  var divEl = $("<div>").addClass("description col-10 pt-2").html(taskP);

  console.log(divEl);
  $(this).replaceWith(divEl);
  auditTime();
});

//SAVE tasks function

$(".time-block").on("click", ".saveBtn", function () {
  // Get values from description elements
  taskArr = [];
  var descriptions = $(".description p");

  for (i = 0; i < descriptions.length; i++) {
    var descEl = descriptions[i];
    var description = descEl.innerText;

    taskArr.push(description);
  }
  console.log(taskArr);

  localStorage.setItem("tasks", JSON.stringify(taskArr));
});



var loadTasks = function () {
  taskArr = JSON.parse(localStorage.getItem("tasks"));
  // if nothing in localStorage, create a new array
  if (!taskArr) {
    var taskArr = [];
    auditTime();
    return;
  } else {
    var descriptions = $(".description p")
    for (i = 0; i < taskArr.length; i++) {
      text = taskArr[i];
      var description = descriptions[i];
      $(description).text(text)
    //   var divEl = $("<div>").addClass("description col-10 pt-2").html(taskP);
    //   console.log(divEl);
    //     var descriptions = $(".description p")
    //     var descEL = descriptions[i];
    //     descEL.replaceWith(divEl);
    }
  }
  auditTime();
};
loadTasks();
