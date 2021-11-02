function initListner() {
  // $("#nav nav a").click(function (e) {
  //     var btnID = this.id;
  //     console.log(btnID);
  //     MODEL.getView(btnID);
  // });

  $("nav a").click(function (e) {
    e.preventDefault();
    let btnID = e.currentTarget.id;
    console.log(btnID);
    if (btnID == "login") {
      MODEL.getView(btnID);
    } else if (btnID == "signout") {
      signOut();
    }
  });
}

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
      console.log("user" + user);
      // this is a new comment
      // $(".pName").toggleClass("active");
    } else {
      console.log("user is not signed in");
      // $(".pName").toggleClass("active");
    }
  });
}

function createUser() {
  // leaving this format breaks code
  // let email = $(#email).val();
  // let password = $(#password).val(); //$(#password).val();
  // let firstName = $(#firstName).val();
  // let lastName = $(#lastName).val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password, firstName, lastName)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("You have been signed out!");
      $(".pName").css("display", "none");
      // Sign-out successful.
      document.getElementById("login").display = "block";
      document.getElementById("signout").style.display = "none";

      // $("#login").css("display", "block");
      // $("#signout").css("display", "none");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function loginUser() {
  let password = "password"; //$(#password).val();
  let email = "bkkoehl@iu.edu";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      document.getElementById("login").style.display = "none";
      document.getElementById("signout").style.display = "block";

      // $("#login").css("display", "none");
      // $("#signout").css("display", "block");
      // MODEL.getView("#home");

      console.log(user);
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
    initListner();
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

// /* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

// /* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function stripSideNav() {}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initSite();
    initFirebase();
    initListner();
  } catch {
    console.error(e);
  }
});
