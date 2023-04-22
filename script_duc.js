
let productos = [
  {
    id: 11,
    nombre: "Plazo Fijo",
    categoria: "inversiones",
    tasa: "A partir del 75%",
    plazo: "Minimo 30 dias",
    stock: "100",
    img: "https://www.cronista.com/files/image/461/461576/62827e0e57465_700_462!.jpg?s=c29087ebafb9912a15409b418431d208&d=1675856418"
  },
  {
    id: 12,
    nombre: "Fondos de Inversion",
    categoria: "inversiones",
    tasa: "A partir del 75%",
    plazo: "A partir de 24hs",
    stock: "100",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZza_TiMT8tZzPZltrLBKAivdQRDKPiMUukQ&usqp=CAU"
  },
  {
    id: 13,
    nombre: "Bolsa",
    categoria: "inversiones",
    tasa: " ",
    plazo: " ",
    stock: "100",
    img: "https://ekosnegocios.com/image/posts/May2021/Jjerhp47M1bdoMGirrep.jpeg"
  },
  {
    id: 14,
    nombre: "Credito Hipotecario",
    categoria: "creditos",
    tasa: "A partir del 65%",
    plazo: "Minimo 10 años",
    stock: "100",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgH9XJSu5dXiHgFXP7TtI9nNr0XwFkNUoSs7Xe3fWCmELMpxAQjAy-wWXTzgw65rqTxzg&usqp=CAU"
  },
  {
    id: 15,
    nombre: "Credito Prendario",
    categoria: "creditos",
    tasa: "A partir del 105%",
    plazo: "hasta 3 años",
    stock: "100",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9stYNcTVRjD5UaSDvjkepdA4EhibkYvuMA&usqp=CAU"
  },
  {
    id: 16,
    nombre: "Tarjeta de Credito",
    categoria: "paquetes",
    tasa: " ",
    plazo: " ",
    stock: "100",
    img: "https://www.cronista.com/files/image/116/116787/5ff7562022aaa.jpg"
  }
]

let carritoDOM = document.getElementById("carrito")


function finalizarCompra() {
  alert("Un asesor se comunicara con usted a la brevedad")
  localStorage.removeItem("carrito")
  carrito = []
  renderizarCarrito(carrito)
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || []
renderizarCarrito(carrito)



renderizarProductos(productos)

function renderizarProductos(arrayProductos) {
  let contenedor = document.getElementById("wrapper")
  contenedor.innerHTML = ""
  arrayProductos.forEach(({ nombre, categoria, img, tasa, plazo, id }) => {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "tarjetaProducto"

    tarjetaProducto.innerHTML = `
      <h2 class=tituloProducto>${nombre}</h2>
      <p>${categoria}</p>
      <div class=imagen style="background-image: url(${img})"></div>
      <h3>TASA: ${tasa}</h3>
      <h4>PLAZO: ${plazo}</h4>
      <button id=${id}>AGREGAR AL CARRITO</button>
      `
      {/* <button id=${id}>SIMULAR</button> */}
    contenedor.appendChild(tarjetaProducto)

    let boton = document.getElementById(id)
    boton.addEventListener("click", agregarProductoAlCarrito)
  })
}

function agregarProductoAlCarrito(e) {

  
  let posicionProd = productos.findIndex(producto => producto.id == e.target.id)
  let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
  
  if (productos[posicionProd].stock > 0) {
    lanzarTostada()
    
    /* let elementoSpan = document.getElementById("span" + e.target.id)
    productos[posicionProd].stock--
    elementoSpan.innerHTML = productos[posicionProd].stock */
    
    if (carrito.some(({ id }) => id == productoBuscado.id)) {
      let pos = carrito.findIndex(producto => producto.id == productoBuscado.id)
      /* carrito[pos].unidades++
      carrito[pos].subtotal = carrito[pos].precio * carrito[pos].unidades */
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        categoria: productoBuscado.categoria
      })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
  } else {
    lanzarAlerta("SIN STOCK", `Producto ${productoBuscado.nombre} sin stock`, "error")
  }
}

function renderizarCarrito(arrayDeProductos) {
  carritoDOM.innerHTML = ""
  arrayDeProductos.forEach(({ nombre, categoria  }) => {
    carritoDOM.innerHTML += `<h3>${nombre} ${categoria}</h3>`
  })
  carritoDOM.innerHTML += `<button id=comprar>Finalizar compra</button>`

  let botonComprar = document.getElementById("comprar")
  botonComprar.addEventListener("click", finalizarCompra)
}

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrar)

function filtrar(e) {
  let arrayFiltrado = productos.filter(producto => producto.nombre.includes(buscador.value))
  console.log(arrayFiltrado)
  renderizarProductos(arrayFiltrado)
}


let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito() {
  let contenedorProductos = document.getElementById("contenedorProductos")
  carritoDOM.classList.toggle("ocultar")
  contenedorProductos.classList.toggle("ocultar")
}

function lanzarAlerta(title, text, icon) {
  Swal.fire({
    title: title,
    text, // text: text
    icon: icon
  })
}

function lanzarTostada() {
  Toastify({
    text: "Producto agregado correctamente",
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){console.log("HOLA")} // Callback after click
  }).showToast()
}