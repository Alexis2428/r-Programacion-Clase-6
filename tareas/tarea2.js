/* TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual 
de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, 
salario anual promedio y salario mensual promedio.
Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

const $botonAgregar = document.querySelector('#agregar');
$botonAgregar.onclick = function () {
    agregarIntegrante();
    mostrarBotonCalcular();
}

const $botonQuitar = document.querySelector('#quitar');
$botonQuitar.onclick = borrarUltimoIntegrante;

const $botonCalcular = document.querySelector('#calcular');
$botonCalcular.onclick = function (event) {
    event.preventDefault();

    const salarios = obtenerSalarios();

    if ('' === validarSalarios(salarios)) {
        obtenerRespuesta('mayor', obtenerNumeroMayor(salarios));
        obtenerRespuesta('menor', obtenerNumeroMenor(salarios));
        obtenerRespuesta('promedio', obtenerPromedio(salarios).toFixed(2));
        obtenerRespuesta('mensual-promedio', (obtenerPromedio(salarios) / 12).toFixed(2));

        mostrarRespuestas();
        mostrarBotonReiniciar();
    } else {
        alert(validarSalarios(salarios));
    }
}

const $botonReiniciar = document.querySelector('#reiniciar');
$botonReiniciar.onclick = function () {
    borrarIntegrantes();
    ocultarBotonCalcular();
    ocultarRespuestas();
    ocultarBotonReiniciar();
}


function agregarIntegrante() {
    const $texto = document.createElement('label');
    $texto.textContent = 'Ingrese el salario anual ';
    const $cuadroTexto = document.createElement('input');
    $cuadroTexto.type = 'number';

    const $integrante = document.createElement('div');
    $integrante.className = 'integrante';

    $integrante.appendChild($texto);
    $integrante.appendChild($cuadroTexto);

    document.querySelector('#integrantes').appendChild($integrante);
}

function borrarUltimoIntegrante() {
    const $integrantes = document.querySelectorAll('.integrante');
    if (0 < $integrantes.length) {
        const ultimoIntegrante = $integrantes.length - 1;
        $integrantes[ultimoIntegrante].remove();
    }
}

function borrarIntegrantes() {
    const $integrantes = document.querySelectorAll('.integrante');
    for (let i = $integrantes.length; i > 0; i--) {
        borrarUltimoIntegrante();
    }
}

function obtenerSalarios() {
    const $listaSalarios = document.querySelectorAll('.integrante input');
    const salarios = [];
    for (let i = 0; i < $listaSalarios.length; i++) {
        if ('' !== $listaSalarios[i].value) {
            salarios.push(Number($listaSalarios[i].value));
        }
    }
    return salarios;
}

function obtenerRespuesta(tipo, valor) {
    document.querySelector(`#salario-${tipo}`).textContent = valor;
}

function mostrarBotonCalcular() {
    document.querySelector('#calcular').className = '';
}

function ocultarBotonCalcular() {
    document.querySelector('#calcular').className = 'oculto';
}

function mostrarRespuestas() {
    document.querySelector('#respuestas').className = '';
}

function ocultarRespuestas() {
    document.querySelector('#respuestas').className = 'oculto';
}

function mostrarBotonReiniciar() {
    document.querySelector('#reiniciar').className = '';
}

function ocultarBotonReiniciar() {
    document.querySelector('#reiniciar').className = 'oculto';
}

function validarSalarios(salarios) {
    if (0 === salarios.length) {
        return 'Debe ingresar un salario para operar';
    }
    
    return '';
}
