//initialize the site and establish the has change
function initListeners() {
  $(window).on("hashchange", route);
  route();
}

//init firebase to check if the user has logged in to the site
function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("#login").html(
        `<i id="logoutButton" onclick='logout()' class='fas fa-sign-out-alt'></i>`
      );
      console.log("There is a user");
    } else {
      $("#login").html(`<img src='./images/login.svg' />`);
      console.log("This is no user");
    }
  });
}

//establish route funtion inorder to use the veiw injection method
function route() {
  let pageID = window.location.hash;
  let ID = pageID.replace("#/", "");
  if (ID == "" || ID == "main") {
    MODEL.getPageContent("main");
    loadCoffeeMakers();
    coffeeMakers = [];
  } else if (ID == "checkout") {
    MODEL.getPageContent("checkout", appendToCart);
  } else {
    MODEL.getPageContent(ID);
  }
}

//create mobile nav funciton that will show and hide he mbile nav
function mobileNav() {
  let active = false;
  $(".mobile-nav").click(function (e) {
    active = !active;
    if (active) {
      $(".pageLinks").css("left", 0);
    } else {
      $(".pageLinks").css("left", -200);
    }
  });
}

//log in the user via firebase
function login() {
  console.log("login");
  let password = $("#loginPassword").val();
  let email = $("#loginEmail").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      window.alert("Signed In");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage);
    });
}

//log out the user via firebase
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.alert("You have signed out");
    })
    .catch((error) => {
      console.log(error);
      window.alert(error);
    });
}

//signe up the user via firebase
function signup() {
  console.log("signup");
  let password = $("#signupPassword").val();
  let email = $("#signupEmail").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
      window.alert("User has signed up!");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

//establish the cart array to store the ID values of the coffemakers
let cartArray = [];

//estbalish array for the object values that have the same id as the cartArray ID's
let coffeeArray = [];

//establosh a function that gathers the item being added to the carts infomation fromt he json file via its ID
function addtoCart(id) {
  console.log(id);
  window.alert("You have added to your cart");
  cartArray.push(id);
  $("#numberOfItems").html(cartArray.length);
}

//add the newly added item to the array housing theobjects in the users cart
function appendToCart() {
  let totalPrice = 0;

  console.log(cartArray);
  for (var i = 0; i < coffeeMakers.length; i++) {
    for (var x = 0; x < cartArray.length; x++) {
      if (coffeeMakers[i].id === cartArray[x]) {
        coffeeArray.push(coffeeMakers[i]);
      }
    }
  }

  //console.log(coffeeArray);
  for (var i = 0; i < coffeeArray.length; i++) {
    totalPrice += coffeeArray[i].price;
    $("#cartItems").append(`
      <div class="coffeeMaker" id="cartItem${coffeeArray[i].id}">
      <div class="imgHolder">
        <img src="../../images/coffeeMaker${coffeeArray[i].id}.webp" />
      </div>
      <div class="colorPicker">
        <div class="largeCircle">
          <div class="whiteCircle">
            <div class="smallCircle"></div>
          </div>
        </div>
      </div>
      <div class="coffeeInfo">
        <h1>${coffeeArray[i].name}</h1>
        <p>$${coffeeArray[i].price}</p>
        <div class="ratings">
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>  
          <p>${coffeeArray[i].rating.decimal} | (${coffeeArray[i].rating.number})</p>
        </div>
        <div class="freeShipping">
          <img src="../../images/shipping.svg"/>
          <p>Free shipping</p>
        </div>
        <div class="removeFromCart" onclick="removeFromCart(${i})">
          <h2>REMOVE FROM CART</h2>
        </div>
      </div>
    </div>
      `);

    $("#total").append(`<p>Total: $${totalPrice}</p>`);
  }

  coffeeArray = [];
}

//allow user to remove an item from their cart
function removeFromCart(ID) {
  console.log(cartArray);
  const filteredCart = cartArray.filter((coffee, index) => index !== ID);

  cartArray = filteredCart;
  $("#numberOfItems").html(cartArray.length == 0 ? "" : cartArray.length);

  MODEL.getPageContent("checkout", appendToCart);
}

//allow the user to remove all items from their cart
function clearCart() {
  cartArray = [];
  $("#numberOfItems").html("");

  MODEL.getPageContent("checkout", appendToCart);
}

//create pop up window alerting users they have purchaseditems in their cart
function purchase() {
  window.alert("You have purchased every item in your cart");
  cartArray = [];
  $("#numberOfItems").html("");

  MODEL.getPageContent("checkout", appendToCart);
}

//array that holds the json data of the coffeemakers
let coffeeMakers = [];
async function loadCoffeeMakers() {
  $.getJSON("data/coffeeMakers.json", function (data) {
    $.each(data, function (index, coffeeMaker) {
      coffeeMakers.push(coffeeMaker);
      $(
        "#homeCoffeeMakers"
      ).append(`<div class="coffeeMaker" id="coffeeMaker${coffeeMaker.id}">
        <div class="imgHolder">
          <img src="../../images/coffeeMaker${coffeeMaker.id}.webp" />
        </div>
        <div class="colorPicker">
          <div class="largeCircle">
            <div class="whiteCircle">
              <div class="smallCircle"></div>
            </div>
          </div>
        </div>
        <div class="coffeeInfo">
          <h1>${coffeeMaker.name}</h1>
          <p>$${coffeeMaker.price}</p>
          <div class="ratings">
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
            </div>  
            <p>${coffeeMaker.rating.decimal} | (${coffeeMaker.rating.number})</p>
          </div>
          <div class="freeShipping">
            <img src="../../images/shipping.svg"/>
            <p>Free shipping</p>
          </div>
          <div class="buyNow" onclick="addtoCart(${coffeeMaker.id})">
            <h2>BUY NOW</h2>
          </div>
        </div>
      </div>`);
    });
  });

  console.log(coffeeMakers);
}

//call the init listeners on document.ready
$(document).ready(function () {
  initListeners();
  mobileNav();
  try {
    let app = firebase.app();
    initFirebase();
  } catch {
    console.log(e);
    console.log(errorMessage);
  }
});
