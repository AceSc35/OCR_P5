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
  if (productsLocalStorage === null || productsLocalStorage === 0) {
    nothinginCart.innerHTML = `<h3>Votre panier est vide</h3>`;
  } else {
    for (cart in productsLocalStorage) {
      classContent();
      totalPriceBasket();
    }
  }
}
displayCart();
modifyQuantityItems();
deleteQuantityItems();

// Formulaire

function getForm() {
  let btnOrder = document.getElementById('order');
  btnOrder.addEventListener('click', (e) => {
    e.preventDefault();

    const contact = {
      //Récupération des coordonnées du formulaire client

      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    };

    //Validation FirstName

    function validFirstName() {
      const firstNameform = contact.firstName;
      let firstNameExp = new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/).test(firstNameform);
      if (firstNameExp) {
        document.querySelector('#firstNameErrorMsg').innerHTML = '';
        return true;
      } else {
        let msgFirstNameErr = document.querySelector('#firstNameErrorMsg');
        msgFirstNameErr.innerHTML = 'Votre prénom doit contenir entre 3 et 20 caractères';
      }
    }
    //Validation LastName

    function validLastName() {
      const lastNameform = contact.lastName;
      let lastNameExp = new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/).test(lastNameform);
      if (lastNameExp) {
        document.querySelector('#lastNameErrorMsg').innerHTML = '';
        return true;
      } else {
        let msgLastNameErr = document.querySelector('#lastNameErrorMsg');
        msgLastNameErr.innerHTML = 'Votre nom doit contenir entre 3 et 20 caractères et ne doit pas contenir de chiffres';
      }
    }

    //Validation address

    function validAdress() {
      const addressform = contact.address;
      let addressExp = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+').test(addressform);
      if (addressExp) {
        document.querySelector('#addressErrorMsg').innerHTML = '';
        return true;
      } else {
        let msgAddressErr = document.querySelector('#addressErrorMsg');
        msgAddressErr.innerHTML = 'Votre adresse est invalide';
      }
    }

    //Validation city

    function validCity() {
      const cityform = contact.city;
      let cityExp = new RegExp(/^[a-zA-Zàâäéèêëïîôöùûüç]+(?:[- ][a-zA-Zàâäéèêëïîôöùûüç]+)*$/).test(cityform);
      if (cityExp) {
        document.querySelector('#cityErrorMsg').innerHTML = '';
        return true;
      } else {
        let msgCityErr = document.querySelector('#cityErrorMsg');
        msgCityErr.innerHTML = 'Votre ville est invalide';
      }
    }
    //Validation email

    function validEmail() {
      const emailform = contact.email;
      let emailExp = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/).test(emailform);
      if (emailExp) {
        document.querySelector('#emailErrorMsg').innerHTML = '';
        return true;
      } else {
        let msgEmailErr = document.querySelector('#emailErrorMsg');
        msgEmailErr.innerHTML = 'Votre email est invalide';
      }
    }

    function validForm() {
      //Si la valeurs des autres fonction est égale à true alors une clé contact va se créer
      if (
        validFirstName() === true &&
        validLastName() === true &&
        validAdress() === true &&
        validCity() === true &&
        validEmail() === true
      ) {
        localStorage.setItem('contact', JSON.stringify(contact));
        return true;
      } else {
        e.preventDefault;
        alert('Veuillez remplir convenablement le formulaire');
      }
    }

    //Construction d'un array depuis le local storage
    let idproducts = [];
    for (let f = 0; f < productsLocalStorage.length; f++) {
      idproducts.push(productsLocalStorage[f].productID);
    }

    //Si le formulaire est validé alors l'order se fera
    if (validForm() === true) {
      const order = {
        contact,
        productsLocalStorage,
      };
      console.log(order);
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //localStorage.clear();
          localStorage.setItem('orderId', data.orderId);
          //document.location.href = 'confirmation.html';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      e.preventDefault();
    }
  });
}
getForm();
