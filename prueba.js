const fetch = require("node-fetch");

const request = async () => {
  const response = await fetch("https://type.fit/api/quotes");
  const json = await response.json();
  const random = Math.floor(Math.random() * json.length);
  return json[random].text + " " + json[random].author;
};

console.log(await request());
