function LoadingCircle() {
  document.write(
    "<meta name='viewport' content='width=device-width, initial-scale=1'> </head> <h2 class='CheckingText'> Checking if you are logged in</h2> <div class='loader'></div>"
  );
}

//  ---Start Timoutfunktion für API VerifikationsToken---
const DreamKey = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "0");
});
const timeoutkey = new Promise((resolve, reject) => {
  setTimeout(resolve, 400, "1"); //Wird als String augegeben, deshalb ''beim schlussentlichen auslesen.
});

KeyVerify();
LogedIn();
//By racing the two different Variables i can achive a specific Timout range.
async function KeyVerify() {
    return Promise.race([DreamKey, timeoutkey]);
  }

  KeyVerify().then(LogedIn);


async function LogedIn(KeyReceived) {
    const key = await KeyReceived;
    console.log("Here is you key"+ key)
    if (key === '1') { // schlussentliches auslesen.
      console.log("No Key Found or Timeouted");
      window.location.href = "./login_and_signup.html";
    } else {
      console.log("Key found logging in...");
    }
  }
//  ---Ende Timoutfunktion für API VerifikationsToken---