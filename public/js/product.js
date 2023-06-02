document.getElementById("buy").addEventListener("click", function () {

    var quantity = (document.getElementsByClassName("quantity")[0]).value;
    var id = this.getAttribute("iddata");

    window.location.href = `/cart/${id}/${quantity}`;

});