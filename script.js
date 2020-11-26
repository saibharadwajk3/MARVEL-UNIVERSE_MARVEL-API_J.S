let form = document.querySelector("form");
// let searchValue=document.querySelector('input').value
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchValue = document.querySelector("input").value;
    fetchCharacter(searchValue);
});

function fetchCharacter(input) {
    fetch(
            `https://gateway.marvel.com:443/v1/public/characters?name=${input}&limit=1&ts=1&apikey=d54d31326abf669b6c6ce06c4c932296&hash=a9ea88bb43703e9120362274e7ac79cc`
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.data.count == 0) {
                document.querySelector(
                    ".output"
                ).innerHTML = `<article class="message mx-auto"><div class="alert alert-danger " role="alert">
                No Matching Marvel Character To Fetch !
              </div></article>`;
            } else {
                let id = data.data.results[0].id;
                let name = data.data.results[0].name;
                let description = data.data.results[0].description;
                let imageurl = data.data.results[0].thumbnail.path + ".jpg";
                let ComicLink = data.data.results[0].urls[2].url;
                console.log(ComicLink);
                console.log(imageurl);
                //adding into dom
                let output = `
                <div class="flip-card-inner card mx-auto" style="width:23rem;">
                <div class="flip-card-front">
                    <img class="card-img-top" src="${imageurl}" alt="Card image cap">
                    <div class="card-body bg-dark mb-2">
                        <h5 class="card-title "><strong>Name:</strong>${name}</h5>
                        <h5 class="card-title "><strong>Id:</strong>${id}</h5>              
                    </div>
                </div>
                <div class="flip-card-back">
                    <p class="card-text">${description}</p>
                    <a href="${ComicLink}" target="_blank" class="btn btn-primary">Comic Link</a>
                </div>
            </div>          
                    `;
                //inseting
                document.querySelector(".output").innerHTML = output;
            }
        });
}