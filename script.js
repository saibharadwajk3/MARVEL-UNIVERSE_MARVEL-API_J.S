const fetch = require("node-fetch");
require("dotenv").config();
//create server
const express = require("express");
const app = express();
app.listen(2000, () => console.log("listening at 2000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

//server side fetch
app.get("/fetchMarvelCharInfo/:name", async(request, response) => {
    let characterName = request.params.name;
    Api_key = process.env.API_KEY;
    //fetch Character info
    const character_url = `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&limit=1&ts=1&apikey=${Api_key}  `;
    const character_res = await fetch(character_url);
    const character_info = await character_res.json();
    response.json(character_info);
});

//fetch comics and series

app.get("/fetchComicsSeries/:cid", async(request, response) => {
    let characterId = request.params.cid;
    Api_key = process.env.API_KEY;
    //fetch comics
    const comic_url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?&limit=10&ts=1&apikey=${Api_key}  `;
    const comic_res = await fetch(comic_url);
    const comic_info = await comic_res.json();
    //fetch series

    const series_url = `https://gateway.marvel.com/v1/public/characters/${characterId}/series?&limit=10&ts=1&apikey=${Api_key}  `;
    const series_res = await fetch(series_url);
    const series_info = await series_res.json();

    total_data = { comic_info, series_info };
    response.json(total_data);
});