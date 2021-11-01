



function initListen() {
    // $("#nav nav a").click(function (e) {
    //     var btnID = this.id;
    //     console.log(btnID);
    //     MODEL.getView(btnID);
    // });

    $("nav a").click(function (e) {
        e.preventDefault();
        let btnID = e.currentTarget.id;
        console.log(btnID)
        if (btnID == "login"){
            $.get("pages/login/login.html", function (data) {
                $("#content").html(data);
            });
        } else if (btnID == "signout") {
            signOut();
        }
    });
        
};

function initFirebase() {
    // firebase.auth().signInAnonymously().then(() => {
    //     console.log("signed in");
    // }).catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     _db = [];
    // })

    firebase.auth().onAuthStateChanged(function (user) {
        // handle it
        if (user) {
            console.log("User is now signed in");
            $(".pName").css("display", "block");
            // $(".pName").toggleClass("active");

        } else {
            console.log("user is not signed in");
            // $(".pName").toggleClass("active");
        }
    });
}

function createUser() {
    let email = "bkkoehl@iu.edu";
    let password = "password"; //$(#password).val();
    let firstName = "Bryce";
    let lastName = "Koehl";


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(userCredential.user)
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });

}

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("You have been signed out!")
        $(".pName").css("display", "none");
        // Sign-out successful.
        document.getElementById("login").display = "block";
        document.getElementById("signout").style.display = "none";
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}


function loginUser() {
    let password = "password"; //$(#password).val();
    let email = "bkkoehl@iu.edu";
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
        
            document.getElementById("login").display = "none";
            document.getElementById("signout").style.display = "block";
            
            
            console.log("Signed In");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
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

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function () {
    initSite();
    initListen();
    try {
        let app = firebase.app();
        initFirebase();
        initListner();
    } catch {
        console.error(e);
    }
});