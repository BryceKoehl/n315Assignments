
function initListen() {
    $("#nav nav a").click(function (e) {
        var btnID = this.id;
        console.log(btnID);
        MODEL.getView(btnID);
    });
}

function initSite() {
    $.get("pages/nav/nav.html", function (nav) {
        $("#nav").html(nav);

        initListen();
    });

    $.get("pages/home/home.html", function (data) {
        $("#content").html(data);
    });

    $.get("pages/footer/footer.html", function (data) {
        $("#footer").html(data);
    });
}


function hamburgerDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = documnet.getElementsByClassName("dropdwon-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

$(document).ready(function () {
    initSite();
    initListen();
});