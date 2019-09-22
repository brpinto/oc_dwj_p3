var Booking = (function(){
    
	let timeInMinutes = 20 * 60 * 1000 + 1000;
	let timeoutDate = new Date();
	let interval = null;
	let bookedStation = "";

	function init()
	{
		let countdownBloc = document.getElementById("test-countdown");
		if(sessionStorage.getItem("bookingDate")){
			interval = setInterval(function(){
		        writeTime();
		    }, 1000);
		}else {
			countdownBloc.innerHTML = "Aucune réservation en cours";
		}
	}

	function countdown()
	{
		let countdown = getTimeoutDate() - Date.now();
		return countdown;
	}

	function getTimeoutDate()
	{

		let bookingDate = Date.parse(sessionStorage.getItem("bookingDate"));
		timeoutDate = (bookingDate + timeInMinutes);

		return timeoutDate;
	}

	function getTextFormat(timeLeft)
	{
		let format;
		
		if(timeLeft.getMinutes() > 1){
			if (timeLeft.getSeconds() > 0){
				format = 'Vous avez réservé un vélo à la station ' +sessionStorage.getItem("bookedStation")+ '<br >' + 'Cette réservation expirera dans ' +timeLeft.getMinutes()+ ' minutes et ' +timeLeft.getSeconds()+ ' secondes';
			}else{
				format = 'Vous avez réservé un vélo à la station ' +sessionStorage.getItem("bookedStation")+ '<br >' + 'Cette réservation expirera dans ' +timeLeft.getMinutes()+ ' minutes';
			}
		}else if (timeLeft.getMinutes() === 1){
			if (timeLeft.getSeconds() > 0){
				format = 'Vous avez réservé un vélo à la station ' +sessionStorage.getItem("bookedStation")+ '<br >' + 'Cette réservation expirera dans ' +timeLeft.getMinutes()+ ' minute et ' +timeLeft.getSeconds()+ ' secondes';
			}else {
				format = 'Vous avez réservé un vélo à la station ' +sessionStorage.getItem("bookedStation")+ '<br >' + 'Cette réservation expirera dans ' +timeLeft.getMinutes()+ ' minute';
			}
		}else
			format = 'Vous avez réservé un vélo à la station ' +sessionStorage.getItem("bookedStation")+ '<br >' + 'Cette réservation expirera dans ' +timeLeft.getSeconds()+ ' secondes';

		return format;
	}

	function writeTime()
	{
		let timeLeft = new Date(countdown());
		let countdownBloc = document.getElementById("test-countdown");
		
		countdownBloc.innerHTML = getTextFormat(timeLeft);
		if (countdown() <= 0 ) {
			clearInterval(interval);
			countdownBloc.innerHTML = "Aucune réservation en cours";
			sessionStorage.removeItem("bookingDate");
			sessionStorage.removeItem("bookedStation");
			sessionStorage.removeItem("bookedId");
		}
	}

	return { init, writeTime };
})();