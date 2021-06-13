const arContainer = document.querySelector('[data-articles-container]');
const arPages = document.querySelector('[data-pagination-numbers]');
const pageIndicator = document.querySelector('[data-pagination-current]')

let currentPage = 1;
const rows = 3;
    
const articleInit = async () =>{
    try{
        const res = await fetch('js/articlesData.json');
        if(!res.ok){
            throw new Error('Something went wrong with fetching data');
        };
        const data = await res.json();
        buildPagination(data,rows);
        renderArticles(data,rows,currentPage);
        nextPageBtn(data,rows);
        prevPageBtn(data,rows);
    } catch (err){
        console.log(`Error message: ${err}`);
    }
}

const renderArticles = (data,rowsPerPage,page) =>{
    arContainer.innerHTML ="";
    page--;
    let trimStart = rowsPerPage * page;
    let trimEnd = trimStart + rowsPerPage
    let trimmedItems = data.slice(trimStart, trimEnd);
    trimmedItems.forEach(item=>{
        arContainer.insertAdjacentHTML('beforeend',`
            <div class="articles__item" data-article id="${item.id}_article">
                <div class="articles__img"><img src="https://dummyimage.com/400x400/ba8f40/fff&text=${item.img}" alt="${item.alt}"></div>
                <article class="articles__texts">
                    <h2>${item.title}</h2>
                    <span>Posted: ${item.date}</span>
                    <p aria-expanded="false" id="article${item.id}">
                        ${item.text}
                        <span class="articles__texts-dots" data-js="dots">...</span>
                        <span class="articles__texts-more"  data-js="show-more" >
                            ${item.more}
                        </span>
                    </p>
                    <button class="articles__btn" aria-controls="article${item.id}" data-id="more">Read more</button>
                </article>
            </div>
        `)
    })
}

const renderMoreText = () =>{
    arContainer.addEventListener('click', e =>{
        const target = e.target.dataset.id;
        if(target !== 'more') return;
        
        // select <P> Tag
        const text = e.target.previousElementSibling;

        const textDots = text.querySelector('[data-js="dots"]');
        const textMore = text.querySelector('[data-js="show-more"]');
        const moreBtn = e.target.closest('[data-id="more"]');

        if(textDots.style.display === "none"){
            textDots.style.display = "inline";
            moreBtn.innerText = 'Read more';
            moreBtn.style.opacity = "1";
            textMore.style.display = "none";
            text.setAttribute('aria-expanded','false');
        } else {
            textDots.style.display = "none";
            moreBtn.innerText = 'Read less';
            moreBtn.style.opacity = "0.8";
            textMore.style.display = "inline";
            text.setAttribute('aria-expanded','true');
        }
    })
}
  /**herererer */


const buildPagination = (data, rowsPerPage)=>{
    

    arPages.innerHTML = '';
    let pageCount = Math.ceil(data.length / rowsPerPage);

    pageIndicator.innerHTML = `Page ${currentPage} of ${pageCount}`        

    if(currentPage = 1){
        arPages.insertAdjacentHTML('afterbegin',`
        <button class="pagination__box-number" style="display:none" aria-label ="previous page" data-prev> &#171;</button>
        `)
    }
    for(let i = 1; i < pageCount + 1; i++){
        let btn = PaginationButton(i,data,pageIndicator, pageCount);
        btn.classList.add('pagination__box-number');
        arPages.appendChild(btn);
    };
    if(currentPage < pageCount){
        arPages.insertAdjacentHTML('beforeend',`
        <button class="pagination__box-number" aria-label ="next page" data-next> &#187;</button>
        `)
    }
}

const PaginationButton = (page,data,pageIndicator,pageCount)=>{
    const button = document.createElement('button');
    button.innerText = page;
    button.id = page;
    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click',()=>{
        const buttonPrev = document.querySelector('[data-prev]');
        const buttonNext = document.querySelector('[data-next]');
        currentPage = page;
        renderArticles(data, rows, currentPage);

        const currentBtn = arPages.querySelector('.active')
        currentBtn.removeAttribute('aria-current');
        currentBtn.classList.remove('active'); 
        button.classList.add('active');
        button.setAttribute('aria-current', 'page');
        pageIndicator.innerHTML = `Page ${currentPage} of ${pageCount}`

        if (currentPage == pageCount) buttonNext.style.display='none'
            else buttonNext.style.display='flex';
        if (currentPage == 1) buttonPrev.style.display='none';
            else buttonPrev.style.display='flex';
    })
    return button;
}

const nextPageBtn = (data,rowsPerPage) =>{
    const buttonPrev = document.querySelector('[data-prev]');
    const buttonNext = document.querySelector('[data-next]');

    let pageCount = Math.ceil(data.length / rowsPerPage);

    buttonNext.addEventListener('click', ()=>{
        let page = arPages.querySelector('.active');

        if(page.id == pageCount){
            buttonNext.style.display='none';
        } else{
            buttonPrev.style.display='flex';

            currentPage = Number(page.id) + 1;
            renderArticles(data,rowsPerPage,currentPage);
            pageIndicator.innerHTML = `Page ${currentPage} of ${pageCount}` 
            
            page.removeAttribute('aria-current');
            page.classList.remove('active');
            let selectedPage = document.getElementById(currentPage);
            selectedPage.classList.add('active');
            selectedPage.setAttribute('aria-current', 'page');
        }
    });
}

const prevPageBtn = (data,rowsPerPage) =>{
    const buttonPrev = document.querySelector('[data-prev]');
    const buttonNext = document.querySelector('[data-next]');

    let pageCount = Math.ceil(data.length / rowsPerPage);

    buttonPrev.addEventListener('click', ()=>{
        let page = arPages.querySelector('.active');

        if(page.id == 1){
            buttonPrev.style.display='none'
        } else {
            buttonNext.style.display='flex';

            currentPage = Number(page.id) - 1;
            renderArticles(data,rowsPerPage,currentPage);
            pageIndicator.innerHTML = `Page ${currentPage} of ${pageCount}` 

            page.removeAttribute('aria-current');
            page.classList.remove('active');
            let selectedPage = document.getElementById(currentPage);
            selectedPage.classList.add('active');
            selectedPage.setAttribute('aria-current', 'page');
        }
    })
}

export { articleInit, renderMoreText };

