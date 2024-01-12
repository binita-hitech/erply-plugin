import axios from 'axios';

// var sessionKey = localStorage.getItem('sessionKey');
// var session = JSON.parse(sessionKey);

let httpclient = axios.create({

  //baseURL: 'http://192.168.1.88/api/',
  //baseURL: 'http://192.168.1.88:8000/api/',
  baseURL: 'https://erply.retailcare.com.au/CustomReports/processTab/',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
//     // 'Content-Type': "application/json",
//     Authorization: "Bearer " + "",
//   },
});

export default httpclient;