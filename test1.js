alert('al toke perro')

var canvas = document.querySelector('canvas')
var input = document.getElementById('cantidad')
var c = canvas.getContext('2d')

var cantidadObjetos = 1000
var a = []
var velocidadX = 30
var velocidadFinalY = 6
var dispersion = 50
var diferenciaTamano = 10
var tamanoMedio = 4
var arraydeColores = ['black', 'white', 'green', 'red', 'blue', 'brown', 'pink', 'purple', 'yellow']

var deltaTiempo = 0.008
var gravedad = 9.81

window.addEventListener('resize',
  function () {
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 100
  }
)

// Clase caja
class Box {
  constructor () {
    this.anchoX = tamanoMedio + Math.random() * diferenciaTamano * 2
    this.anchoY = tamanoMedio + Math.random() * diferenciaTamano
    this.posX = 0
    this.posY = 0
    this.color = coloralAzar()
    this.velocidadX = (Math.random() - 0.5) * velocidadX * 3
    this.velocidadFinalY = (Math.random() - 0.5) * velocidadX
    // this.velocidadFinalY = velocidadFinalY + Math.random() * velocidadFinalY / 2
    this.vibracion = 1
    this.tiempo = 0
  }
}

input.addEventListener('keyup', function (event) {
  event.preventDefault()
  if (event.keyCode === 13) {
    if (input.value < 2000) {
      cantidadObjetos = input.value
      reiniciarObjetos()
      // aca deberia volver a hacer el for para generar mas objetos
    }
  }
})

// muestra el valor en la caja de texto
input.value = cantidadObjetos

function reiniciarObjetos () {
  while (a.length > 0) {
    a.pop()
  }
  for (let i = 0; i < cantidadObjetos; i++) {
    a.push(new Box())
  }
}
reiniciarObjetos()

function dibujar (event) {
  // Al hacer click posiciona los elementos alrededor del mouse.
  reiniciarObjetos()

  for (let i = 0; i < cantidadObjetos; i++) {
    a[i].posX = event.clientX + (Math.random() - 0.5) * dispersion
    a[i].posY = event.clientY + (Math.random() - 0.5) * dispersion
    // console.log(a[1].posX);

    c.fillStyle = a[i].color
    c.fillRect(a[i].posX - a[i].x, a[i].posY - a[i].y, a[i].anchoX, a[i].anchoY)
    // console.log('dibujado')
  }
}

function coloralAzar () {
  return (arraydeColores[Math.floor(Math.random() * arraydeColores.length)])
}

function cambiacolordeFondo () {
  canvas.style.backgroundColor = 'red'
}

function animate () {
  // limpiar la pantalla
  c.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < cantidadObjetos; i++) {
    a[i].tiempo += deltaTiempo
    a[i].velocidadX *= 0.995
    a[i].vibracion *= 0.995

    // Movimiento en X
    a[i].posX += (Math.random() * a[i].velocidadX * a[i].vibracion)

    // Choca con la derecha
    if ((a[i].posX + a[i].anchoX) > canvas.width) {
      a[i].posX -= (a[i].anchoX - (canvas.width - a[i].posX))
      a[i].velocidadX *= -0.3
    }

    // Choca con la izquierda
    if (a[i].posX < 0) {
      a[i].posX += (0 - a[i].posX)
      a[i].velocidadX *= -0.3
    }

    // Movimiento en Y
    a[i].posY += a[i].velocidadFinalY + (gravedad * a[i].tiempo)

    // Choca con el suelo
    if ((a[i].posY + a[i].anchoY) > canvas.height) {
      a[i].posY -= (a[i].anchoY - (canvas.height - a[i].posY))

      // para que deje de calcular cuando la velocidad es muy chica
      if (a[i].velocidadFinalY > 0) {
        a[i].velocidadFinalY *= -0.5
        a[i].tiempo = 0
      }
    }

    // Choca con el techo
    if (a[i].posY < 0) {
      a[i].posY += (0 - a[i].posY)
      a[i].velocidadFinalY *= -0.3
      a[i].tiempo = 0
    }
    c.fillStyle = a[i].color
    c.fillRect(a[i].posX, a[i].posY, a[i].anchoX, a[i].anchoY)
  }
  requestAnimationFrame(animate)
}
animate()
