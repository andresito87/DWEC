function numeroDiasSemanasAnyos(){
    let hoy = new Date();
    let anyo;
    let mes;
    let dia;

    //Pedimos un año válido
    do{
        anyo = prompt("Introduce año: ");
        anyo = parseInt(anyo);
    
        if(isNaN(anyo) || anyo < 0){
            alert("Año incorrecto");
        }
    }while(isNaN(anyo) || anyo < 0);

    //Comprobamos si es bisiesto para tenerlo en cuenta en los cálculos
    let bisiesto =  (anyo % 4 === 0 && anyo % 100 !== 0) || (anyo % 400 === 0);
    
    //Pedimos un número de mes válido
    do{
        mes = prompt("Introduce mes: ");
        mes = parseInt(mes);
        if(isNaN(mes) || mes < 1 || mes > 12){
            alert("Mes incorrecto");
        }
    }while(isNaN(mes) || mes < 1 || mes > 12);

    //Pedimos el día y comprobamos que sea válido
    //Para ello tenemos que tomar en cuenta el mes y si es o no bisiesto en caso de que el mes sea 2
    let diaMax;
    do{
        dia = prompt("Introduce dia");
        dia = parseInt(dia);
        
        switch(mes){
            case 1, 3, 5, 7, 8, 10, 12:
                diaMax = 31;
                break;
            case 2:
                diaMax = 28;
                //Si el año es bisiesto aumentamos en 1 el número de días de febrero
                if(bisiesto) 
                    diaMax++;
                break;
            case 4, 6, 9, 11:
                diaMax = 30;
                break;
        }
        if(isNaN(dia) || dia < 1 || dia > diaMax){
            alert("Día incorrecto");
        }
    }while(isNaN(dia) || dia < 1 || dia > diaMax);

    //Controla el número de días que tiene un año tanto si es o no bisiesto
    let numDiasAnyo = 365;
    if(bisiesto)
        numDiasAnyo++;

    //Creamos un objeto Date con los datos introducidos
    //El mes en javascript comienza en 0 por eso restamos 1
    let fecha = new Date(anyo, mes-1, dia);
    fecha.setFullYear(anyo); //Para que coja el año de dos cifras correctamente

    let diferenciaDias;

    //Controla si la fecha es anterior o posterior a la fecha actual
    if(fecha < hoy){
        diferenciaDias = hoy - fecha;
    }else{
        diferenciaDias = fecha - hoy;
    }
    
    //Calculamos la diferencia (el resultado nos lo da en milisegundos, lo pasamos a días)
    diferenciaDias = Math.floor(diferenciaDias/(1000*60*60*24));
    
    //Calculamos cuantos años completos hay en el número de días calculados
    let difAnyos = Math.floor(diferenciaDias/numDiasAnyo);

    //Nos quedamos con el resto
    diferenciaDias = diferenciaDias%numDiasAnyo;

    //Calculamos cuantas semanas hay en esos días
    let difSemanas = Math.floor(diferenciaDias/7);

    //Nos quedamos con el resto
    let difDias = diferenciaDias % 7;

    document.write("<p>La fecha introducida es: "+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+"</p>");
    document.write("<p>Hoy es: "+hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear()+"</p>");
    document.write("<p>La diferencia entre las dos fechas es: "+difAnyos+" años, "+difSemanas+" semanas y "+difDias+" días</p>");
}