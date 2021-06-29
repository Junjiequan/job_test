const body = document.body;
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const list = document.querySelector('[data-search-list]');


/**
 * @desc contain renderModalData, openModal, closeModal.
 */
const modalInit = (data) =>{
    list.addEventListener('click', (e)=>{
        const itemText = e.target.innerText.trim().toLowerCase();
        renderModalData(data.filter(article=> article.title.includes(itemText)));

        openModal();
    })

    modal.addEventListener('click',(e)=>{
        const isClose = e.target.className === 'modal__close'

        if(isClose) closeModal();
    })
}

const openModal = ()=>{
    modal.style.display="flex";
    body.style.overflow= "hidden";
    setTimeout(()=>{
        modal.style.opacity ="1";
    },20);
}

const closeModal = ()=>{
    body.style.overflow = "auto"
    modal.style.opacity ="0";
    setTimeout(()=>{
        modal.style.display="none"
    },300);
}

const renderModalData = (data="") =>{
    modalContent.innerHTML=`
        <span class="modal__close" data-modal-close><i class="fas fa-window-close"></i></span>
        <h1>Recent Events</h1>
        <h2>${data[0].title}</h2>
        <img src="https://dummyimage.com/400x400/ba8f40/fff&text=${data[0].img}" alt="${data[0].alt}">
        <p>${data[0].text} ${data[0].more}</p>
    `
}

export { modalInit };

