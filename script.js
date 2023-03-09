

function updateScheduleView() {
  let currentDate = moment().format("dddd, MMMM Do YYYY");
  let currentHour = moment().format("H"); 
  $(".time-block").each(function() {
    let hour = $(this).find(".hour").text().slice(0,-2);
    if(hour == currentHour){
      $(this).removeClass("past");
      $(this).addClass("present");
    } else if (hour < currentHour) {
      $(this).removeClass("present");
      $(this).addClass("past");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
    }
  });
}

updateScheduleView(); //call the function to update colors initially


      