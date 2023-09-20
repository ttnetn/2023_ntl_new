// -----------------------------------------------------------------------
// -----  nojs 先移除  ----------------------------------------------------
// -----------------------------------------------------------------------

const windowWidthSmall = 768;
const _webHtml = document.documentElement;
_webHtml.classList.remove('no-js');

// -----------------------------------------------------------------------
// -----  共用效果  -------------------------------------------------------
// -----------------------------------------------------------------------

const slider = (function () {
  let Slider = {};
  function TimerManager() {
    this.timers = [];
    this.args = [];
    this.isTimerRun = false;
  }
  TimerManager.makeTimerManage = function (element) {
    element.TimerManage = new TimerManager();
    if (!element.TimerManage || element.TimerManage.constructor !== TimerManager) {
    }
  };
  TimerManager.prototype.add = function (timer, args) {
    this.timers.push(timer);
    this.args.push(args);
    this.timerRun();
  };
  TimerManager.prototype.timerRun = function () {
    if (!this.isTimerRun) {
      let timer = this.timers.shift(),
        args = this.args.shift();
      if (timer && args) {
        this.isTimerRun = true;
        timer(args[0], args[1]);
      }
    }
  };
  TimerManager.prototype.next = function () {
    this.isTimerRun = false;
    this.timerRun();
  };

  function jsSlideUp(element, time) {
    if (element.offsetHeight > 0) {
      let totalHeight = element.offsetHeight;
      let currentHeight = totalHeight;
      let reduceValue = totalHeight / (time / 10);
      element.style.transition = `height ${time} ms`;
      element.style.overflow = 'hidden';
      let timer = setInterval(function () {
        currentHeight -= reduceValue;
        element.style.height = `${currentHeight}px`;
        if (currentHeight <= 0) {
          clearInterval(timer);
          element.style.display = 'none';
          element.style.height = `${totalHeight}px`;
          if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
        element.TimerManage.next();
      }
    }
  }

  function jsSlideDown(element, time) {
    if (element.offsetHeight <= 0) {
      element.style.display = 'block';
      element.style.transition = `height ${time} ms`;
      element.style.overflow = 'hidden';
      let totalHeight = element.offsetHeight;
      let currentHeight = 0;
      element.style.height = '0px';
      let addValue = totalHeight / (time / 10);
      let timer = setInterval(function () {
        currentHeight += addValue;
        element.style.height = `${currentHeight}px`;
        if (currentHeight >= totalHeight) {
          clearInterval(timer);
          element.style.height = `${totalHeight}px`;
          if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
        element.TimerManage.next();
      }
    }
  }

  function jsSlideToggle(element, time) {
    if (element.offsetHeight <= 0) {
      element.style.display = 'block';
      element.style.transition = `height ${time} ms`;
      element.style.overflow = 'hidden';
      let totalHeight = element.offsetHeight;
      let currentHeight = 0;
      element.style.height = '0px';
      let addValue = totalHeight / (time / 10);
      let timer = setInterval(function () {
        currentHeight += addValue;
        element.style.height = `${currentHeight}px`;
        if (currentHeight >= totalHeight) {
          clearInterval(timer);
          element.style.height = `${totalHeight}px`;
          if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      let totalHeight2 = element.offsetHeight;
      let currentHeight2 = totalHeight2;
      let reduceValue2 = totalHeight2 / (time / 10);
      element.style.transition = `height ${time} ms`;
      element.style.overflow = 'hidden';
      let timer2 = setInterval(function () {
        currentHeight2 -= reduceValue2;
        element.style.height = `${currentHeight2}px`;
        if (currentHeight2 <= 0) {
          clearInterval(timer2);
          element.style.display = 'none';
          element.style.height = `${totalHeight2}px`;
          if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
            element.TimerManage.next();
          }
        }
      }, 10);
    }
  }
  // the interface about slideUp method
  Slider.jsSlideUp = function (element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(jsSlideUp, arguments);
    return this;
  };
  // the interface about slideDown method
  Slider.jsSlideDown = function (element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(jsSlideDown, arguments);
    return this;
  };
  Slider.jsSlideToggle = function (element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(jsSlideToggle, arguments);
    return this;
  };
  return Slider;
})();

function jsFadeIn(element) {
  let val = 0;
  let request;
  element.style.display = 'block';
  requestAnimationFrame(fade);
  function fade() {
    val += 5;
    if (val <= 100) {
      element.style.opacity = val / 100;
      request = requestAnimationFrame(fade);
    } else if (val >= 100) {
      cancelAnimationFrame(request);
    }
  }
}

function jsFadeOut(element) {
  let val = 100;
  let request;
  requestAnimationFrame(fade);
  function fade() {
    val -= 5;
    if (val >= 0) {
      element.style.opacity = val / 100;
      request = requestAnimationFrame(fade);
    } else if (val < 0) {
      setTimeout(() => {
        element.style = '';
      }, 300);
      cancelAnimationFrame(request);
    }
  }
}

function jsFadeToggle(element) {
  let display = window.getComputedStyle(element).display;
  if (display === 'none') {
    display = 'block';
    element.style.display = display;
    element.style.opacity = 0;
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `300ms`;
    element.style.opacity = 1;
    setTimeout(() => {
      element.style.removeProperty('transition-property');
      element.style.removeProperty('transition-duration');
    }, 300);
  } else {
    element.style.opacity = 1;
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `300ms`;
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('transition-property');
      element.style.removeProperty('transition-duration');
    }, 300);
  }
}

function jsAddClass(element, className) {
  if (element.classList) element.classList.add(className);
  else if (!hasClass(element, className)) {
    element.className += ' ' + className;
  }
}

function jsRemoveClass(element, className) {
  if (element.classList) element.classList.remove(className);
  else if (hasClass(element, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    element.className = element.className.replace(reg, ' ');
  }
}

// jsParents 可使用tag或是class，單筆可以直接使用，多筆需要用forEach去調用每一個parents
// element 需要帶入參數，dom需要先用變數指定，如： let a = document.querySelector()
// elementCheck 目前只能使用抓class和tag，tag請用小寫
function jsParents(element, elementCheck) {
  const elementParentsCheck = elementCheck.toLowerCase() || null;
  const matched = [];
  const elementArr = [];
  !element.item ? elementArr.push(element) : (elementArr = element);
  elementArr.forEach((s) => {
    let current = s;
    while (current.parentNode != null && current.parentNode != document.documentElement) {
      matched.push(current.parentNode);
      current = current.parentNode;
    }
  });
  const check = matched.filter((i) => {
    return i.localName == elementParentsCheck ? i : i.classList.contains(elementParentsCheck) ? i : elementParentsCheck === null ? i : '';
  });
  return check.length === 1 ? check[0] : check;
}

// 亂數數字
function randomFloor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 亂數英文字
function randomLetter(max) {
  var text = '';
  var letter = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < max; i++) text += letter.charAt(Math.floor(Math.random() * letter.length));
  return text;
}
// -----------------------------------------------------------------------
// -----  MENU初始化 ------------------------------------------------------
// -----------------------------------------------------------------------
function menu() {
  // --- menu初始化 新增側欄選單
  const body = document.querySelector('body');
  const sidebar = document.createElement('aside');
  sidebar.className = 'mobileSidebar';
  sidebar.style = 'opacity:0;';

  body.innerHTML += `<div class="menuOverlay"></div>`;
  sidebar.innerHTML = '<div class="mobileArea"><button type="button" class="sidebarClose">關閉</button></div>';
  body.prepend(sidebar);

  const mainMenu = document.querySelector('.mainMenu');
  const hasChild = mainMenu.querySelectorAll('li ul');
  hasChild.forEach((i) => {
    i.parentNode.classList.add('hasChild');
  });

  // --- menu初始化 新增側欄選單按鈕
  const sidebarCtrlBtn = document.createElement('button');
  sidebarCtrlBtn.className = 'sidebarCtrlBtn';
  sidebarCtrlBtn.setAttribute('type', 'button');

  const siteHeader = document.querySelector('.header .container');
  siteHeader.prepend(sidebarCtrlBtn);

  // --- menu初始化 複製手機版側欄選單
  const mobileArea = document.querySelector('.mobileArea');
  const cloneMenu = mainMenu.cloneNode(true);
  cloneMenu.classList.add('sideMainMenu');
  cloneMenu.classList.remove('mainMenu', 'megaMenu', 'menu');
  mobileArea.append(cloneMenu);

  // --- 搜尋判斷
  window.addEventListener('resize', mobileSearchFunction);
  window.addEventListener('load', mobileSearchFunction);
  function mobileSearchFunction() {
    let windowWidth = body.outerWidth;
    const search = document.querySelector('.webSearch');
    if (search !== null && windowWidth < windowWidthSmall) {
      search.removeAttribute('style');
      search.classList.add('mobileSearch');
      search.classList.remove('desktopSearch');
    } else if (search !== null && windowWidth > windowWidthSmall) {
      search.removeAttribute('style');
      search.classList.remove('mobileSearch');
      search.classList.add('desktopSearch');
    }
  }
}
menu();

// -----------------------------------------------------------------------
// ----- 複製手機版nav選單 -------------------------------------------------
// -----------------------------------------------------------------------

function topNav() {
  const body = document.querySelector('body');
  const mobileArea = document.querySelector('.mobileArea');
  const nav = document.querySelector('.navigation') || null;

  if (nav !== null) {
    const cloneNav = nav.cloneNode(true);
    mobileArea.append(cloneNav);
  }

  const sideLanguage = document.querySelector('.mobileArea .fontSize');
  // 移除手機版字體大小按鈕
  if (sideLanguage !== null) {
    sideLanguage.remove();
    body.classList.remove('smallSize', 'largeSize');
    body.classList.add('mediumSize');
  }

  const languageSelect = document.querySelectorAll('.slidedown');

  function languageSelectInit() {
    const languageSelect = new SelectSlider({
      name: document.querySelectorAll('.slidedown'), // --- 控制的對象
      control: document.querySelectorAll('.slidedown button'), // --- 監聽的對象
    });
    languageSelect.initial();
  }

  languageSelect !== null ? languageSelectInit() : '';
}
// topNav();

// -----------------------------------------------------------------------
// ----- websearch設定 ------------------------------------------------
// -----------------------------------------------------------------------

function searchTypeB() {
  const siteHeader = document.querySelector('.header .container');
  const searchBtnOut = document.querySelector('.wrapper .submenuBox') || null;
  const webSearch = document.querySelector('.wrapper .webSearch') || null;
  const searchBtn = document.querySelector('.wrapper .webSearchBtn button') || null;
  const menuOverlay = document.querySelector('.menuOverlay');
  const body = document.querySelector('body');
  let windowWidth = window.outerWidth;

  let clickFn = (item) => {
    // --- 點擊 模組
    item.addEventListener('click', (e) => {
      e.preventDefault();
      slider.jsSlideToggle(webSearch, 200);
      jsFadeToggle(menuOverlay);
    });
    // --- Keydown
    item.addEventListener('keydown', (e) => {
      if (webSearch.classList.contains('typeB')) {
        slider.jsSlideToggle(webSearch, 200);
        jsFadeToggle(menuOverlay);
      }
    });
  };

  if (webSearch !== null) {
    const webSearchBtn = document.createElement('button');
    webSearchBtn.className = 'mobileSearchBtn';
    webSearchBtn.setAttribute('type', 'button');
    siteHeader.prepend(webSearchBtn);

    const remove = document.querySelector('aside .submenuBox .webSearchBtn');
    remove?.remove();

    let checkMobile = () => {
      windowWidth = window.outerWidth;
      webSearch.removeAttribute('style');
      const observer = new ResizeObserver(function (entries) {
        if (entries[0].contentRect.width <= windowWidthSmall) {
          !webSearchBtn.classList.contains('active') && webSearchBtn.classList.add('active');
          !webSearch.classList.contains('mobile') && webSearch.classList.add('mobile');
          let webSearchTop = document.querySelector('header').offsetHeight;
          webSearch.style.top = `${webSearchTop}px`;
        } else {
          webSearchBtn.classList.contains('active') && webSearchBtn.classList.remove('active');
          webSearch.classList.contains('mobile') && webSearch.classList.remove('mobile');
          let webSearchTop = searchBtnOut?.parentElement.offsetHeight;
          webSearch.style.top = `${webSearchTop}px`;
        }
      });
      observer.observe(body);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    searchBtn !== null ? clickFn(searchBtn) : '';

    clickFn(webSearchBtn);

    // --- Focusout
    const nodes = webSearch.querySelectorAll('a,button,input');
    const lastNodes = nodes[nodes.length - 1];
    lastNodes.addEventListener('focusout', (e) => {
      e.preventDefault();
      if (webSearch.classList.contains('typeB')) {
        slider.jsSlideUp(webSearch, 200);
        jsFadeToggle(menuOverlay);
      }
    });
    // --- 關閉
    function clickOtherPlace(e) {
      const chooseClassName = webSearchBtn.className;
      if (e.target.closest(`.webSearch`) === null && e.target !== searchBtn) {
        slider.jsSlideUp(webSearch, 200);
        jsFadeOut(menuOverlay);
      } else {
        return;
      }
    }
    // document.addEventListener('touchstart', (e) => {
    //   e.preventDefault();
    //   clickOtherPlace(e);
    // });
    // document.addEventListener('click', clickOtherPlace);
  }
}

function mobileSearch(obj) {
  searchTypeB();
}
// mobileSearch({
//   searchCtrlBtn: document.querySelector('.searchCtrlBtn'),
// });

// -----------------------------------------------------------------------
// ----- 手機桌機版本切換及手機版menu設定 -------------------------------------
// -----------------------------------------------------------------------

function mainMenuSetup() {
  const body = document.querySelector('body');
  const sidebar = document.querySelector('.mobileSidebar');
  // const mobileSearch = document.querySelector('.mobileSearch');
  const sidebarClose = document.querySelector('.sidebarClose');
  const sidebarCtrlBtn = document.querySelector('.sidebarCtrlBtn');
  const menuOverlay = document.querySelector('.menuOverlay');
  const mobileArea = document.querySelector('.mobileArea');
  let sidebarOut = sidebar.offsetWidth;
  let windowWidth = window.outerWidth;
  let searchMode = false;

  // ---  PC版設定
  const menuLiHasChild = document.querySelector('.header .mainMenu').querySelectorAll('li.hasChild');
  const menuLi = document.querySelectorAll('.header .mainMenu > ul > li');
  // ---  手機版設定
  const asideMenu = document.querySelector('.sideMainMenu');
  const asideMenuLi = asideMenu.querySelectorAll('li');
  const asideMenuUl = asideMenu.querySelector('ul');
  const asideMenuNextUl = asideMenuUl.querySelectorAll('ul');

  // ---  判斷PC版選單超過畫面時左邊增加.leftSlider
  function checkUlWidth() {
    // --- 計算
    let menuLeft = document.querySelector('.header .container').offsetLeft;
    menuLi.forEach((v, i) => {
      let menuLiLeft = v.offsetLeft;
      let leftWidth = v.offsetWidth * v.querySelectorAll('ul').length;
      menuLiLeft + leftWidth + menuLeft > windowWidth ? v.classList.add('leftSlider') : v.classList.remove('leftSlider');
    });
  }

  sidebar.style = `transform: translateX(${sidebarOut * -1}px)`;

  // --- 手機版選單開合功能
  asideMenu.querySelectorAll('.hasChild > a').forEach((item, index) => {
    let content = item.parentElement.querySelector('ul');
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAccordion(item, index, content);
      return;
    });

    item.addEventListener('keydown', (e) => {
      // --- 頁籤第幾個按鈕觸發時
      e.stopPropagation();
      if (e.which === 9 && !e.shiftKey) {
        //tab
        toggleAccordion(item, index, content);
      } else if (e.which === 9 && e.shiftKey) {
        //shift+tab
        toggleAccordion(item, index, content);
      }
    });

    function toggleAccordion(item, index, content) {
      let display = window.getComputedStyle(content).display;
      content.style.display = display;

      if (display === 'none') {
        display = 'block';
        content.style.overflow = 'hidden';
        content.style.display = display;
        let height = content.offsetHeight;
        content.style.height = 0;
        content.offsetHeight;
        content.style.transitionProperty = 'height';
        content.style.transitionDuration = `300ms`;
        content.style.height = height + 'px';

        setTimeout(() => {
          content.style.removeProperty('overflow');
          content.style.removeProperty('height');
          content.style.removeProperty('transition-duration');
          content.style.removeProperty('transition-property');
        }, 300);
      } else {
        content.style.overflow = 'hidden';
        content.style.height = `${content.offsetHeight}px`;
        content.style.transitionProperty = 'height';
        content.style.transitionDuration = `300ms`;
        content.offsetHeight;
        content.style.height = 0;
        setTimeout(() => {
          content.style.display = 'none';
          content.style.removeProperty('overflow');
          content.style.removeProperty('height');
          content.style.removeProperty('transition-duration');
          content.style.removeProperty('transition-property');
        }, 300);
      }

      const siblings = Array.prototype.filter.call(item.parentElement.parentElement.children, (child) => {
        return child !== item.parentElement;
      });
      siblings.forEach((v) => {
        if (v.querySelector('ul') !== null) {
          let con = v.querySelector('ul');
          if (display !== 'none') {
            con.style.height = `${con.offsetHeight}px`;
            con.style.transitionProperty = 'height';
            con.style.transitionDuration = `300ms`;
            con.offsetHeight;
            con.style.height = 0;
            setTimeout(() => {
              con.style.display = 'none';
              con.style.removeProperty('height');
              con.style.removeProperty('transition-duration');
              con.style.removeProperty('transition-property');
            }, 300);
          }
        }
      });
    }
  });

  // --- 點擊選單按鈕 執行 展開側邊選單函式
  sidebarCtrlBtn.addEventListener('click', (e) => {
    showSidebar();
    e.preventDefault();
    // mobileSearch !== null ? mobileSearch.classList.remove('active') : '';
    menuOverlay.style.zIndex = '99';
  });

  menuOverlay.addEventListener('click', (e) => {
    hideSidebar();
  });
  sidebarClose.addEventListener('click', (e) => {
    jsFadeOut(menuOverlay);
    hideSidebar();
    // mobileSearch !== null ? mobileSearch.classList.remove('active') : '';
  });

  // --- PC版設定
  const handleMouseenter = (e) => {
    e.currentTarget.classList.add('active');
  };
  const handleMouseleave = (e) => {
    e.currentTarget.classList.remove('active');
  };
  const handleClick = (e) => {
    e.currentTarget.stopPropagation();
    e.currentTarget.preventDefault();
  };

  let checkWindow = false;
  let resizeTimeout;
  // --- 切換 PC/Mobile 選單
  function switchMenu() {
    if (windowWidth > windowWidthSmall && !checkWindow) {
      let language = document.querySelector('.language ul');
      hideSidebar();
      body.classList.remove('noscroll');
      // mobileSearch !== null ? (mobileSearch.style.display = 'none') : '';
      language !== null ? (language.style.display = 'none') : '';
      // --- 副選單滑出

      menuLiHasChild.forEach((i) => {
        i.addEventListener('mouseenter', handleMouseenter);
        i.addEventListener('mouseleave', handleMouseleave);
        i.addEventListener('click', handleClick);
      });

      checkWindow = true;
    } else if (windowWidth <= windowWidthSmall && checkWindow) {
      body.classList.remove('largeSize', 'medium_size');

      menuLiHasChild.forEach((i) => {
        i.removeEventListener('mouseenter', handleMouseenter);
        i.removeEventListener('mouseleave', handleMouseleave);
        i.removeEventListener('click', handleClick);
      });
      checkWindow = false;
    }
  }

  // --- 行動版/電腦版切換
  window.addEventListener('resize', switchResizeFunction);
  window.addEventListener('load', switchResizeFunction);

  function switchResizeFunction() {
    setTimeout(() => {
      // mobileSearch !== null ? (mobileSearch.style.display = 'none') : '';
      windowWidth = window.outerWidth;
      switchMenu();
      checkUlWidth();
      hideSidebar();
    }, 50);
  }

  // --- 展開側邊選單函式
  function showSidebar() {
    sidebar.style = 'display:block;opacity:1';
    sidebar.style.display = 'block';

    requestAnimationFrame(() => {
      sidebar.style = `transform: translateX(0px);`;
    });
    setTimeout(() => {
      mobileArea.classList.add('open');
    }, 50);

    body.classList.add('noscroll');
    // mobileSearch !== null ? (mobileSearch.style.display = 'none') : '';
    searchMode = false;
    jsFadeIn(menuOverlay);
  }

  // --- 隱藏側邊選單函式
  function hideSidebar() {
    jsFadeOut(menuOverlay);
    window.requestAnimationFrame(() => {
      sidebar.style = `transform: translateX(${sidebarOut * -1}px);`;
    });
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, 300);

    mobileArea.classList.remove('open');
    body.classList.remove('noscroll');
    asideMenuNextUl.forEach((i) => {
      i.style.display = 'none';
    });

    asideMenuLi.forEach((i) => {
      i.classList.remove('active');
    });
  }
}
mainMenuSetup();

// -----------------------------------------------------------------------
// -----  menu 訊息區塊 sticky  -------------------------------------------
// -----------------------------------------------------------------------

function navSticky() {
  const mainMenu = document.querySelector('.mainMenu');
  const main = document.querySelector('.main');
  let windowWidth = window.outerWidth;
  let menuHeight = Math.floor(mainMenu.offsetHeight);
  let mainMenuTop = Math.floor(mainMenu.getBoundingClientRect().top + window.scrollY);
  let offsetTop = Math.floor(mainMenuTop) || null;

  // --- 取menu高度
  jsScroll(mainMenuTop);
  jsResize(mainMenuTop);
  reload(mainMenuTop);

  // --- menu 的 sticky函式
  function sticky(mainMenuTop) {
    offsetTop = Math.floor(mainMenuTop) || null;
    // --- 如果 offsetTop 不等於 null 則運行下方函式
    if (offsetTop != null) {
      if (windowWidth >= windowWidthSmall && window.scrollY > offsetTop) {
        mainMenu.classList.add('sticky');
        main.style = `padding-top: ${menuHeight}px`;
      } else {
        mainMenu.classList.remove('sticky');
        main.removeAttribute('style');
      }
    }
  }

  // --- 當 scroll 觸發
  function jsScroll(mainMenuTop) {
    // --- scroll 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
    window.addEventListener('scroll', (e) => {
      sticky(mainMenuTop);
    });
  }

  // --- 當 resize 觸發 判斷 menu的種類
  function jsResize(mainMenuTop) {
    // --- 如果 有 menu 的話 執行固定 menu_stickyNavbar
    window.addEventListener('resize', (e) => {
      // --- 算出 menu 距離上方的高度
      offsetTop = Math.floor(mainMenuTop) || null;
      setTimeout(() => {
        main.removeAttribute('style');
        sticky(offsetTop);
      }, 50);
    });
  }

  function reload(mainMenuTop) {
    offsetTop = Math.floor(mainMenuTop) || null;
    window.onload = sticky(offsetTop);
  }
}
// navSticky();

// -----------------------------------------------------------------------
// -----  menu的無障礙tab設定 a11yKeyMenu  ---------------------------------
// -----------------------------------------------------------------------

function a11yKeyMenu(elem) {
  const mainMenu = document.querySelector(elem) || null;

  // --- keyup時
  const control = mainMenu.querySelectorAll('li');

  control.forEach((i) => {
    i.addEventListener('keyup', (e) => {
      const siblings = Array.prototype.filter.call(i.parentNode.children, (child) => {
        return child !== i;
      });

      siblings.forEach((x) => {
        x.classList.remove('active');
        x.querySelectorAll('ul').forEach((s) => {
          s.style.display = 'none';
        });
      });
    });
  });

  // --- 不focus時
  const lastA = mainMenu.querySelectorAll('a').length - 1;
  mainMenu.querySelectorAll('a')[lastA].addEventListener('focusout', () => {
    mainMenu.querySelectorAll('li').forEach((i) => {
      i.classList.remove('active');
    });
  });

  // --- child keyup時
  const childControl = mainMenu.querySelectorAll('li.hasChild > a');

  childControl.forEach((i) => {
    i.addEventListener('keyup', (e) => {
      i.parentNode.querySelector('ul').removeAttribute('style');
      i.parentNode.classList.add('active');
    });
  });
}
a11yKeyMenu('.mainMenu');

// -----------------------------------------------------------------------
// -----  notice訊息區塊   -------------------------------------------------
// -----------------------------------------------------------------------

document.querySelectorAll('[class*="notice"] a.close').forEach((i) => {
  i.addEventListener('click', (e) => {
    i.parentNode.style.display = 'none';
    e.preventDefault();
  });
});

// -----------------------------------------------------------------------
// -----  fatFooter   ----------------------------------------------------
// -----------------------------------------------------------------------

function fatFooter(obj) {
  const el = document.querySelector('.btnFatFooter') || null; // --- 控制的對象

  if (el !== null) {
    function fatFooterInit() {
      // --- 抓取UI高度 css樣式修改樣式重新抓取高度
      const _navUl = el.parentNode.querySelectorAll('nav ul li ul');
      setTimeout(() => {
        _navUl.forEach((i) => {
          i.setAttribute('style', '');
          let _itemHeight = i.offsetHeight;
          i.dataset.itemHeight = _itemHeight;
          if (Number(_itemHeight) !== 0) {
            i.style.height = `${Number(i.dataset.itemHeight)}px`;
          } else {
            i.style.height = '0px';
          }
        });
      }, 20);
    }

    function toggleFatFooter() {
      const _navUl = el.parentNode.querySelectorAll('nav ul li ul');
      _navUl.forEach((i) => {
        if (i.offsetHeight !== 0) {
          i.style.height = '0px';
          el.innerHTML = '收合/CLOSE';
          el.setAttribute('name', '收合選單/CLOSE');
        } else {
          i.style.height = `${i.dataset.itemHeight}px`;
          el.innerHTML = '展開/OPEN';
          el.setAttribute('name', '展開選單/OPEN');
        }
      });
      el.classList.toggle('close');
    }

    fatFooterInit();
    // --- 點擊時
    el.addEventListener('click', toggleFatFooter);

    window.addEventListener('resize', () => {
      fatFooterInit();
    });
  }
}
// fatFooter();

// -----------------------------------------------------------------------
// -----  多組Tab   ------------------------------------------------------
// -----------------------------------------------------------------------

function tabFunction(elem) {
  const activeClass = 'active'; // --- 啟動的 class
  const tabSet = document.querySelectorAll(elem); // --- tab名稱
  tabSet.forEach((a) => {
    const tabBtn = a.querySelectorAll('.tabItems button'); // --- 頁籤按鈕
    const tabBtnLength = tabBtn.length; // --- 頁籤按鈕數量
    const tabContent = a.querySelectorAll('.tabContentGroup .tabContent'); // --- 頁籤內容
    tabBtn[0].classList.add('active');
    tabContent[0].classList.add('active');
    tabBtn.forEach((v, i) => {
      const thisBtn = tabBtn[i]; // --- 綁定這一個頁籤按鈕
      const thisContent = tabContent[i]; // --- 綁定這一個頁籤內容
      const thisPrevItem = tabContent[i - 1]; // --- 綁定前一個頁籤按鈕
      const itemAllA = thisContent.querySelectorAll('[href], input'); // --- 這一個頁籤內容所有a和input項目
      let prevItemAllA;
      if (thisPrevItem !== undefined) {
        prevItemAllA = thisPrevItem.querySelectorAll('[href], input'); // --- 前一個頁籤內容所有a和input項目
      }
      const isFirstTab = i === 0; // --- 如果是第一個頁籤
      const isLastTab = i === tabBtnLength - 1; // --- 如果是最後一個頁籤
      const itemFirstA = itemAllA[0]; // --- 頁籤內容第一個a或是input
      const itemLastA = itemAllA[itemAllA.length - 1]; // --- 頁籤內容最後一個a或是input
      let prevItemLastA;
      if (thisPrevItem !== undefined) {
        prevItemLastA = prevItemAllA[prevItemAllA.length - 1]; // --- 前一個頁籤的最後一個a或是input
      }
      // --- thisBtn頁籤觸發focus內容裡的第一個a
      thisBtn.addEventListener('keydown', (e) => {
        // --- 頁籤第幾個按鈕觸發時
        if (e.which === 9 && !e.shiftKey) {
          // --- e.which偵測按下哪個案件，9代表tab，shiftKey代表shift
          e.preventDefault();
          startTab(i, tabBtn, tabContent); // --- 啟動頁籤切換功能
          if (itemAllA.length) {
            // --- type number = true，0是false
            itemFirstA.focus(); // --- 第一個a或是input focus
          } else {
            tabBtn[i + 1].focus(); // --- 當內容沒有a或是input跳轉下一個tab
          }
        } else if (e.which === 9 && e.shiftKey && !isFirstTab) {
          e.preventDefault();
          startTab(i - 1, tabBtn, tabContent); // --- 啟動頁籤切換功能
          if (prevItemAllA.length) {
            prevItemLastA.focus(); // --- 前一個頁籤內容的最後一個a或是input focus
          } else {
            tabBtn[i - 1].focus(); // --- 當內容沒有a或是input跳轉上一個tab
          }
        }
      });
      // --- 當按下shift+tab且為該內容的第一個a或是input
      // --- 將focus目標轉回tab頁籤上，呼叫上方功能startTab(i - 1);往前一個頁籤
      if (itemFirstA !== undefined) {
        itemFirstA.addEventListener('keydown', (e) => {
          if (e.which === 9 && e.shiftKey) {
            e.preventDefault();
            tabBtn[i].focus();
          }
        });
      }
      // --- 當按下tab且為該內容的最後一個a或是input
      // --- focus到下一個頁籤
      if (itemLastA !== undefined) {
        itemLastA.addEventListener('keydown', (e) => {
          if (e.which === 9 && !e.shiftKey && !isLastTab) {
            e.preventDefault();
            tabBtn[i + 1].focus();
          }
        });
      }
      // --- 滑鼠點擊事件
      tabBtn[i].addEventListener(
        'click',
        (e) => {
          startTab(i, tabBtn, tabContent);
        },
        false
      );
    });
  });
  function startTab(now, tabBtn, tabContent) {
    if (tabBtn !== undefined) {
      tabBtn.forEach((i) => {
        i.classList.remove(activeClass);
      });
      tabBtn[now].classList.add(activeClass);
      // --- 頁籤按鈕增加指定class(active)，其他頁籤移除指定class
      tabContent.forEach((i) => {
        i.classList.remove(activeClass);
      });
      tabContent[now].classList.add(activeClass);
      // --- 顯示當下頁籤內，隱藏其他內容
    }
  }
}
tabFunction('.tabSet'); // tab功能

// -----------------------------------------------------------------------
// -----  置頂go to top   -------------------------------------------------
// -----------------------------------------------------------------------

function scrollToTop(obj) {
  const el = obj.name || null; // --- 控制的對象

  function scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  if (el !== null) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTop();
    });

    // --- 鍵盤點擊置頂按鈕
    el.addEventListener('keydown', (e) => {
      e.preventDefault();
      scrollTop();
      // --- window.scrollY 等於零的時候 執行 focus
      window.addEventListener('scroll', focusTopBtn);

      function focusTopBtn() {
        if (window.scrollY === 0) {
          setTimeout(() => {
            document.querySelector('a.goCenter').focus();
            window.removeEventListener('scroll', focusTopBtn);
          }, 500);
        }
      }
    });

    // --- 按鈕出現的函式
    window.addEventListener('scroll', () => {
      const top = window.scrollY;
      if (top > 200) {
        el.style.display = 'block';
        el.style['opacity'] = '1';
        el.style['transition'] = 'all 0.5s';
      } else {
        el.style['opacity'] = '0';
        el.style['transition'] = 'all 0.5s';
        BtnStyleNone();
      }
      // --- 如果 opacity為 0 則 display none
      function BtnStyleNone() {
        setTimeout(() => {
          const btn = document.querySelector('.scrollToTop');
          const btnOpacity = parseInt(btn.style.opacity);
          if (btnOpacity === 0) {
            btn.style.display = 'none';
          }
        }, 200);
      }
    });
  }
}

