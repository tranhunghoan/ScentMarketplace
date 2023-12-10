// import { infoBlog } from "./datablog.js"
const API_URL = 'http://localhost:3000/api/v1'
let infoBlog
var numberPage
var contentPage='';
var currentPage=1;

async function getData() {
    await fetch(`${API_URL}/get-blog`)
    .then(res => {
      return res.json()
    })
    .then(data => {
        infoBlog = data.blogList
        numberPage = Math.ceil(infoBlog.length/9)
    })
    .catch(err => {
      console.log(err)
    })
  }

 function renderBlog(blog){ 
    return `
    <li>
    <div class="blog-card">
    <a href="./detailblog.html?id=${blog.id}" class="img"><img src="${blog.image}" alt=""></a>
    <div class="info">
    <p class="meta">${blog.date}</p>
    <h4 class="title"><a class="leadToDetail" href="./detailblog.html?id=${blog.id}">${blog.title}</a></h4>
    </div>
    </div>
    </li>`
}
 function renderPage(currentPage,blogs)
 {
    contentPage='';
    var firstBlog=(currentPage-1)*9;
    var lastBlog;
    if(currentPage<numberPage)lastBlog=currentPage*9;
    else lastBlog=blogs.length;
    for(var index=firstBlog; index<lastBlog; index++){
            contentPage+=renderBlog(blogs[index]) 
        }
    document.querySelector('.blog-list-ul').innerHTML=contentPage
}
function handlePage(blogs){
    var buttonPages=document.querySelectorAll('button.page')
    for(let i=0;i<buttonPages.length;i++){
    buttonPages[i].onclick=function (){
    renderPage(i+1,blogs)
}
}
}
function handleNextPage(blogs){
    var buttonPages=document.querySelectorAll('button.nextPage')
    for(let i=0;i<buttonPages.length;i++){
    buttonPages[i].onclick=function (){
    renderPage(2,blogs)
}
}
}
async function start(){
    await getData()
    renderPage(1,infoBlog);
    handlePage(infoBlog);
    handleNextPage(infoBlog);
}
start()