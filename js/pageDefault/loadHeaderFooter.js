function loadHeaderAndFooter() {
    fetch('../layouts/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });
  
    fetch('../layouts/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
  }
  
  loadHeaderAndFooter();