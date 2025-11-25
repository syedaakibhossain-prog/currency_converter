const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let i = 0;
// Populate dropdowns

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        changeFlage(evt.target);
    });
}

// Change flag

const changeFlage = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};
// Update exchange rate
const updateExchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}/${formCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[formCurr.value.toLowerCase()][toCurr.value.toLowerCase()];


    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${formCurr.value} = ${finalAmount} ${toCurr.value}`;
}
// Button event

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangerate();
});
// Window load event
window.addEventListener("load", () => {
    updateExchangerate();
})