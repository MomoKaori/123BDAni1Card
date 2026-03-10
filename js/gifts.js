// Danh sách quà và lời chúc (có cả ảnh và không ảnh)
const gifts = [
  {
    icon: '💝',
    title: 'Lời Yêu Thương',
    message: 'Cảm ơn anh đã đến bên em và làm cho thế giới của em trở nên tuyệt vời hơn mỗi ngày. Yêu anh rất nhiều! 💕',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '🌟',
    title: 'Ước Ngọt Ngào',
    message: 'Chúc anh mọi điều ước đều thành hiện thực, mọi dự định đều suôn sẻ và luôn có em bên cạnh để chia sẻ. ⭐',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '🎂',
    title: 'Bánh Ngọt Tình Yêu',
    message: 'Tình yêu của em dành cho anh ngọt ngào hơn mọi loại bánh, và sẽ còn đậm đà hơn theo năm tháng. 🍰',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '🌺',
    title: 'Hoa Tươi Hằng Ngày',
    message: 'Em muốn là đóa hoa luôn tươi đẹp bên anh, mỗi ngày đều mang đến niềm vui và bình yên cho anh. 🌸',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '🎵',
    title: 'Nhạc Du Dương',
    message: 'Tiếng cười của em là bản nhạc hay nhất anh từng nghe, và em sẽ hát bài tình yêu này cho anh mỗi ngày. 🎶',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '🌈',
    title: 'Cầu Vồng Hạnh Phúc',
    message: 'Cùng nhau chúng ta sẽ vẽ nên bầu trời cầu vồng, với mỗi màu sắc là một kỷ niệm đẹp của tình yêu. 🌈',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '💫',
    title: 'Ngôi Sao May Mắn',
    message: 'Em sẽ là ngôi sao sáng nhất dẫn đường cho anh, soi sáng mọi bước chân và luôn ở bên anh. ⭐',
    image: "https://thetimelessflowers.com/wp-content/uploads/2024/05/z5455767123454_c2e14b45cd244e310f3e46c6fd54bf0c.jpg"
  },
  {
    icon: '🎁',
    title: 'Quà Vô Giá',
    message: 'Món quà lớn nhất em có thể trao cho anh chính là trái tim em, đã thuộc về anh từ rất lâu rồi. 💖',
    image: "" // Không có ảnh
  },
  {
    icon: '🦋',
    title: 'Bướm Tình Yêu',
    message: 'Tình yêu của em như con bướm, đã tìm đến hoa của anh và quyết định ở lại mãi mãi. 🦋',
    image: "" // Không có ảnh
  },
  {
    icon: '🌙',
    title: 'Ánh Trăng Dịu Dàng',
    message: 'Mỗi đêm em đều nguyện cầu cho anh, giống như ánh trăng dịu dàng luôn che chở và sưởi ấm giấc mơ của anh. 🌙',
    image: "" // Không có ảnh
  },
  {
    icon: '🍀',
    title: 'Cỏ May Mạnh Mẽ',
    message: 'Tình yêu của chúng ta may mắn hơn mọi lá cỏ bốn lá, và sẽ bền chặt hơn mọi giông bão. 🍀',
    image: "" // Không có ảnh
  },
  {
    icon: '🎨',
    title: 'Bức Tình Yêu',
    message: 'Cuộc sống của anh là bức tranh tuyệt đẹp, và em rất vinh dự được là một màu sắc trong bức tranh đó. 🎨',
    image: "" // Không có ảnh
  },
  {
    icon: '🌊',
    title: 'Biển Cả Tình Yêu',
    message: 'Tình yêu của em dành cho anh sâu rộng như biển cả, và sẽ luôn là bến đỗ bình yên cho anh. 🌊',
    image: "" // Không có ảnh
  },
  {
    icon: '🔥',
    title: 'Lửa Tình Nồng Nàn',
    message: 'Tình yêu của em là ngọn lửa sẽ sưởi ấm trái tim anh, và sẽ không bao giờ lụi tàn. 🔥',
    image: "" // Không có ảnh
  },
  {
    icon: '💎',
    title: 'Kim Cương Bền Chặt',
    message: 'Tình yêu của chúng ta quý giá như kim cương, cứng và bền, sẽ sáng mãi theo thời gian. 💎',
    image: "" // Không có ảnh
  }
];

// Tạo bong bóng nước
function createBubble() {
  const container = document.getElementById('bubblesContainer');
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  
  // Random kích thước
  const size = Math.random() * 60 + 40; // 40-100px
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';
  
  // Random vị trí bắt đầu
  bubble.style.left = Math.random() * 100 + '%';
  
  // Random tốc độ rơi
  const duration = Math.random() * 5 + 5; // 5-10 giây
  bubble.style.animationDuration = duration + 's';
  
  // Random màu sắc
  const colors = [
    'rgba(240, 147, 251, 0.6)',  // Hồng tím
    'rgba(245, 87, 108, 0.6)',   // Hồng đỏ
    'rgba(255, 154, 118, 0.6)',  // Cam đào
    'rgba(102, 126, 234, 0.6)',  // Xanh tím
    'rgba(118, 75, 162, 0.6)',   // Tím đậm
    'rgba(255, 215, 0, 0.6)'     // Vàng gold
  ];
  bubble.style.background = `radial-gradient(circle at 30% 30%, ${colors[Math.floor(Math.random() * colors.length)]}, rgba(255, 255, 255, 0.4))`;
  
  // Random emoji trong bong bóng (không có ảnh trong bong bóng)
  const emojis = ['💝', '🎁', '🌟', '💖', '🎀', '🦋', '🌺', '💫', '🍀', '🎨'];
  bubble.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  bubble.style.fontSize = size * 0.4 + 'px';
  
  // Click để nhận quà
  bubble.addEventListener('click', function() {
    showGift();
    // Hiệu ứng nổ bong bóng
    bubble.style.transform = 'scale(1.5)';
    bubble.style.opacity = '0';
    setTimeout(() => bubble.remove(), 300);
  });
  
  container.appendChild(bubble);
  
  // Xóa bong bóng sau khi rơi xong
  setTimeout(() => {
    if (bubble.parentNode) {
      bubble.remove();
    }
  }, duration * 1000);
}

// Hiển thị quà ngẫu nhiên
function showGift() {
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
  
  document.getElementById('giftIcon').textContent = randomGift.icon;
  document.getElementById('giftTitle').textContent = randomGift.title;
  document.getElementById('giftMessage').textContent = randomGift.message;
  
  // Xử lý ảnh (nếu có)
  const giftImage = document.getElementById('giftImage');
  if (randomGift.image) {
    giftImage.src = randomGift.image;
    giftImage.style.display = 'block';
  } else {
    giftImage.style.display = 'none';
  }
  
  document.getElementById('giftDisplay').style.display = 'flex';
}

// Đóng hộp quà
function closeGift() {
  document.getElementById('giftDisplay').style.display = 'none';
}

// Tự động tạo bong bóng
function startBubbles() {
  // Tạo bong bóng ban đầu
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createBubble(), i * 500);
  }
  
  // Tạo bong bóng liên tục
  setInterval(createBubble, 2000);
}

// Bắt đầu khi trang load
window.addEventListener('load', startBubbles);

// Click vào background để tạo bong bóng mới
document.addEventListener('click', function(e) {
  // Chỉ tạo bong bóng nếu click vào background, không phải vào các elements khác
  if (e.target === document.body || e.target.classList.contains('bubbles-container')) {
    createBubble();
  }
});
