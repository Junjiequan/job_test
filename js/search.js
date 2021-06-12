const searchInput = document.querySelector('[data-search]')
const list = document.querySelector('[data-search-list]')
const searchContainer = document.querySelector('[data-js="search-opacity"]');

const searchInit = async () =>{
    try{
        const res = await fetch('js/articlesData.json');
        if(!res.ok){
            throw new Error('Something went wrong with fetching data');
        };
        const data = await res.json();
        filterData(data);
    } catch (err){
        console.log(`Error message: ${err}`);
    }
}

const setList = (data) =>{
    clearList();
    for(const article of data){
        list.insertAdjacentHTML('beforeend',`
        <li class="search-list__item">${article.title}</li>
        `)
    }
    if(data.length === 0) setNoResults();
}

const clearList = () =>{
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

const setNoResults = () =>{
    list.insertAdjacentHTML('beforeend',`
    <li class="search-list__error" style="display:flex"> NO RESULT FOUND </li>
    `)
}

const getRelevancy = (value,searchTerm)=>{
    if(value === searchTerm) return 2;
    else if (value.startsWith(searchTerm)) return 1;
    else if (value.includes(searchTerm)) return 0;
    else return -1;
}

const filterData = (data) => {
    searchInput.addEventListener('input',(e)=>{
        let value = e.target.value;
        if(value && value.trim().length > 0){
            searchContainer.style.display= "flex";
            value = value.trim().toLowerCase();

            setList(data.filter(item=> item.title.includes(value))
                    .sort((titleA,titleB)=>{
                        return getRelevancy(titleB.title, value) - getRelevancy(titleA.title, value);
                }))
        } else{
            clearList();
            searchContainer.style.display= "none";
        }
    })
    document.addEventListener('click',()=>{
        if(searchContainer.style.display === "flex"){
            searchContainer.style.display= "none";
        }
    })
}

export { searchInit };