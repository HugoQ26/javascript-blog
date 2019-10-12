{
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const linkHref = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector('article' + linkHref);

    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  /*************************************************************/

  let html = '';

  const generateTitleLinks = (function() {
    //usuń zawartość listy linków w lewej kolumnie,
    /* [DONE}] remove list links content from left column */
    const allLinks = document.querySelector('ul.list.titles');
    allLinks.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll('article');

    for (const article of articles) {
      /* [DONE] get the article id and save it to constant */
      const articleId = article.getAttribute('id');

      /* [DONE] find element with article title and and save it to constant */
      const articleTitle = article.querySelector('.post-title').innerHTML;

      /* [DONE] create HTML of the link */

      const linkHtml =
        '<li><a href=#' +
        articleId +
        '><span>' +
        articleTitle +
        '</span></a></li>';
      /* [DONE] insert link into html variable */
      html += linkHtml;

      //   const nodeLi = document.createElement('li');
      //   const nodeA = document.createElement('a');
      //   const nodeSpan = document.createElement('span');

      //   allLinks
      //     .appendChild(nodeLi)
      //     .appendChild(nodeA)
      //     .appendChild(nodeSpan).innerHTML = articleTitle;

      //   const d = article
      //     .getElementsByTagName('a')
      //     .setAttribute('href', articleId);
    }
    allLinks.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  })();
}
