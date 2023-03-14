let autoUpdateTimer;

$(document).ready(function () {
  // Get current date using Moment.js
  let currentDate = moment().format("dddd, MMMM Do YYYY");
  $('#currentDay').text(currentDate);

  // Create time blocks for each hour of the day and append to .container div
  for (let i = 9; i <= 17; i++) {
    let $timeBlock = generateTimeBlock(i);
    $('.container').append($timeBlock);
  }

  // Find the textarea within the clicked time block and give it focus
$(".time-block").on("click", function(event) {
  $(event.currentTarget).find("textarea").focus();
});

updateScheduleView();

// Update the row color based on past, present, and future time
function updateScheduleView() {
  var currentTime = moment();

  $(".time-block").each(function () {
    var blockTime = moment($(this).children(".hour").text(), ["H:mm"]);

    if (blockTime.isBefore(currentTime, "hour")) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockTime.isSame(currentTime, "hour")) {                
      $(this).removeClass("past future").addClass("present");
    } else {         
      $(this).removeClass("past present").addClass("future");
    }
  });
}

 // If the timer is not already set up, start it
 if (!autoUpdateTimer) {
  startAutoUpdate();
}
})

function startAutoUpdate() {
  clearInterval(autoUpdateTimer);
  autoUpdateTimer = setInterval(function() {
    updateScheduleView();
  }, 60 * 1000); // Update every minute (60 seconds times 1000 milliseconds)
}


$("body").on("click", ".saveBtn", function() {
  let text = $(this).siblings(".description").val().trim();
  let hour = +$(this).siblings(".hour").data("hour");
  const messageDelay = 5000;

  if (text !== "" && !isNaN(hour) && hour >= 0 && hour <= 23) {
    const eventData = { hour, text };
    localStorage.setItem(hour, JSON.stringify(eventData));
    $('#header-message').text('Data has been saved.');
    setTimeout(() => $('#header-message').text(''), messageDelay);
    updateScheduleView();
    startAutoUpdate();
  } else {
    alert('Invalid input!');
  }
});

function generateTimeBlock(hour) {
  let $timeBlock = $('<div class="row time-block">');
  let formattedHour = moment({ hour: hour }).format("H:mm");
  let $hourCol = $(`<div class="hour col-2" data-hour="${hour}">${formattedHour}</div>`);
  let data = localStorage.getItem(formattedHour);
  let $descriptionCol = $('<textarea class="col-8 description"></textarea>').val(data);
  let $saveBtnCol = $('<button class="saveBtn col-2"><i class="fas fa-save"></i></button>');

  return $timeBlock.append($hourCol, $descriptionCol, $saveBtnCol);
}
