var Application = (function(Slider, Station, Booking) {
	function init() {
		Application.responsiveMenu();
		Slider.init();
		Station.init();
		Booking.init();
	}

	function responsiveMenu()
	{
		let menuBurger = document.querySelector(".menu-icon");
		menuBurger.addEventListener("click", function(){
			let mainMenu = document.getElementById("main-menu");
			if (mainMenu.className === "menu") {
				mainMenu.className += " responsive-menu";
			} else {
				mainMenu.className = "menu";
			}
		});
	}

	return { init, responsiveMenu };
	// return { init: init, responsiveMenu: responsiveMenu }; //avant ES6
})(Slider, Station, Booking);

Application.init();