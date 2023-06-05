function trylogin() {
    var emailinp = document.getElementById("email").value;
    var passwordinp = document.getElementById("password").value;
    var data = {
        email: emailinp,
        password: passwordinp,
    };

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function (response) {
        if (response.status === 200) {
            window.location.replace("/");
        }
        else {
            alert("Incorrect email or password, please try again");
            console.log(response);
        }
    }
    );
}

document.getElementById("loginbutton").addEventListener("click", trylogin);