const titulo = document.getElementById("main-titulo")

const requestOptions = {
    method: 'GET',
    headers: {
        "x-rapidapi-key": "5b4e68c8328830ffe84cb2472a09cdef"
    }
};

const anoAtual = new Date().getFullYear();
const ANO_MINIMO = 2022;

function buscarTimes(ano) {
    return fetch(`https://v3.football.api-sports.io/teams?league=71&season=${ano}`,  requestOptions)

    .then(response => response.json())
    .then(data => {
        if (
            data.response &&
            data.response.length
        ) {
            return {ano, data};
        }

    throw new Error("Sem dados para o ano " + ano);
    });
}

function tentarAnos(ano) {
    if (ano < ANO_MINIMO) {
        console.error("Nenhum ano válido encontrado");
        return;
    }

    buscarTimes(ano)
    .then(resultado => {
        titulo.innerHTML += " " + resultado.ano;
        montarTimes(resultado.data);
    })
    .catch(() => {
        tentarAnos(ano - 1);
    });
}

function montarTimes(data) {
    var container = document.getElementById("times");

        data.response.forEach(teamData => {
            var team = teamData.team;

            var div = document.createElement("article");
            div.classList.add("time");

            var img = document.createElement("img");
            img.src = team.logo;

            var teamName = document.createElement("p");
            teamName.textContent = team.name;

            div.appendChild(img);
            div.appendChild(teamName);
            container.appendChild(div);
        });
    }

tentarAnos(anoAtual);