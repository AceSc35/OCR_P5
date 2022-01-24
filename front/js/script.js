//Afficher les produits dans la console

function getProducts(){

let products = `http://localhost:3000/api/products`

fetch(products)
    .then((response) => 
    response.json().then((data) => {
        console.log(data)
    })
    ). catch (err => console.log('Erreur : ' + err));

    let product = data.length

        const items = document.getElementById('#items');
        const anchor = document.createElement("a");
        const article = document.createElement("article")
        const img = document.createElement("img")
        const title = document.createElement("h3")
        const description = document.createElement("p")

        
        
    }; 

getProducts();

// Afficher dans l'HTML index les produits un par un

