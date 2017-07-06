;(function search() {
  const body = document.getElementById("js-body")
  const search = document.getElementById("js-search-inner")
  const searchBtn = document.getElementById("js-search-btn")
  const searchField = document.getElementById("js-search-field")
  const searchResults = document.getElementById("js-search-results")
  const searchClose = document.getElementById("js-search-close")

  const handlerToggleBtn = () => {
    search.classList.toggle("c-search__inner_active")
    body.classList.toggle("u-hidden")
  }
  const handlerChangeField = (e) => {
    e.target.value ? searchResults.classList.add("c-results_active") : searchResults.classList.remove("c-results_active")
  }
  const handlerClickClose = () => {
    searchField.value = ""
    search.classList.remove("c-search__inner_active")
    searchResults.classList.remove("c-results_active")
    body.classList.remove("u-hidden")
  }

  searchBtn.addEventListener("click", handlerToggleBtn)
  searchField.addEventListener("keyup", (e) => {handlerChangeField(e)})
  searchClose.addEventListener("click", handlerClickClose)
})()
