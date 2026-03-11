const letterLines = [



  "Ngày trước, khi muốn bày tỏ tình cảm với người mình thương,",



  "ông bà hay ba mẹ thường viết thư tay gửi cho nhau.",







  "",



  "Những lá thư được viết trên giấy,",



  "rồi cẩn thận gửi đến người nhận.",







  "",



  "Bây giờ mọi thứ đã hiện đại hơn nhiều,",



  "bé cũng muốn làm một lá thư theo cách đặc biệt hơn một chút.",







  "Với lại nếu viết thư tay,",



  "không biết đến bao giờ mới đến được tay anh,",



  "vậy thì muộn sinh nhật mất rồi.",







  "",



  "Thế nên bé quyết định", 



  "viết một 'lá thư nhỏ'",



  "bằng code dành tặng cho anh - người bé yêu nhất!",







  "",



  "Cũng nhờ những dòng code như vậy",



  "mà tụi mình mới có cơ hội gặp nhau,",



  "ngồi cạnh nhau trong buổi học hôm đó.",







  "",



  "Vì vậy bé nghĩ,",



  "lá thư bằng code là hợp lý nhất rồi.",







  "",



  "Vừa đúng với cách tụi mình gặp nhau,",



  "vừa là cách bé muốn lưu lại kỷ niệm nhỏ giữa hai đứa.",







  "",



  "",



  "",



  "",



];







let letterLineIndex = 0;



let letterCharIndex = 0;



let isLetterOpen = false;



let currentPage = 1;



const totalPages = 3;



const linesPerPage = [8, 8, 13]; // Trang 1: 8 dòng, Trang 2: 8 dòng, Trang 3: 13 dòng



let typingTimeout;



let isTyping = false;



let completedPages = new Set();







function getLinesPerPage(page) {



  return linesPerPage[page - 1];



}







function getPageStartLine(page) {



  let start = 0;



  for (let i = 1; i < page; i++) {



    start += linesPerPage[i - 1];



  }



  return start;



}







function getPageEndLine(page) {



  const start = getPageStartLine(page);



  const count = getLinesPerPage(page);



  return Math.min(start + count, letterLines.length);



}







function openEnvelope() {



  const envelope = document.getElementById('envelope');



  const envelopeFlap = document.getElementById('envelopeFlap');



  const envelopeContainer = document.getElementById('envelopeContainer');



  const letterPage = document.getElementById('letterPage');



  



  if (!envelopeFlap || !envelopeContainer || !letterPage) {



    console.error('Missing elements');



    return;



  }



  



  envelopeFlap.style.transform = 'rotateX(180deg)';



  



  setTimeout(() => {



    envelopeContainer.style.display = 'none';



    letterPage.style.display = 'flex';



    letterPage.style.opacity = '0';



    



    setTimeout(() => {



      letterPage.style.opacity = '1';



      letterPage.style.transition = 'opacity 1s ease';



      startTyping();



    }, 100);



  }, 800);



}







function startTyping() {



  isLetterOpen = true;



  currentPage = 1;



  completedPages.clear();



  updatePageIndicator();



  updateNavigationButtons();



  typeLetter();



}

function goToBirthday() {
  sessionStorage.setItem('playBirthdayMusicOnLoad', 'true');
}

function goBackToIndex() {
  sessionStorage.setItem('playIndexMusicOnLoad', 'true');
}





function typeLetter() {

  if (!isLetterOpen) return;

  

  const pageStartLine = getPageStartLine(currentPage);

  const pageEndLine = getPageEndLine(currentPage);



  



  if (letterLineIndex >= pageEndLine) {



    completedPages.add(currentPage);



    updateNavigationButtons();



    return;



  }



  



  let elementId = "l" + (letterLineIndex + 1);



  let element = document.getElementById(elementId);



  



  if (!element) {



    letterLineIndex++;



    letterCharIndex = 0;



    setTimeout(typeLetter, 100);



    return;



  }







  let text = letterLines[letterLineIndex];







  if (letterCharIndex < text.length) {



    element.innerHTML += text.charAt(letterCharIndex);



    letterCharIndex++;



    isTyping = true;



    typingTimeout = setTimeout(typeLetter, 35);



  } else {



    letterLineIndex++;



    letterCharIndex = 0;



    isTyping = false;



    setTimeout(typeLetter, 400);



  }



}







