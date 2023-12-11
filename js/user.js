const API_URL = 'http://localhost:3000/api/v1'
var accessToken = require('./home.js').accessToken;
console.log('accessToken');
document.addEventListener("DOMContentLoaded", function () {
    // Thực hiện yêu cầu API để lấy thông tin người dùng khi trang đã tải xong
    fetchUserData();
  });
  
  async function fetchUserData() {
    try {
      const response = await fetch(`${API_URL}/get-blog`, {
        method: 'GET',
        headers: {
          'Authorization': accessToken, 
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const userData = await response.json();
      console.log(userData)
  
      // Gọi hàm để điền thông tin người dùng vào các trường trên trang
      fillUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }
  
  // Hàm để điền thông tin người dùng vào các trường trên trang
  function fillUserData(userData) {
    const usernameInput = document.getElementById('username-l');
    const emailInput = document.getElementById('email-l');
    const telInput = document.getElementById('tel-l');
    const addressInput = document.getElementById('address-l');
  
    // Kiểm tra xem có dữ liệu người dùng không trước khi điền vào trường
    if (userData) {
      usernameInput.value = userData.username || '';
      emailInput.value = userData.email || '';
      telInput.value = userData.tel || '';
      addressInput.value = userData.address || '';
    }
  }
  
 
  