scrollToTop({
  name: document.querySelector('.scrollToTop'), // --- 監聽的對象
});

// -----------------------------------------------------------------------
// -----  語言模組 dropdwon   ---------------------------------------------
// -----------------------------------------------------------------------

class SelectSlider {
  constructor(obj) {
    this.name = obj.name || null; // --- 按鈕列表名稱
    this.control = obj.control || null; // --- 控制的對象名稱
  }
  // --- 點擊 語言模組
  sliderClick() {
    this.name.forEach((i) => {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const sliderItem = e.target.nextElementSibling;
        if (sliderItem === null) {
          return;
        } else if (sliderItem.offsetHeight !== 0 || sliderItem.offsetHeight === null) {
          slider.jsSlideUp(sliderItem, 300);
        } else {
          slider.jsSlideDown(sliderItem, 300);
        }
        this.sliderClose(e.target);
      });
    });
  }
  // --- Keydown
  sliderKeydown() {
    this.control.forEach((i) => {
      i.addEventListener('keydown', (e) => {
        const sliderItem = e.target.nextElementSibling;
        if (sliderItem) {
          slider.jsSlideDown(sliderItem, 300);
        }
      });
    });
  }
  // --- Focusout
  sliderFocusout() {
    this.name.forEach((i) => {
      const nodes = i.querySelectorAll('ul li a,ul li button');
      const lastNodes = nodes[nodes.length - 1];
      const sliderItem = i.querySelector('ul');
      lastNodes.addEventListener('focusout', (e) => {
        e.preventDefault();
        slider.jsSlideUp(sliderItem, 300);
      });
    });
  }
  // --- 關閉
  sliderClose(item) {
    const sliderItem = item.nextElementSibling;
    const that = this;

    function clickOtherPlace(e) {
      const chooseClassName = that.name[0].className;
      if ((e.target.closest(`.${chooseClassName}`) === null) & (e.target !== item)) {
        slider.jsSlideUp(sliderItem, 300);
      } else {
        return;
      }
    }
    document.addEventListener('touchstart', (e) => {
      e.preventDefault();
      clickOtherPlace(e);
    });
    document.addEventListener('click', (e) => {
      clickOtherPlace(e);
    });
  }

  initial() {
    this.sliderClick();
    this.sliderKeydown();
    this.sliderFocusout();
  }
}

