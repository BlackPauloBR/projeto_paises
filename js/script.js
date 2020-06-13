/*
  Estado da aplicação;
*/
let arrayData = [];
let arrayDataFav = [];

let countPaises = 0;
let countPaisesFav = 0;

let totalPop = 0;
let totalPopFav = 0;
totalPop.value = 0;
totalPopFav.value = 0;

let tabPaises = null;
let tabPaisesFav = null;
let ul = null;
let ulFav = null;

let numberFormat = null;
/* --------------------------------------------
-----------------------------------------------
-----------------------------------------------
-----------------------------------------------
--------------INICIO DO ALGORITMO -------------
-----------------------------------------------
*/
window.addEventListener('load', () => {
  countPaises = document.querySelector('#countPaises');
  countPaisesFav = document.querySelector('#countPaisesFav');
  totalPop = document.querySelector('#totalPop');
  totalPopFav = document.querySelector('#totalPopFav');
  tabPaises = document.querySelector('#tabPaises');
  tabPaisesFav = document.querySelector('#tabPaisesFav');
  numberFormat = Intl.NumberFormat('pt-BR');
  countPaisesFav.textContent = `(0)`; /*   NO INICIO DO ALGORITMO FAVORITOS SÃO SEMPRE (0)      */
  totalPopFav.textContent = `(0)`; /*      NO INICIO DO ALGORITMO FAVORITOS SÃO SEMPRE (0)      */

  const url = 'https://restcountries.eu/rest/v2/all'; //arquivo json com os dados via web api.
  doFetch(url);
});

async function doFetch(endereço) {
  const acess = await fetch(endereço);
  const json = await acess.json();

  acessData(json); //após acessData(), DADOS .json disponiveis para manipulção, em qualquer função;
  //.
  //..
  //...
  //....  DADOS .json(arrayData) disponiveis;

  somaPopulação(); //Captura do valor totalPop para manipulação;*/
  ul = criarUL();
  tabPaises.appendChild(ul);
  ulFav = criarUL();
  tabPaisesFav.appendChild(ulFav);
  ul.classList.add('ulPop');
  ulFav.classList.add('ulPopFav');
  render();
}

/*

  CRIAÇÃO DAS FUNÇÕES:

*/
function acessData(json) {
  arrayData = json
    .map((current) => {
      return {
        nome: current.translations.pt,
        bandeira: current.flag,
        populacao: current.population,
        id: current.numericCode,
      };
    })
    .sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
}

function somaPopulação() {
  totalPop.value = arrayData.reduce((accu, array) => {
    return accu + array.populacao;
  }, 0);
  totalPopFav.value = arrayDataFav.reduce((accu, array) => {
    return accu + array.populacao;
  }, 0);
  totalPop.textContent = numberFormat.format(totalPop.value);
  totalPopFav.textContent = numberFormat.format(totalPopFav.value);
}
