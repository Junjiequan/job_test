const body = document.body;
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const searchInput = document.querySelector('[data-search]')
const list = document.querySelector('[data-search-list]');

const modalInit = async () =>{
    try{
        const res = await fetch('js/articlesData.json');
        if(!res.ok){
            throw new Error('Something went wrong with fetching data');
        };
        const data = await res.json();
        getModal(data);
    } catch (err){
        console.log(`Error message: ${err}`);
    }
}
const renderData = (data="") =>{
    modalContent.innerHTML=`
        <span class="modal__close" data-modal-close><i class="fas fa-window-close"></i></span>
        <h1>Recent Events</h1>
        <h2>${data[0].title}</h2>
        <img src="https://dummyimage.com/400x400/ba8f40/fff&text=${data[0].img}" alt="${data[0].alt}">
        <p>${data[0].text} ${data[0].more}</p>
    `
}

const getModal = (data) =>{
    list.addEventListener('click', (e)=>{
        const itemText = e.target.innerText.trim().toLowerCase();

        modal.style.display="flex";
        body.style.overflow = "hidden";
        setTimeout(()=>{
            modal.style.opacity ="1";
        },20);
        renderData(data.filter(article=> article.title.includes(itemText)));
    })

    //close modal
    modal.addEventListener('click',(e)=>{
        if(e.target.className === 'modal__close'){
            body.style.overflow = "auto"
            modal.style.opacity ="0";
            setTimeout(()=>{
                modal.style.display="none"
            },300);
        } else return;
    })
}


export { modalInit };

