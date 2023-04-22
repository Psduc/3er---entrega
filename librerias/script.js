let botonError = document.getElementById("botonError")
let botonSuccess = document.getElementById("botonSuccess")
botonError.addEventListener("click", alerta)
botonSuccess.addEventListener("click", alerta)

function alerta(e) {
  if (e.target.id == "botonError") {
    lanzarAlerta("hubo un error", "error")
  } else if (e.target.id == "botonSuccess") {
    lanzarAlerta("todo bien", "success")
  }
}

function lanzarAlerta(titulo, icon) {
  Swal.fire({
    title: titulo,
    icon: icon,
    showConfirmButton: false,
    timer: 1500,
    iconHtml: '&',
  })
}

const DateTime = luxon.DateTime
let fecha = DateTime.local()
let otraFecha = DateTime.fromObject({
  year: 2015,
  month: 5,
  day: 23
})
console.log(fecha)
console.log(otraFecha.toString())
console.log(fecha.day)
console.log(fecha.month)
console.log(fecha.year)