// const languageSelect = new SelectSlider({
//   name: document.querySelectorAll('.language'), // --- 控制的對象
//   control: document.querySelectorAll('.language button'), // --- 監聽的對象
// });
// languageSelect.initial();

// -----------------------------------------------------------------------
// -----  FontSize   -----------------------------------------------------
// -----------------------------------------------------------------------

function fontSize() {
  const el = document.querySelector('.fontSize') || null; // --- 控制的對象
  const control = document.querySelector('.fontSize ul') || null; // --- 控制的對象名稱
  const body = document.querySelector('body');

  if (el !== null) {
    el.querySelectorAll('ul button').forEach((v) => {
      v.addEventListener('click', (e) => {
        removeActiveClass(el);
        createCookie('FontSize', `${e.target.className}`, 356);
        addChangeClass(e.target.className);
        e.target.classList.add('active');
      });
    });
  }

  // --- 移除 active 的 class 名稱
  function removeActiveClass(i) {
    const _parentEle = i.parentNode.parentNode;
    _parentEle.querySelectorAll('button').forEach((i) => {
      i.classList.remove('active');
    });
  }

  function addChangeClass(targetName) {
    // if (control === null) {
    //   return;
    // }
    switch (targetName) {
      case 'small':
        body.classList.remove('largeSize', 'mediumSize');
        body.classList.add('smallSize');
        break;
      case 'medium':
        body.classList.remove('smallSize', 'largeSize');
        body.classList.add('mediumSize');
        break;
      case 'large':
        body.classList.remove('smallSize', 'mediumSize');
        body.classList.add('largeSize');
        break;
    }
  }

  // --- 創造新的 字體大小設定
  function createCookie(name, value, days) {
    let _expires;
    const _date = new Date();
    if (days) {
      _date.setTime(_date.getTime() + days * 24 * 60 * 60 * 1000);
      _expires = '; expires=' + _date.toGMTString();
    } else {
      _expires = '';
    }
    document.cookie = name + '=' + value + _expires + '; path=/';
  }

  // --- 讀取瀏覽器上 字體大小設定
  function readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // --- 初始化 字體大小設定
  window.addEventListener('load', function (e) {
    const _cookie = readCookie('FontSize') || null;
    // --- 如果沒有_cookie 則預設值為'medium'
    if (_cookie == null) {
      _cookie = 'medium';
    }
    document.querySelectorAll(`.${_cookie}`).forEach((i) => {
      i.classList.add('active');
      body.classList.add(`${_cookie}Size`);
      e.preventDefault();
    });
  });

  // if (el.classList.contains('typeB')) {
  //   const fontSizeSelect = new SelectSlider({
  //     name: document.querySelectorAll('.fontSize'), // --- 控制的對象
  //     control: document.querySelectorAll('.fontSize > button'), // --- 監聽的對象
  //   });
  //   fontSizeSelect.initial();
  // }
}

