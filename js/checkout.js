function calculationItem() {
    var basket = JSON.parse(localStorage.getItem("data")) || []
    var totalItem = basket.map((x) => x.item).reduce((x,y) => x+y,0)
      document.querySelector('#checkout .cart-amount').innerHTML= totalItem
  }
calculationItem()