function hammyClick() {
    if (document.getElementById("ham").classList.contains("hammy-active")) {
        document.getElementById("ham").classList.remove("hammy-active");
    } else {
        var hammy = document.getElementById("ham");
        hammy.classList.add("hammy-active");
    }

    if (document.getElementById("dropdown").classList.contains("dropHide")) {
        document.getElementById("dropdown").classList.remove("dropHide");
    } else {
        var dropdown = document.getElementById("dropdown");
        dropdown.classList.add("dropHide");
    }
}