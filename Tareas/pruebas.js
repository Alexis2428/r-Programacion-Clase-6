function probarValidarEdades() {
    console.assert(
        validarEdades([]) === 'Debe ingresar una edad antes de operar',
        'Validar edades no validó que no se ingresó una edad',
    )
}

probarValidarEdades();
