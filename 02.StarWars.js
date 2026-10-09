const axios = require("axios");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

const API_BASE = "https://swapi.dev/";

const clearConsole = () => {
  console.clear();
};

const getplanetsList = async (search = 0, page = 10) => {
  const url = API_BASE.endsWith("/") ? API_BASE : API_BASE + "/";
  const response = await axios.get(
    `${url}api/planets`,
  );
  return response.data.results;
};

const printplanetsList = async () => {
  clearConsole();
  console.log("Cargando lista de planetas...");
  const planetsList = await getplanetsList();
  clearConsole();
  console.log("Lista de planetas:");
  for (const planet of planetsList) {
    console.log(`* ${planet.name.toUpperCase()}`);
  }
  await input("Presione Enter para continuar...");
};

const printMenu = (isInvalidOption, option) => {
  if (isInvalidOption) {
    console.log(`La opción '${option}' ingresada no es válida`);
  }
  console.log("================================================");
  console.log("1. Ver lista de planetas");
  console.log("2. Ver información de un planeta");
  console.log("3. Salir");
  console.log("================================================");
} 

//2. quiero crear el punto dos del menu y que me traiga toda la descripcion de un planet
const getPlanetsDescription= async (id) => {
  const url = API_BASE.endsWith("/") ? API_BASE : API_BASE + "/";
  const response = await axios.get(`${url}api/planets/${id}`);
  return response.data;

};

const printPlanetDescription = async () => {
  clearConsole();
  const idPlanet = await input('Numero del planeta: ');
  if(Number.parseInt(idPlanet) === NaN) {
    clearConsole();
    console.log("Ingreso un número de planeta invalido");
    await input('Presione enter para continuar...');
    return;
  }
  const searchPlanet = await getPlanetsDescription(idPlanet);
  if(!searchPlanet) {
    clearConsole();
    console.log("El planeta ingresado, no existe.");
    await input('Presione enter para continuar...');
    return;
  }
  clearConsole();
  console.log('Nombre: ' + searchPlanet.name);
  console.log('Clima: ' + searchPlanet.climate);
  console.log('Diametro: ' + searchPlanet.diameter);
  console.log('Poblacion: '+ searchPlanet.population);
  await input('Precione enter para continuar...');
};

const main = async () => {
  clearConsole();

  let option = "";
  let isInvalidOption = false;
  while (true) {
    printMenu(isInvalidOption, option);
    option = await input("Ingrese la opción: ");
    // Option 1: register a new user.
    if (option === "1") {
      await printplanetsList();
      clearConsole();
      isInvalidOption = false;
      continue;
    }
    
    if (option === "2") {
      await printPlanetDescription();    
      clearConsole();
      isInvalidOption = false;
      continue;
    }

    if (option === "3") {
      process.exit(0);
      break;
    }

    if (option !== "1" && option !== "2" && option !== "3") {
      isInvalidOption = true;
      clearConsole();
      continue;
    }
  }
};

main();