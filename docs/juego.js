var contexto = document.getElementById("LienzoJuego").getContext("2d")
contexto.canvas.width = 300
contexto.canvas.height = 700

var FPS = 60

var personaje = {
  x:100,
  y:150,
  w:50,
  h:50
}

SetInterval(loop,1000/FPS)

function loop() {
  contexto.fillStyle="rgba(100,0,0,1)"
  contexto.fillRect(personaje.x,personaje.y,personaje.w,personaje.h)
}
