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

function totalPriceBasket() {
  let totalPrice = 0;
  for (cart in productsLocalStorage) {
    totalPrice += productsLocalStorage[cart].price * productsLocalStorage[cart].quantity;
  }
  document.querySelector('#totalPrice').innerHTML = totalPrice;
}
totalPriceBasket();

function modifyQuantityItems() {
  let itemQuantity = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener('change', function () {
      productsLocalStorage[i].quantity = itemQuantity[i].value;
      localStorage.setItem('cart', JSON.stringify(productsLocalStorage));
      totalPriceBasket();
    });
  }
}

function displayCart() {
  //if -> si le panier et vide
  for (cart in productsLocalStorage) {
    // transformer cette ligne en else
    classContent();
  }
}

displayCart();
modifyQuantityItems();
