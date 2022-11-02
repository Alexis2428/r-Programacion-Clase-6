/*
TAREA 1: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs + labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.
Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, 
            borrando los inputs ya creados (investigar cómo en MDN).
*/

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

    }
}
    }
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
