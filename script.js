const $container = $(".container");
const $currentDay = $("#currentDay");
const $headerMessage = $("#header-message");




const updateScheduleView = () => {  
  const currentTime = moment();

  $(".time-block").each(function () {
    const $this = $(this);
    const blockTime = moment($this.find(".hour").text(), [timeFormats.hour]);

    if (blockTime.isBefore(currentTime, "hour")) {
      $this.removeClass("present future").addClass("past");
    } else if (blockTime.isSame(currentTime, "hour")) {                
      $this.removeClass("past future").addClass("present");
    } else {         
      $this.removeClass("past present").addClass("future");
    }
  });
}

const timeFormats = {
  hour: "H:mm",
  dayOfWeek: "dddd",
  monthDayYear: "MMMM Do YYYY",
};

const generateTimeBlock = (hour) => {
  const formattedHour = moment({ hour }).format(timeFormats.hour);
  const data = localStorage.getItem(hour);
  let eventData = {};
  if (data) {
    try {
      eventData = JSON.parse(data);
    } catch (e) {
      console.error(`Error parsing data for hour ${hour}:`, e);
    }
  }

  const $timeBlock = $(`<div class="row time-block"></div>`);
  const $hourCol = $(`<div class="hour col-2" data-hour="${hour}">${formattedHour}</div>`);
  const $descriptionCol = $('<textarea class="col-8 description"></textarea>').val(eventData.text);
  const $saveBtnCol = $('<button class="saveBtn col-2"><i class="fas fa-save"></i></button>');

  return $timeBlock.append($hourCol, $descriptionCol, $saveBtnCol);
};


$(() => {
  // Cache DOM elements
  const $body = $("body");
  const $container = $(".container");
  const $currentDay = $("#currentDay");

  // Get current date using Moment.js
  const currentDate = moment().format(`${timeFormats.dayOfWeek}, ${timeFormats.monthDayYear}`);
  $currentDay.text(currentDate);

  // Create time blocks for each hour of the day and append to .container div
  const $timeBlocks = [];
  for (let i = 9; i <= 17; i++) {
    $timeBlocks.push(generateTimeBlock(i));
  }
  $container.append($timeBlocks);

  // Attach event listeners using delegation
  $body.on("click", ".time-block", function () {
    $(this).find("textarea").focus();
  });

  $body.on("click", ".saveBtn", function () {
    const $this = $(this);
    const $descriptionCol = $this.siblings(".description");
    const text = $descriptionCol.val().trim();
    const hour = +$this.siblings(".hour").data("hour");
    const eventData = { hour, text };
localStorage.setItem(hour, JSON.stringify(eventData || {}));
    $headerMessage.text("Data has been saved.");
    setTimeout(() => {
      $headerMessage.text("");
    }, 5000);

    updateScheduleView();
  });

  // Update schedule view and start auto-update timer
  updateScheduleView();
  setInterval(updateScheduleView, 60 * 1000);
});
