$(document).ready(function () {
    // displays current day from system time
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    // creates timeblocks for working hours
    const businessHours = Array.from({ length: 9 }, (_, index) => index + 9);
  
    // timeblock colour coding
    function updateBlockStyles() {
      const currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        const blockHour = parseInt($(this).attr("data-hour"));
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // timeblock generation
    function generateTimeblocks() {
      const container = $(".container");
  
      businessHours.forEach((hour) => {
        const timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);
        const hourCol = $("<div>").addClass("col-1 hour").text(`${hour}:00`);
  
        const textAreaCol = $("<textarea>").addClass("col-10 description");
        textAreaCol.val(localStorage.getItem(`event-${hour}`) || "");
  
        const saveBtnCol = $("<button>")
          .addClass("col-1 saveBtn")
          .html('<i class="fas fa-save"></i>');
  
        timeBlock.append(hourCol, textAreaCol, saveBtnCol);
        container.append(timeBlock);
      });
    }
  
    // saves event to local storage
    $(".container").on("click", ".saveBtn", function () {
      const hour = $(this).parent().attr("data-hour");
      const eventText = $(this).siblings(".description").val();
  
      localStorage.setItem(`event-${hour}`, eventText);
    });
  
    // starts the application
    generateTimeblocks();
    updateBlockStyles();
  
    // updates the timeblocks once per minute
    setInterval(updateBlockStyles, 60000);
  });
  
