// import { infoBlog } from "./datablog.js";
const API_URL = 'http://localhost:3000/api/v1'
let infoBlog
var queryParams = {};

async function getData() {
    await fetch(`${API_URL}/get-blog`)
    .then(res => {
      return res.json()
    })
    .then(data => {
        infoBlog = data.blogList
    })
    .catch(err => {
      console.log(err)
    })
}

function handleURL(){
    var url = window.location.href;
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        queryParams[key] = value;
        });
}
function renderDetailPage(queryParams){
   var idBlog=parseInt(queryParams.id)
   var blog = infoBlog.find((x) => {return x.id == idBlog})
   console.log(blog)
   var detailHtml=`
   <h1 id="title">${blog.title}</h1>
   <div class="box-meta">
   <i class="fa fa-calendar" aria-hidden="true"></i> <span>Ngày đăng: ${blog.date}</span>
    </div>
    <img class="image" src="${blog.image}">
   <div class="content">${blog.content}</div>
   `
    document.querySelector('.detailBlogPage').innerHTML=detailHtml
}

async function start(){
    await getData()
    handleURL()
    renderDetailPage(queryParams)
}
start()