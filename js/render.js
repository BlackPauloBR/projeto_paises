function criarUL() {
  const ul = document.createElement('ul');
  return ul;
}
function render() {
  function criarLI() {
    let li = document.createElement('li');
    return li;
  }

  function criarButton() {
    let button = document.createElement('button');
    return button;
  }

  function criarImg() {
    let img = document.createElement('img');
    return img;
  }

  function criarDiv() {
    let div = document.createElement('div');
    return div;
  }

  function sortArray() {
    arrayData.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
    arrayDataFav.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }

  function currentPopulacao(tab, populacao) {
    if (tab === 'tabPaises') {
      totalPopFav.value += populacao;
      totalPopFav.textContent = numberFormat.format(totalPopFav.value);
      totalPop.value -= populacao;
      totalPop.textContent = numberFormat.format(totalPop.value);
    } else {
      totalPop.value += populacao;
      totalPop.textContent = numberFormat.format(totalPop.value);
      totalPopFav.value -= populacao;
      totalPopFav.textContent = numberFormat.format(totalPopFav.value);
    }
  }

  function clickadd(event) {
    const nome = event.path[1].childNodes[2].childNodes[0].textContent;
    const bandeira = event.path[1].childNodes[1].src;
    const populacao = event.path[1].childNodes[2].childNodes[1].value;
    const id = event.path[1].childNodes[1].value;
    const tab = event.path[4].id;

    currentPopulacao(tab, populacao); //atualiza a somatoria da populacao total dos 2 grupos.
    if (tab === 'tabPaises') {
      arrayData = arrayData.filter((prop) => id !== prop.id); //deletendo item do arrayData
      arrayDataFav = [...arrayDataFav, { nome, bandeira, populacao, id }];
    } else {
      arrayDataFav = arrayDataFav.filter((prop) => id !== prop.id); //deletendo item do arrayData
      arrayData = [...arrayData, { nome, bandeira, populacao, id }];
    }
    sortArray();

    ulFav.innerHTML = '';
    preRender(arrayDataFav, ulFav, false);
    render();
  }

  function preRender(array, ul1, bolean) {
    //Cria o primeiro acesso na pagina, com os elementos HTML

    for (let i = 0; i < array.length; i++) {
      let li = criarLI();
      let div = criarDiv();
      let button = criarButton();
      let img = criarImg();
      let ul2 = criarUL();
      let liNome = criarLI();
      let liPop = criarLI();
      ul1.appendChild(li);
      li.appendChild(div);
      div.appendChild(button);
      div.appendChild(img);
      div.appendChild(ul2);
      ul2.appendChild(liNome);
      ul2.appendChild(liPop);

      img.src = array[i].bandeira;
      liNome.textContent = array[i].nome;
      liPop.textContent = numberFormat.format(array[i].populacao);
      liPop.value = array[i].populacao;
      if (ul1.classList.value === 'ulPop') {
        button.textContent = '+';
      } else {
        button.textContent = '-';
      }

      img.value = array[i].id;

      div.classList.add('divUnidade');
      li.classList.add('liUnidade');
      button.classList.add('add');
      img.classList.add('img');
      liPop.classList.add('li2');
      liNome.classList.add('li2');

      button.addEventListener('click', clickadd);
    }
  }
  ul.innerHTML = '';
  countPaises.textContent = `(${arrayData.length})`;
  countPaisesFav.textContent = `(${arrayDataFav.length})`;
  preRender(arrayData, ul, true);
}
