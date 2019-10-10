{
  const titleClickHandler = function(event) {
    console.log(event.target);

    /* remove class 'active' from all article links  */
    let activeLinks = document.querySelectorAll('.titles a.active');
    for (const activLink of activeLinks) {
      activLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */
    let activeArticles = document.querySelectorAll('article.active');
    for (const activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
  };

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
