function carregarDados() {
    let url = 'https://rafaelescalfoni.github.io/desenv_web/filmes.json'

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((filme) => {
                preencherFicha(filme, data);
            })
        })
    .catch((error) => console.error(error));
}

function preencherFicha(filme, dados) {
    const filmeContainer = document.getElementById('filme-container');

    const filmeEmCartaz = document.createElement('section');
    filmeEmCartaz.classList.add('filme-card');

    const filmeInfo = document.createElement('div');
    filmeInfo.classList.add('filme-info');

    const filmeInfos = document.createElement('div');
    filmeInfos.classList.add('filme-infos');

    const filmeAvaliacao = document.createElement('div');
    filmeAvaliacao.classList.add('filme-avaliacao');

    const titulo = document.createElement('h2');
    titulo.textContent = filme.titulo;

    const resumo = document.createElement('p');
    resumo.textContent = filme.resumo;

    const imagem = document.createElement('img');
    imagem.src = filme.figura;
    imagem.alt = filme.titulo;

    const classificacao = document.createElement('p');
    classificacao.textContent = criarEstrelas(mediaEstrelas(filme.opinioes));

    const generos = document.createElement('p');
    generos.textContent = filme.generos.join(', ');

    const titulosSemelhantes = document.createElement('p');
    titulosSemelhantes.textContent = 'Títulos Semelhantes: ' + obterTitulosSemelhantes(filme.titulosSemelhantes, dados).join(', ');

    const elenco = document.createElement('p');
    elenco.textContent = 'Elenco: ' + filme.elenco.join(', ');

    const faixaEtaria = document.createElement('div');
    faixaEtaria.classList.add('faixa-etaria');

    if (filme.classificacao <= 14) {
        faixaEtaria.classList.add('verde');
        faixaEtaria.textContent = 'Livre';
    } else if (filme.classificacao < 18) {
        faixaEtaria.classList.add('amarelo');
        faixaEtaria.textContent = '16';
    } else {
        faixaEtaria.classList.add('vermelho');
        faixaEtaria.textContent = '18';
    }

    filmeEmCartaz.appendChild(filmeInfo);
    filmeInfo.appendChild(imagem);
    filmeInfo.appendChild(filmeInfos);
    filmeInfos.appendChild(titulo);
    filmeInfos.appendChild(generos);
    filmeInfos.appendChild(elenco);
    filmeInfo.appendChild(filmeAvaliacao);
    filmeAvaliacao.appendChild(faixaEtaria);
    filmeAvaliacao.appendChild(classificacao);
    filmeEmCartaz.appendChild(resumo);
    filmeContainer.appendChild(filmeEmCartaz);
    filmeEmCartaz.appendChild(titulosSemelhantes);
}

function mediaEstrelas(opinioes) {
    if (opinioes.length === 0) {
        return 0;
    }

    let total = 0;
    for (let i = 0; i < opinioes.length; i++) {
        total += opinioes[i].rating;
    }

    return total / opinioes.length;
}

function obterTitulosSemelhantes(ids, dados) {
    return ids.map((id) => {
        let filme = dados.find((item) => item.id === id);
        return filme ? filme.titulo : '';
    })
}

function criarEstrelas(rating) {
    let estrelas = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            estrelas += '★';
        } else {
            estrelas += '☆';
        }
    }
    return estrelas;
}

carregarDados();