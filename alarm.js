const currentTime_ui = document.querySelector("h1");
const content_ui = document.querySelector(".content");
const selectMenu_ui = document.querySelectorAll("select");
const setAlarmBtn_ui = document.querySelector(".setBtn");
const clearAlarmBtn_ui = document.querySelector(".clearBtn");
const alarmList_ui = document.querySelector("#myList");
const alarmList = []; //Stores alarms as an array
let isAlarmSet=false,
  newAlarm,now,
  ringtone = new Audio("./Resources/Alarmalert.wav");

// This Function is for adding options for selectmenu
function addOption() {
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
}
// This function is for 12h Digital Clock
setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime_ui.innerText = `${h}:${m}:${s} ${ampm}`;
   now=`${h}:${m} ${ampm}`;
  //This condition will ring the alarm for the alarmTime
  if (alarmList.includes(now)) {
    ringtone.play();
    ringtone.loop = true;
    isAlarmSet = true;
  }
},2000);

// function for Setting Alarm
function setAlarm() {
  let time = `${selectMenu_ui[0].value}:${selectMenu_ui[1].value} ${selectMenu_ui[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  newAlarm = time;
  if (!alarmList.includes(newAlarm)) {
    alarmList.push(newAlarm);
    console.log(alarmList);
    console.log(alarmList.length);
    selectMenu_ui[0].innerHTML = `<option value="Hour" selected >Hour</option>`;
    selectMenu_ui[1].innerHTML = `<option value="Hour" selected >Minute</option>`;
    selectMenu_ui[2].innerHTML = `<option value="Hour" selected >AM/PM</option>`;
    addOption();// add the option because they have been modified
    addNewAlarmList();// adds new alarm in the alarm list
  } else {
    alert(`Alarm for ${newAlarm} is already set.`);
  }
}
// Pop the Alarm from array of Current time
function popElement(alarmList,index){
  alarmList.splice(index,1);
}
// Function for Clearing Alarm
function clearAlarm() {
  if (isAlarmSet) {
    //pop that alarm from array
    popElement(alarmList , alarmList.indexOf(`${now}`));
    ringtone.pause();
    isAlarmSet = false;
  }
}
// Function for Updating alarm List in the UI Alarm list and DOM
function addNewAlarmList() {
  console.log(newAlarm);
  const listItem = `<li class = "time-list">        
    <span class="time">${newAlarm}</span>
    <button class="deleteAlarm " onclick = "remove(this.value)" value=${newAlarm}>Delete</button>       
    </li>`;
  alarmList_ui.innerHTML = alarmList_ui.innerHTML + listItem;
}
clearAlarmBtn_ui.addEventListener("click", clearAlarm);
setAlarmBtn_ui.addEventListener("click", setAlarm);
addOption();
//Write function of delete button to delete the alarm from Array
// function to delete list alarm of ui 
