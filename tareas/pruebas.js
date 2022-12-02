function probarValidarSalarios() {
    console.assert(
        validarSalarios([]) === 'Debe ingresar un salario para operar',
        'Validar salarios no validó que no se ingresó ningun salario',
    );
}

probarValidarSalarios();
