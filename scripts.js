//Variables para el DOM
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCargo = document.getElementById('cargo');
const inputCorreo = document.getElementById('correo');
const seccionTabla = document.getElementById('tablaColaboradores');
const btn = document.getElementById('botonEnviar');
const inputBusqueda = document.getElementById('busqueda');

//Mensajes de error
const errorNombre = document.getElementById('errorNombre');
const errorApellido = document.getElementById('errorApellido');
const errorCargo = document.getElementById('errorCargo');
const errorCorreo = document.getElementById('errorCorreo')

//Arreglos Principales
let colaboradores = [];
let idContador = 0;

//Funcion para validar campos de texto
function validarCampo(campo, errorElemento) {
    const valor = campo.value.trim();
    //validar si esta vacio
    if (valor === '') {
        errorElemento.textContent = 'El campo no puede estar vacío';
        return false;
    }
    //validar largo minimo
    if (valor.length < 3) {
        errorElemento.textContent = 'El campo no puede tener menos de 3 caracteres';
        return false;
    }
    //validar que no tenga numeros
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(valor)) {
        errorElemento.textContent = 'El campo no puede contener números';
        return false;
    }
    //si pasa validacion
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
    //validar formato completo
    const regex = /^[a-zA-Z0-9._%+-]+@empresa\.cl$/;

    if (!regex.test(correo)) {
        errorElemento.textContent = 'Correo inválido (debe ser @empresa.cl)';
        return false;
    }
    if (colaboradores.some(c => c.correo === correo)) {
        errorElemento.textContent = 'No se puede repetir correo';
        return false;
    }
    errorElemento.textContent = '';
    return true;
}

//Crear objeto colaborador
function crearColaborador(){
    idContador++;
    //retornar objeto
    return {
        id: idContador,
        nombre: inputNombre.value.trim(),
        apellido: inputApellido.value.trim(),
        cargo: inputCargo.value.trim(),
        correo: inputCorreo.value.trim()
    };
}

//Funcion para limpiar el formulario
function limpiarFormulario(){
    inputNombre.value = '';
    inputApellido.value = '';
    inputCargo.value = '';
    inputCorreo.value = '';
}

//Renderizar la tabla
function renderizarTabla(lista) {
    seccionTabla.innerHTML = '';

    //si no hay datos no mostrar nada
    if (lista.length === 0) return;

    //crear estructura tabla
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    caption.textContent = 'Colaboradores registrados';
    table.appendChild(caption);

    //encabezado
    const trHead = document.createElement('tr');

    ['Nombre','Apellido','Cargo','Correo corporativo','Boton eliminar'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    //recorrer lista de colaboradores
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

        //evento eliminar
        btnEliminar.addEventListener('click', () => eliminarColaborador(colaborador.id));
        tdBtn.appendChild(btnEliminar);
        tr.appendChild(tdBtn);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    seccionTabla.appendChild(table)
}

//Funcion para eliminar colaborador
function eliminarColaborador(id){
    //filtrar lista eliminando el id
    colaboradores = colaboradores.filter(c => c.id !== id);
    //actualizar tabla
    renderizarTabla(colaboradores)
}

//Funcion para filtrar colaboradores
function filtrarColaboradores(texto) {
    return colaboradores.filter(c =>
        c.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        c.cargo.toLowerCase().includes(texto.toLowerCase())
    );
}

//Evento boton registrar
btn.addEventListener('click', (e) => {
    //evitar recarga
    e.preventDefault();
    //validaciones
   const val_nombre = validarCampo(inputNombre,errorNombre);
   const val_apellido = validarCampo(inputApellido,errorApellido);
   const val_cargo = validarCampo(inputCargo,errorCargo);
   const val_correo = validarCorreo(inputCorreo,errorCorreo);

   //si falla algo no continuar
    if (!val_nombre || !val_apellido|| !val_cargo || !val_correo) return;

    //agregar colaborador
    colaboradores.push(crearColaborador());

    //actualizar tabla
    renderizarTabla(colaboradores);

    //limpiar formulario
    limpiarFormulario();
});

//Evento busqueda en tiempo real
inputBusqueda.addEventListener('input', () => {
    renderizarTabla(filtrarColaboradores(inputBusqueda.value));
});

