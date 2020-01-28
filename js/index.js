document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.ba-search-form');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');
    const category = document.querySelector('.category');
    const cartCounter = cartBtn.querySelector('.shopping-counter');
    const wishlistCounter = wishlistBtn.querySelector('.shopping-counter');
    const cartWrapper = document.querySelector('.cart-wrapper')
    // console.log('wishlistCounter: ', wishlistCounter);

    const loader = () => {
        goodsWrapper.innerHTML = `<div class="loader-four" id="loader-four">
        <div class="loader-four__preloader"></div></div>`
    };

    let wishlist = [];
    let goodsBasket = [];
    // let wishlist = storageQuery(true);

    const createCardGoods = (id, title, brand, price, img) => {
        const card = document.createElement('div');
        // ./img/girl_2.jpg
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `<div class="card">
                                    <div class="card-img-wrapper">
                                        <img class="" src="${img}" alt="${title}">
                                        <button class="card-add-wishlist ${wishlist.includes(id) ? 'active' : ''}"
                                            data-goods-id="${id}">
                                            <i class="fas fa-heart card-add-wishlist-heart"></i>
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-body-brand">${brand}</p>
                                        <a class="card-body-title" href="#">${title}</a>
                                        <p class="card-body-price">${price}<i class="fas fa-hryvnia"></i></p>
                                        <button class="card-add-cart btn" role="button" data-goods-id="${id}">
                                            Добавить в корзину<span><i class="fas fa-plus"></i></span>
                                        </button>
                                    </div>
                            </div>`;
        // console.log(card);
        return card;
    };

    const renderCard = (goods) => {
        goodsWrapper.textContent = '';

        if (goods.length) {
            goods.forEach((item) => {
                const { id, title, brand, price, imgCart } = item;
                goodsWrapper.append(createCardGoods(id, title, brand, price, imgCart));
                // console.log(item);
            });
        } else {
            goodsWrapper.textContent = 'Таких товаров нет';
        }
    };

    //рендер товаров в корзине
    const createCartGoodsBasket = (id, title, brand, price, img) => {
        const card = document.createElement('div');
        // ./img/girl_2.jpg
        card.className = 'goods';
        card.innerHTML = `<div class="card">
                                <div class="card-img-wrapper">
                                    <img class="" src="${img}" alt="${title}">
                                    <button class="card-add-wishlist ${wishlist.includes(id) ? 'active' : ''}"
                                        data-goods-id="${id}">
                                        <i class="fas fa-heart card-add-wishlist-heart"></i>
                                    </button>
                                </div>
                                <div class="card-body">
                                    <p class="card-body-brand">${brand}</p>
                                    <a href="#">${title}</a>
                                    <p class="card-body-price">${price}<i class="fas fa-hryvnia"></i></p>
                                    <button class="card-add-cart btn" role="button" data-goods-id="${id}">
                                        Добавить в корзину<span><i class="fas fa-plus"></i></span>
                                    </button>
                                </div>
                        </div>`;
        return card;
    };

    const renderBasket = (goods) => {
        cartWrapper.textContent = '';

        if (goods.length) {
            goods.forEach((item) => {
                const { id, title, brand, price, imgCart } = item;
                cartWrapper.append(createCartGoodsBasket(id, title, brand, price, imgCart));
                // console.log(item);
            });
        } else {
            cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пуста</div >';


        }


    };
    // ---

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



    const getGoods = (handler, filter) => {
        loader();
        fetch('db/db.json')
            .then((response) => response.json())
            // .then((data) => console.log(data));
            .then(filter)
            .then(handler);
    };

    // const randomSort = (item) => item.sort(() => Math.random() - 0.5);

    const choiceCategory = (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item')) {
            // console.log(target.dataset.category);

            const category = target.dataset.category;
            getGoods(renderCard, (goods) => goods.filter((item) => item.category.includes(category)));
        }
    };
    const searchGoods = (event) => {
        event.preventDefault();
        // console.log(event.target.elements);
        const input = event.target.elements.searchInput;
        // console.log(input.value);
        const inputValue = input.value.trim(); //trim убирает пробелы слева и справа

        if (inputValue !== '') {
            const searchString = new RegExp(inputValue, 'i');
            // console.log(searchString);
            // console.log(item.title);
            getGoods(renderCard, goods => goods.filter((item) =>
                searchString.test(item.title)));
        }

        // input.value = '';
    }
    const checkCount = () => {
        wishlistCounter.textContent = wishlist.length;
        // console.log('wishlistCounter: ', wishlistCounter);
        // console.log('wishlist.length: ', wishlist.length);
        cartCounter.textContent = goodsBasket.length;
    };

    const storageQuery = (get) => {
        if (get) {
            // return localStorage.getItem('look-wishlist');
            if (localStorage.getItem('look-wishlist')) {
                JSON.parse(localStorage.getItem('look-wishlist')).forEach((id) => wishlist.push(id));
            }

        } else {
            localStorage.setItem('look-wishlist', JSON.stringify(wishlist));

        }
        checkCount();

    };

    const storageQueryBasket = (get) => {
        if (get) {
            // return localStorage.getItem('look-wishlist');
            if (localStorage.getItem('look-basket')) {
                JSON.parse(localStorage.getItem('look-basket')).forEach((id) => goodsBasket.push(id));
            }
        } else {
            localStorage.setItem('look-basket', JSON.stringify(goodsBasket));

        }
        checkCount();

    };

    const addBasket = (id, elem) => {
        console.log(id);
        console.log(goodsBasket);

        goodsBasket.includes(element => {

        });
        if (element.cartId === id) {
            // goodsBasket.splice(goodsBasket.indexOf(id), 1);
            console.log('q');
        } else {
            // const a = { id, 1};
            goodsBasket.push({ cartId: id }, { quantity: 1 });
            console.log('a');

        }

        // if (goodsBasket[id]) {
        //     goodsBasket[id] += 1
        // } else {
        //     goodsBasket[id] = 1
        // }
        // console.log('goodsBasket: ', goodsBasket);
        checkCount();
        storageQueryBasket();

    };


    const toggleWishlist = (id, elem) => {
        // console.log(wishlist.indexOf(id));
        if (wishlist.includes(id)) {
            wishlist.splice(wishlist.indexOf(id), 1);
            elem.parentNode.classList.remove('active');
        } else {
            wishlist.push(id);
            elem.parentNode.classList.add('active');
        }
        // console.log('wishlist: ', wishlist);
        checkCount();
        storageQuery();
    };

    // addBasket(target.dataset.goodsId, target);
    // console.log('target.dataset.goodsId, target: ', event.target.dataset.goodsId);


    const handlerGoods = (event) => {
        const target = event.target;

        if (target.classList.contains('card-add-wishlist-heart')) {
            // console.log(target.parentNode.dataset.goodsId);
            toggleWishlist(target.parentNode.dataset.goodsId, target);
        };

        if (target.classList.contains('card-add-cart')) {
            addBasket(target.dataset.goodsId, target);
            // console.log(target.dataset.goodsId);
            // console.log(target);
        };
    }

    const showWishlist = () => {
        getGoods(renderCard, goods => goods.filter(item => wishlist.includes(item.id)))
    };

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', choiceCategory); //choiceCategory 
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    wishlistBtn.addEventListener('click', showWishlist);

    // getGoods(renderCard, randomSort);
    getGoods(renderCard);

    storageQuery(true);

});

