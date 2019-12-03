/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector('#template-article-link').innerHTML
    ),
    articleTags: Handlebars.compile(
      document.querySelector('#template-article-tags').innerHTML
    ),
    articleAuthor: Handlebars.compile(
      document.querySelector('#template-article-author').innerHTML
    ),
    cloudAuthor: Handlebars.compile(
      document.querySelector('#template-author-cloud').innerHTML
    ),
    cloudTags: Handlebars.compile(
      document.querySelector('#template-tag-cloud').innerHTML
    )
  };

  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';

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
    const linksArray = [];

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

      const linkHTMLData = { id: articleId, title: articleTitle };
      linksArray.push(linkHTMLData);
    }

    const linkHTML = templates.articleLink(linksArray);
    allLinks.innerHTML = linkHTML;

    /* [DONE] find all the links and save them to variable: links */
    const links = document.querySelectorAll('.titles a');

    /* [DONE] iterate over all links and add eventListener to each of link */
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  /* [DONE] execute generateTitleLinks function*/
  generateTitleLinks();

  /******************   Calculate Tags parameters function   ****************/

  const calculateTagsParams = function(tags) {
    const params = {
      min: 999999,
      max: 0
    };
    for (const tag in tags) {
      //console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    console.log('params', params);

    return params;
  };

  /******************   Calculate Tag Class function   ****************/

  const calculateTagClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    return Math.floor(percentage * (optCloudClassCount - 1) + 1);
  };

  /******************   Generate Tags   ****************/

  const generateTags = (function() {
    let allTags = {};

    const articles = document.querySelectorAll('article');
    const tagsWraper = document.querySelector('ul.list.tags');

    for (const article of articles) {
      const dataTagsAtributes = article.getAttribute('data-tags');
      const articleTagsWrapper = article.querySelector('.post-tags ul.list');
      const tagsArray = dataTagsAtributes.split(' ');

      for (const tag of tagsArray) {
        if (!allTags.hasOwnProperty(tag)) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }

      const linkHTML = templates.articleTags(tagsArray);
      articleTagsWrapper.innerHTML = linkHTML;
    }

    const tagsParams = calculateTagsParams(allTags);

    const handlebarsAllTagsData = [];

    for (const tag in allTags) {
      const calculate = calculateTagClass(allTags[tag], tagsParams);

      const tagData = {
        tag,
        classNo: calculate
      };

      handlebarsAllTagsData.push(tagData);
    }

    const cloudHTML = templates.cloudTags(handlebarsAllTagsData);
    tagsWraper.innerHTML = cloudHTML;
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
    const allAuthors = {};

    const articles = document.querySelectorAll('article');
    const authorsWraper = document.querySelector('ul.list.authors');

    for (const article of articles) {
      const dataAuthorAtribute = article.getAttribute('data-author');
      const authorProperName = dataAuthorAtribute.split('-').join(' ');

      const postAuthor = article.querySelector('.post-author');

      const linkHTML = templates.articleAuthor({
        authorProperName,
        dataAuthorAtribute
      });
      postAuthor.innerHTML = linkHTML;

      if (!allAuthors.hasOwnProperty(authorProperName)) {
        allAuthors[authorProperName] = 1;
      } else {
        allAuthors[authorProperName]++;
      }
    }

    const tagsParams = calculateTagsParams(allAuthors);
    const handlebarsAllAuthorsData = [];
    for (const author in allAuthors) {
      const calculate = calculateTagClass(allAuthors[author], tagsParams);

      const authorData = {
        name: author,
        classNo: calculate,
        dataAuthorAtribute: author.split(' ').join('-')
      };

      handlebarsAllAuthorsData.push(authorData);
    }

    const cloudHTML = templates.cloudAuthor(handlebarsAllAuthorsData);
    authorsWraper.innerHTML = cloudHTML;
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
