var Modal = (function(Canvas, Booking) {
	let stationName = "";
	let stationAddress = null;
	let stationModal = document.getElementById("station-info-layer");
	let bookingButton = document.querySelector(".book");
	let closeButton = document.querySelector(".close");

	function init()
	{
		displayModal();
		document.querySelector(".book").style.display = "none";
		if (Station.freeBikes > 0)
			Canvas.init();

		closeButton.addEventListener("click", function(){
			closeModal();
		});

		bookingButton.addEventListener("click", function(){
			sessionStorage.setItem("bookingDate", new Date());
			sessionStorage.setItem("bookedStation", Station.name);
			sessionStorage.setItem("bookedId", Station.number);
			
			Booking.interval = setInterval(function(){
                Booking.writeTime();
            }, 1000);
		});
	}

	function displayModal()
	{
		stationModal.style.display = "block";
		stationName = Station.name;
		stationAddress = Station.address;
		document.getElementById("station-name").textContent = Station.name;
		document.getElementById("station-address").textContent = stationAddress.toLowerCase();
		document.getElementById("stands-av").textContent = Station.freeStands + " emplacement(s) libre(s)";
		document.getElementById("bikes-av").textContent = Station.freeBikes + " vélo(s) disponible(s)";
	}

	function closeModal()
	{
		stationModal.style.display = "none";
	}

	function displayBookingButton() {
		bookingButton.style.display = "block";
	}

	function hideBookingButton() {
		bookingButton.style.display = "none";
	}

	return { init, displayModal, closeModal };
})(Canvas, Booking);

// 1. Click sur bouton fermer : fermer la Modal
// 2. Initialiser le canvas
// 2. click sur le bouton réserver : lancer la réservation (fonction)
