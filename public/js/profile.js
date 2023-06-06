const updatebut = document.getElementById("updatebut");
const fnameimp = document.getElementById("firstname");
const lnameimp = document.getElementById("lastname");
const emailimp = document.getElementById("email");
const usernameimp = document.getElementById("username");
const passwordimp = document.getElementById("password");
updatebut.addEventListener('click', async function (event) {
    let update = true;
    if (emailimp.value !== "") {
        await fetch('/api/updateemail', {
            method: 'post',
            body: JSON.stringify({
                user_email: emailimp.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            if (response.status === 200) {
                console.log(response);
            }else{
                alert("Email already in use");
                update = false;
            }
        }
        );
    }

    if (update === true) {
        if (fnameimp.value !== "") {
            await fetch('/api/updatefirstname', {
                method: 'post',
                body: JSON.stringify({
                    user_first_name: fnameimp.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                }
            });
        }

        if (lnameimp.value !== "") {
            await fetch('/api/updatelastname', {
                method: 'post',
                body: JSON.stringify({
                    user_last_name: lnameimp.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                }
            });
        }



        if (usernameimp.value !== "") {
            await fetch('/api/updateusername', {
                method: 'post',
                body: JSON.stringify({
                    user_name: usernameimp.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                }
            });
        }

        if (passwordimp.value !== "") {
            await fetch('/api/updatepassword', {
                method: 'post',
                body: JSON.stringify({
                    user_password: passwordimp.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                }
            });
        }

        window.location.reload();
    }
});







window.onload = async function () {
    await fetch('/api/checkorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(async function (data) {

                    const orderslot = document.getElementById("orders");
                    const orders = data.orderarr;
                    for (var i = 0; i < orders.length; i++) {
                        var ordercard = document.createElement("article");
                        orderslot.appendChild(ordercard);
                        var orderdiv = document.createElement("div");
                        orderdiv.setAttribute("id", `order${i}`);
                        ordercard.appendChild(orderdiv);
                        await fetch('/api/getproductimg', {
                            method: 'POST',
                            body: JSON.stringify({
                                product_id: orders[i].product_id,
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then(function (response) {
                            if (response.status === 200) {
                                response.json().then(function (data) {
                                    console.log(i - 1);
                                    console.log('sd');
                                    var imgpath = `./images/${data.productimg}`;
                                    var orderimg = document.createElement("img");
                                    orderimg.setAttribute("src", imgpath);
                                    orderimg.setAttribute("style", "width: 100px; height: 100px;")
                                    var curcard = document.getElementById(`order${i - 1}`);
                                    curcard.appendChild(orderimg);

                                });
                            } else {
                                console.log(response);
                                alert("Something went wrong");
                            }
                        });
                        var orderdate = document.createElement("p");
                        orderdate.innerText = `Order Date: ${orders[i].date_ordered}`;
                        orderdiv.appendChild(orderdate);
                        var ordertotal = document.createElement("p");
                        ordertotal.innerText = `Total: ${orders[i].total}`;
                        orderdiv.appendChild(ordertotal);
                    }
                });

            } else if (response.status === 201) {
                var noorders = document.CreateElement("p");
                noorders.innerText = "You have no orders";
                document.getElementById("orders").appendChild(noorders);
            } else {
                alert("Something went wrong");
            }
        });
}