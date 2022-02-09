function confimationOrder() {
  //Fonction permettant de retrouver le numéro de commande avec le order ID dans le local storage et ne pas oublier de le clean pour plus de sécurité
  const idOrder = document.querySelector('#orderId');
  idOrder.innerHTML = localStorage.getItem('orderId');
  localStorage.clear();
}
confimationOrder();