// -----------------------------------------------------------------------
// -----  FontSize   -----------------------------------------------------
// -----------------------------------------------------------------------
function templateChange(obj) {
  // obj.searchType === 'typeB' ? searchTypeB() : '';
  if (obj.fontSize === 'typeB') {
    const fontSizeSelect = new SelectSlider({
      name: document.querySelectorAll('.fontSize'), // --- 控制的對象
      control: document.querySelectorAll('.fontSize > button'), // --- 監聽的對象
    });
    fontSizeSelect.initial();
  }
}

// templateChange({
//   searchType: 'typeB',
//   fontSize: 'typeB',
// });
// -----------------------------------------------------------------------
// -----  分享按鈕 share dropdwon   ---------------------------------------
// -----------------------------------------------------------------------

function shareBtnFunction() {
  // --- 創造一個a連結的按鈕
  const shareUl = document.querySelector('.share');
  if (shareUl) {
    const btn = document.createElement('a');
    btn.setAttribute('class', 'shareButton');
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.textContent = 'share分享按鈕';
    shareUl.insertBefore(btn, shareUl.childNodes[0]);
  }
  const shareBtn = new SelectSlider({
    name: document.querySelectorAll('.share'), // --- 控制的對象
    control: document.querySelectorAll('.share a'), // --- 監聽的對象
  });
  shareBtn.initial();
}
shareBtnFunction();

