function sendContact(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    var body = 'Họ và tên: ' + name + '<br/> Email: ' + email + '<br/> Chủ đề: ' + subject + '<br/> Nội dung: ' + message;
    Email.send({
      SecureToken : "7dc5821d-de66-4b64-921a-d814a14d787e",
      To : 'tutu050903@gmail.com',
      From : 'tutu050903@gmail.com',
      Subject : subject,
      Body : body
  })
  }
  
  function sendEmail(){
    var email = document.querySelector('.email-signup').value;
    var body = 'Email đăng ký: ' + email;
    Email.send({
      SecureToken : "7dc5821d-de66-4b64-921a-d814a14d787e",
      To : 'tutu050903@gmail.com',
      From : 'tutu050903@gmail.com',
      Subject : "Đăng ký nhận tin ưu đãi",
      Body : body
  })
    document.querySelector('.email-signup').value = "";
  }