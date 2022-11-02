/*
TAREA 1: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs + labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.
Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, 
            borrando los inputs ya creados (investigar cómo en MDN).
*/

const $botonContinuar = document.querySelector('#continuar');
$botonContinuar.onclick = function(event) {
    borrarIntegrantesAnteriores();
    crearIntegrantes();

    event.preventDefault();
}

const $botonCalcular = document.querySelector('#calcular');
$botonCalcular.onclick = function(event) {
    const edades = obtenerEdades();
    obtenerRespuesta('mayor', obtenerNumeroMayor(edades));
    obtenerRespuesta('menor', obtenerNumeroMenor(edades));
    obtenerRespuesta('promedio', obtenerPromedio(edades));
    mostrarRespuestas();
    
    event.preventDefault();
}

const $botonReiniciar = document.querySelector('#reiniciar');
$botonReiniciar.onclick = function() {
    borrarIntegrantesAnteriores();
    ocultarRespuestas();
    ocultarBotonCalcular();
}

function borrarIntegrantesAnteriores() {
    const $integrantes = document.querySelectorAll('.integrante');
    for (let i = 0; i < $integrantes.length; i++) {
        $integrantes[i].remove();
    }
}

function crearIntegrantes() {
    const cantidadIntegrantes = Number(document.querySelector('#cantidad-integrantes').value);

    if (0 < cantidadIntegrantes) {
        mostrarBotonCalcular();
    }

    for (let i = 0; i < cantidadIntegrantes; i++) {
        crearIntegrante(i);
    };
}

function crearIntegrante(i) {
    const $div = document.createElement('div');
    $div.className = 'integrante';

    const $label = document.createElement('label');
    $label.textContent = `Ingrese la edad del integrante ${i + 1}`;
    const $input = document.createElement('input');
    $input.type = 'number';

    $div.appendChild($label);
    $div.appendChild($input);

    const $integrantes = document.querySelector('#integrantes');
    $integrantes.appendChild($div);
}

function obtenerEdades() {
    const listaEdades = document.querySelectorAll('.integrante input');
    const edades = [];
    for (let i = 0; i < listaEdades.length; i++) {
        if ('' !== listaEdades[i].value) {
            edades.push(Number(listaEdades[i].value));
        }
    }
    return edades;
}

function obtenerRespuesta(tipo, valor) {
    document.querySelector(`#${tipo}-edad`).textContent = valor;
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
