
let slideShowSlides;
const initializeSlideShow = (listSource, baseUrl) => {
    const currentSlide = document.getElementById('current-slide');

    slideShowSlides = listSource.map(item => document.getElementById(item));
    console.log(slideShowSlides);
    slideShowSlides.map(slide => {
        slide.onclick= () => {
            if (slide.classList.contains('active-slide')) {
                return;
            }

            slideShowSlides.map(slide_ => {
                slide_.classList.remove('active-slide');
            });

            slide.classList.add('active-slide');
            currentSlide.style.backgroundImage = `url(${baseUrl}/assets/products/name/${slide.id}/)`;
        }
        
    });
}

const increaseAmount= ()=> {
    const amountField= document.getElementById('amount-field');
    const amount= Number.parseInt(amountField.value.trim());
    if (amount < 10) {
        amountField.value= `${amount + 1}`;
    }
}

const decreaseAmount= ()=> {
    const amountField= document.getElementById('amount-field');
    const amount= Number.parseInt(amountField.value.trim());
    if (amount > 1) {
        amountField.value= `${amount - 1}`;
    }

}

const addToCartListener= ()=> {
    const amountField= document.getElementById('amount-field');
    const amount = Number.parseInt(amountField.value.trim())

    const urlParts= window.location.href.split('/products/');
    const url= urlParts[0];
    const productId= urlParts[1].split('/')[0];

    addToCart(url, productId, amount);
}

const orderNowListener= ()=> {}