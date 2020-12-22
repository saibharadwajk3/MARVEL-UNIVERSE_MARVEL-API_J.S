let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchValue = document.querySelector("input").value;
    fetchCharacter(searchValue);
});
//send request to server to fetch character info then populate dom
async function fetchCharacter(input) {
    const url1 = `/fetchMarvelCharInfo/${input}`;
    let response = await fetch(url1);
    let data1 = await response.json();
    if (data1.data.count == 0) {
        document.querySelector(
            ".output"
        ).innerHTML = `<article class="message mx-auto"><div class="alert alert-danger mt-2 mb-2" role="alert">
                No Matching Marvel Character To Fetch !
              </div></article>`;

        setTimeout(() => document.querySelector("article").remove(), 2000);
        setTimeout(() => location.reload(), 3000);
    } else {
        let id = data1.data.results[0].id;
        let name = data1.data.results[0].name;
        let description = data1.data.results[0].description;
        let imageurl = data1.data.results[0].thumbnail.path + ".jpg";
        let stories = data1.data.results[0].stories.items.slice(1, 4);
        addStories(stories);
        let att = data1.attributionHTML;
        addFooter(att);
        fetchComicsSeries(id);
        //adding image with nav bar into dom
        let output = `
                <div class="card mb-2 text-center ">
                    <div class="card-header links ">
                        <ul class="nav nav-pills card-header-pills mx-auto">
                        <li class="nav-item">
                                <a class="nav-link activa" >HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">COMICS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">SERIES</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">STORIES</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">ATTRIBUTION</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link">SOURCECODE</a>
                        </li>
                        </ul>
                    </div>
                    <div class="card " id="HOME">
                        <img class="card-img-top main mt-2" src="${imageurl}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title"><strong>Name:</strong>${name}</h5>
                            <h5 class="card-title "><strong>Id:</strong>${id}</h5>
                            <p class="card-text">${description}</p>

                        </div>
                    </div>
                    </div>
               `;
        document.querySelector(".output").innerHTML = output;
    }
}
//send request to server to fetch comics and series
async function fetchComicsSeries(id) {
    const url2 = `/fetchComicsSeries/${id}`;
    let response = await fetch(url2);
    let info = await response.json();
    console.log(info);
    //call addComics and addSeries function to populate dom
    addComics(info.comic_info);
    addSeries(info.series_info);
}
//add comics to dom
function addComics(data2) {
    let results = filterImages(data2.data.results);
    console.log(results);
    let output2 = "";
    results.forEach((item) => {
        output2 =
            output2 +
            ` <div class="row output2 mx-auto mt-2">
                        <div class="col-sm-4">
                <div class="card bg-dark" style="width: 18rem;">
                    <img class="card-img-top" src="${item.thumbnail.path}.jpg" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title"><strong>Id:</strong>${item.id}</h5>
                        <h5 class="card-title"><strong>Title:</strong>${item.title}</h5>
                        <a href="${item.urls[0].url}" class="btn btn-primary mt-2 mb-2">Read more</a>
                    </div>
                </div>
            </div>
                        </div>
                        `;
    });
    document.querySelector(
        ".main2"
    ).innerHTML = `  <div class="row-col col-md-12 mx-auto mt-2 mb-2 ">
                <a href="#" class="btn btn-danger mt-2 mb-2" id="COMICS">comics</a>
    
            </div>${output2}`;
}
//add series to dom
function addSeries(data3) {
    let result = filterImages(data3.data.results);
    console.log(result);
    let output3 = "";

    result.forEach((item) => {
        output3 =
            output3 +
            ` <div class="row output3 mx-auto mt-2">
                    <div class="col-sm-4">
            <div class="card bg-dark" style="width: 18rem;">
                <img class="card-img-top" src="${item.thumbnail.path}.jpg" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title"><strong>Id:</strong>${item.id}</h5>
                    <h5 class="card-title"><strong>Title:</strong>${item.title}</h5>
                    <a href="${item.urls[0].url}" class="btn btn-primary mt-2 mb-2">Read more</a>
                </div>
            </div>
        </div>
                    </div>
                    `;
    });
    //inseting
    document.querySelector(
        ".main3"
    ).innerHTML = `  <div class="row-col col-md-12 mx-auto mt-2 mb-2 ">
            <a href="#" class="btn btn-danger mt-2 mb-2" id="SERIES">series</a>
        </div>${output3}`;
}
//add stories to dom
function addStories(stories) {
    let output4 = "";
    stories.forEach((item) => {
        output4 =
            output4 +
            ` <div class="row output2 mx-auto mt-2">
            <div class="col-sm-4">
                <div class="card text-center  bg-dark mb-2" style="width: 18rem; ">
                    <div class="card-body">
                        <h5 class="card-title"><strong>Name:</strong>${item.name}</h5>
                        <h5 class="card-title"><strong>Type:</strong>${item.type}</h5>
                        <a href="${item.resourceURI}" class="btn btn-primary mt-2 mb-2">Link</a>
                   </div>
                </div>
            </div>
        </div>
        `;
    });
    document.querySelector(
        ".main4"
    ).innerHTML = `  <div class="row-col col-md-12 mx-auto mt-2 mb-2 ">
    <a href="#" class="btn btn-danger mt-2 mb-2" id="STORIES">stories</a>

</div>${output4}`;
}
//add footer to dom
function addFooter(att) {
    document.querySelector(
        ".main5"
    ).innerHTML = `<div id="footer" class="col text-center ">

<div class="row mt-4 mb-4">
<div class="col git" id="SOURCECODE">
    <a href="https://github.com/saibharadwajk3/MARVEL-UNIVERSE_MARVEL-API_J.S.git" target="_blank">Code at  <i class="fa fa-github fa-2x" ></i></a>

</div>

<div class="col attribution" id="ATTRIBUTION">
   ${att}
</div>
</div>
</div>`;
}
//filter objects that has no images
function filterImages(obj) {
    let comicWithImages = [];
    let count = 0;
    for (let i = 0; i < obj.length; i++) {
        if (count == 6) {
            break;
        }
        let path = obj[i].thumbnail.path;

        if (!path.includes("image_not_available")) {
            comicWithImages.push(obj[i]);
            count++;
        } else {
            console.log("it has image not available");
        }
    }
    console.log(comicWithImages);
    return comicWithImages;
}
//annimation
document.addEventListener("click", (e) => {
    let id = e.target.innerHTML;
    console.log(id);
    let array = [
        "HOME",
        "COMICS",
        "SERIES",
        "STORIES",
        "ATTRIBUTION",
        "SOURCECODE",
    ];
    if (array.includes(id)) {
        smoothScroll(id);
    } else {
        console.log("no");
    }
});
//smooth scroll
function smoothScroll(id) {
    let elem = document.getElementById(`${id}`);

    elem.scrollIntoView({
        behavior: "smooth",
    });

    console.log(elem);
    if (elem.id !== "HOME") {
        elem.classList.add("animate");
        setTimeout(() => elem.classList.remove("animate"), 3000);
    }
}