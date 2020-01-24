document.addEventListener('DOMContentLoaded', () => {
    // const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');

    const createCardGoods = (id, title, brand, price, img) => {
        const card = document.createElement('div');
        // ./img/girl_2.jpg
        card.className = 'card col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `<div class="card">
                                <img class="" src="${img}" alt="${title}">
                                <button class="card-add-wishlist"
                                data-goods-id ="${id}"><i class="far fa-heart"></i>
                                </button>
                                <p>${brand}</p>
                                <p>${title}</p>
                                <p class="card-price">${price}<i class="fas fa-hryvnia"></i></p>
                                <button class="btn card-add-cart" role="button"
                                data-goods-id ="${id}">Добавить в корзину <span><i class="fas fa-plus"></i></span></button>
                            </div>`;
        // console.log(card);
        return card;
    };


    // goodsWrapper.appendChild(createCardGoods(1, 'платье-1', 'adidas', 2000, 'img/girl_2.jpg'));
    // goodsWrapper.appendChild(createCardGoods(2, 'платье-2', 'adidas', 3000, 'img/girl_3.jpg'));
    // goodsWrapper.appendChild(createCardGoods(3, 'платье-3', 'adidas', 4000, 'img/girl_6.jpg'));

    const closeCart = (event) => {
        const target = event.target;
        if (target === cart || target.classList.contains('cart-close')) {
            cart.style.display = 'none';
        }

    };

    const openCart = () => {
        event.preventDefault();
        cart.style.display = 'flex';

    };

    const renderCard = (items) => {
        items.forEach((item) => {
            const { id, title, brand, price, imgCart } = item;
            goodsWrapper.append(createCardGoods(id, title, brand, price, imgCart));
            // console.log(item);
        })
    };

    const getGoods = (handler) => {
        fetch('db/db.json')
            .then((response) => response.json())
            // .then((data) => console.log(data));
            .then(handler);
    };

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);

    getGoods(renderCard);

});

$('.ba-slider1').slick({
    dots: true,
});