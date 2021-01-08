var IsDarkMode = false;
var DarkModeInt = 0;

function loaded() {
  if (localStorage.getItem("darkModeEnabled") === "1") {
    darkModeOn();
  } else if (localStorage.getItem("darkModeEnabled") === "0") {
    darkModeOff();
  }
}

function darkMode() {
  console.log(localStorage.getItem("darkModeEnabled"));
  if (Boolean(IsDarkMode) === Boolean(false)) {
    DarkModeInt = 0;
  } else if (Boolean(IsDarkMode) === Boolean(true)) {
    DarkModeInt = 1;
  }
	switch (DarkModeInt) {
    case 0:
      darkModeOn();
      break;
    case 1:
      darkModeOff();
      break;
  }
}
function secret() {
  alert("You found a secret!");
}

function darkModeOn() {
  console.log("Dark Mode disabled, enabling...");
  IsDarkMode = true;
  localStorage.setItem("darkModeEnabled","1");
  scaleFill = "#D2D2d2"
  document.getElementById("darkButton").innerHTML = "Light Mode";
  document.getElementById("navBar").style.backgroundColor = "darkgray";
  document.getElementById("navBar").style.border = "3px solid black"
  document.getElementById("linkNav").style.color = "#2b2b2b";
  document.getElementById("linkNav2").style.color = "#2b2b2b";
  document.getElementById("body").style.backgroundColor="#888888";
  document.getElementById("title").style.color = "black";
  document.getElementById("header").style.textDecorationColor = "black";
  document.getElementById("leftinput").style.backgroundColor = "black";
  document.getElementById("leftinput").style.border = "3px solid transparent";
  document.getElementById("leftinput").style.color = "white";
  document.getElementById("rightinput").style.backgroundColor = "black";
  document.getElementById("rightinput").style.border = "3px solid transparent";
  document.getElementById("rightinput").style.color = "white";
  document.getElementById("status").style.border = "3px solid gray";
  document.getElementById("submit").style.color = "white";
  document.getElementById("submit").style.backgroundColor = "black";
  document.getElementById("submit").style.border = "3px solid gray";
  document.getElementById("clear").style.color = "white";
  document.getElementById("clear").style.backgroundColor = "black";
  document.getElementById("clear").style.border = "3px solid gray";
  document.getElementById("switch").style.color = "white";
  document.getElementById("switch").style.backgroundColor = "black";
  document.getElementById("switch").style.border = "3px solid gray";
  document.getElementById("darkButton").style.color = "white";
  document.getElementById("darkButton").style.backgroundColor = "black";
  document.getElementById("darkButton").style.border = "3px solid gray";
  document.getElementById("footer").style.color = "white";
  document.getElementById("footer").style.backgroundColor = "black";
  document.getElementById("footer").style.border = "3px solid gray";
  document.getElementById("canvas").style.border = "8px solid black";
}

function darkModeOff() {
  console.log("Dark Mode enabled, disabling...");
  IsDarkMode = false;
  localStorage.setItem("darkModeEnabled","0");
  scaleFill = "#000000"
  document.getElementById("darkButton").innerHTML = "Dark Mode";
  document.getElementById("navBar").style.backgroundColor = "lightgray";
  document.getElementById("navBar").style.border = "3px solid transparent";
  document.getElementById("linkNav").style.color = "#2b2b2b";
  document.getElementById("linkNav2").style.color = "#2b2b2b";
  document.getElementById("body").style.backgroundColor="white";
  document.getElementById("title").style.color = "black";
  document.getElementById("header").style.textDecorationColor = "black";
  document.getElementById("leftinput").style.backgroundColor = "white";
  document.getElementById("leftinput").style.border = "3px solid black";
  document.getElementById("leftinput").style.color = "black";
  document.getElementById("rightinput").style.backgroundColor = "white";
  document.getElementById("rightinput").style.border = "3px solid black";
  document.getElementById("rightinput").style.color = "black";
  document.getElementById("status").style.border = "3px solid black";
  document.getElementById("submit").style.color = "black";
  document.getElementById("submit").style.backgroundColor = "white";
  document.getElementById("submit").style.border = "3px solid black";
  document.getElementById("clear").style.color = "black";
  document.getElementById("clear").style.backgroundColor = "white";
  document.getElementById("clear").style.border = "3px solid black";
  document.getElementById("switch").style.color = "black";
  document.getElementById("switch").style.backgroundColor = "white";
  document.getElementById("switch").style.border = "3px solid black";
  document.getElementById("darkButton").style.color = "black";
  document.getElementById("darkButton").style.backgroundColor = "white";
  document.getElementById("darkButton").style.border = "3px solid black";
  document.getElementById("footer").style.color = "black";
  document.getElementById("footer").style.backgroundColor = "white";
  document.getElementById("footer").style.border = "3px solid black";
  document.getElementById("canvas").style.border = "8px solid black";
}
