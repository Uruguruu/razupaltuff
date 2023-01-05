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
function loginTest(){
    axios.post('http://localhost:3004/login',{
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then(async function (response) {
       data = await response["data"];
       location.href = await response["data"];
       console.log(response);
     })
}
console.log("document.getElementById('email').value");