function skipCurrentLine() {



  if (!isTyping || !isLetterOpen) return;



  



  clearTimeout(typingTimeout);



  



  let elementId = "l" + (letterLineIndex + 1);



  let element = document.getElementById(elementId);



  



  if (element && letterLineIndex < letterLines.length) {



    element.innerHTML = letterLines[letterLineIndex];



    letterLineIndex++;



    letterCharIndex = 0;



    isTyping = false;



    typeLetter();



  }



}







function changePage(direction) {



  const newPage = currentPage + direction;



  



  if (newPage < 1 || newPage > totalPages) return;



  



  document.getElementById('page' + currentPage).style.display = 'none';



  



  currentPage = newPage;



  document.getElementById('page' + currentPage).style.display = 'block';



  



  updatePageIndicator();



  



  if (completedPages.has(currentPage)) {



    const pageStartLine = getPageStartLine(currentPage);



    const pageEndLine = getPageEndLine(currentPage);



    



    for (let i = pageStartLine; i < pageEndLine; i++) {



      let elementId = "l" + (i + 1);



      let element = document.getElementById(elementId);



      if (element) {



        element.innerHTML = letterLines[i];



      }



    }



    letterLineIndex = pageEndLine;



  } else {



    letterLineIndex = getPageStartLine(currentPage);



    letterCharIndex = 0;



    



    const pageEndLine = getPageEndLine(currentPage);



    for (let i = letterLineIndex; i < pageEndLine; i++) {



      let elementId = "l" + (i + 1);



      let element = document.getElementById(elementId);



      if (element) {



        element.innerHTML = "";



      }



    }



    



    typeLetter();



  }



  



  updateNavigationButtons();



}







function updatePageIndicator() {



  document.getElementById('currentPage').textContent = currentPage;



  document.getElementById('totalPages').textContent = totalPages;



}







function updateNavigationButtons() {



  const prevBtn = document.getElementById('prevBtn');



  const nextBtn = document.getElementById('nextBtn');



  



  if (currentPage === 1) {



    prevBtn.style.opacity = '0.3';



    prevBtn.style.pointerEvents = 'none';



  } else {



    prevBtn.style.opacity = '1';



    prevBtn.style.pointerEvents = 'auto';



  }



  



  const pageEndLine = getPageEndLine(currentPage);



  if (letterLineIndex >= pageEndLine) {



    if (currentPage === totalPages) {



      nextBtn.style.opacity = '0.3';



      nextBtn.style.pointerEvents = 'none';



    } else {



      nextBtn.style.opacity = '1';



      nextBtn.style.pointerEvents = 'auto';



    }



  } else {



    nextBtn.style.opacity = '0.3';



    nextBtn.style.pointerEvents = 'none';



  }



  



  // Kiểm tra xem tất cả các trang đã hoàn thành typing chưa



  checkAllPagesCompleted();



}







function checkAllPagesCompleted() {



  const totalLines = linesPerPage.reduce((sum, lines) => sum + lines, 0);



  const navigation = document.querySelector('.letter-navigation');



  



  if (letterLineIndex >= totalLines) {



    // Đã hoàn thành tất cả các trang, hiện nút điều hướng



    navigation.style.display = 'flex';



  } else {



    // Chưa hoàn thành, ẩn nút điều hướng



    navigation.style.display = 'none';



  }



}







window.onload = function() {

  const envelope = document.getElementById('envelope');

  

  if (envelope) {

    envelope.addEventListener('click', openEnvelope);

    console.log('Envelope click event attached');

  } else {

    console.error('Envelope element not found');

  }

  

  document.addEventListener('click', function(e) {
    if (isLetterOpen && isTyping && !e.target.closest('.page-nav-btn') && !e.target.closest('.nav-btn')) {
      skipCurrentLine();
    }
  });

  

  if (sessionStorage.getItem('playLetterMusicOnLoad') === 'true') {
    sessionStorage.removeItem('playLetterMusicOnLoad');
    startLetterMusic();
  }

  updateNavigationButtons();

};



// ===== khởi tạo nhạc =====



let letterMusicStarted = false;



function startLetterMusic() {

  if (letterMusicStarted) return;

  

  const bgMusic = document.getElementById('bgMusic');

  if (bgMusic) {

    bgMusic.volume = 0.3;

    bgMusic.currentTime = 0;

    bgMusic.play().then(() => {

      letterMusicStarted = true;

      console.log('Letter music started successfully');

    }).catch(e => console.log('Letter autoplay blocked:', e));

  }

}



// Reset khi reload trang

window.addEventListener('beforeunload', function() {

  letterMusicStarted = false;

});

