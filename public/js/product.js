document.getElementById("buy").addEventListener("click", function () {

    var quantity = (document.getElementsByClassName("quantity")[0]).value;
    var id = this.getAttribute("iddata");

    window.location.href = `/cart/${id}/${quantity}`;

});

function updateTotal() {
    var total = document.getElementById("totalprice");
    var quan = document.getElementById("totalquantity");
    var newt = (parseInt(total.innerText) * parseInt(quan.innerText));
    document.getElementById("totalprice").innerText=(`Total: ${newt}`);
}