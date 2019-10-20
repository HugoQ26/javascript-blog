'use strict';
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

  /******************   Generate Title Links   ****************/

  let html = '';

  const generateTitleLinks = function(customSelector = '') {
    /* [DONE}] remove list links content from left column */
    const allLinks = document.querySelector('ul.list.titles');
    allLinks.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll('.post' + customSelector);

    for (const article of articles) {
      /* [DONE] get the article id and save it to constant */
      const articleId = article.getAttribute('id');

      /* [DONE] find element with article title and and save it to constant */
      const articleTitle = article.querySelector('.post-title').innerHTML;

      /* [DONE] create HTML of the link */

      html =
        '<li><a href=#' +
        articleId +
        '><span>' +
        articleTitle +
        '</span></a></li>';

      /* [DONE] insert link into links wraper of the left columm */
      allLinks.insertAdjacentHTML('beforeend', html);
    }

    /* [DONE] find all the links and save them to variable: links */
    const links = document.querySelectorAll('.titles a');

    /* [DONE] iterate over all links and add eventListener to each of link */
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  /* [DONE] execute generateTitleLinks function*/
  generateTitleLinks();

  /******************   Generate Tags   ****************/

  const generateTags = (function() {
    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};
    /* [DONE] create a new variable allTagsHTML for all links HTML code */
    let tagHTML = '';

    /* [DONE] find all articles */
    const articles = document.querySelectorAll('article');

    /* [DONE] START LOOP: for every article: */
    for (const article of articles) {
      /* find tags wrapper */
      const tagsWraper = article.querySelector('.post-tags .list');

      /* [DONE] get tags from data-tags attribute */
      const dataTagsAtributes = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const tagsArray = dataTagsAtributes.split(' ');

      /* [DONE] START LOOP: for each tag in tagsArray*/
      for (const tag of tagsArray) {
        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* [DONE] insert linkHTML tags wraper  */
        tagsWraper.insertAdjacentHTML('beforeend', linkHTML);

        /* [DONE] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [DONE] add Tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] END LOOP: for every article: */

    /* [DONE] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [DONE] START LOOP: for each tag in allTags object*/
    for (const tag in allTags) {
      /* [DONE] generate code of a link and add it to allTagsHTML*/
      tagHTML =
        "<li><a href='#tag-" +
        tag +
        "'>" +
        tag +
        '</a> <span>(' +
        allTags[tag] +
        ')</span></li>';

      /* [DONE] insert tagHTML to tags wraper of the right column  */
      tagList.insertAdjacentHTML('beforeend', tagHTML);
    }
    /* [DONE] add html from allTags to tagList */
  })();

  /******************   Tag Click Handler   ****************/

  function tagClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('.post-tags a.active');

    /* [DONE] START LOOP: for each active tag link */
    for (const activeTag of activeTags) {
      /* [DONE] remove class active */
      activeTag.classList.remove('active');
    }
    /* [DONE] END LOOP: for each active tag link */

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(
      '.post-tags a[href*=' + tag + ']'
    );

    /* [DONE]START LOOP: for each found tag link */
    for (const tagLink of tagLinks) {
      /* [DONE] add class active */
      tagLink.classList.add('active');
    }
    /* [DONE] END LOOP: for each found tag link */

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  /******************   Add Click Listeners to Tags   ****************/

  const addClickListenersToTags = (function() {
    /* [DONE] find all links to tags */
    const allTagsLink = document.querySelectorAll('.post-tags a');

    /* [DONE] START LOOP: for each link */
    for (const tagLink of allTagsLink) {
      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    }
    /* [DONE] END LOOP: for each link */
  })();

  /******************   generateAuthors function   ****************/

  const generateAuthors = (function() {
    /* [DONE] create a new variable authorHTML for author link */
    let authorHTML = '';

    /* [DONE] find all articles */
    const articles = document.querySelectorAll('article');

    /* [DONE] START LOOP: for every article: */
    for (const article of articles) {
      /* [DONE] get tags from data-author attribute */
      const dataAuthorAtribute = article.getAttribute('data-author');
      /* [DONE] convert data-author attribute without "-" */
      const authorProperName = dataAuthorAtribute.split('-').join(' ');

      /* [DONE] find post author wraper */
      const postAuthor = article.querySelector('.post-author');

      /* [DONE] generate code of a link and add it to postAuthor */
      authorHTML =
        '<a href=' + dataAuthorAtribute + '>' + authorProperName + '</a>';

      /* [DONE] insert author link to author wraper  */
      postAuthor.insertAdjacentHTML('beforeend', authorHTML);
    }
  })();

  /******************   Author Click Handler   ****************/

  function authorClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const authorHref = clickedElement.getAttribute('href');

    // /* [DONE] make a new constant "author" and extract author from the "href" attribute */
    // const author = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeAuthors = document.querySelectorAll('.post-author a.active');

    /* [DONE] START LOOP: for each active author link */
    for (const activeAuthor of activeAuthors) {
      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');
    }
    /* [DONE] END LOOP: for each active author link */

    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(
      '.post-author a[href=' + authorHref + ']'
    );

    /* [DONE]START LOOP: for each found author link */
    for (const authorLink of authorLinks) {
      /* [DONE] add class active */
      authorLink.classList.add('active');
    }
    /* [DONE] END LOOP: for each found author link */

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + authorHref + '"]');
  }

  /******************   Add Click Listeners To Authors   ****************/

  const addClickListenersToAuthors = (function() {
    /* [DONE] find all links to author */
    const allTagsLink = document.querySelectorAll('.post-author a');

    /* [DONE] START LOOP: for each link */
    for (const tagLink of allTagsLink) {
      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', authorClickHandler);
    }
    /* [DONE] END LOOP: for each link */
  })();
}
