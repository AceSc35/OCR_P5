let productsLocalStorage = JSON.parse(localStorage.getItem('cart'));

function cartItems() {
  //Création des balises principales de la section "#cart"

  articleProduct = document.createElement('article');
  articleImg = document.createElement('div');
  itemContent = document.createElement('div');
  itemContentDescription = document.createElement('div');
  itemContentSetting = document.createElement('div');
  itemsContentSettingQuantity = document.createElement('div');
  itemsContentSettingDelete = document.createElement('div');

  //Création des balises secondaires de la section "#cart"

  imgCartProduct = document.createElement('img');
  titleProduct = document.createElement('h2');
  colorProduct = document.createElement('p');
  priceProduct = document.createElement('p');
  quantityProduct = document.createElement('p');
  inputProduct = document.createElement('input');
  deleteProduct = document.createElement('p');
}

function appendChildContent() {
  //Liaison entre le JS et l'HTML

  document.querySelector('#cart__items').appendChild(articleProduct);
  articleProduct.appendChild(articleImg);
  articleImg.appendChild(imgCartProduct);
  articleProduct.appendChild(itemContent);
  itemContent.appendChild(itemContentDescription);
  itemContentDescription.appendChild(titleProduct);
  itemContentDescription.appendChild(colorProduct);
  itemContentDescription.appendChild(priceProduct);
  itemContent.appendChild(itemContentSetting);
  itemContentSetting.appendChild(itemsContentSettingQuantity);
  itemsContentSettingQuantity.appendChild(quantityProduct);
  itemsContentSettingQuantity.appendChild(inputProduct);
  itemContentSetting.appendChild(itemsContentSettingDelete);
  itemsContentSettingDelete.appendChild(deleteProduct);
}

function classContent() {
  cartItems();
  appendChildContent();

  //Liaison HTML/CSS des class avec JS

  //Aricle
  articleProduct.className = 'cart__item';
  articleProduct.setAttribute('data-id', productsLocalStorage[cart].productID);
  articleProduct.setAttribute('data-color', productsLocalStorage[cart].colors);
  console.log(productsLocalStorage[cart].productID);

  //Image
  articleImg.classList.add('cart__item__img');
  imgCartProduct.src = productsLocalStorage[cart].productIMG;
  imgCartProduct.alt = productsLocalStorage[cart].productIMGaltTxt;

  //Description du produit
  itemContent.classList.add('cart__item__content');
  itemContentDescription.classList.add('cart__item__content__description');
  titleProduct.innerHTML = productsLocalStorage[cart].name;
  colorProduct.innerHTML = 'Couleur : ' + productsLocalStorage[cart].colors;
  priceProduct.innerHTML = 'Prix : ' + productsLocalStorage[cart].price + ' €';

  //Quantité du produit
  itemContentSetting.classList.add('cart__item__content__settings');
  itemsContentSettingQuantity.classList.add('cart__item__content__settings__quantity');
  quantityProduct.innerHTML = 'Quantité : ';
  inputProduct.classList.add('itemQuantity');
  inputProduct.value = productsLocalStorage[cart].quantity;
  inputProduct.setAttribute('type', 'number');
  inputProduct.setAttribute('name', 'itemQuantity');
  inputProduct.setAttribute('min', '1');
  inputProduct.setAttribute('max', '100');

  //Bouton Supprimer
  itemsContentSettingDelete.classList.add('cart__item__content__settings__delete');
  deleteProduct.classList.add('deleteItem');
  deleteProduct.innerHTML = 'Supprimer';
}

//Prix total du produit
function totalPriceBasket() {
  let totalPrice = 0;
  for (cart in productsLocalStorage) {
    totalPrice += productsLocalStorage[cart].price * productsLocalStorage[cart].quantity;
  }
  document.querySelector('#totalPrice').innerHTML = totalPrice;
}
totalPriceBasket();

//Modifier la quantité d'un produit
function modifyQuantityItems() {
  let itemQuantity = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener('change', function () {
      productsLocalStorage[i].quantity = itemQuantity[i].value;
      localStorage.setItem('cart', JSON.stringify(productsLocalStorage));
      totalPriceBasket();
      location.reload();
    });
  }
}

function deleteQuantityItems() {
  let btn_supprimer = document.querySelectorAll('.deleteItem');

  for (let l = 0; l < btn_supprimer.length; l++) {
    btn_supprimer[l].addEventListener('click', (e) => {
      e.preventDefault();

      //Selection de l'element à supprimer par son ID et couleur

      let deleteByID = productsLocalStorage[l].productID;
      let deleteByColor = productsLocalStorage[l].colors;

      productsLocalStorage = productsLocalStorage.filter((el) => el.productID !== deleteByID || el.colors !== deleteByColor);
      localStorage.setItem('cart', JSON.stringify(productsLocalStorage));

      alert('Le produit à été supprimé du panier');
      location.reload();
    });
  }
}

