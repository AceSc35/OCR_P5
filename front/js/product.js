//Récupérer les paramètres de l'URL

function settingURL (){

    let url = new URL(window.location.href)
    let search_params = new URLSearchParams(url.search)
    if(search_params.has('id')) {
        let id = search_params.get('id');
        console.log(id)
    }
}

settingURL();