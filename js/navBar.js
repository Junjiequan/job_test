const mobNavBar = document.querySelector('[data-js="mob-nav-menu"]');
const hamburgerIcon = document.querySelector('[data-js-hamburger]');
const hamburgers = document.querySelectorAll(".hamburger");

// data-js-hamburger animation 
let forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

const openNavMenu = () =>{
    hamburgerIcon.classList.toggle("is-active");
    mobNavBar.style.transform = "translateY(0)";
}

const closeNavMenu = () =>{
    hamburgerIcon.classList.toggle("is-active");
    mobNavBar.style.transform = "translateY(-100%)";
}

/**
 * @desc contains openNavMenu, closeNavMenu and a complicate hamburger animation function.
 */
const navHamburger = () =>{
    if (hamburgers.length > 0) {
        forEach(hamburgers, function(hamburger) {
            hamburger.addEventListener("click", function() {
                !hamburgerIcon.classList.contains('is-active')
                ? openNavMenu()
                : closeNavMenu();
            });
        });
    }

    document.addEventListener('click',(e)=>{
        const target = e.target;
        const hamburger = target.closest('.hamburger');
        if(hamburgerIcon.classList.contains('is-active') && hamburger !== hamburgerIcon)
            closeNavMenu();
    })
}



export { navHamburger };