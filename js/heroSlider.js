const slider = document.querySelectorAll('[data-slider]');
const numbers = [1,2,3,4].sort(() => Math.random() - 0.5);


const imageSlider = () =>{

    slider.forEach((elem,index)=>{
        numbers[index] === 1 ? elem.setAttribute("aria-label" , "coffee image") : false;
        numbers[index] === 2 ? elem.setAttribute("aria-label" , "cherry image") : false;
        numbers[index] === 3 ? elem.setAttribute("aria-label" , "crowd celebration image") : false;
        numbers[index] === 4 ? elem.setAttribute("aria-label" , "coffee beans image") : false;
        elem.style.backgroundImage = `
        linear-gradient(to left, rgba(0,0,0,1) 0%,rgba(0,0,0,0.1) 15%), 
        linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0, 0,0, 0.1) 15%),
        url('images/heroImg${numbers[index]}.jpg') 
        `;
    })
}

export { imageSlider };