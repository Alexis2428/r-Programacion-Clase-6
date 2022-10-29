/*
TAREA 1: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs + labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.
Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, 
            borrando los inputs ya creados (investigar cómo en MDN).
*/
function crearInputConLabel(i) {
    const nuevoLabel = document.createElement('label');
    nuevoLabel.innerText = `Ingrese la edad del integrante ${i+1} `;
    const nuevoInput = document.createElement('input');
    nuevoInput.setAttribute('type', 'number');
    nuevoInput.className = 'edad';
    const nuevoDiv = document.createElement('div');
    nuevoDiv.appendChild(nuevoLabel);
    nuevoDiv.appendChild(nuevoInput);
    return nuevoDiv;
}

const $botonContinuar = document.querySelector('#continuar');
$botonContinuar.onclick = function() {
    for (let i = 0; i < Number(document.querySelector('#cantidad-integrantes').value); i++) {
        document.querySelector('div').appendChild(crearInputConLabel(i));
    }
    return false;
}
