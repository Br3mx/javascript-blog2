{
  'use strict';
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)


    
  };
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
  
  
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors';
  
  function generateTitleLinks(customSelector = ''){
  
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(customSelector);
    let html = '';
    for(let article of articles){
      article.querySelector(optArticleSelector);
    
  
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      
  
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* get the title from the title element */
      
      /* [DONE] create HTML of the link */
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
  
  
  
  
  // CalculateTagsParams
  function calculateTagsParams(tags){
    const params = {
      max: 0,
      min: 9999999,
    };
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      } else if (tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
   
    return params;
  }
  // calculateTagClass
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount -1) + 1);
    return optCloudClassPrefix + classNumber;
  } console.log(calculateTagClass);

  // Tags

  function generateTags(){
    /* [new - DONE] create a new variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
      
    /* START LOOP: for every article: */
    for(let article of articles){
      article.querySelector(optArticleSelector);
      
      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
  
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
  
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
  
        /* generate HTML of the link */
  
        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagsLink(linkHTMLData);
        /* add generated code to html variable */
        tagWrapper.insertAdjacentHTML('beforeend', linkHTML);
        /*[new - DONE] chceck if this link is not already in allTags */
        if(!allTags[tag]) {
          /* [new - DONE] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
  
        /* END LOOP: for each tag */
      }        
  
    /* END LOOP: for every article: */
    }
    /* [new - DONE] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
      
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams) + '"href="#">' + tag + '(' + allTags[tag] + ')</a></li> ';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('patrz tu', allTagsData);
  }
      
  generateTags();
  
  // clickhandler

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found tag link */
    for(let link of links){
      /* add class active */
      link.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
    
    
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags .list a');
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
  
      /* END LOOP: for each link */
    }
  }
    
  addClickListenersToTags();
  
  
  // Authors
  function generateAuthors(){
    //// new
    let allAuthor = {};
    /* [done] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('TO MOJE', articles);
    
    /* [done] START LOOP: for every author: */
    for(let article of articles){
    
      /* [done] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
  
      /* [done] get author from data-author attribute */
      const authorAttribute = article.getAttribute('data-author');
      console.log(authorAttribute);
  
      /* generate HTML of the link */
      
      //const linkHTML = '<a href="#tag-' + authorAttribute + '"><span>' + authorAttribute + '</span></a>';
      const linkHTMLData = {id: authorAttribute, title: authorAttribute};
      const linkHTML = templates.authorLink(linkHTMLData);

      /* add generated code to html variable */
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);    
      /* insert HTML of all the links into the author wrapper */

      ///newww
      if(!allAuthor[authorAttribute]){
        allAuthor[authorAttribute] = 1;
      } else {
        allAuthor[authorAttribute]++;
      }
      console.log(allAuthor);

      /* END LOOP: for every article: */
    }
    ////newww
    const authorList = document.querySelector(optAuthorsListSelector);
    const authorParams = calculateTagsParams(allAuthor);
    //let allAuthorHTML = '';
    const allAuthorData = {authors: []};

    for(let author in allAuthor){
      //allAuthorHTML += '<li><a class="'+ calculateTagClass(allAuthor[author], authorParams) + '"href="#">' + author + '(' + allAuthor[author], authorParams + ') </a></li> ';
      allAuthorData.authors.push({
        tag: author,
        count: allAuthor[author],
        className: calculateTagClass(allAuthor[author], authorParams)
      });
    
    }authorList.innerHTML = templates.authorCloudLink(allAuthorData);
    console.log('patrz tu', allAuthorData);
    
  }generateAuthors();
  
  
  // clickhandler
  
  function authorClickHandler(event){
    
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    
    /* find all author links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active author link */
    for(let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found author link */
    for(let link of links){
      /* add class active */
      link.classList.add('active');
      /* END LOOP: for each found author link */
    }
  }
  
  
  function addClickListenersToAuthors(){
    /* find all links to author */
    const authorLinks = document.querySelectorAll('.post-authors a');
    /* START LOOP: for each link */
    for(let authorLink of authorLinks){
      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
  
      /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();
  
}
