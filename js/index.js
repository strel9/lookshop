'use strict';

const search = document.querySelector('.search-form');
const wishlistBtn = document.getElementById('wishlist');
const wishlistCounter = wishlistBtn.querySelector('.shopping__counter');
const goodsWrapper = document.querySelector('.goods-wrapper');
const cartBtn = document.getElementById('cart');
const cart = document.querySelector('.cart');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartCounter = cartBtn.querySelector('.shopping__counter');
const category = document.querySelector('.category');
// console.log('wishlistCounter: ', wishlistCounter);
const breadActiv = document.getElementById('breadcrumbs-place');
const womanPage = document.querySelector('.woman-page');
const baHero = document.querySelector('.ba-hero');
const baBrands = document.querySelector('.ba-brands');
const baBaners = document.querySelector('.ba-baners');
//scroll
const baHeader = document.querySelector('.ba-header');
const baHeaderTop = document.querySelector('.ba-header__top');
const baHeaderMain = document.querySelector('.ba-header__main');
//Mobile menu
const mobileMenu = document.querySelector('.mobile-menu-btn');
const menuList = document.querySelector('.ba-menu');

let wishlist = [];
let goodsBasket = [];
// let wishlist = storageQuery(true);

// прелоадер
const loader = () => {
	goodsWrapper.innerHTML = `
        <div class="loader-five">
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

// запрос в базу
const getGoods = (handler, filter) => {
	loader();
	fetch('db/db.json')
		.then((response) => response.json())
		// .then((data) => console.log(data));
		.then(filter)
		.then(handler);
};

// создание карточки товара
const createCardGoods = (id, title, brand, price, img) => {
	const card = document.createElement('div');
	// ./img/girl_2.jpg
	card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
	card.innerHTML = `<div class="card">
                        <div class="card__top">
                            <img class="card__img" src="${img}" alt="${title}">
                            <button class="card__add-wishlist ${wishlist.includes(id) ? 'active' : ''}" data-goods-id="${id}">
                                <i class="card__add-wishlist-heart fas fa-heart"></i>
                            </button>
                        </div>
                        <div class="card__body">
                            <p class="card__body-brand">${brand}</p>
                            <p class="card__body-title" href="#">${title}</p>
                            <p class="card__body-price">${price}<i class="fas fa-hryvnia"></i></p>
                            <button class="card__add-cart btn" role="button" data-goods-id="${id}">
                                Добавить в корзину<span><i class="plus fas fa-plus"></i></span>
                            </button>
                        </div>
                    </div>`;
	// console.log(card);
	return card;
};

//рендер карточки товара
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

//запрос в локалсторедж для вишлиста
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

//закрыть корзину
const closeCart = (e) => {
	const target = e.target;
	if (target === cart || target.classList.contains('cart-close')) {
		cart.style.display = 'none';
	}

};
// открыть корзину
const openCart = () => {
	event.preventDefault();
	cart.style.display = 'flex';
	renderBasket();
};

//запрос в локалсторедж для козины
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

//рендер корзины окна
const renderBasket = () => {
	cartWrapper.textContent = '';

	if (goodsBasket.length) {
		goodsBasket.forEach(({ cartId, quantity }) => {
			// const { id, title, brand, price, imgCart } = item;
			// cartWrapper.append(createCartGoodsBasket(id, title, brand, price, imgCart));
			cartWrapper.append(createCartGoodsBasket(cartId, quantity));
			// console.log(item);
		});
	} else {
		cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пуста</div >';
	}
	console.log(goodsBasket.length)
};

//рендер товаров в корзине
// const createCartGoodsBasket = (id, title, brand, price, img) => {
const createCartGoodsBasket = (cartId, quantity) => {
	const cart = document.createElement('div');
	const img = './img/girl_2.jpg';
	const brand = 'ТЕСТ';
	const title = 'ТЕСТ';
	const price = 'ТЕСТ';
	cart.className = 'goods';
	cart.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="" src="${img}" alt="${title}">
                                <button class="card-add-wishlist ${wishlist.includes(cartId) ? 'active' : ''}"
                                    data-goods-id="${cartId}">
                                    <i class="fas fa-heart card-add-wishlist-heart"></i>
                                </button>
                            </div>
                            <div class="card-body">
                                <p class="card-body-brand">${brand}</p>
                                <a href="#">${title}</a>
                                <p class="card-body-price">${price}<i class="fas fa-hryvnia"></i></p>
                            </div>
                        </div>`;
	return cart;
};
// addBasket(target.dataset.goodsId, target);
// console.log('target.dataset.goodsId, target: ', event.target.dataset.goodsId);

// счетчик на корзине и вишлисте
const checkCount = () => {
	wishlistCounter.textContent = wishlist.length;
	cartCounter.textContent = goodsBasket.length;
	// console.log('wishlistCounter: ', wishlistCounter);
	// console.log('wishlist.length: ', wishlist.length);
};

const addBasket = (id, element) => {
	// goodsBasket.includes(element => {
	// });
	if (element.cartId === id) {
		// goodsBasket.splice(goodsBasket.indexOf(id), 1);
	} else {
		// const a = { id, 1};
		goodsBasket.push({ cartId: id, quantity: 1 });
		// console.log(goodsBasket);
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

// переключение сердечка
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

// обработка кнопок в карточке сердечко и добавить в корзину
const handlerGoods = (e) => {
	const target = e.target;

	if (target.classList.contains('card__add-wishlist-heart')) {
		// console.log(target.parentNode.dataset.goodsId);
		toggleWishlist(target.parentNode.dataset.goodsId, target);
	};

	if (target.classList.contains('card__add-cart')) {
		addBasket(target.dataset.goodsId, target);
		// console.log(target.dataset.goodsId);
		// console.log(target);
	};
}

// вывести товары вишлиста
const showWishlist = () => {
	getGoods(renderCard, goods => goods.filter(item => wishlist.includes(item.id)))
};

// вкладка woman
const showWoman = (e) => {
	e.preventDefault();
	baHero.classList.add('hide');
	baBrands.classList.add('hide');
	baBaners.classList.add('hide');
}

// вывести товары по категории
const choiceCategory = (e) => {
	e.preventDefault();
	const target = e.target;

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

const searchGoods = (e) => {
	e.preventDefault();
	// console.log(event.target.elements);
	const input = e.target.elements.searchInput;
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

cartBtn.addEventListener('click', openCart);
cart.addEventListener('click', closeCart);
category.addEventListener('click', choiceCategory);
search.addEventListener('submit', searchGoods);
goodsWrapper.addEventListener('click', handlerGoods);
wishlistBtn.addEventListener('click', showWishlist);
mobileMenu.addEventListener('click', (e) => {
	e.preventDefault();
	menuList.classList.toggle('ba-menu--active');
});
womanPage.addEventListener('click', showWoman);

// getGoods(renderCard, randomSort);
getGoods(renderCard);

storageQuery(true);

window.addEventListener(('scroll'), () => {
	if (window.scrollY >= 500) {
		baHeader.style.position = 'fixed';
		baHeader.style.zIndex = '1';
		baHeaderTop.style.display = 'none';
		baHeader.style.width = '100%';
	}
	else {
		baHeader.style.position = 'static';
		baHeader.style.zIndex = '1';
		baHeaderTop.style.display = 'flex';
		baHeaderMain.style.width = '100%';
	};
})
// menu scroll

//слайдер
new Swiper('.swiper-container', {
	loop: true,
	autoplay: {
		delay: 6000,
		autoplay: false,
	},
	// slidesPerView : 3,
	// direction: 'vertical',
	speed: 300,
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true,
	},
})


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
