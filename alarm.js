const currentTime_ui = document.querySelector("h1");
const content_ui = document.querySelector(".content");
const selectMenu_ui = document.querySelectorAll("select");
const setAlarmBtn_ui = document.querySelector("button");

let alarmTime, isAlarmSet,
ringtone = new Audio("./Resources/Alarmalert.wav");

// These three loops is for adding options for selectmenu 
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu_ui[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu_ui[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu_ui[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
// Thsis function is for 12h Digital Clock
setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime_ui.innerText = `${h}:${m}:${s} ${ampm}`;

    // if (alarmTime === `${h}:${m} ${ampm}`) {
    //     ringtone.play();
    //     ringtone.loop = true;
    // }
});
