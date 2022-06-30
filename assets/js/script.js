console.log("LET'S ROLL!");

// Initialize task array
taskArr = [];

// get time and display in header
var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);

// function to color code workday hours
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

// event listener plus function to allow task inputs in the timeblocks
$(".time-block").on("click", ".description", function () {
  var text = $(this).text().trim();

  //detect placeholder text
  if (text === "Click to add/edit tasks") {
    var textInput = $("<textarea>").prop("placeholder", text);

    // added id attribute to resolve blur/cleck conflict
    textInput = textInput.addClass("description").attr("id", "texty");
    $(this).replaceWith(textInput);
  }
  // if not placeholder, load as text
  else {
    var textInput = $("<textarea>")
      .text(text)
      .addClass("description")
      .attr("id", "texty");
    textInput = textInput.addClass("description");
    $(this).replaceWith(textInput);
  }
  // auto focus new element
  textInput.trigger("focus");
});

$(".time-block").on("blur", "textarea", function () {
  var text = $(this).val();
  
  //check to see if input, if not, return placeholder text
  if (!text) {
    text = "Click to add/edit tasks";
  }

  // re-build p element for timeblocks
  var taskP = $("<p>").text(text);
  var divEl = $("<div>").addClass("description col-10 pt-2").html(taskP);
  $(this).replaceWith(divEl);
  auditTime();
});

//SAVE tasks function

var saveTasks = function () {
  // Get values from description elements
  taskArr = [];
  // save multiple elems as jQuery obj
  var descriptions = $(".description");

  for (i = 0; i < descriptions.length; i++) {
    //parse into separate elements
    var descEl = descriptions[i];
    var description = descEl.innerText;
    // to check if save was initiated on blur event, live-textarea
    if (!description) {
      description = $("#texty").val();
    }
    taskArr.push(description);
  }
  localStorage.setItem("tasks", JSON.stringify(taskArr));
};

// event listener for saveTasks function
$(".time-block").on("mousedown", ".saveBtn", saveTasks);

// load on startup
var loadTasks = function () {
  taskArr = JSON.parse(localStorage.getItem("tasks"));
  // if nothing in localStorage, create a new array
  if (!taskArr) {
    var taskArr = [];
    var descriptions = $(".description");
    for (i = 0; i < 9; i++) {
      var text = "Click to add/edit tasks";
      var pEl = $("<p>").text(text);
      var description = descriptions[i];
      $(description).html(pEl);
    }
  } else {
    var descriptions = $(".description p");
    for (i = 0; i < taskArr.length; i++) {
      text = taskArr[i];
      var description = descriptions[i];
      $(description).text(text);
    }
  }
  auditTime();
};
loadTasks();
