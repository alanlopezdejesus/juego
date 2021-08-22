var contexto = document.getElementById("LienzoJuego").getContext("2d")
contexto.canvas.width = 300
contexto.canvas.height = 530

//Variables
var FPS = 60
var gravedad = 1.5
var personaje = {
  x:50,
  y:150,
  w:50,
  h:50
}

var tuberias = Array ()
tuberias[0] = {
  x:contexto.canvas.width,
  y:0
}

//Variables imagenes
var pajaro = new Image()
pajaro.src="imagenes/bird.png"

var fondo = new Image()
fondo.src="imagenes/background.png"

var tuberiaarriba = new Image()
tuberiaarriba.src="imagenes/tuberiaNorte.png"

var tuberiaabajo = new Image()
tuberiaabajo.src="imagenes/tuberiaSur.png"

var suelo = new Image()
suelo.src="imagenes/suelo.png"
//Control
function presionar(){
  personaje.y -=35
}

setInterval(loop,1000/FPS)

function loop() {
  contexto.clearRect(0,0,300,530)
  //Fondo
  contexto.drawImage(fondo,0,0)
  contexto.drawImage(suelo,0,contexto.canvas.height - suelo.height)
  //Personaje
  contexto.drawImage(pajaro,personaje.x,personaje.y)
  //Tuberias
  for(i = 0; i < tuberias.length; i++){
    var constante = tuberiaarriba.height + 80
    contexto.drawImage(tuberiaarriba,tuberias[i].x,tuberias[i].y)
    contexto.drawImage(tuberiaabajo,tuberias[i].x,tuberias[i].y + constante)
    tuberias[i].x--
    
    if(tuberias[i].x == 150 ){
      tuberias.push({
        x:contexto.canvas.width,
        y: Math.floor(Math.random()*tuberiaarriba.height) - tuberiaarriba.height
      })
    }
  }
  //Condiciones
  personaje.y += gravedad
}


//Evento
window.addEventListener("keydown",presionar)
