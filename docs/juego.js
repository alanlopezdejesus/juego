var contexto = document.getElementById("LienzoJuego")
var ctx =contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;

// Variable
var score = 0
var FPS = 60
var gravedad = 1.5
var personaje = {
  x:50,
  y:150,
  w:50,
  h:50
}

var tuberias = new Array ()
tuberias[0] = {
  x:contexto.width,
  y:0
}

//Variables audios
var punto = new Audio()
punto.src= "audios/punto.mp3"

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

resize()
function resize(){
  CANVAS_WIDTH = window.innerHeight;
  CANVAS_HEIGHT = window.innerWidth;
  
  contexto.width = WIDTH;
  contexto.height = HEIGHT;
  
  contexto.style.height = ""+CANVAS_WIDTH+"px";
}

//Bucle
setInterval(loop,1000/FPS)

function loop() {
  contexto.clearRect(0,0,300,530)
  //Fondo
  contexto.drawImage(fondo,0,0)
  contexto.drawImage(suelo,0,contexto.canvas.height - suelo.height)
  //Personaje
  contexto.drawImage(pajaro,personaje.x,personaje.y)
  // Tuberias
  for(i = 0; i < tuberias.length; i++){
    var constante = tuberiaarriba.height + 80
    contexto.drawImage(tuberiaarriba,tuberias[i].x,tuberias[i].y)
    contexto.drawImage(tuberiaabajo,tuberias[i].x,tuberias[i].y + constante)
    tuberias[i].x--
    
    if(tuberias[i].y + tuberiaarriba.height < 80 ){
      tuberias[i].y = 0
    }
    
    if(tuberias[i].x == 150 ){
      tuberias.push({
        x:contexto.canvas.width,
        y: Math.floor(Math.random()*tuberiaarriba.height) - tuberiaarriba.height
      })
    }
    
    // Colisiones
    if(personaje.x + pajaro.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaarriba.width &&
            (personaje.y <= tuberias[i].y + tuberiaarriba.height || 
                personaje.y + pajaro.height >= tuberias[i].y + constante)
                || personaje.y + pajaro.height >= contexto.canvas.height - suelo.height){
            location.reload()
        }
    if (tuberias[i].x == personaje.x){
      score++
      punto.play()
    }
  }
  // Condiciones
  personaje.y += gravedad
  contexto.fillStyle = "rgba(0,0,0,1)"
  contexto.font = "25px Arial"
  contexto.fillText("Score: "+score,10,contexto.canvas.height-40)
}


// Evento
window.addEventListener("resize",resize)
window.addEventListener("keydown",presionar)
