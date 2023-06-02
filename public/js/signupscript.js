document.getElementById("submitButton").addEventListener("click", function () {
    var nonulls = true;
    if (document.getElementById("username").value === "") {
        nonulls = false;
    }
    if (document.getElementById("password").value === "") {
        nonulls = false;
    }
    if (document.getElementById("email").value === "" || document.getElementById("email") === null) {
        nonulls = false;
    }
    if (document.getElementById("firstname").value === "") {
        nonulls = false;
    }
    if (document.getElementById("lastname").value === "") {
        nonulls = false;
    }
    if (nonulls === false) {
        alert("Please fill out all fields");
        return;
    } else {
        var emailcheck = document.getElementById("email").value;
        var usercheck = document.getElementById("username").value;
        var passwordcheck = document.getElementById("password").value;
        var firstnamecheck = document.getElementById("firstname").value;
        var lastnamecheck = document.getElementById("lastname").value;
        
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                user_name: usercheck,
                user_password: passwordcheck,
                user_email: emailcheck,
                first_name: firstnamecheck,
                last_name: lastnamecheck
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            if (response.status === 200) {
                window.location.href = "/shop";
            }
            else {
                console.log(response);
                alert("Username or email already exists");
            }
        });
    }
});

