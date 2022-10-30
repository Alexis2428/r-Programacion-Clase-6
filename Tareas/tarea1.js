/*
TAREA 1: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs + labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.
Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, 
            borrando los inputs ya creados (investigar cómo en MDN).
*/

function obtenerMayorEdad(edades) {
    let mayorEdad = edades[0];
    for (let i = 1; i < edades.length; i++) {
        if (mayorEdad < edades[i]) {
            mayorEdad = edades[i];
        }
    }
    return mayorEdad;
}
function obtenerMenorEdad(edades) {
    let menorEdad = edades[0];
    for (let i = 1; i < edades.length; i++) {
        if (menorEdad > edades[i]) {
            menorEdad = edades[i];
        }
    }
    return menorEdad;
}
function calcularPromedio(edades) {
    let sumaTotal = 0;
    for (let i = 0; i < edades.length; i++) {
        sumaTotal += edades[i];
    }
    return (sumaTotal / edades.length).toFixed(2);
}
function obtenerEdades() {
    const listaEdades = document.querySelectorAll('.edad');
    const edades = [];
    listaEdades.forEach(edad => {
        if (Number(edad.value) !== 0) {
            edades.push(Number(edad.value));
        }
    });
    return edades;
}

function crearBoton(id, texto) {
    const boton = document.createElement('button');
    boton.setAttribute('type', 'button');
    boton.setAttribute('id', id);
    boton.textContent = texto;
    return boton;
}
function crearInputConLabel(i) {
    const nuevoLabel = document.createElement('label');
    nuevoLabel.textContent = `Ingrese la edad del integrante ${i+1} `;
    const nuevoInput = document.createElement('input');
    nuevoInput.setAttribute('type', 'number');
    nuevoInput.className = 'edad';
    const nuevoDiv = document.createElement('div');
    nuevoDiv.appendChild(nuevoLabel);
    nuevoDiv.appendChild(nuevoInput);
    return nuevoDiv;
}
function iniciarTextoRespuesta() {
    document.querySelector('#mayor-edad').textContent = 'La mayor edad del grupo familiar es ... ';
    document.querySelector('#menor-edad').textContent = 'La menor edad del grupo familiar es ... ';
    document.querySelector('#promedio').textContent = 'El promedio de edades del grupo familiar es ... ';
    return;
}

iniciarTextoRespuesta();
const $botonContinuar = document.querySelector('#continuar');
$botonContinuar.onclick = function() {
    for (let i = 0; i < Number(document.querySelector('#cantidad-integrantes').value); i++) {
        document.querySelector('div').appendChild(crearInputConLabel(i));
    }
    return false;
}
document.querySelector('#boton').appendChild(crearBoton('calcular', 'Calcular'));
const $botonCalcular = document.querySelector('#calcular');
$botonCalcular.onclick = function() {
    const edades = obtenerEdades();
    document.querySelector('#mayor-edad').textContent += obtenerMayorEdad(edades);
    document.querySelector('#menor-edad').textContent += obtenerMenorEdad(edades);
    document.querySelector('#promedio').textContent += calcularPromedio(edades);
    return false;
}
document.querySelector('body').appendChild(crearBoton('resetear', 'Volver a empezar'));
const $botonResetear = document.querySelector('#resetear');
$botonResetear.onclick = function() {
    iniciarTextoRespuesta();
    const padre = document.querySelector('#campo-integrantes');
    while (padre.lastChild) {
        padre.removeChild(padre.lastChild);
    }
    return false;
}
