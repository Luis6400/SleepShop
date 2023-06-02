
let productsindex = 0;
renderProduct(productsindex);


//Controls sleepTIPS
//Will go in order of tips. Starts over when reaches end of array.
let tips = [
    "Maintain a regular sleep schedule by going to bed and waking up at the same times every day, even on weekends.",
    "Create a restful environment that is dark, quiet, comfortable, and cool.",
    "Use the bed only for sleeping and intimacy to help strengthen the association between bed and sleep.",
    "Exercise regularly to promote good quality sleep.",
    "Avoid consuming caffeine, nicotine, and alcohol, which can disrupt sleep.",
    "Limit daytime naps to 30 minutes. While napping can be a way to make up for lost sleep, if you have trouble falling asleep at night, napping can make it worse.",
    "Establish a relaxing bedtime routine, such as reading a book or listening to soothing music."
];
let tipIndex = 0;

document.getElementById("tip").textContent = tips[tipIndex];

document.getElementById("nextTip").addEventListener("click", function () {
    tipIndex = (tipIndex + 1) % tips.length; // this ensures we cycle back to the first tip when we're at the last one
    document.getElementById("tip").textContent = tips[tipIndex];
});

document.getElementById("prevTip").addEventListener("click", function () {
    tipIndex = (tipIndex - 1 + tips.length) % tips.length; // this ensures we cycle back to the last tip when we're at the first one
    document.getElementById("tip").textContent = tips[tipIndex];
});

function renderProduct(int) {
    fetch('/api/dashboard/renderproduct', {
        method: 'POST',
    }).then(function (response) {
        if (response.status === 200) {
            const products = (response.products);
            console.log(products);
            let prodsection = document.getElementById("prodsec");
            document.getElementById("prodname").textContent = products[int].product_name;
            let imgel = document.createElement("img");
            imgel.setAttribute("src", `/images/${products[int].product_img_path}`);
            prodsection.appendChild(imgel);
            let linkel = document.createElement("a")
            linkel.setAttribute("href", `/product/${products[int].id}`);
            prodsection.appendChild(linkel);
        }
        else {
            console.log(response);
            alert("Something went wrong");
        }
    });

    }

document.getElementById("nextProd").addEventListener("click", function () {

    });

    document.getElementById("prevProd").addEventListener("click", function () {

    });

    var calendar;

    // Sleep tracking function
    let timer;
    let seconds = 0;
    let isSleeping = false;
    let user_points = 0;
    let sleepStartDate;
    let sleepEndDate;

    function startTimer(starttime) {
        var timediff = starttime - Date.now();
        console.log(timediff);
        // timer = setInterval(function () {

            

        //     seconds++;
        //     let hours = Math.floor(seconds / 3600);
        //     let minutes = Math.floor(seconds % 3600 / 60);
        //     let remainingSeconds = seconds % 60;


        //     //Adds a 0 to the front of the number if it is less than 10
        //     //Makes timer more readable
        //     hours = hours < 10 ? '0' + hours : hours;
        //     minutes = minutes < 10 ? '0' + minutes : minutes;
        //     remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

        //     document.querySelector('#timer').textContent = `${hours}:${minutes}:${remainingSeconds}`;
        //     //Stop time if sleep is over 9 hours. No event logged or points awarded.
        //     if (seconds >= 120) {
        //         clearInterval(timer);
        //         this.textContent = "Start Sleep";
        //         isSleeping = false;
        //         seconds = 0;
        //     }
        // }.bind(this), 1000);
    }

    document.querySelector('#startSleep').addEventListener('click', function (event) {
        event.preventDefault();
        sleepStartDate = new Date();
        temphour = sleepStartDate.getTime;
        //how to get data-id from button?
        let id = this.getAttribute("data-id");

        console.log(sleepStartDate);
        console.log(sleepStartTimestamp);
        
        fetch('/api/dashboard/createsleep', {
            method: 'POST',
            body: JSON.stringify({
                date: sleepStartDate,
                sleep_start: sleepStartTimestamp,
                user_id: id,
                still_sleeping: true
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            if (response.status === 200) {
                console.log(response);
                this.textContent = "Stop Sleep";
                this.removeAttribute("id");
                this.setAttribute("id", "stopSleep");
                startTimer(sleepStartTimestamp);

                


            }
            else {
                console.log(response);
                alert("Something went wrong");
            }
        });
        
        
        if (!isSleeping) {

            timer = setInterval(function () {
                seconds++;
                let hours = Math.floor(seconds / 3600);
                let minutes = Math.floor(seconds % 3600 / 60);
                let remainingSeconds = seconds % 60;


                //Adds a 0 to the front of the number if it is less than 10
                //Makes timer more readable
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

                document.querySelector('#timer').textContent = `${hours}:${minutes}:${remainingSeconds}`;
                //Stop time if sleep is over 9 hours. No event logged or points awarded.
                if (seconds >= 120) {
                    clearInterval(timer);
                    this.textContent = "Start Sleep";
                    isSleeping = false;
                    seconds = 0;
                }
            }.bind(this), 1000);
            isSleeping = true;
        } else {
            clearInterval(timer);
            this.textContent = "Start Sleep";
            if (seconds >= 60 && seconds <= 120) {
                user_points += 10;
                let sleepEndDate = new Date();
                //Add event to the calendar
                calendar.addEvent({
                    title: '10 points',
                    start: sleepStartDate,
                    end: sleepEndDate
                });
            }
            seconds = 0;
            isSleeping = false;
        }
        console.log(user_points);
    });


    document.addEventListener('DOMContentLoaded', function () {
        var calendarEl = document.getElementById('calendar');
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [],
            selectable: true,
            headerToolbar: {
                start: 'prev,next today',
                center: 'title',
                end: ''
            },
            contentHeight: 'auto',
            eventClick: function (info) {
                alert('Event: ' + info.event.title + '\n' +
                    'Start: ' + info.event.start.toLocaleTimeString() + '\n' +
                    'End: ' + info.event.end.toLocaleTimeString());
            }
        });
        calendar.render();
    });
