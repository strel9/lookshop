document.addEventListener('DOMContentLoaded', () => {
    // const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const cart = document.querySelector('.cart');
    const goodsWrapper = document.querySelector('.goods-wrapper');

    const createCardGoods = () => {
        const card = document.createElement('div');
        card.className = 'card col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `<div class="card">
                                <img class="" src="./img/girl_2.jpg">
                                <p>Atmos&Here Shopper</p>
                                <p class="card-price">$49.95</p>
                                <a class="btn" href="#" role="button">Add to card <span><i class="fas fa-plus"></i></span></a>
                            </div>`;
        // console.log(card);
        return card;
    };

    goodsWrapper.appendChild(createCardGoods());
    goodsWrapper.appendChild(createCardGoods());
    goodsWrapper.appendChild(createCardGoods());
    goodsWrapper.appendChild(createCardGoods());
    goodsWrapper.appendChild(createCardGoods());

    const closeCart = () => {
        cart.style.display = 'none';
    };

    const openCart = () => {
        cart.style.display = 'flex';

    };

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);



});

$('.ba-slider1').slick({
    dots: true,
});