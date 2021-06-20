/**
 * @desc mousover each function to view extra functionalities. if no desc then no extra functions inside.
 */
import { imageSlider } from './heroSlider.js';
import { navHamburger } from './navBar.js';
import { articleRender } from './articles.js';
import { filterData } from './search.js';
import { modalInit } from './articleModal.js';


(async() =>{
    try{
        const resp = await fetch('./js/articlesData.json');
        if(!resp.ok){
            throw new Error('Fecth data failed')
        };

        /**
         * @type {Object} data - contains 16 article objects, each object have 7 properties
         * @property {number} data[].id     - id of the article
         * @property {number} data[].img    - used for fetching img url 
         * @property {string} data[].alt    - image alt
         * @property {string} data[].title  - article title
         * @property {string} data[].date   - article posted date
         * @property {string} data[].text   - article content before click Read more button
         * @property {string} data[].more   - article content after clicked Read more button
         */
        const data = await resp.json();

        articleRender(data);
        filterData(data);
        modalInit(data);
    } catch(err){
        console.log(err);
    }
})();

imageSlider();
navHamburger();



