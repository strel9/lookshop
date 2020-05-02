document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.ba-search-form');
    const wishlistBtn = document.getElementById('wishlist');
    const wishlistCounter = wishlistBtn.querySelector('.shopping-counter');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cartBtn = document.getElementById('cart');
    const cart = document.querySelector('.cart');
    const cartCounter = cartBtn.querySelector('.shopping-counter');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const category = document.querySelector('.category');
    // console.log('wishlistCounter: ', wishlistCounter);
    const breadActiv = document.getElementById('breadcrumbs-place');

    const loader = () => {
        goodsWrapper.innerHTML = `<div class="loader-five">
        <div class="loader-five__dot">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="loader-five__dot">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="loader-five__dot">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>`
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
                                        <p class="card-body-title" href="#">${title}</p>
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

    const choiceCategory = (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item__link')) {
            // console.log(target.dataset.category);

            const category = target.dataset.category;
            getGoods(renderCard, (goods) => goods.filter((item) => item.category.includes(category)));
            // вот здесь создавать текущую хлеб крошку target.dataset.category
            breadActiv.innerText = ' ';
            breadActiv.innerText = target.innerText;
            // console.log(target.innerText);
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
        // console.log(goodsBasket);

        goodsBasket.includes(element => {

        });
        if (element.cartId === id) {
            // goodsBasket.splice(goodsBasket.indexOf(id), 1);
            // console.log('q');
        } else {
            // const a = { id, 1};
            goodsBasket.push({ cartId: id }, { quantity: 1 });
            // console.log('a');

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
    category.addEventListener('click', choiceCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    wishlistBtn.addEventListener('click', showWishlist);

    // getGoods(renderCard, randomSort);
    getGoods(renderCard);

    storageQuery(true);

});

$('.ba-slider1').slick({
    dots: true,
    arrows: false
});
//
$('.ba-slider2').slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    // 
    mobileFirst: true,
    responsive: [{
        breakpoint: 768,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            centerMode: false
        }
    }]
});
//
//Mobile menu
let mobileMenu = document.querySelector('.mobile-menu-btn');
let menuList = document.querySelector('.ba-menu');
// console.log(menuList);

mobileMenu.addEventListener('click', function (event) {
    event.preventDefault();
    menuList.classList.toggle('ba-menu--active');
});

//
// menu 
$(window).scroll(function () {
    if ($(window).scrollTop() >= 500) {
        $(".ba-header").css({
            'position': 'fixed',
            'z-index': '1'
        });
        $(".ba-header-top").css({
            'display': 'none'
        });
        $(".ba-header").css({
            'width': '100%'
        });

    }
    else {
        $(".ba-header").css({
            'position': 'static',
            'z-index': '1'
        });
        $(".ba-header-top").css({
            'display': 'flex'
        });
        $(".ba-header-main").css({
            'width': '100%'
        });

    };
});

// меню эффект
// document.querySelectorAll('.ba-menu__link').forEach((elem) => {

//     elem.onmouseenter =
//         elem.onmouseleave = (e) => {

//             const tolerance = 10

//             const left = 0
//             const right = elem.clientWidth

//             let x = e.pageX - elem.offsetLeft

//             if (x - tolerance < left) x = left
//             if (x + tolerance > right) x = right

//             elem.style.setProperty('--x', `${x}px`)

//         }

// })