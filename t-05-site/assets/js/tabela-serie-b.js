var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "5b4e68c8328830ffe84cb2472a09cdef");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://v3.football.api-sports.io/standings?season=2023&league=72", requestOptions)
    .then(response => response.json())
    .then(data => {
        var container = document.getElementById("tabela");

        var table = document.createElement("table");
        table.classList.add("tabela"); 

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");

        var headers = ["", "Clube", "", "Pts", "PJ", "VIT", "E", "DER", "GM", "GC", "SG"];
        headers.forEach(headerText => {
            var th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        var tbody = document.createElement("tbody");

        data.response[0].league.standings[0].forEach(teamStanding => {
            var row = document.createElement("tr");

            var rowData = [
                teamStanding.rank,
                teamStanding.team.logo,
                teamStanding.team.name,
                teamStanding.points,
                teamStanding.all.played,
                teamStanding.all.win,
                teamStanding.all.draw,
                teamStanding.all.lose,
                teamStanding.all.goals.for,
                teamStanding.all.goals.against,
                teamStanding.goalsDiff,
            ];

            rowData.forEach((text, index) => {
                var cell = document.createElement("td");

                if (index === 1) {
                    var logoImg = document.createElement("img");
                    logoImg.src = text;
                    logoImg.alt = teamStanding.team.name;
                    logoImg.height = 25;
                    logoImg.width = 25;
                    cell.appendChild(logoImg);
                } else {
                    cell.textContent = text;
                }
                if (index === 0) {
                    if (teamStanding.rank <= 4) {
                        cell.classList.add("promocao");
                    }
                    else if (teamStanding.rank >= 17 && teamStanding.rank <= 20) {
                        cell.classList.add("rebaixamento");
                    } else {
                        cell.classList.add("nada");
                    }
                }
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        container.appendChild(table);
    })
