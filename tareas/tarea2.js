/* TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual 
de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, 
salario anual promedio y salario mensual promedio.
Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

}
    }
}
    }
}
function obtenerSalarios() {
    const salarios = [];
    const listaSalarios = document.querySelectorAll('.salario-anual');
    listaSalarios.forEach(salario => {
        if (Number(salario.value) !== 0) {
            salarios.push(Number(salario.value));
        }
    });
    return salarios;
}

function iniciarTextoRespuesta() {
    document.querySelector('#mayor-salario').textContent = 'El mayor salario anual es ... ';
    document.querySelector('#menor-salario').textContent = 'El menor salario anual es ... ';
    document.querySelector('#salario-anual-promedio').textContent = 'El salario anual promedio es ... ';
    document.querySelector('#salario-mensual-promedio').textContent = 'El salario mensual promedio es ... ';
    return;
}
function crearInputConLabel() {
    const label = document.createElement('label');
    label.textContent = 'Ingrese el salario anual ';
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'salario-anual';
    const nuevoDiv = document.createElement('div');
    nuevoDiv.appendChild(label);
    nuevoDiv.appendChild(input);
    return nuevoDiv;
}

const $botonAgregar = document.querySelector('#agregar');
const $botonQuitar = document.querySelector('#quitar');
const $nodoPadre = document.querySelector('#formulario-datos');
iniciarTextoRespuesta();
$botonAgregar.onclick = function() {
    $nodoPadre.appendChild(crearInputConLabel());
    return false;
}
$botonQuitar.onclick = function() {
    $nodoPadre.removeChild($nodoPadre.lastChild);
    return false;
}
}
const $botonLimpiar = document.querySelector('#limpiar');
$botonLimpiar.onclick = function() {
    iniciarTextoRespuesta();
}
