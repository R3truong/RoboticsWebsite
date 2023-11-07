function spawnCalendar()
{
    const eventLink = document.createElement("a");
    eventLink.id.add("calendar-link");
    const eventElement = document.createElement("section");
    eventElement.classList.add("calendar-item")
    eventTitle = "title"
    eventTitle.classList.add
}

for(let i = 0; i <= 4; i++)
{
    // spawnCalendar();
}


var modal = document.getElementById("modal");

var link = document.getElementById("calendar-link");

var close = document.getElementById("close");

link.onclick = function()
{
    modal.style.display = "block";
    setTimeout(function()
    {
        modal.style.opacity = 1;
        modal.querySelector('.modal-content').style.transform = 'scale(1)';

    }, 10);
}

close.onclick = function()
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
        close.onclick();
    }
}

