var Slider = (function() {

	let buttonLeft = document.querySelector(".button-left");
	let slider = document.getElementById("slider");
	let slide = document.querySelector(".slide");
	let buttonMenu = document.querySelectorAll(".nav-button");
	let buttonRight = document.querySelector(".button-right");
	let slideNumber = 1; // sert à savoir sur quelle slide on est pour servir de repère
	let slideMax = 3;
	let translateValue = 0; // valeur affectée à la propriété translate
	let slideDirection = "";


	function init() //avec la syntaxe ES6 on peut aussi utiliser simplement init
	{
		for (let i = 0; i < buttonMenu.length; i++) {
			buttonMenu[i].addEventListener("click", function(e){
				e.preventDefault();
				contentTranslate(e.target);
			})
		}

		// gestion du click sur les boutons de navigation
		buttonLeft.addEventListener("click", function(e){
			slideLeft();
			e.preventDefault();
		});


		buttonRight.addEventListener("click", function(e){
			slideRight();
			e.preventDefault();
		});

		// Gestion de l'appui sur les touches fleche gauche (37) et droite (39)
		document.addEventListener("keyup", function (e) {
		    if (e.keyCode === 37) {
		    	slideLeft();
		    } else if (e.keyCode === 39) {
		    	slideRight();
		    }
		});
	}

	function contentTranslate(target)
	{
		const content = document.getElementById("main-content");
		let contentTranslateValue = 0;
		if (target.classList.contains("button-map")) {
			contentTranslateValue = 50;
		} else if (target.classList.contains("button-help")) {
			contentTranslateValue = 0;
		}
		content.style.transform = "translateY(-" + contentTranslateValue + "%)";
		content.style.transition = "transform 1s ease";
	}

	function getSlideProp()
	{ 
		let sliderWidth = parseFloat(getComputedStyle(slider).width);
		let slideWidth = parseFloat(getComputedStyle(slide).width);
		let slideProp = (slideWidth * 100) / sliderWidth;

		return (slideProp);
	}

	function slideLeft() {
		if (slideNumber > 1) {
			translateValue = translateValue - getSlideProp();
			slideNumber--;
		} else if (slideNumber === 1) {
			translateValue = (getSlideProp() * (slideMax - 1));
			slideNumber	= slideMax;
		}
		slider.style.transform = "translateX(-" + translateValue + "%)";
		slider.style.transition = "transform 2s ease";
	}

	function slideRight()
	{
		if (slideNumber < slideMax) {
			translateValue += getSlideProp();
			slideNumber++;
		} else if (slideNumber === slideMax) {
			translateValue = 0;
		}
		if (slideNumber === slideMax && translateValue === 0) {
			slideNumber = 1;
		}
		slider.style.transform = "translateX(-" + translateValue + "%)";
		slider.style.transition = "transform 2s ease";
	}

	return {
		init: init,
		slideLeft: slideLeft,
		slideRight: slideRight
	}
})();



/* La fonction calcule la taille en % de la slide pour pouvoir additionner ou soustraire sa valeur dans 
un translateX. Le parseFloat prend une chaine de caractère en paramètre et renvoie le premier chiffre de
cette chaine */

