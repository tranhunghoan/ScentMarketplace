import { infoBlog } from "./datablog.js";
var queryParams = {};

function handleURL(){
    var url = window.location.href;
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        queryParams[key] = value;
        });
}
function renderDetailPage(queryParams){
   var idBlog=parseInt(queryParams.id)
   var blog=infoBlog[idBlog-1]
   var detailHtml=`
   <h1 id="title">${blog.title}</h1>
   <div class="box-meta">
   <i class="fa fa-calendar" aria-hidden="true"></i> <span>Ngày đăng: ${blog.date}</span>
    </div>
   <div class="image"><img src="${blog.image}"></div>
   <div class="content">${blog.content}</div>
   `
    document.querySelector('.detailBlogPage').innerHTML=detailHtml
}

function start(){
    handleURL()
    renderDetailPage(queryParams)
}
start()