
document.getElementById("buy").addEventListener("click", function () {

    var quantity = (document.getElementsByClassName("quantity")[0]).value;
    var id = this.getAttribute("iddata");

    window.location.href = `/cart/${id}/${quantity}`;

});

function updateTotal() {
    var total = document.getElementById("totalprice");
    var quan = document.getElementById("totalquantity");
    var newt = (parseInt(total.innerText) * parseInt(quan.innerText));
    document.getElementById("totalprice").innerText = (`Total: ${newt}`);
}


function checkfields() {
    var checkadd = document.getElementById("address");
    var checkcity = document.getElementById("city");
    var checkzip = document.getElementById("zip");

    if (checkadd.value === "" || checkcity.value === "" || checkzip.value === "") {
        alert("Please fill out all fields");
        return false;
    } else {
        return true;
    }

}

async function checkout() {
    if (checkfields()) {
        var totalinp = document.getElementById("totalprice");
        var quantityinp = document.getElementById("totalquantity");
        var addressinp = document.getElementById("address");
        var cityinp = document.getElementById("city");
        var stateinp = document.getElementById("statevalue");
        var zipinp = document.getElementById("zip");
        var total = (totalinp.getAttribute("pricedata"));
        var quantity = quantityinp.innerText;
        var address = addressinp.value;
        var city = cityinp.value;
        var state = stateinp.value;
        var zip = zipinp.value;
        var userid = document.getElementById("checkbut").getAttribute("userdata");

        total = parseInt(total);
        var prodid = document.getElementById("idspan").getAttribute("prodiddata");
        prodid = parseInt(prodid);
        console.log(total);

        await fetch('/api/pricecheck', {
            method: 'POST',
            body: JSON.stringify({
                points: total
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                if (response.status === 200) {
                    fetch('/api/spend', {
                        method: 'POST',
                        body: JSON.stringify({
                            points: total,
                            total: total,
                            quantity: quantity,
                            address: address,
                            city: city,
                            state: state,
                            zip: zip,
                            product_id: prodid,
                            user_id: userid
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                alert("Order placed successfully");
                                window.location.href = "/account";
                            }
                            else {
                                alert("Something went wrong");
                            }
                        }
                        );

                }
                else if (response.status === 201) {
                    alert("You do not have enough points to purchase this item");
                }
            });


    }
};

