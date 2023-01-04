function LoadingCircle(){
setTimeout(LogedIn, 500)
document.write("<meta name='viewport' content='width=device-width, initial-scale=1'> </head> <h2 class='CheckingText'> Checking if you are logged in</h2> <div class='loader'></div>")
}

function LogedIn(){
    if (LoginKey === undefined){
        console.log("No Key Found")
    } else {
        console.log("Key found")
        window.location.href = "./login_and_signup.html";
    }
}