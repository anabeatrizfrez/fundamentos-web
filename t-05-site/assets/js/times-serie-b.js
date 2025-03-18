var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "5b4e68c8328830ffe84cb2472a09cdef");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://v3.football.api-sports.io/teams?league=72&season=2023", requestOptions)
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => console.log('error', error));