function displayCart() {
  // Si le panier est vide = alert, sinon les éléments apparaitront
  let nothinginCart = document.querySelector('#cart__items');
  if (productsLocalStorage === null || productsLocalStorage == 0) {
    nothinginCart.innerHTML = `<h3>Votre panier est vide</h3>`;
  } else {
    for (cart in productsLocalStorage) {
      classContent();
    }
  }
}

displayCart();
modifyQuantityItems();
deleteQuantityItems();

// Formulaire

function createForm() {
  let form = document.querySelector('.cart__order__form');

  //Ecouter les modifications
  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });
  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });
  form.address.addEventListener('change', function () {
    validAddress(this);
  });
  form.city.addEventListener('change', function () {
    validCity(this);
  });
  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  //Validation FirstName

  const validFirstName = function (firstNameform) {
    //Création de la RegExp pour validation FirstName
    let firstNameExp = new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/);

    //Recuperation de la balise p
    let p = firstNameform.nextElementSibling;

    //On test l'expression régulière
    if (firstNameExp.test(firstNameform.value)) {
      p.innerHTML = '';
      return true;
    } else {
      p.innerHTML = 'Votre prénom doit contenir entre 3 et 20 caractères';
      return false;
    }
  };

  //Validation LastName

  const validLastName = function (lastNameform) {
    //Création de la RegExp pour validation LastName
    let lastNameExp = new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/);

    //Recuperation de la balise p
    let p = lastNameform.nextElementSibling;

    //On test l'expression régulière
    if (lastNameExp.test(lastNameform.value)) {
      p.innerHTML = '';
      return true;
    } else {
      p.innerHTML = 'Votre nom doit contenir entre 3 et 20 caractères et ne doit pas contenir de chiffres';
      return false;
    }
  };

  //Validation address

  const validAddress = function (addressform) {
    //Création de la RegExp pour validation adresse
    let addressExp = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');

    //Recuperation de la balise p
    let p = addressform.nextElementSibling;

    //On test l'expression régulière
    if (addressExp.test(addressform.value)) {
      p.innerHTML = '';
      return true;
    } else {
      p.innerHTML = 'Votre adresse est invalide';
      return false;
    }
  };

  //Validation city

  const validCity = function (cityform) {
    //Création de la RegExp pour validation de la ville
    let cityExp = new RegExp(/^[a-zA-Zàâäéèêëïîôöùûüç]+(?:[- ][a-zA-Zàâäéèêëïîôöùûüç]+)*$/);

    //Recuperation de la balise p
    let p = cityform.nextElementSibling;

    //On test l'expression régulière
    if (cityExp.test(cityform.value)) {
      p.innerHTML = '';
      return true;
    } else {
      p.innerHTML = 'Votre ville est invalide';
      return false;
    }
  };

  //Validation email

  const validEmail = function (emailform) {
    //Création de la RegExp pour validation de l'email
    let emailExp = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);

    //Recuperation de la balise p
    let p = emailform.nextElementSibling;

    //On test l'expression régulière
    if (emailExp.test(emailform.value)) {
      p.innerHTML = '';
      return true;
    } else {
      p.innerHTML = 'Votre email est invalide';
      return false;
    }
  };
}
createForm();

function getForm() {
  let btnOrder = document.getElementById('order');
  btnOrder.addEventListener('click', (e) => {
    e.preventDefault();
    //Récupération des coordonnées du formulaire client

    let firstnameRecover = document.getElementById('firstName');
    let lastnameRecover = document.getElementById('lastName');
    let addressRecover = document.getElementById('address');
    let cityRecover = document.getElementById('city');
    let emailRecover = document.getElementById('email');

    //Construction d'un array depuis le local storage
    let idProduct = [];
    for (let f = 0; f < productsLocalStorage.length; f++) {
      idProduct.push(productsLocalStorage[f].productID);
    }

    const order = {
      contact: {
        firstName: firstnameRecover.value,
        lastName: lastnameRecover.value,
        address: addressRecover.value,
        city: cityRecover.value,
        email: emailRecover.value,
      },
      products: idProduct,
    };

    const postMethod = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    };

    fetch('http://localhost:3000/api/products/order', postMethod)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html';
      })
      .catch((err) => {
        alert('Problème de fetch : ' + err.message);
      });
  });
}
getForm();
