let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;
console.log(hostname);

if(hostname === 'aryawebstudio.in') {
  backendHost = 'http://scoreboardapi.aryawebstudio.in';
} else if(hostname === 'localhost') {
  backendHost = 'http://127.0.0.1:8080';
}
module.exports = Object.freeze({
  API_URL :backendHost,
});
