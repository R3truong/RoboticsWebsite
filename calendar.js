const calendar = document.getElementById("calendar");
const sidebar = document.getElementById("sidebar");
const modalTitle = document.getElementById("modal-event-title");
const modalDate = document.getElementById("modal-event-date");
const modalTime = document.getElementById("modal-event-time");
const modalDescription = document.getElementById("modal-event-description");

counter = 0;


function openModal() {
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.opacity = 1;
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function spawnCalendar(title, date, starttime,endtime)
{
    // const linebreak = document.createElement("br");
    // calendar.appendChild(linebreak);
    // Link
    const eventLink = document.createElement("a");
    const uniqueCounterId = `calendar-link-id-${counter}`
    eventLink.setAttribute("id",uniqueCounterId);
    eventLink.classList.add("calendar-link")
    calendar.appendChild(eventLink);
    
    // calendar item
    const eventElement = document.createElement("section");
    eventElement.classList.add("calendar-item");
    eventLink.appendChild(eventElement);
    // Title
    eventTitle = document.createElement("h3");
    eventTitle.textContent = `${title}`;
    eventElement.appendChild(eventTitle);
    
    const calendarInner = document.createElement("span");
    calendarInner.classList.add("calendar-inner");
    eventElement.appendChild(calendarInner);
    // Time and Date
    dateP = document.createElement("p");
    timeP = document.createElement("p");
    dateConv = convertDateAndTime(date, starttime, endtime, 0);
    dateP.innerHTML = `<strong>Date:</strong> ${dateConv}`;
    startTimeConv = convertDateAndTime(date, starttime, endtime, 1);
    endTimeConv = convertDateAndTime(date, starttime, endtime, 2)
    timeP.innerHTML = `<strong>Time:</strong> ${startTimeConv} - ${endTimeConv}`;
    calendarInner.appendChild(dateP);
    calendarInner.appendChild(timeP);
    moreDetails = document.createElement("p");
    moreDetails.setAttribute("id","calendar-footer");
    moreDetails.textContent = `Click for more details...`;
    eventElement.appendChild(moreDetails);
    counter++;
}
let eventData = [];

fetch('/assets/php/calendar.php')
    .then(response => response.json())
    .then(data => 
    {
        eventData.push(...data);

        eventData.forEach(event =>
        {
            spawnCalendar(event.event, event.date, event.start_time, event.end_time);
        });

        const links = document.querySelectorAll(".calendar-link");
        const close = document.getElementById("close");
        links.forEach(link => {
            link.addEventListener("click", function() {
                const eventId = link.getAttribute("id").replace("calendar-link-id-", "");
                const selectedEvent = eventData[eventId];
                selectedConvertedDate = convertDateAndTime(selectedEvent.date,selectedEvent.start_time, selectedEvent.end_time, 0);
                selectedConvertedSTime = convertDateAndTime(selectedEvent.date,selectedEvent.start_time, selectedEvent.end_time, 1);
                selectedConvertedETime = convertDateAndTime(selectedEvent.date,selectedEvent.start_time, selectedEvent.end_time, 2);
                updateModal(selectedEvent.event, selectedConvertedDate, selectedConvertedSTime,selectedConvertedETime,selectedEvent.description);
                openModal();
            });
            
        });
        close.addEventListener("click",function()
        {
            closemodal();
        });
    });




function closemodal()
{
    modal.style.opacity = 0;
    modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    setTimeout(function()
    {
        modal.style.display = "none";
    }, 500);
}

window.onclick = function(event)
{
    if(event.target == modal)
    {
        closemodal();
    }
}
// return type 0 = date, start time = 1, end time = 2
function convertDateAndTime(date, starttime, endtime, returnType)
{
    const startdate = new Date(date+ " "+ starttime)
    const enddate = new Date(date + " " + endtime)
    hours = "";
    minutes = "";
    seconds = "";
    date = ""

    if(returnType == 0)
    {
        const day = startdate.getDate();
        const month = startdate.getMonth() + 1;
        const year = startdate.getFullYear();
        formattedDate = `${month}/${day}/${year}`;
        console.log(formattedDate);
        return formattedDate;
    }
    else if (returnType == 1)
    {
        const hours = startdate.getHours();
        const minutes = startdate.getMinutes();
        const seconds = startdate.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12;

        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;

        return formattedTime;
    }
    else
    {
        const hours = enddate.getHours();
        const minutes = enddate.getMinutes();
        const seconds = enddate.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12;

        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;

        return formattedTime;
    }
}

function updateModal(event, date, startTime, endTime, description)
{
    modalTitle.innerHTML = event;
    modalDate.innerHTML = "Date: " + date;
    modalTime.innerHTML = `Time: ${startTime} - ${endTime}`;
    modalDescription.innerHTML = "Description: "+ description;
}

