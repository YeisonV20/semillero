const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

// Función para simular BorrarPantalla()
async function borrarPantalla() {
    await rl.question('\nPresiona ENTER para continuar...');
    console.clear();
}

// Inicialización de matrices
const filas = 9;
const columnas = 9;

function crearMatriz(f, c, valorInicial) {
    return Array.from({ length: f }, () => Array(c).fill(valorInicial));
}

const campo = crearMatriz(filas, columnas, '~');
const barcos = crearMatriz(filas, columnas, 0);

// Configuración de barcos
barcos[5][7] = 1;

barcos[7][2] = 2;
barcos[8][2] = 2;

barcos[1][1] = 3;
barcos[1][2] = 3;
barcos[1][3] = 3;

barcos[8][5] = 4;
barcos[8][6] = 4;
barcos[8][7] = 4;
barcos[8][8] = 4;

barcos[3][4] = 5;
barcos[4][4] = 5;
barcos[5][4] = 5;
barcos[6][4] = 5;

function imprimirTablero() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (j === 0) campo[i][j] = i;
            if (i === 0) campo[i][j] = j;
            process.stdout.write(campo[i][j] + '\t');
        }
        console.log();
    }
}

function verificarBarcoHundido(idBarco) {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (barcos[i][j] === idBarco) {
                return false; // El barco aún existe
            }
        }
    }
    return true; // El barco se hundió
}

async function iniciarJuego() { 
    for (let turno = 0; turno <= 100; turno++) {
        console.log("Acaba con el enemigo: ");
        imprimirTablero();

        let p1, p2;
        while (true) {
            console.log("\nIngrese las coordenadas donde desea atacar\n");
            p1 = parseInt(await rl.question("Ingrese la coordenada de fila (1-8): "));
            p2 = parseInt(await rl.question("Ingrese la coordenada de columna (1-8): "));

            if (isNaN(p1) || isNaN(p2) || p1 >= filas || p2 >= columnas || p1 < 1 || p2 < 1) {
                console.log("\nPosicion invalida, Intentalo de nuevo\n");
            
            } else {
                break;
            }
        }

        const objetivo = barcos[p1][p2];

        if (objetivo >= 1 && objetivo <= 5) {
            console.log("Le diste");
            campo[p1][p2] = 'X';
            barcos[p1][p2] = 0;

            if (verificarBarcoHundido(objetivo)) {
                console.log(`Barco ${objetivo} hundido`);
            } else {
                console.log("Tocado");
            }
        } else {
            console.log("fallaste");
        }

        await borrarPantalla();
        imprimirTablero();

        // Verificar si se eliminaron todos los barcos
        const todosCeros = barcos.every(fila => fila.every(celda => celda === 0));

        if (todosCeros) {
            console.log("Acabaste con todos\n FIN DEL JUEGO\n");
            await borrarPantalla();
            return;
        } else {
            console.log("Siguiente Turno");
        }

        await borrarPantalla();
    }
}

async function menu() {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log("MENU\n");
        console.log("Presiona una opcion");
        console.log("1.Inciar juego.");
        console.log("2.Reglas.");
        console.log("3.Bonus.");
        console.log("4.Creditos");
        console.log("5.salir.\n");
        console.log("!!Recomendacion!!: Lee las Reglas antes de seleccionar cualquier opcion.");

        const opcion = parseInt(await rl.question("\nOpcion: "));
        await borrarPantalla();

        switch (opcion) {
            case 1:
                await iniciarJuego();
                break;

            case 2:
                console.log(" REGLAS DE JUEGO\n");
                console.log("1. Las filas se cuentan con las coordenadas que se muestran de arriba hacia abajo.\n");
                console.log("2. Las columnas se cuentan con las coordenadas que se muestran de izquierda a derecha.\n");
                console.log("3. Ingresa un valor para la fila, luego para la columna donde deseas atacar,\n estas no deben ser cero, o mayores a ocho\n");
                console.log("4. Si en la posicion elegida se encuentra una parte de barco saldra el mensaje 'Tocado',\n de lo contrario 'fallaste'.\n");
                console.log("5. Si logras acabar con todas las partes de un barco resultara en 'hundido'.\n");
                console.log("6. Sigue las instrucciones que el mismo juego te ordena.\n");
                console.log("7. Hay 5 barcos, acaba con todos los barcos para ganar la partida.\n");
                console.log("8. Disfruta del juego.\n");
                console.log("9. No entres a nuestro bonus, 'No lo entenderias'.\n");
                await borrarPantalla();
                break;

            case 3:
                console.log("BONUS");
                console.log("CALCULADORA DE PESO");
                const nombre = await rl.question("Ingrese su nombre: ");
                const peso = await rl.question("Ingrese su peso en Kg: ");
                // Mantiene el comportamiento original donde se intercambian nombre y peso al imprimir
                console.log(`Hola ${peso} Kg , tu peso es: ${nombre}\n`);
                await borrarPantalla();
                break;

            case 4:
                console.log("CREDITOS");
                console.log("Univerdidad Pedagogica y Tecnologica de Colombia\n");
                console.log("Semillero Programacion");
                console.log("Profesor Andres Roa \n");
                console.log("INTEGRANTES:\n");
                console.log("NOMBRE: John Jairo Vargas Correa \tCODIGO:202323420");
                console.log("NOMBRE: Yeison David Velandia Correa\tCODIGO:202314683");
                console.log("NOMBRE:Miguel Angel Buitrago Martin \tCODIGO:202313701");
                await borrarPantalla();
                break;

            case 5:
                console.log("Fin del programa, bye bye");
                salir = true;
                rl.close();
                break;

            default:
                console.log("!!NO SEAS WEY!!, opcion invalida");
                await borrarPantalla();
                break;
        }
    }
}

// Ejecutar programa
menu();