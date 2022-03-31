let workday = JSON.parse(localStorage.getItem("workday"));
    if(!workday) {
        workday = {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: ""
        }
    }

function loadEvents() {
    for (ev in workday) {
        let textArea = $(".row").eq(ev).find(".description");
        $(textArea).val(workday[ev]);
    }
}

function saveEvent() {
    let text = $(this).prev("textarea").val().trim()
    let index = $(this).closest(".row").index();

    workday[index] = text;
    console.log(workday[index]);
    localStorage.setItem("workday", JSON.stringify(workday));
    
    let eventSavedEl = $("<p>").addClass("saved").text("Event saved!");

    $(".container").prepend(eventSavedEl)

    setTimeout(function() {
        $(".saved").remove();
    }, 1000)

}

function updateTime() {
    $("#currentDay").text(moment().format("MMMM Do YYYY, hh:mm a"));

    let currentHour = moment().format("H");;
    let rows = $(".container").children();

    
    for (let i=0; i<rows.length; i++) {
        let hourText = $(rows[i]).find(".hour").text();
        let hourNum = parseInt(hourText.slice(0, -2));
        if(hourText[hourText.length - 2] === "p" && hourNum < 12) {
            hourNum+= 12;
            
        }
        if (currentHour > hourNum) {
            $(rows[i]).find(".description").addClass("past");
        }
        else if (currentHour == hourNum) {
            $(rows[i]).find(".description").addClass("present");
        } 
        else if (currentHour < hourNum) {
            $(rows[i]).find(".description").addClass("future");
        }
    }

}

$(".container").on("click", ".saveBtn", saveEvent);

setInterval(updateTime, 60000);

loadEvents();

updateTime();

