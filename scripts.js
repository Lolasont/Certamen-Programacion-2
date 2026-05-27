//Variables para el DOM
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCargo = document.getElementById('cargo');
const inputCorreo = document.getElementById('correo');
const seccionTabla = document.getElementById('tablaColaboradores');
const btn = document.getElementById('botonEnviar');
const inputBusqueda = document.getElementById('busqueda');

const errorNombre = document.getElementById('errorNombre');
const errorApellido = document.getElementById('errorApellido');
const errorCargo = document.getElementById('errorCargo');
const errorCorreo = document.getElementById('errorCorreo')

//Arreglos Principales
let colaboradores = [];
let idContador = 0;

function validarCampo(campo, errorElemento) {
    const valor = campo.value.trim();

    if (valor === '') {
        errorElemento.textContent = 'El campo no puede estar vacío';
        return false;
    }

    if (valor.length < 3) {
        errorElemento.textContent = 'El campo no puede tener menos de 3 caracteres';
        return false;
    }

    errorElemento.textContent = '';
    return true;
}

//Validacion del correo
function validarCorreo(campo, errorElemento) {
    const correo = campo.value.trim();

    if (correo === '') {
        errorElemento.textContent = 'El campo no puede estar vacío';
        return false;
    }

    if (!correo.includes('@') || !correo.endsWith('@empresa.cl')) {
        errorElemento.textContent = 'El correo debe tener el dominio @empresa.cl';
        return false;
    }

    errorElemento.textContent = '';
    return true;
}

//Crear objeto colaborador
function crearColaborador(){
    idContador++;
    return {
        id: idContador,
        nombre: inputNombre.value.trim(),
        apellido: inputApellido.value.trim(),
        cargo: inputCargo.value.trim(),
        correo: inputCorreo.value.trim()
    };
}

//Funcion paral impiar el formulario
function limpiarFormulario(){
    inputNombre.value = '';
    inputApellido.value = '';
    inputCargo.value = '',
    inputCorreo.value = '';
}

//Renderizar la tabla
function renderizarTabla(lista) {
    seccionTabla.innerHTML = '';

    if (lista.length === 0) return;

    const table = document.createElement("table");
    const caption = document.createElement("caption");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    caption.textContent = 'Colaboradores registrados';
    table.appendChild(caption);

    const trHead = document.createElement('tr');
    ['Nombre','Apellido','Cargo','Correo corporativo'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    lista.forEach(colaborador => {
        const tr = document.createElement('tr');

        ['nombre','apellido','cargo','correo'].forEach(campo => {
            
        const td = document.createElement('td');
        td.textContent = colaborador[campo];
        tr.appendChild(td);
        });

        const tdBtn = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarColaborador(colaborador.id));
        tdBtn.appendChild(btnEliminar);
        tr.appendChild(tdBtn);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    seccionTabla.appendChild(table)
}

function eliminarColaborador(id){
    colaboradores = colaboradores.filter(c => c.id !== id);
    renderizarTabla(colaboradores)
}

function filtrarColaboradores(texto) {
    return colaboradores.filter(c =>
        c.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        c.cargo.toLowerCase().includes(texto.toLowerCase())
    );
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
   const val_nombre = validarCampo(inputNombre,errorNombre);
   const val_apellido = validarCampo(inputApellido,errorApellido);
   const val_cargo = validarCampo(inputCargo,errorCargo);
   const val_correo = validarCorreo(inputCorreo,errorCorreo);

    if (!val_nombre || !val_apellido|| !val_cargo || !val_correo) return;

    colaboradores.push(crearColaborador());
    renderizarTabla(colaboradores);
    limpiarFormulario();
});

inputBusqueda.addEventListener('input', () => {
    renderizarTabla(filtrarColaboradores(inputBusqueda.value));
});