// -----------------------------------------------------------------------
// -----  form表單 單個檔案上傳+多個檔案上傳   --------------------------------
// -----------------------------------------------------------------------

function addFile() {
  const addFileName = document.querySelectorAll('.check_file');
  addFileName.forEach((i) => {
    i.addEventListener('change', pushFileName);
  });

  function pushFileName(e) {
    let _fileLen = e.target.files.length;
    let _fileName = '';
    const uploadInput = e.target.parentNode.closest('.uploadGrp').querySelector('.upload_file');
    if (_fileLen > 1) {
      _fileName = `${_fileLen} files selected`;
    } else {
      _fileName = e.target.files[0].name;
    }
    uploadInput.value = _fileName;
  }
}
addFile();

// -----------------------------------------------------------------------
// -----  checkboxBlur 失去焦點   -----------------------------------------
// -----------------------------------------------------------------------

function checkboxBlur() {
  const checkboxList = document.querySelectorAll('input[type="checkbox"]');
  checkboxList.forEach((i) => {
    i.addEventListener('click', (e) => {
      e.target.blur();
    });
  });
}
checkboxBlur();

// -----------------------------------------------------------------------
// -----  category active    ---------------------------------------------
// -----------------------------------------------------------------------

function categoryActive() {
  const categoryList = document.querySelectorAll('.category');
  categoryList.forEach((i) => {
    const item = i.querySelectorAll('a');
    item.forEach((tag) => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        removeClass(item);
        e.target.classList.add('active');
      });
    });
  });

  function removeClass(item) {
    item.forEach((i) => {
      i.classList.remove('active');
    });
  }
}
categoryActive();

