;(function nav() {
  const body = document.getElementById("js-body")
  const nav = document.getElementById("js-nav")
  const navBtn = document.getElementById("js-nav-btn")

  const handlerToggleBtn = () => {
    navBtn.classList.toggle("c-nav-btn_active")
    nav.classList.toggle("c-nav_active")
    body.classList.toggle("u-hidden")
  }

  const handlerResizeWindow = () => {
    if (window.innerWidth > 767) {
      navBtn.classList.remove("c-nav-btn_active")
      nav.classList.remove("c-nav_active")
      body.classList.remove("u-hidden")
    }
  }

  navBtn.addEventListener("click", handlerToggleBtn)
  window.addEventListener("resize", handlerResizeWindow)
})()
