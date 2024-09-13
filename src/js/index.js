const userData = "data.json";

const mainContainer = document.querySelector("main");

const cardTemplate = document.querySelector("[data-card-template]");

const optionDaily = document.getElementById("daily");
const optionWeekly = document.getElementById("weekly");
const optionMonthly = document.getElementById("monthly");

getData(document.querySelector('input[name="time-frame"]:checked').value);

optionDaily.addEventListener("click", () => {
    getData("daily");
})

optionWeekly.addEventListener("click", () => {
    getData("weekly");
})

optionMonthly.addEventListener("click", () => {
    getData("monthly");
})

async function getData(timeframe) {
    try {
        const response = await fetch(userData);
        const trackedTime = await response.json();
        loadCards(trackedTime, timeframe);
    } catch (e) {
        console.log(e.message);
    }
}

function loadCards(data, timeframe) {
    removeCards();

    data.forEach(item => {
        const cardContainer = cardTemplate.content.cloneNode(true);
        cardContainer.querySelector("[data-activity]").setAttribute("data-activity", item.title.toLowerCase().split(" ").join("-"));
        cardContainer.querySelector("[data-title]").innerText = item.title;
        cardContainer.querySelector("[data-current-time]").innerText = item.timeframes[timeframe].current;
        cardContainer.querySelector("[data-previous-time]").innerText = item.timeframes[timeframe].previous;

        switch (timeframe) {
            case "daily":
                cardContainer.querySelector("[data-attribute]").innerText = "Previous ";
                cardContainer.querySelector("[data-timeframe]").innerText = "Day";
                break;
            case "weekly":
                cardContainer.querySelector("[data-attribute]").innerText = "Last ";
                cardContainer.querySelector("[data-timeframe]").innerText = "Week";
                break;
            case "monthly":
                cardContainer.querySelector("[data-attribute]").innerText = "Last ";
                cardContainer.querySelector("[data-timeframe]").innerText = "Month";
                break;
        }
        mainContainer.append(cardContainer);

    });
}

function removeCards() {
    const cards = document.querySelectorAll(".card");
    
    for (let i = 0; i < cards.length; i++) {
        mainContainer.removeChild(cards[i]);
    }
}