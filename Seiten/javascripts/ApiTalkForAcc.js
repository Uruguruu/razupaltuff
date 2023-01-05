/*var token = "1234";
const ApiUrl = "http://localhost:3004/login";
console.log(ApiUrl);

//let data = { email: "niel@gmail.com", password: "Niel" };
fetch(ApiUrl, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    email: 'niel@gmail.com',
    password: 'Niel'
  }
}).then(res => {
    return res.json()
})
.then(data => console.log(data))
.catch(error => console.log('ERROR'))*/

<script src="https://unpkg.com/axios/dist/axios.min.js"> </script>
axios.post('/login',{
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  })
  .then(function (response) {
   data = response["data"];
   location.href = response["data"];
   console.log(response);
 })
