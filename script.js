let interval;
let elapsedTimeSeconds = 0;    
let initialCoffeeHeight = 100; 
let isPaused = false;           
let targetTimeSeconds;          

function startTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0; 
    const minutes = parseInt(document.getElementById("minutes").value) || 0; 

    
    targetTimeSeconds = (hours * 3600) + (minutes * 60);

    if (targetTimeSeconds <= 0) {
        alert("Please set a valid time greater than 0.");
        return;
    }

    
    elapsedTimeSeconds = 0;
    document.getElementById("coffee").style.height = initialCoffeeHeight + "%";

    document.getElementById("remaining-time").innerText = formatTime(elapsedTimeSeconds);

    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (elapsedTimeSeconds >= targetTimeSeconds) {
        clearInterval(interval);
        document.getElementById("remaining-time").innerText = "Time for a break!";
        playAlarm();
        setTimeout(() => {
            location.reload();  
        }, 2000); 
        return;
    }

    elapsedTimeSeconds++;


    document.getElementById("remaining-time").innerText = formatTime(elapsedTimeSeconds);

  
    const currentHeight = initialCoffeeHeight - ((elapsedTimeSeconds / targetTimeSeconds) * 100);
    document.getElementById("coffee").style.height = currentHeight + "%";
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function playAlarm() {
    const alarm = document.getElementById("alarme");
    alarm.currentTime = 0; 
    alarm.play();
}

function stopTimer() {
    clearInterval(interval);      
    isPaused = false;             
    elapsedTimeSeconds = 0;      

    
    document.getElementById("remaining-time").innerText = "Timer stopped.";
    document.getElementById("coffee").style.height = "100%"; 
    
    
    setTimeout(() => {
        location.reload();  
    }, 2000); 
}
