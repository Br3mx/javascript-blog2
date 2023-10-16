'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log('event', event);
  console.log('clickedElement (with plus): ' + clickedElement);



  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
// New code 5.4 exercise

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';
  

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles){
      article.querySelector(optArticleSelector);
  

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
    

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* get the title from the title element */
    
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      titleList.insertAdjacentHTML('beforeend', linkHTML);


      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  } generateTitleLinks();




  // Tags
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    
    /* START LOOP: for every article: */
    for(let article of articles){
      article.querySelector(optArticleSelector);
    
      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + articleTagsArray + '</a></li>';
        /* add generated code to html variable */
        tagWrapper.insertAdjacentHTML('beforeend', linkHTML);

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      html = html + linkHTML;

    /* END LOOP: for every article: */
    }
  }
    
  generateTags();
}