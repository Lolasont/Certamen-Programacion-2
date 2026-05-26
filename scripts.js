const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const inputCargo = document.getElementById('cargo')
const inputCorreo = document.getElementById('correo')
const datosTabla = document.getElementById('tablaColaboradores')
const btn = document.getElementById('botonEnviar')


function datos_usuario(nombre,apellido,cargo,correo){
    nombre = inputNombre.value.trim();
    apellido = inputApellido.value.trim();
    cargo = inputCargo.value.trim()
    correo = inputCorreo.value.trim()

    let datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        cargo: cargo,
        correo: correo
    }
    console.log(datosUsuario)
}

function renderizarTabla(nombre){
    const caption = document.getElementById('tablaColaboradores')
    caption.innerHTML = "" 
    colaboradores.forEach((colaborador,index) => {
        const table = document.createElement("table")
        const caption = document.createElement("caption")
        const thead = document.createElement("thead")
        const tr = document.createElement("tr")
        const th = document.createElement("th")
        const tbody = document.createElement("tbody")
        const td = document.createElement(td)
        caption.textContent = "Colaboradores registrados"
        th.textContent = "Nombre"
        th.textContent = "Apellido"
        th.textContent = "Cargo"
        th.textContent = "Correo corporativo"
        table.appendChild(caption)
        caption.appendChild(thead)
        thead.appendChild(tr)
        tr.appendChild(th)
        table.appendChild(tbody)
        tbody.appendChild(td)
    });

}

btn.addEventListener("click",(e)=>{
e.preventDefault
datos_usuario(inputNombre,inputApellido,inputCargo,inputCorreo)
})
