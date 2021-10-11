function initListen() {
    $("#nav nav .links a").click(function (e) {
        var btnID = this.id;
        console.log(btnID);
        MODEL.getView(btnID);
    });
}

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/", "");

    if (!pageID) {
        MODEL.getView("about");
    } else {
        MODEL.getView(pageID);
    }
}

function initListeners() {
    $(window).on("hashchange", route);
    route();
}

function initSite() {
    $.get("pages/nav/nav.html", function (nav) {
        $("#nav").html(nav);
    });

    $.get("pages/home/home.html", function (data) {
        $("#content").html(data);
    });

    $.get("pages/footer/footer.html", function (data) {
        $("#footer").html(data);
    });
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
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
    initListeners();
});