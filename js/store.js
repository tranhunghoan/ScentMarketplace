const API_URL = 'http://localhost:3000/api/v1'
let infoPerfume
let numberPage
var contentPage=''
var buttonNextPage=''
var currentPage=1
var basket = JSON.parse(localStorage.getItem("data")) || []

async function getData() {
  await fetch(`${API_URL}/get-pro`)
  .then(res => {
    return res.json()
  })
  .then(data => {
    infoPerfume = data.proList
    numberPage = Math.ceil(infoPerfume.length/18)
  })
  .catch(err => {
    console.log(err)
  })
}
 function renderCard(perfume){ 
    return ` <div class="perfume">
    <div class="wrap_image">
    <img class="perfume_image" src=${perfume.image}>
    <a  class="directPage" href="./detail.html?id=${perfume.id}">
    <button class='detailProduct'>Xem chi tiết</button>
    </a>
    </div>
    <div class="perfume_info">
    <a href="./detail.html?id=${perfume.id}" style="text-decoration:none">
    <div class="perfume_name">${perfume.name}</div>
    </a>
    <div class="perfume_brand">
    ${perfume.brand}
    </div>
    <div class="perfume_price old_price">${formatNumber( perfume.price) }đ <h4>(-10%)</h4></div>
    <div class="perfume_price new_price">${formatNumber( perfume.price*0.9)}đ </div>
</div>
<button class="addIntoCart" data-index="${perfume.id}">Thêm vào giỏ hàng</button> </div>`
}
 function renderPage(currentPage,numberPage,perfumes){
    contentPage=''
    var firstItem=(currentPage-1)*18
    var lastItem
    if(currentPage<numberPage)lastItem=currentPage*18
    else lastItem=perfumes.length
        for(let j=firstItem;j<lastItem;j++){
            contentPage+=renderCard(perfumes[j]) 
        }
    document.querySelector('.product').innerHTML=contentPage
}
 function renderButtonDirect(num){
  if(num==0){ 
    document.querySelector('.direction').innerHTML=''
    return 0;
  }
    buttonNextPage=`<button index="#!-1" class="prevPage cdp_i">prev</button>`
    for(let i=1;i<=num;i++){
        buttonNextPage+=`<button class="cdp_i" index="${i}" >${i}</button>`
    }
    buttonNextPage+=`<button index="#!+1" class="nextPage cdp_i">next</button>`
    document.querySelector('.direction').innerHTML=buttonNextPage
    document.querySelector('.cdp').setAttribute('actpage',1);
    Pagination()
}
 function duplicateAndMove(event) {
    // Lấy sản phẩm gốc
    let originalProduct = event.target.parentElement.querySelector('.perfume_image');
    // Tạo bản sao của sản phẩm gốc
    let clonedProduct = originalProduct.cloneNode(true);
    //Gán thuộc tính cho sản phẩm clone
    clonedProduct.id = "clonedProduct"; 
    clonedProduct.style.position = "absolute";
    clonedProduct.style.zIndex = "1000"
    clonedProduct.style.borderRadius = "50%"
    clonedProduct.style.top = '20px'; // Giữ nguyên vị trí của sản phẩm gốc
    clonedProduct.style.left = '20px'; // Giữ nguyên vị trí của sản phẩm gốc
    event.target.parentElement.appendChild(clonedProduct);
    let clonedRect = clonedProduct.getBoundingClientRect();
    // Lấy vị trí của icon giỏ hàng
    let cartIcon = document.querySelector('.fa-cart-shopping');
    let cartRect = cartIcon.getBoundingClientRect();
  
    // Di chuyển bản sao vào vị trí của icon giỏ hàng
    let xOffset = cartRect.left - clonedRect.left-clonedProduct.offsetWidth*0.5+15;
    let yOffset = -clonedRect.top-clonedProduct.offsetHeight*0.5+20;
   // event.target.parentElement.style.overflow='visible'
    clonedProduct.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(0.05)`;
    setTimeout(() => {
        clonedProduct.remove()
    },800);

    // Sau khi di chuyển hoàn tất, có thể thêm sản phẩm vào giỏ hàng và xóa bản sao
}
function calculationItem() {
  var totalItem = basket.map((x) => x.item).reduce((x,y) => x+y,0)
    document.querySelector('#cart .cart-amount').innerHTML= totalItem
    document.querySelector('#cart-icon .cart-amount').innerHTML= totalItem
}
 function handleAddItem(){
    var buttonAddintocart=document.querySelectorAll('.addIntoCart')
    for( let button of buttonAddintocart){
      button.onclick=function(e){
        duplicateAndMove(e)
        var id = e.target.getAttribute('data-index')
        var search = basket.find((x)=> x.id === id)
        if(search === undefined) {
          basket.push({
            id: id,
            item: 1,
          })
        }else {
          search.item += 1
        }
        calculationItem()
      localStorage.setItem("data", JSON.stringify(basket))
      }
    }
}
 function handleNextPage(perfume){
    const nextBtn=document.querySelector('.cdp_i.nextPage')
    const prevBtn=document.querySelector('.cdp_i.prevPage')

    nextBtn.onclick=function(e){
            renderPage(currentPage+1,numberPage,perfume)
            currentPage++;
            handleAddItem()
        }
    prevBtn.onclick=function(e){
        renderPage(currentPage-1,numberPage,perfume)
        handleAddItem()
        currentPage--;
    }
    var buttonPages=document.querySelectorAll('button.cdp_i:not(.nextPage,.prevPage)')
    for(let i=0;i<buttonPages.length;i++){
    buttonPages[i].onclick=function (){
      currentPage=i+1;
    renderPage(i+1,numberPage,perfume)
    handleAddItem()
}
}
}
//
function deleteFilter(){
    document.querySelector('button.no_filter').onclick=function(){
        var selects=document.querySelectorAll('.filter_block select')
        selects.forEach(select => {   
            select.value=""
        });
        renderPage(1,numberPage,infoPerfume)
        renderButtonDirect(numberPage)
        handleNextPage(infoPerfume)
        handleAddItem()
    }
}
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣ huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛ Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|\,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|\`|\-|\{|\}|\||\\/g,
      " "
    );
    return str;
  }
function configElasticlunr(){
    var PerfumeClone = JSON.parse(JSON.stringify(infoPerfume));
    var index = elasticlunr(function () {
      this.addField('brand');// Thêm trường 'brand' cho tìm kiếm
      this.addField('name');  // Thêm trường 'name' cho tìm kiếm
      this.setRef('id'); // Thiết lập trường làm khóa chính
    });
    
    // Thêm văn bản vào chỉ mục tìm kiếm
    for(let i=0;i<PerfumeClone.length;i++){
        PerfumeClone[i].name=removeVietnameseTones(infoPerfume[i].name)
        PerfumeClone[i].brand=removeVietnameseTones(infoPerfume[i].brand)  
      index.addDoc(PerfumeClone[i])
    }
    var inputSearch=document.querySelector('input.searchItem')
    var searchButton=document.querySelector('.search .searchButton')
    // Tìm kiếm trong chỉ mục
    searchButton.onclick=function(){
        var results = index.search(removeVietnameseTones(inputSearch.value));
      handleResultSearch(results)
    }
  }
function handleResultSearch(arr){
    var contentPage=document.querySelector('.product')
    
     if(arr.length===0){
      contentPage.innerHTML= 'Không tìm thấy kết quả phù hợp'
      renderButtonDirect(0)
      return 0
    } 
     else {
      contentPage.innerHTML=""
      for(let i=0;i<arr.length;i++){
        var index=parseInt(arr[i].ref)-1;
        contentPage.innerHTML+=renderCard(infoPerfume[index])
      }
     
     renderButtonDirect(Math.ceil(arr.length/18))
     handleNextPage(arr)
     handleAddItem()

  }}
function handleFilter(){
    var filterButton=document.querySelector('button.filter')

    filterButton.onclick=function(){
        contentPage=""
        var selects=document.querySelectorAll('.filter_block select')    
  
        var search={}
        for(let i=0;i<selects.length;i++){
            if(selects[i].value!=="")
            search[selects[i].name]=selects[i].value    
        }
        var resultFilter=infoPerfume.filter(function(perfume){
            for(let key in search){
                if(perfume[key]!= search[key]) return false;
            }
            return true;
        })
        if(resultFilter.length===0){
            document.querySelector('.product').innerHTML="Không tìm thấy kết quả phù hợp"
            document.querySelector('.cdp').setAttribute('actpage',1);
            renderButtonDirect(0)
            return 0;
          } 
        var page=Math.ceil(resultFilter.length/18)
        renderButtonDirect(page)
        renderPage(1,page,resultFilter)
        handleNextPage(resultFilter)
        handleAddItem()
    }
 
}  
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
function Pagination(){
   
        var paginationPage = parseInt(document.querySelector('.cdp').getAttribute('actpage'), 10);
        document.querySelectorAll('.cdp_i').forEach(function(item) {
          item.addEventListener('click', function() {
            var go = this.getAttribute('index').replace('#!', '');
            if (go === '+1') {
              paginationPage++;
            } else if (go === '-1') {
              paginationPage--;
            } else {
              paginationPage = parseInt(go, 10);
            }
            document.querySelector('.cdp').setAttribute('actpage', paginationPage);
          });
        });
      
      
}
async function start(){
  await getData()
  calculationItem()
  renderPage(1,numberPage,infoPerfume)
  deleteFilter()
  renderButtonDirect(numberPage)
  handleFilter()
  handleNextPage(infoPerfume)
  handleAddItem()
  configElasticlunr()
  Pagination()
}
start()