let productLocalStorage = JSON.parse(localStorage.getItem('cart'));

console.log(productLocalStorage);
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

  articleProduct.classList.add('cart__item');
  articleProduct.setAttribute('data-id', productLocalStorage[cart].productID);
  articleImg.classList.add('cart__item__img');
  itemContent.classList.add('cart__item__content');
  itemContentDescription.classList.add('cart__item__content__description');
  titleProduct.innerHTML = productLocalStorage[cart].name;
  itemContentSetting.classList.add('cart__item__content__settings');
  itemsContentSettingQuantity.classList.add('cart__item__content__settings__quantity');
  inputProduct.classList.add('itemQuantity');
  inputProduct.setAttribute('type', 'number');
  inputProduct.setAttribute('name', 'itemQuantity');
  inputProduct.setAttribute('min', '1');
  inputProduct.setAttribute('max', '100');
  itemsContentSettingDelete.classList.add('cart__item__content__settings__delete');
  deleteProduct.classList.add('deleteItem');
}
classContent();
