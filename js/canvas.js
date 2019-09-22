var Canvas = (function() {
  // Récupère l'élément canvas.
  let canvas = document.getElementById('signature');
  // Récupère le contexte du canvas.
  let context = document.getElementById('signature').getContext('2d');
  let started = false;
  let filled = false;

  function init()
  {
    clear();
    displayCanvas();
    drawSignature();
  }

  function displayCanvas()
  {
    canvas.style.display = "block";
  }

  function hideCanvas()
  {
    canvas.style.display = "none";
  }

  function drawSignature()
  {

    // Gestionnaires d'événement du canvas

    canvas.addEventListener('mousedown', function(e){
      let x = e.offsetX; // on récupère la coordonnée sur l'axe des abscisses de la souris
      let y = e.offsetY; // on récupère la coordonnée sur l'axe des ordonnées de la souris
      context.beginPath(); // défini le début du chemin
      context.moveTo(x, y); // le point de départ de la ligne quand est l'endroit où l'event est déclenché
      started = true;
    });

    canvas.addEventListener('mousemove', function(e){
      if (started) {
        let x = e.offsetX; // on récupère la coordonnée sur l'axe des abscisses de la souris
        let y = e.offsetY; // ligne.
        context.lineTo(x, y);
        context.strokeStyle = '#0AA'; // défini la couleur du trait
        context.lineWidth = '3'; // défini la largeur du trait
        context.lineCap = 'round'; // défini la "coupe" du trait, si elle est droit, arrondie, ou en biais
        context.stroke(); // c'est cette méthode qui dessine réellement
      }
    });

    canvas.addEventListener('mouseup', function(e){
      if (started) {
        started = false; // pour arrêter de dessiner, on défini started à false pour "bloquer" l'événement mousemove
      }
      filled = true; // quand un stroke est réalisé, ça veut dire qu'on a dessiné, donc le canva n'est plus vide
      if (test()) {
        document.querySelector(".book").style.display = "block";
      }
    });
  }

  function clear()
  {
    // Nettoie le canvas. Il prend en paramètre les coordonnées du canvas (x, y) et sa taille.
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    filled = false;
  }

  function test()
  {
    return filled;
  }

  return { init, clear, displayCanvas, drawSignature };
})();