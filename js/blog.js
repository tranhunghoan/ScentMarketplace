import { infoBlog } from "./datablog.js"
var contentPage='';
var currentPage=1;
var numberPage=Math.ceil(infoBlog.length/9);

 function renderBlog(blog){ 
    return `
    <li>
    <div class="blog-card">
    <a href="./detailblog.html?id=${blog.id}" class="img"><img src="${blog.image}" alt=""></a>
    <div class="info">
    <p class="meta">${blog.date}</p>
    <h4 class="title-blog"><a class="directPage" href="./detailblog.html?id=${blog.id}">${blog.title}</a></h4>
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
function handleNextPage(blogs){
    //document.querySelector('.direction').onclick=handleAddItem
    var buttonPages=document.querySelectorAll('button.page')
    for(let i=0;i<buttonPages.length;i++){
    buttonPages[i].onclick=function (){
    renderPage(i+1,blogs)
}
}
}
function start(){
    
    renderPage(1,infoBlog)
    handleNextPage(infoBlog)
}
start()
