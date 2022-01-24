//Afficher les produits dans la console

async function getProducts(){
    try{
        const response = await fetch(`http://localhost:3000/api/products`);
        const data = await response.json()
        return data;
    } 
    catch (error) {
        console.log(error)
    }
};

async function createSectionItems() {
const arrayProduct = await getProducts();
arrayProduct.forEach((product) => {

//Creation balise dans l'html

anchor = document.createElement('a');
article = document.createElement('article')
img = document.createElement('img')
title = document.createElement('h3')
description = document.createElement('p')

items.appendChild(anchor)
anchor.appendChild(article)
article.appendChild(img)
article.appendChild(title)
title.classList.add("productName")
article.appendChild(description)
description.classList.add('productDescription')

console.log(product)

//Api to HTML

title.innerHTML = product.name
img.src = product.imageUrl
img.alt = product.altTxt
description.innerHTML = product.description
anchor.href = `product.html?id=${product._id}`;

});
};
createSectionItems();
