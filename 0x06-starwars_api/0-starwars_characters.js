#!/usr/bin/node
const request = require("request");

const apiUrl = "https://swapi-api.alx-tools.com/api";

if (process.argv.length > 2) {
  const filmUrl = apiUrl + "/films/" + process.argv[2];
  request.get(filmUrl, async (error, res, body) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    const characterArr = [];
    body = JSON.parse(body);
    let characters = body.characters;
    for (const characterLink of characters) {
      characterArr.push(character(characterLink));
    }

    characters = await Promise.all(characterArr);

    characters.forEach((character) => {
      console.log(JSON.parse(character).name);
    });
  });
} else {
  console.log("Usage: film id required");
}

function character(characterLink) {
  return new Promise((resolve, reject) => {
    request(characterLink, (error, res, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}
