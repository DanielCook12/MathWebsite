var IsDarkMode = false;
var DarkModeInt = 0;

function darkMode() {
  if (Boolean(IsDarkMode) === Boolean(false)) {
    DarkModeInt = 0;
  } else if (Boolean(IsDarkMode) === Boolean(true)) {
    DarkModeInt = 1;
  };
	switch (DarkModeInt) {
    case 0:
      console.log("Dark Mode disabled, enabling...")
      IsDarkMode = true;
      document.getElementById("darkButton").innerHTML = "Light Mode";
      document.getElementById("navBar").style.backgroundColor = "darkgray";
      document.getElementById("linkNav").style.color = "#f5f5f5"
      document.getElementById("body").style.backgroundColor="#2b2b2b"
      document.getElementById("title").style.color = "#f5f5f5"
      document.getElementById("header").style.textDecorationColor = "#f5f5f5"
      document.getElementById("leftinput").style.backgroundColor = "black";
      document.getElementById("leftinput").style.border = "3px solid gray";
      document.getElementById("leftinput").style.color = "white";
      document.getElementById("rightinput").style.backgroundColor = "black";
      document.getElementById("rightinput").style.border = "3px solid gray";
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
	  document.getElementById("canvas").style.border = "8px solid gray";
      break;
    case 1:
      console.log("Dark Mode enabled, disabling...")
      IsDarkMode = false;
      document.getElementById("darkButton").innerHTML = "Dark Mode"
      document.getElementById("navBar").style.backgroundColor = "lightgray";
      document.getElementById("linkNav").style.color = "white"
      document.getElementById("body").style.backgroundColor="white"
      document.getElementById("title").style.color = "black"
      document.getElementById("header").style.textDecorationColor = "black"
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
      break;
  };
};
