var IsDarkMode = false;
var DarkModeInt = 0;

function loaded() {
  if (localStorage.getItem("darkModeEnabled") === "1") {
    darkModeOn();
  } else if (localStorage.getItem("darkModeEnabled") === "0") {
    darkModeOff();
  };
};

function darkMode() {
  console.log(localStorage.getItem("darkModeEnabled"))
  if (Boolean(IsDarkMode) === Boolean(false)) {
    DarkModeInt = 0;
  } else if (Boolean(IsDarkMode) === Boolean(true)) {
    DarkModeInt = 1;
  };
	switch (DarkModeInt) {
    case 0:
      darkModeOn();
      break;
    case 1:
      darkModeOff();
      break;
  };
};

function darkModeOn() {
  console.log("Dark Mode disabled, enabling...");
  IsDarkMode = true;
  localStorage.setItem("darkModeEnabled","1");
  document.getElementById("link1").style.color = "#d2d2d2";
  document.getElementById("link2").style.color = "#d2d2d2";
  document.getElementById("navBar").style.backgroundColor = "darkgray";
  document.getElementById("navBar").style.border = "3px solid black";
  document.getElementById("linkNav").style.color = "#2b2b2b";
  document.getElementById("linkNav2").style.color = "#2b2b2b";
  document.getElementById("body").style.backgroundColor="#2b2b2b";
  document.getElementById("title").style.color = "#f5f5f5";
  document.getElementById("header").style.textDecorationColor = "#f5f5f5";
  document.getElementById("footer").style.color = "white";
  document.getElementById("footer").style.backgroundColor = "black";
  document.getElementById("footer").style.border = "3px solid gray";
  document.getElementById("subHeader").style.color = "white";
  document.getElementById("subHeader2").style.color = "white";
  document.getElementById("subHeader3").style.color = "white";
  document.getElementById("subHeader4").style.color = "white";
  document.getElementById("subHeader5").style.color = "white";
  document.getElementById("subHeader6").style.color = "white";
  document.getElementById("content").style.color = "white";
  document.getElementById("content2").style.color = "white";
  document.getElementById("content3").style.color = "white";
  document.getElementById("content4").style.color = "white";
  document.getElementById("content5").style.color = "white";
  document.getElementById("content6").style.color = "white";
  document.getElementById("content7").style.color = "white";
  document.getElementById("list").style.color = "white";
  document.getElementById("leftinput").style.backgroundColor = "black";
  document.getElementById("leftinput").style.border = "3px solid transparent";
  document.getElementById("leftinput").style.color = "white";
  document.getElementById("rightinput").style.backgroundColor = "black";
  document.getElementById("rightinput").style.border = "3px solid transparent";
  document.getElementById("rightinput").style.color = "white";
  document.getElementById("validpng").src = "invertvalid.png"
};

function darkModeOff() {
  console.log("Dark Mode enabled, disabling...");
  IsDarkMode = false;
  localStorage.setItem("darkModeEnabled","0");
  document.getElementById("linkNav").style.color = "#2b2b2b";
  document.getElementById("linkNav2").style.color = "#2b2b2b";
  document.getElementById("navBar").style.backgroundColor = "lightgray";
  document.getElementById("body").style.backgroundColor="white";
  document.getElementById("title").style.color = "black";
  document.getElementById("header").style.textDecorationColor = "black";
  document.getElementById("footer").style.color = "black";
  document.getElementById("footer").style.backgroundColor = "white";
  document.getElementById("footer").style.border = "3px solid black";
};
