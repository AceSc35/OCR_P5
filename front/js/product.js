chooseArticle();

//Récupérer les paramètres de l'URL

function settingURL() {
  const url = new URL(window.location.href);
  const search_params = new URLSearchParams(url.search);
  const productID = search_params.get('id');
  return productID;
}

//Récupérer le produit sur la page en fonction de l'id

function chooseArticle() {
  const productID = settingURL();

  fetch(`http://localhost:3000/api/products/${productID}`)
    .then((response) => response.json())
    .then((product) => {
      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      const price = document.querySelector('#price');

      //Création des balises HTML/API - Image

      let productIMG = document.createElement('img');
      document.querySelector('.item__img').appendChild(productIMG);
      productIMG.src = product.imageUrl;
      productIMG.alt = product.altTxt;
      productIMGsrc = productIMG.src;
      productIMGalt = productIMG.alt;

      //Création des balises HTML/API - Title-Description-Price

      title.innerHTML = product.name;
      price.innerHTML = product.price;
      description.innerHTML = product.description;

      // choix de la couleur

      for (colors of product.colors) {
        const productColor = document.createElement('option');
        document.querySelector('#colors').appendChild(productColor);
        productColor.value = colors;
        productColor.innerHTML = colors;
      }
    });
}
//Rajouter Promise !!!

function addToBasket() {
  //Ajouter une quantité et l'ajouter dans le panier avec l'eventListener et local storage

  const addToCart = document.querySelector('#addToCart');
  const addQuantity = document.querySelector('#quantity');
  const addColors = document.querySelector('#colors');

  addToCart.addEventListener('click', (event) => {
    event.preventDefault();

    if (addQuantity.value > 0 && addQuantity.value <= 100 && addQuantity.value != 0 && addColors.value != '') {
      let idBasket = 0;
      let product = {
        //Assignation des valeurs du produit dans le "cart"
        idBasket: idBasket,
        productID: settingURL(),
        name: title.innerHTML,
        quantity: document.querySelector('#quantity').value,
        colors: document.querySelector('#colors').value,
        price: price.innerHTML,
        productIMG: productIMGsrc,
        productIMGaltTxt: productIMGalt,
      };

      console.log(product);
      //Stocker la récupération des valeurs dans le local storage

      //Déclaration de la variable 'productLocalStorage" dans laquelle on met les keys et valeurs qui sont dans le local storage
      let productLocalStorage = JSON.parse(localStorage.getItem('cart'));

      if (productLocalStorage) {
        //S'il y a exactement le même produit avec la même couleur dans le local storage, on ajoute la quantité
        const isProductInTheCart = productLocalStorage.find(
          (productInCart) => productInCart.productID === product.productID && productInCart.colors === product.colors
        );

        // Ajoute la quantité d'un produit déjà existant dans le panier
        if (isProductInTheCart) {
          // Modifies la quantité et la couleur d'un produit déjà dans le panier avec sa nouvelle valeur
          let newQuantity = parseInt(isProductInTheCart.quantity) + parseInt(product.quantity);
          // "1" + "1" = 11 ; 1 + 1 = 2 = ParseInt
          isProductInTheCart.quantity = newQuantity;
          localStorage.setItem('cart', JSON.stringify(productLocalStorage));
          redirectionBasket();
        } else {
          // Si le produit n'est pas dans le panier + panier existant => ajouter le produit dans le panier
          productLocalStorage.push(product);
          localStorage.setItem('cart', JSON.stringify(productLocalStorage));
          redirectionBasket();
        }
      } else {
        // Si le panier est vide, ajouter le produit dans le panier
        productLocalStorage = [];
        productLocalStorage.push(product);
        localStorage.setItem('cart', JSON.stringify(productLocalStorage));
        redirectionBasket();
      }
    } else {
      alert('Veuillez ajouter une couleur et/ou une quantité comprise entre 1 et 100');
    }
  });
}

function redirectionBasket() {
  if (window.confirm('Le produit a été rajouté au panier, cliquez sur OK pour y acceder')) {
    window.location.href = 'cart.html';
  }
}

addToBasket();
