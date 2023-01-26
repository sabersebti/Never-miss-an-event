$(document).ready(function(){
    let currentDay = $("#currentDay");
    let date = moment().format("dddd, MMMM Do YYYY");
    currentDay.text(date);
  });
  $(document).ready(function(){
    let container = $(".container");
    let businessHours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    
    for (let i = 0; i < businessHours.length; i++) {
      let row = $("<div>", {
        class: "row time-block"
      });
      row.append(`
        <div class="hour col-2">${businessHours[i]}</div>
        <textarea class="col-8 description"></textarea>
        <button class="saveBtn col-2"><i class="fas fa-save"></i></button>
      `);
      container.append(row);
    }
  });
  $(document).ready(function(){
    let timeBlocks = $(".time-block");
    let currentHour = moment().format("h");
    
    timeBlocks.each(function(){
      let hour = $(this).find(".hour").text().slice(0,-2);
      if(hour == currentHour){
        $(this).addClass("present");
      } else if (hour < currentHour) {
        $(this).addClass("past");
      } else {
        $(this).addClass("future");
      }
    });
  });
  $(document).ready(function(){
    $(".time-block").on("click", function(){
      $(this).find(".description").removeAttr("readonly");
    });
  });
  $(document).ready(function(){
    $(".saveBtn").on("click", function(){
      let hour = $(this).parent().find(".hour").text();
      let description = $(this).parent().find(".description").val();
      localStorage.setItem(hour, description);
    });
  });
      
      