$(document).ready(function() {

  // Get current date using Moment.js
  let currentDate = moment().format("dddd, MMMM Do YYYY");
  
  // Set text of #currentDay element to currentDate
  $('#currentDay').text(currentDate);

for (let i = 9; i <= 17; i++) {
  let hour = i;
  let $timeBlock = $('<div class="row time-block">');
  let $hourCol = $(`<div class="hour col-2">${hour}:00</div>`);
  let $descriptionCol = $('<textarea class="col-8 description"></textarea>');
  let $saveBtnCol = $('<button class="saveBtn col-2"><i class="fas fa-save"></i></button>');

  $timeBlock.append($hourCol, $descriptionCol, $saveBtnCol);
  $('.container').append($timeBlock);
}


  $(".time-block").on("click", function() {
    // Find the textarea within the clicked time block and give it focus
    $(this).find("textarea").focus();
  });

  $(".saveBtn").on("click", function() {
    // Get the text from the textarea
    var text = $(this).siblings(".description").val().trim();

    // Get the hour for this timeblock
    var hour = $(this).siblings(".hour").text().slice(0,-2);

    // Save the event to local storage
    localStorage.setItem(hour, text);
  });

  function updateScheduleView() {
    let currentDate = moment().format("dddd, MMMM Do YYYY");
    let currentHour = moment().format("H"); 
    $(".time-block").each(function() {
      let hour = parseInt($(this).children(".hour").text());
      let $this = $(this);
      $this.toggleClass("present", hour == currentHour)
        .toggleClass("past", hour < currentHour)
        .toggleClass("future", hour > currentHour);	  
    });
  }
  
  // Call the updateScheduleView function to color-code time blocks 
  updateScheduleView(); 

});


      