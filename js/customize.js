// -----  基本功能開關   ---------------------------------------------------
window.addEventListener('load', () => {
  topNav(); // 手機版顯示nav選單
  navSticky(); // 捲動時固定主選單
  fatFooter(); // fatFooter是否要展開
  tabFunction('.tabSet'); // tab功能
  scrollTables('.tableWrapper'); // table捲動功能
  mobileSearch();

  // tableAddDataAttributes({
  //   elemClass: '.tableList', // 目標table
  //   dataName: 'title', // tableList樣式 加上 data-title
  // });

  // 全站字體
  fontSize();

  // 手風琴功能
  accordionFunction({
    accordion: '.accordion',
    openFirst: false, // 預設先展開所有內容，使用無障礙遊走不再有手風琴效果，永遠展開內容(滑鼠點擊正常開合)
    autoClose: true, // 點擊時自動關閉已展開的項目，若需要此功能需要關閉openFirst
    duration: 200,
    info: {
      open: '展開', // 收合時顯示
      close: '收合', // 展開時顯示
    },
  });
});
// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  //cp輪播
  const cpSwiper = new Swiper('.cpSlider .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,

    // 切換點
    pagination: {
      el: '.cpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.cpSlider .nextSlider', //自行設定樣式
      prevEl: '.cpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 4,
      },
    },
  });

  //大圖輪播
  let mpSliderItem = document.querySelectorAll('.mpSlider .swiper-slide');
  let mpSliderPagination = [];
  mpSliderItem.forEach((item, index) => {
    mpSliderPagination.push(item.dataset.title);
  });
  const mpSlider = new Swiper('.mpSlider .swiper', {
    // centeredSlides: true,
    // spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    // 切換點
    pagination: {
      el: '.mpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className} noFonts" aria-label="${mpSliderPagination[index]}">${mpSliderPagination[index]}</button>`;
      },
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .nextSlider', //自行設定樣式
      prevEl: '.mpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
  });

  //廣告輪播
  const adSwiper = new Swiper('.adSlider .swiper', {
    slidesPerView: 5,
    spaceBetween: 40,
    loop: false,
    // 切換點
    pagination: {
      el: '.adSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.adSlider .nextSlider', //自行設定樣式
      prevEl: '.adSlider .prevSlider', //自行設定樣式
      disabledClass: '.adSlider swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 5,
      },
    },
  });

  //書籍輪播
  const bookSwiper = new Swiper('.bookSlider .swiper', {
    slidesPerView: 5,
    //centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    // 切換點
    pagination: {
      el: '.bookSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.bookSlider .nextSlider', //自行設定樣式
      prevEl: '.bookSlider .prevSlider', //自行設定樣式
      disabledClass: '.bookSlider swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
        centeredSlides: true,
      },
      1000: {
        slidesPerView: 5,
      },
    },
  });

  const serviceSlider1 = new Swiper('.serviceSlider-1 .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.serviceSlider-1 .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.serviceSlider-1 .nextSlider', //自行設定樣式
      prevEl: '.serviceSlider-1 .prevSlider', //自行設定樣式
      disabledClass: '.serviceSlider-1 swiperArrow-disabled', //不可點選樣式
    },
  });
  const serviceSlider2 = new Swiper('.serviceSlider-2 .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.serviceSlider-2 .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.serviceSlider-2 .nextSlider', //自行設定樣式
      prevEl: '.serviceSlider-2 .prevSlider', //自行設定樣式
      disabledClass: '.serviceSlider-2 swiperArrow-disabled', //不可點選樣式
    },
  });
  const serviceSlider3 = new Swiper('.serviceSlider-3 .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.serviceSlider-3 .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.serviceSlider-3 .nextSlider', //自行設定樣式
      prevEl: '.serviceSlider-3 .prevSlider', //自行設定樣式
      disabledClass: '.serviceSlider-3 swiperArrow-disabled', //不可點選樣式
    },
  });

  //跑馬燈
  const marqueeSwiper = new Swiper('.marquee .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marquee .nextSlider', //自行設定樣式
      prevEl: '.marquee .prevSlider', //自行設定樣式
      disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
    },
  });

  //cp_photo
  const navSlider = new Swiper('.navSlider .swiper', {
    lazy: true, // lazy load
    preloadImages: false, // 多筆設定lazy時須設定
    centeredSlides: false, // 多筆設定lazy時須設定
    slidesPerView: 4,
    // watchSlidesProgress: true,
    navigation: {
      nextEl: '.navSlider .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
      prevEl: '.navSlider .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  const sliderFor = new Swiper('.sliderFor .swiper', {
    slidesPerView: 1, //顯示張數
    effect: 'fade', //淡入
    fadeEffect: {
      crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
    },
    pagination: {
      el: '.sliderFor .pagination',
      type: 'fraction', //顯示分頁
    },
    lazy: true,
    thumbs: {
      swiper: navSlider, //設定指向到哪個swiper，使用另一個設定的參數
    },
  });
})();