$('.ba-slider1').slick({
    dots: true,
    arrows: true
});
// 
$(document).ready(documentReady);

function documentReady() {
    var MAX_SNOW = 300;
    var MAX_SNOW_SIZE = 10;
    var MAX_SNOW_SPEED = 1;

    snowStart();

    function snowStart() {
        // console.log("// Snow animation start");
        createSnows();
    }

    function createSnows() {

        var container = $("#snow-animation-container");

        for (var i = 0; i < MAX_SNOW; i++) {
            var appendItem = getRandomItem(i);
            container.append(appendItem);
            var animateItem = $(".snow" + String(i));
            var randomTime = Math.random() * MAX_SNOW_SPEED;
            goAnimate(animateItem, i, randomTime);
            goAnimate2(animateItem);
        };

        // console.log("// Create snows");
    }

    function goAnimate(item, id, randomTime) {
        TweenMax.to(item, randomTime, {
            css: {
                marginTop: "+=100"
            },
            ease: Linear.easeNone,
            onComplete: function () {
                var topPosition = item.css("margin-top").replace("px", "");
                if (topPosition > $(window).height()) {
                    changePosition(item);
                    randomTime = Math.random() * MAX_SNOW_SPEED;
                    goAnimate(item, id, randomTime);
                } else {
                    goAnimate(item, id, randomTime);
                }

            }
        });
    }

    function goAnimate2(item) {

        var directionTime = 1 + Math.floor(Math.random() * 5);
        var randomDirection = 1 + Math.floor(Math.random() * 4);
        var delayTime = 1 + Math.floor(Math.random() * 3);

        if (randomDirection == 1) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "+=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {

                    TweenMax.to(item, directionTime, {
                        css: {
                            marginLeft: "-=100"
                        },
                        delay: delayTime,
                        ease: Linear.easeOut,
                        onComplete: function () {
                            goAnimate2(item);
                        }
                    });
                }
            });
        } else if (randomDirection == 2) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "-=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {
                    TweenMax.to(item, directionTime, {
                        css: {
                            marginLeft: "+=100"
                        },
                        delay: delayTime,
                        ease: Linear.easeOut,
                        onComplete: function () {

                            goAnimate2(item);

                        }
                    });
                }
            });
        } else if (randomDirection == 3) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "+=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {
                    goAnimate2(item);
                }
            });
        } else if (randomDirection == 4) {

            TweenMax.to(item, directionTime, {
                css: {
                    marginLeft: "-=100"
                },
                ease: Linear.easeOut,
                onComplete: function () {
                    goAnimate2(item);
                }
            });
        }
    }

    function changePosition(item) {
        var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
        var _height = _width;
        var _blur = Math.floor(Math.random() * 5 + 2);
        var _left = Math.floor(Math.random() * ($(window).width() - _width));
        var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));

        item.css("width", _width);
        item.css("height", _height);
        item.css("margin-left", _left);
        item.css("margin-top", _top);
        item.css("-webkit-filter", "blur(" + String(_blur) + "px)");
        item.css("-moz-filter", "blur(" + String(_blur) + "px)");
        item.css("-o-filter", "blur(" + String(_blur) + "px)");
        item.css("-ms-filter", "blur(" + String(_blur) + "px)");
        item.css("filter", "blur(" + String(_blur) + "px)");
    }

    function getRandomItem(id) {
        var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
        var _height = _width;
        var _blur = Math.floor(Math.random() * 5 + 2);
        var _left = Math.floor(Math.random() * ($(window).width() - _width));
        var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));
        var _id = id;

        return getSmallSnow(_width, _height, _blur, _left, _top, _id);
    }

    function getSmallSnow(width, height, blur, left, top, id) {
        var item = "<div class='snow" + id + "' style='position:absolute; margin-left: " + left + "px; margin-top: " + top + "px; width: " + width + "px; height: " + height + "px; border-radius: 50%; background-color: white; -webkit-filter: blur(" + blur + "px); -moz-filter: blur(" + blur + "px); -o-filter: blur(" + blur + "px); -ms-filter: blur(" + blur + "px); filter: blur(" + blur + "px);'></div>"
        return item;
    }

}