function borrarIntegrantesAnteriores() {
    const $integrantes = document.querySelectorAll('.integrante');
    for (let i = 0; i < $integrantes.length; i++) {
        $integrantes[i].remove();
    }
}

function crearIntegrantes(cantidadIntegrantes) {

    if (0 < cantidadIntegrantes) {
        mostrarBotonCalcular();
    }

    for (let i = 0; i < cantidadIntegrantes; i++) {
        crearIntegrante(i);
    };
}

function crearIntegrante(indice) {
    const $integrante = document.createElement('div');
    $integrante.className = 'integrante';

    const $texto = document.createElement('label');
    $texto.innerText = `Ingrese la edad del integrante ${indice + 1}`;
    const $cuadroTexto = document.createElement('input');
    $cuadroTexto.type = 'number';

    $integrante.appendChild($texto);
    $integrante.appendChild($cuadroTexto);

    const $integrantes = document.querySelector('#integrantes');
    $integrantes.appendChild($integrante);
}

function obtenerEdades($listaEdades) {
    const edades = [];
    for (let i = 0; i < $listaEdades.length; i++) {
        edades.push(Number($listaEdades[i].value));
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

function mostrarBotonReiniciar() {
    document.querySelector('#reiniciar').className = '';
}

function ocultarBotonReiniciar() {
    document.querySelector('#reiniciar').className = 'oculto';
}

function mostrarRespuestas() {
    document.querySelector('#respuestas').className = '';
}

function ocultarRespuestas() {
    document.querySelector('#respuestas').className = 'oculto';
}

function validarEdades($edades) {
    const errores = {};

    for (let i = 0; i < $edades.length; i++) {
        errores[i] = validarEdad($edades[i].value);
    }

    const sonValidas = 0 === manejarErrores(errores, $edades);

    return sonValidas;
}

function validarEdad(edad) {
    if ('' === edad) {
        return 'El campo edad no puede estar vacio';
    }

    if (!/^[0-9]+$/.test(edad)) {
        return 'El campo edad solo admite números enteros';
    }

    if (!/^[0-9]{1,3}$/.test(edad)) {
        return 'El campo edad solo admite edades validas (entre 1 y 3 caracteres)'
    }

    return '';
}

function manejarErrores(errores, $edades) {
    let cantidadErrores = 0;

    Object.keys(errores).forEach(function (key) {
        const error = errores[key];

        if (error) {
            cantidadErrores++;
            $edades[key].className = 'error';

            if (!comprobarExisteError(error)) {
                crearError(error);
            }

        } else {
            $edades[key].className = '';
        }
    })

    borrarErroresCorregidos(errores);

    return cantidadErrores;
}

function comprobarExisteError(error) {
    const $errores = document.querySelectorAll('#errores li');

    for (let i = 0; i < $errores.length; i++) {
        if (error === $errores[i].innerText) {
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

function borrarErroresCorregidos(errores) {
    const valorErrores = Object.values(errores);
    const $errores = document.querySelectorAll('#errores li');

    for (let i = 0; i < $errores.length; i++) {
        let existeError = false;

        for (let j = 0; j < valorErrores.length; j++) {
            if ($errores[i].innerText === valorErrores[j]) {
                existeError = true;
                break;
            }
        }

        if (!existeError) {
            $errores[i].remove();
        }
    }
}

function validarCantidadIntegrantes($cantidadIntegrantes) {
    const error = validarNumero($cantidadIntegrantes.value);

    const esValido = manejarError(error, $cantidadIntegrantes);

    return esValido;
}

function validarNumero(cantidadIntegrantes) {
    if ('' === cantidadIntegrantes) {
        return 'El campo cantidad-integrantes no debe estar vacio';
    }

    if (!/^[0-9]+$/.test(cantidadIntegrantes)) {
        return 'El campo cantidad-integrantes solo acepta números enteros';
    }

    return '';
}

function manejarError(error, $cantidadIntegrantes) {
    let noHayError = true;

    if (error) {
        noHayError = false;
        $cantidadIntegrantes.className = 'error';

        if (!comprobarExisteError(error)) {
            crearError(error);
        }

    } else {
        $cantidadIntegrantes.className = '';
    }

    const $errores = document.querySelectorAll('#errores li');

    for (let j = 0; j < $errores.length; j++) {
        if ($errores[j].innerText != error) {
            $errores[j].remove();
            break;
        }
    }

    return noHayError;
}

const $botonContinuar = document.querySelector('#continuar');
$botonContinuar.onclick = function (event) {
    event.preventDefault();

    const $cantidadIntegrantes = (document.querySelector('#cantidad-integrantes'));

    if (validarCantidadIntegrantes($cantidadIntegrantes)) {
        borrarIntegrantesAnteriores();
        crearIntegrantes(Number($cantidadIntegrantes.value));
    }
}

const $botonCalcular = document.querySelector('#calcular');
$botonCalcular.onclick = function (event) {
    event.preventDefault();

    const $listaEdades = document.querySelectorAll('.integrante input');
    const sonValidas = validarEdades($listaEdades);

    if (sonValidas) {
        const edades = obtenerEdades($listaEdades);

        obtenerRespuesta('mayor', obtenerNumeroMayor(edades));
        obtenerRespuesta('menor', obtenerNumeroMenor(edades));
        obtenerRespuesta('promedio', obtenerPromedio(edades).toFixed(1));
        mostrarRespuestas();
        mostrarBotonReiniciar();
    }
}

const $botonReiniciar = document.querySelector('#reiniciar');
$botonReiniciar.onclick = function () {
    borrarIntegrantesAnteriores();
    ocultarRespuestas();
    ocultarBotonCalcular();
    ocultarBotonReiniciar();
}