// -----------------------------------------------------------------------
// -----  gotoCenter on focus跳到 content   ------------------------------
// -----------------------------------------------------------------------

function gotoCenter() {
  const goCenterTag = document.querySelector('a.goCenter');
  const acTag = document.querySelector('#aC');
  const mainaccessKey = document.querySelector('.main .accessKey');
  const headerHeight = document.querySelector('.header').offsetHeight;
  // --- .accessKey 到top 的距離等於 header + .accessKey到父層上方的距離
  let _distance = headerHeight + mainaccessKey?.offsetTop;
  if (goCenterTag) {
    goCenterTag.addEventListener('keydown', (e) => {
      if (e.which === 13) {
        acTag.focus();
        window.scrollTo({
          top: _distance,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }
}
gotoCenter();

// -----------------------------------------------------------------------
// -----  無障礙快捷鍵盤組合 a11yKeyCode   ----------------------------------------------
// -----------------------------------------------------------------------

function a11yKeyCode() {
  let search = document.querySelector('.webSearch input[type="text"]');
  let header = document.querySelector('.header .accessKey');
  let main = document.querySelector('.main .accessKey');
  let footer = document.querySelector('footer .accessKey');
  let distance = 0;

  // --- focus element
  function focusElem(distance, el) {
    if (window.scrollY === distance) {
      el.focus();
    }
  }

  // --- scroll to element position
  function scrollAnime(distance, el) {
    window.scrollTo({
      top: distance,
      behavior: 'smooth',
    });
    window.addEventListener('scroll', () => {
      focusElem(distance, el);
    });
  }

  // --- click a11 button
  document.addEventListener('keydown', (e) => {
    switch (e.altKey && e.code) {
      // alt+S 查詢
      case true && 'KeyS':
        scrollAnime(0, search);
        focusElem(0, search);
        break;
      // --- alt+U header
      case true && 'KeyU':
        scrollAnime(0, header);
        focusElem(0, header);
        break;
      // --- alt+C 主要內容區
      case true && 'KeyC':
        main.focus();
        let _headerHeight = document.querySelector('header').offsetHeight;
        scrollAnime(_headerHeight, main);
        focusElem(_headerHeight, main);
        break;
      // --- alt+Z footer
      case true && 'KeyZ':
        let _bodyScrollHeight = document.documentElement.scrollHeight;
        let _bodyClientHeight = document.documentElement.clientHeight;
        let _distance = _bodyScrollHeight - _bodyClientHeight;
        scrollAnime(_distance, footer);
        focusElem(_distance, footer);
        break;
    }
  });
}
a11yKeyCode();

// -----------------------------------------------------------------------
// -----  無障礙錨點切換語系   ----------------------------------------------
// -----------------------------------------------------------------------
// --- 無障礙錨點切換語系，更改accessKey的title名稱

function switchA11TitleName() {
  const webLang = document.querySelector('html').getAttribute('lang');
  const headerTitle = document.querySelector('.header .accessKey');
  const mainTitle = document.querySelector('.main .accessKey');
  const footerTitle = document.querySelector('footer .accessKey');
  const searchTitle = document.querySelector('.search');
  let _lang = webLang.substring(0, 2);
  if (_lang === 'zh') {
    headerTitle?.setAttribute('title', '上方功能區塊');
    mainTitle?.setAttribute('title', '中央內容區塊');
    footerTitle?.setAttribute('title', '下方功能區塊');
  } else {
    headerTitle.setAttribute('title', 'header');
    mainTitle.setAttribute('title', 'content');
  }
  if (searchTitle !== null) {
    if (_lang === 'zh') {
      searchTitle.setAttribute('title', '關鍵字搜尋：文章關鍵字搜尋');
    } else {
      searchTitle.setAttribute('title', 'footer');
      searchTitle.setAttribute('title', 'search');
    }
  }
  if (footerTitle !== null) {
    footerTitle.setAttribute('title', '下方功能區塊');
  }
}
switchA11TitleName();

// -----------------------------------------------------------------------
// -----   tableList樣式 加上 data-title   -------------------------------
// -----------------------------------------------------------------------

function tableAddDataAttributes(obj) {
  window.addEventListener('load', function () {
    const el = document.querySelectorAll(obj.elemClass);
    el.forEach((i) => {
      const tableItem = i.querySelectorAll('table');
      tableItem.forEach((i) => {
        setTrAttr(i);
      });
      i.classList.add('loaded');
    });
    function setTrAttr(i) {
      const thList = i.querySelectorAll('th');
      const trList = i.querySelectorAll('tr');
      trList.forEach((trItem) => {
        const tdList = trItem.querySelectorAll('td');
        tdList.forEach((i, idx) => {
          tdList[idx].setAttribute(`data-${obj.dataName}`, `${thList[idx].textContent}`);
        });
      });
    }
  });
}
tableAddDataAttributes({
  elemClass: '.tableList',
  dataName: 'title',
}); // tableList樣式 加上 data-title

// -----------------------------------------------------------------------
// -----   scrollTables   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTables(obj) {
  let el = document.querySelectorAll(obj) || null; // --- 按鈕列表名稱
  let realTable = [];

  // --- scrollTables 初始化
  function appendEle() {
    el.forEach((i) => {
      i.style.position = 'relative';
      const table = i.querySelector('table');
      const wrapElement = document.createElement('div');
      wrapElement.className = 'tableScroll';

      table.replaceWith(wrapElement);
      wrapElement.appendChild(table);

      // --- 產生左邊按鈕
      let _appendLeftEle;
      let _leftBtn;
      _appendLeftEle = document.createElement('div');
      _appendLeftEle.setAttribute('class', 'scrollTableNav scrollTableNavLeft');
      _appendLeftEle.style.height = `${i.clientHeight}px`;
      _leftBtn = document.createElement('div');
      _leftBtn.setAttribute('class', 'scrollTableLeftBtn');
      _appendLeftEle.appendChild(_leftBtn);

      // --- 產生右邊按鈕
      let _appendRightEle;
      let _rightBtn;
      _appendRightEle = document.createElement('div');
      _appendRightEle.setAttribute('class', 'scrollTableNav scrollTableNavRight');
      _appendRightEle.style.height = `${i.clientHeight}px`;
      _rightBtn = document.createElement('div');
      _rightBtn.setAttribute('class', 'scrollTableRightBtn');
      _appendRightEle.appendChild(_rightBtn);

      // --- 新增按鈕
      i.prepend(_appendLeftEle, _appendRightEle);

      realTable.push(i);
      displayNoneEle(i);
    });
  }

  // --- 開關遮罩功能
  function displayNoneEle(i) {
    // --- 父層元素的寬;
    let _table = i.querySelector('.tableScroll').clientWidth || 200;
    // --- 子層元素的寬
    let _tableItem = i.querySelector('.tableScroll').scrollWidth;
    // --- 左邊遮罩
    let _rightEle = i.querySelector('.scrollTableNavRight');
    // --- 右邊遮罩
    let _leftEle = i.querySelector('.scrollTableNavLeft');
    // --- 如果沒有建立遮罩
    if (_rightEle == null) {
      return;
    }
    // --- 如果子層跟父層一樣寬度
    if (_table === _tableItem) {
      _leftEle.style.display = 'none';
      _rightEle.style.display = 'none';
    } else {
      i.parentElement.scrollLeft = '0';
      _rightEle.style.display = 'block';
      _rightEle.style.opacity = '1';
    }
    eleScroll();
  }
  // --- 當父層滾輪滾動
  function eleScroll() {
    el.forEach((i) => {
      i.querySelector('.tableScroll').addEventListener('scroll', () => {
        // --- 父層元素的寬
        let _table = i.querySelector('.tableScroll').clientWidth;
        // --- 子層元素的寬
        let _tableItem = i.querySelector('.tableScroll').scrollWidth;
        // --- 左邊遮罩
        let _rightEle = i.querySelector('.scrollTableNavRight');
        // --- 右邊遮罩
        let _leftEle = i.querySelector('.scrollTableNavLeft');
        // --- 捲軸位置
        let _scrollPosition = i.querySelector('.tableScroll').scrollLeft;

        if (_scrollPosition === 0) {
          _leftEle.style.opacity = 0;
          _rightEle.style.opacity = 1;
        }
        // --- 如果捲軸位置還沒到底
        if (_scrollPosition > 0) {
          _leftEle.style.opacity = 1;
        }
        // --- 如果捲軸位置＋父層寬度 ＝ 子層寬度
        if (_scrollPosition + _table === _tableItem) {
          _rightEle.style.opacity = 0;
          _leftEle.style.opacity = 1;
          _leftEle.style.display = 'block';
        }
        // --- 如果捲軸位置＋父層寬度 < 子層寬度
        if (_scrollPosition + _table < _tableItem) {
          _rightEle.style.opacity = 1;
        }
      });
    });
  }

  // --- 點擊左右按鈕時滾動畫面
  function clickEleBtn() {
    // --- 點擊左邊按鈕
    const leftBtn = document.querySelectorAll('.scrollTableLeftBtn');
    if (leftBtn.length !== 0) {
      leftBtn.forEach((i) => {
        i.addEventListener('click', (item) => {
          i.parentElement.parentElement.querySelector('.tableScroll').scrollLeft -= 200;
        });
      });
    }
    // --- 點擊右邊按鈕
    const rightBtn = document.querySelectorAll('.scrollTableRightBtn');
    rightBtn?.forEach((i) => {
      i.addEventListener('click', (item) => {
        i.parentElement.parentElement.querySelector('.tableScroll').scrollLeft += 200;
      });
    });
  }

  appendEle();
  clickEleBtn();
  // --- resize
  window.addEventListener('resize', () => {
    el.forEach((i) => {
      displayNoneEle(i);
    });
  });
}
// scrollTables();

// -----------------------------------------------------------------------
// -----   lazy load   ---------------------------------------------------
// -----------------------------------------------------------------------

let lazyLoadInstance = new LazyLoad({
  elements_selector: 'img.lazy',
  placeholder: '/images/basic/placeholder.gif',
  effect: 'fadeIn',
  fadeTime: 600,
  threshold: 0,
});

// -----------------------------------------------------------------------
// -----   Accordion設定   ------------------------------------------------
// -----------------------------------------------------------------------
function accordionFunction(obj) {
  'use strict';
  const accordion = document.querySelector(obj.accordion);
  const accordionItem = accordion ? accordion.querySelectorAll('.accordionList') : '';
  const autoClose = obj.autoClose;
  const duration = obj.duration;
  const openFirst = obj.openFirst;
  const { open, close } = obj.info;

  function a11y() {
    if (Boolean(accordionItem)) {
      accordionItem.forEach((item, index) => {
        let content = item.nextElementSibling.querySelectorAll('a,input,select,textarea');
        let firstItem = false;

        if (!openFirst) {
          item.addEventListener('keydown', function (e) {
            if (e.which === 9 && !e.shiftKey) {
              autoClose && !openFirst ? closeOther(this) : '';
              openTarget(this);
              firstItem = false;
            } else if (e.which === 9 && e.shiftKey && !firstItem) {
              e.preventDefault();
              openTarget(this);
              autoClose && !openFirst ? closeOther(this) : '';

              if (content.length == 0) {
                accordionItem[index - 1].focus();
              } else if (content.length > 0) {
                content[content.length - 1].focus();
              }
            }
          });
          if (content.length !== 0) {
            content[0].addEventListener('keydown', function (e) {
              if (e.which === 9 && e.shiftKey && index !== 0) {
                e.preventDefault();
                accordionItem[index - 1].focus();
              } else if (e.which === 9 && e.shiftKey && index == 0) {
                firstItem = true;
                autoClose && !openFirst ? openTarget(accordionItem[0]) : '';
              }
            });
          }
        }
      });
    }
  }
  function info() {
    if (Boolean(accordionItem)) {
      accordionItem.forEach((item, index) => {
        let random = `accordion_${randomLetter(4)}${randomFloor(0, 9999)}`;
        item.innerHTML += `<span class="accordionState">${open}</span>`;
        item.innerHTML += `<span class="accordionArrow"></span>`;
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-controls', random);
        item.parentElement.querySelector('.accordionContent').setAttribute('id', random);
        if (openFirst) {
          item.nextElementSibling.style.display = `block`;
        }
      });
    }
  }
  function clickFunction() {
    if (Boolean(accordionItem)) {
      accordionItem.forEach((item, index) => {
        item.addEventListener('click', function () {
          autoClose && !openFirst ? closeOther(this) : '';
          openTarget(this);
        });
      });
    }
  }

  function openTarget(item) {
    let content = item.nextElementSibling;
    let display = window.getComputedStyle(content).display;
    content.style.display = display;

    // if (item.parentNode.classList.contains('active')) {
    //   item.querySelector('.accordionState').innerHTML = `${close}`;
    //   item.setAttribute('aria-expanded', 'true');
    // }

    if (display === 'none') {
      display = 'block';
      item.parentNode.classList.add('active');
      item.setAttribute('aria-expanded', 'true');
      content.style.display = 'block';
      let contentHeight = content.scrollHeight;
      content.style.height = '0';
      content.style.transitionProperty = 'height';
      content.style.transitionDuration = `${duration}ms`;
      content.scrollHeight;
      ///item.querySelector('.accordionState').innerHTML = `${close}`;
      content.style.height = `${contentHeight}px`;
      setTimeout(() => {
        content.style.removeProperty('height');
        content.style.removeProperty('transition-duration');
        content.style.removeProperty('transition-property');
      }, duration);
    } else {
      let contentHeight = content.scrollHeight;
      content.style.height = `${contentHeight}px`;
      content.style.transitionProperty = 'height';
      content.style.transitionDuration = `${duration}ms`;
      content.scrollHeight;
      content.style.height = '0';
      //item.querySelector('.accordionState').innerHTML = `${open}`;
      item.parentNode.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        content.style.removeProperty('height');
        content.style.removeProperty('display');
        content.style.removeProperty('transition-duration');
        content.style.removeProperty('transition-property');
      }, duration);
    }
  }
  function closeOther(item) {
    const siblings = [...item.parentNode.parentNode.children].filter((child) => {
      return child !== item.parentNode;
    });
    siblings.forEach((otherItem, index) => {
      let content = otherItem.querySelector('.accordionContent');
      if (content.style.Height !== 0 || content.style.Height !== null) {
        otherItem.querySelector('.accordionState').innerHTML = `${open}`;
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordionList').setAttribute('aria-expanded', 'false');
        let contentHeight = content.scrollHeight;
        content.style.height = `${contentHeight}px`;
        content.style.transitionProperty = 'height';
        content.style.transitionDuration = `${duration}ms`;
        content.scrollHeight;
        content.style.height = '0';
        setTimeout(() => {
          content.style.removeProperty('height');
          content.style.removeProperty('display');
          content.style.removeProperty('transition-duration');
          content.style.removeProperty('transition-property');
        }, duration);
      }
    });
  }
  (function () {
    clickFunction();
    a11y();
    info();
  })();
}

// accordionFunction({
//   accordion: '.accordion',
//   openFirst: false, // 預設先展開所有內容，使用無障礙遊走不再有手風琴效果，永遠展開內容(滑鼠點擊正常開合)
//   autoClose: true, // 若需要此功能需要關閉openFirst
//   duration: 200,
//   info: {
//     open: '展開', // 收合時顯示
//     close: '收合', // 展開時顯示
//   },
// });

// -----------------------------------------------------------------------
// -----   版型切換   -----------------------------------------------------
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// -----   swiper 箭頭設定 / 手機版主選單語系設定   ------------------------------------------------
// -----------------------------------------------------------------------
function langFunction(obj) {
  const nextClass = document.querySelectorAll(obj.swiper.next);
  const prevClass = document.querySelectorAll(obj.swiper.prev);
  const documentHtml = document.querySelector('html');
  const sidebarCtrlBtn = document.querySelector('.sidebarCtrlBtn');
  const searchCtrlBtn = document.querySelector('.searchCtrlBtn') || null;
  const webLang = documentHtml.getAttribute('lang');
  if (webLang) {
    obj.swiper.data.forEach((s) => {
      if (webLang.slice(0, 2) == s.lang) {
        nextClass.forEach((v) => v.setAttribute('title', s.nextText));
        prevClass.forEach((v) => v.setAttribute('title', s.prevText));
      } else {
        nextClass.forEach((v) => v.setAttribute('title', obj.swiper.default.nextText));
        prevClass.forEach((v) => v.setAttribute('title', obj.swiper.default.prevText));
      }
    });

    obj.mobileBtn.data.forEach((s) => {
      if (webLang.slice(0, 2) == s.lang) {
        sidebarCtrlBtn.innerHTML = s.text;
      } else {
        sidebarCtrlBtn.innerHTML = obj.mobileBtn.default;
      }
    });

    // obj.searchBtn.data.forEach((s) => {
    //   if (webLang.slice(0, 2) == s.lang && searchCtrlBtn !== null) {
    //     searchCtrlBtn.innerHTML = s.text;
    //   } else {
    //     searchCtrlBtn.innerHTML = obj.searchBtn.default;
    //   }
    // });
  }

  // form password eyes
  let checkEye = document.querySelectorAll('.passwordEye');
  checkEye.forEach((item) => {
    let passwordInput = item.parentNode.querySelector('[type="password"]');
    item.addEventListener('click', function (e) {
      if (e.target.classList.contains('hide')) {
        //換class / type
        e.target.classList.remove('hide');
        e.target.classList.add('show');
        if (webLang) {
          obj.password.data.forEach((s) => {
            if (webLang.slice(0, 2) == s.lang) {
              e.target.innerHTML = s.hide;
            }
          });
        }
        passwordInput.setAttribute('type', 'text');
      } else {
        passwordInput.setAttribute('type', 'password');
        e.target.classList.remove('show');
        e.target.classList.add('hide');
        e.target.innerHTML = obj.show;
        if (webLang) {
          obj.password.data.forEach((s) => {
            if (webLang.slice(0, 2) == s.lang) {
              e.target.innerHTML = s.show;
            }
          });
        }
      }
    });
  });
}

langFunction({
  swiper: {
    next: '.nextSlider',
    prev: '.prevSlider',
    data: [
      {
        lang: 'zh',
        nextText: '下一筆',
        prevText: '上一筆',
      },
      //...由此新增其他語系
    ],
    //預設語系
    default: {
      nextText: 'next',
      prevText: 'previous',
    },
  },
  mobileBtn: {
    data: [
      {
        lang: 'zh',
        text: '側欄選單',
      },
      //...由此新增其他語系
    ],
    //預設語系
    default: 'SideButton',
  },
  searchBtn: {
    data: [
      {
        lang: 'zh',
        text: '查詢',
      },
      //...由此新增其他語系
    ],
    //預設語系
    default: 'Search',
  },
  password: {
    data: [
      {
        lang: 'zh',
        show: '顯示密碼',
        hide: '隱藏密碼',
      },
      //...由此新增其他語系
    ],
    //預設語系
    default: {
      show: 'show',
      hide: 'hide',
    },
  },
});

var navBarElement = document.querySelector('.navBar');
if (navBarElement) {
  function moveNavBar() {
    const windowWidth = window.innerWidth;
    const navBar = document.querySelector('.navBar');
    const news = document.querySelector('.news');

    if (windowWidth <= 991) {
      // 當窗口寬度小於等於767px時，將A移到B的後面
      news.parentNode.insertBefore(navBar, news.nextSibling);
    } else {
      // 當窗口寬度大於767px時，將A移到B的前面
      news.parentNode.insertBefore(navBar, news);
    }
  }
}
// 在頁面加載和窗口大小改變時調用moveNavBar函數
window.addEventListener('load', moveNavBar);
window.addEventListener('resize', moveNavBar);
// -----------------------------------------------------------------------
// -----   a標籤無障礙判斷   -----------------------------------------------
// -----------------------------------------------------------------------
// 2022/01/10
(function () {
  let a = document.querySelectorAll('a');
  a.forEach((item) => {
    if (!item.getAttribute('href')) {
      item.setAttribute('tabindex', 0);
    }
  });
})();
