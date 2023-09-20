const buttons = document.querySelector(".buttons");
const activitiesDiv = document.querySelector(".activities");
let stat = "daily";

buttons.addEventListener("click", e => {
    if(e.target.hasAttribute("data-type"))
    {
        const selectedButton = e.target;
        selectedButton.classList.add("button--selected");
        stat = selectedButton.dataset.type;

        buttons.querySelectorAll(".button").forEach(button => {
            if(button != selectedButton)
                button.classList.remove("button--selected");
        });

        request();
    }
});

const request = () => {
    fetch("data.json")
        .then(res => res.json())
        .then(data => showActivities(data));
}

const showActivities = (activities) => {

    cleanHTML();

    activities.forEach(activity => {
        const { title, timeframes } = activity;

        const search = {
            daily: "Day",
            weekly: "Week",
            monthly: "Month"
        };

        const activityDiv = document.createElement("div");
        activityDiv.classList.add("activity",`activity--${title.toLowerCase().replace(" ", "-")}`);

        activityDiv.innerHTML =  ` 
        <div class="activity__content">
            <header class="activity__header">
                <h2 class="activity__title">${title}</h2>
                <button class="activity__button">
                <img src="images/icon-ellipsis.svg" alt="dots">
                </button>
            </header>
            <div class="activity__stats">
                <p class="activity__current-hours">${timeframes[stat].current}hrs</p>
                <p class="activity__previous-hours">Last ${search[stat]} - ${timeframes[stat].previous}hrs</p>
            </div>
        </div>
        `;

        activityDiv.querySelector(".activity__button").addEventListener("mouseenter", (e) => e.stopPropagation());
        
        activitiesDiv.appendChild(activityDiv);
    });
}

const cleanHTML = () => {
    while(activitiesDiv.firstChild)
        activitiesDiv.removeChild(activitiesDiv.lastChild);
}

request();
