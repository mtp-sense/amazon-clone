// A very popular fetch library which allows us to send GET, POST and other requests
//It allows us to interact with APIs very easily

import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-project1-a-179c1.cloudfunctions.net/api",

  //The API (Cloud function) URL -- Local
  // "http://localhost:5001/project1-a-179c1/us-central1/api",
});

export default instance;
