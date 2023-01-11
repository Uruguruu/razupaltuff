function LoadingCircle() {
  document.write(
    "<meta name='viewport' content='width=device-width, initial-scale=1'> </head> <h2 class='CheckingText'> Checking if you are logged in</h2> <div class='loader'></div>"
  );
}

//  ---Start Timoutfunktion für API VerifikationsToken---
const DreamKey = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "1");
});
const timeoutkey = new Promise((resolve, reject) => {
  //setTimeout(resolve, 400, "0"); Wird als String augegeben, deshalb ''beim schlussentlichen auslesen.
  async function CheckKey(){
  await fetch("http://localhost:3004/check_key")
  
            .then((res) => res.json())
            .then((json) => {
              data = json;
              console.log("key received: " + json);
            });
}});

//By racing the two different Variables i can achive a specific Timout range.
async function KeyVerify() {
    return Promise.race([DreamKey, timeoutkey]);
  }

  KeyVerify().then(LogedIn);


async function LogedIn(KeyReceived) {
    const key = await KeyReceived;
    console.log("Here is you key: "+ key)
    if (key === '1') { // schlussentliches auslesen.
      console.log("No Key Found or Timeouted");
      window.location.href = "./login_and_signup.html";
    } else {
      console.log("Key found logging in...");
      window.location.href = "../Html/AccountView.html";
    }
  }
//  ---Ende Timoutfunktion für API VerifikationsToken---