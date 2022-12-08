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

function obtenerSalarios($listaSalarios) {
    const salarios = [];
    for (let i = 0; i < $listaSalarios.length; i++) {
        salarios.push(Number($listaSalarios[i].value));
    }
    return salarios;
}

function obtenerRespuesta(tipo, valor) {
    document.querySelector(`#salario-${tipo}`).innerText = valor;
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

function validarSalarios(event) {
    event.preventDefault();
    
    const errores = {};
    const $salarios = document.querySelectorAll('.integrante input');

    for (let i = 0; i < $salarios.length; i++) {
        errores[i] = validarSalario($salarios[i].value);
    }

    const sonValidos = 0 === manejarErrores(errores, $salarios);

    if (sonValidos) {
        const salarios = obtenerSalarios($salarios);
        
        obtenerRespuesta('mayor', obtenerNumeroMayor(salarios));
        obtenerRespuesta('menor', obtenerNumeroMenor(salarios));
        obtenerRespuesta('promedio', obtenerPromedio(salarios).toFixed(2));
        obtenerRespuesta('mensual-promedio', (obtenerPromedio(salarios) / 12).toFixed(2));

        mostrarRespuestas();
        mostrarBotonReiniciar();
    }
}

function validarSalario(salario) {
    if ('' === salario) {
        return 'El campo salario no debe estar vacio';
    }

    if (!/^[0-9]+[\.,]*[0-9]{0,2}$/.test(salario)) {
        return 'El campo salario solo admite hasta 2 decimales';
    }

    return '';
}

function manejarErrores(errores, $salarios) {
    let cantidadErrores = 0;

    Object.keys(errores).forEach(function(key){
        const error = errores[key];

        if (error) {
            cantidadErrores++;
            $salarios[key].className = 'error';
            
            if (!comprobarExisteError(error)) {
                crearError(error);
            }

        } else {
            $salarios[key].className = '';
        }
    })

    const $listaErrores = document.querySelectorAll('#errores li');
    borrarErroresCorregidos(errores, $listaErrores);

    return cantidadErrores;
}

function comprobarExisteError (error) {
    const $listaErrores = document.querySelectorAll('#errores li');

    for (let i = 0; i < $listaErrores.length; i++) {
        if (error === $listaErrores[i].innerText) {
            return true;
        }
    }

    return false;
}

function crearError(error) {
    const $error = document.createElement('li');
    $error.innerText = error;

    document.querySelector('#errores').appendChild($error);
}

function borrarErroresCorregidos(errores, $listaErrores) {
    const valorErrores = Object.values(errores);

    for (let i = 0; i < $listaErrores.length; i++) {
        let existeError = false;

        for (let j = 0; j < valorErrores.length; j++) {
            if ($listaErrores[i].innerText === valorErrores[j]) {
                existeError = true;
                break;
            }
        }

        if (!existeError) {
            $listaErrores[i].remove();
        }
    }
}

const $botonAgregar = document.querySelector('#agregar');
$botonAgregar.onclick = function () {
    agregarIntegrante();
    mostrarBotonCalcular();
}

const $botonQuitar = document.querySelector('#quitar');
$botonQuitar.onclick = borrarUltimoIntegrante;

const $botonCalcular = document.querySelector('#calcular');
$botonCalcular.onclick = validarSalarios;

const $botonReiniciar = document.querySelector('#reiniciar');
$botonReiniciar.onclick = function () {
    borrarIntegrantes();
    ocultarBotonCalcular();
    ocultarRespuestas();
    ocultarBotonReiniciar();
}
