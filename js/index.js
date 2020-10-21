'use strict';

const search = document.querySelector('.search-form');
const wishlistBtn = document.getElementById('wishlist');
const wishlistCounter = wishlistBtn.querySelector('.shopping__counter');
const goodsWrapper = document.querySelector('.goods-wrapper');
const cartBtn = document.getElementById('cart');
const cart = document.querySelector('.cart');
const cartWrapper = document.querySelector('.cart__wrapper');
const cartCounter = cartBtn.querySelector('.shopping__counter');
const category = document.querySelector('.category');
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
        </div>`;
};

// запрос в базу
const getGoods = (handler, filter) => {
	loader();
	fetch('db/db.json')
		.then((response) => response.json())
		.then(filter)
		.then(handler);
};

// создание карточки товара
const createCardGoods = (id, title, brand, price, img) => {
	const card = document.createElement('div');
	card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
	card.innerHTML = `<div class="card">
                        <div class="card__top">
                            <img class="card__img" src="${img}" alt="${title}">
                            <button class="card__add-wishlist ${
															wishlist.includes(id) ? 'active' : ''
														}" data-goods-id="${id}">
                                <i class="card__add-wishlist-heart fas fa-heart"></i>
                            </button>
                        </div>
                        <div class="card__body">
                            <p class="card__body-brand">${brand}</p>
                            <p class="card__body-title" href="#">${title}</p>
                            <p class="card__body-price">${price}<i class="fas fa-hryvnia"></i></p>
							<button class="card__add-cart btn" role="button" 
								data-goods-id="${id}"
								data-goods-price="${price}" >
                                Добавить в корзину<span><i class="plus fas fa-plus"></i></span>
                            </button>
                        </div>
                    </div>`;
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
// const storageQueryBasket = (get) => {
// 	if (get) {
// 		// return localStorage.getItem('look-wishlist');
// 		if (localStorage.getItem('look-basket')) {
// 			JSON.parse(localStorage.getItem('look-basket')).forEach((id) => goodsBasket.push(id));
// 		}
// 	} else {
// 		localStorage.setItem('look-basket', JSON.stringify(goodsBasket));
// 	}
// 	checkCount();
// };

//рендер корзины окна
const renderBasket = () => {
	cartWrapper.textContent = '';

	if (goodsBasket.length) {
		goodsBasket.forEach((item) => {
			cartWrapper.append(createCartGoodsBasket(item));
		});
	} else {
		cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пуста</div >';
	}
	// console.log(goodsBasket.length);
};

//рендер товара в корзине
const createCartGoodsBasket = ({ brand, title, price, quantity, img }) => {
	const element = document.createElement('div');

	element.className = 'good-in-cart';
	element.innerHTML = `	<div class="card">
							<div class="card__top">
								<img class="card__img" src="${img}" alt="${title}">
							</div>
							<div class="card__body">
								<p class="card__body-brand">${brand}</p>
								<p class="card__body-title">${title}</p>
							</div>
						</div>
						<div>
							<p class="card__body-price">${price}<i class="fas fa-hryvnia"></i></p>
							<p class="card__body-quantity">${quantity}</p>
							<a href="#" class="card__body-del btn">удалить</a>
						</div>
						`;
	return element;
};

// счетчик на корзине и вишлисте
const checkCount = () => {
	wishlistCounter.textContent = wishlist.length;
	cartCounter.textContent = goodsBasket.length;
};

// добавляение в массив корзины
const addBasket = (id, element) => {
	if (element.cartId === id) {
	} else {
		const brand = element.parentNode.querySelector('.card__body-brand').innerText;
		const title = element.parentNode.querySelector('.card__body-title').innerText;
		const price = element.parentNode.querySelector('.card__body-price').innerText;
		const img = element.parentNode.parentNode
			.querySelector('.card__top')
			.firstElementChild.src.substr(34);
		goodsBasket.push({ cartId: id, brand, title, price, quantity: 1, img });
		// console.log(goodsBasket);
	}

	checkCount();
	// storageQueryBasket();
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
		toggleWishlist(target.parentNode.dataset.goodsId, target);
	}

	if (target.classList.contains('card__add-cart')) {
		addBasket(target.dataset.goodsId, target);
		// console.log(target.dataset.goodsId);
		// console.log(target);
	}
};

// вывести товары вишлиста
const showWishlist = () => {
	baHero.classList.add('hide');
	baBrands.classList.add('hide');
	baBaners.classList.add('hide');
	getGoods(renderCard, (goods) => goods.filter((item) => wishlist.includes(item.id)));
};

// вкладка woman
const showWoman = (e) => {
	e.preventDefault();
	getGoods(renderCard);
	baHero.classList.add('hide');
	baBrands.classList.add('hide');
	baBaners.classList.add('hide');
};

// вывести товары по категории
const choiceCategory = (e) => {
	e.preventDefault();
	const target = e.target;

	if (target.classList.contains('category__link')) {
		// console.log(target.dataset.category);

		const category = target.dataset.category;
		getGoods(renderCard, (goods) => goods.filter((item) => item.category.includes(category)));
		// вот здесь создавать текущую хлеб крошку target.dataset.category
		breadActiv.innerText = ' ';
		breadActiv.innerText = '>' + target.innerText;
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
		getGoods(renderCard, (goods) => goods.filter((item) => searchString.test(item.title)));
	}

	// input.value = '';
};

// const delGoodFromCart = (arr, el) => {
// 	arr.filter((item) => item.cartId !==);
// };

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

window.addEventListener('scroll', () => {
	if (window.scrollY >= 500) {
		baHeader.style.position = 'fixed';
		baHeader.style.zIndex = '1';
		baHeaderTop.style.display = 'none';
		baHeader.style.width = '100%';
	} else {
		baHeader.style.position = 'static';
		baHeader.style.zIndex = '1';
		baHeaderTop.style.display = 'flex';
		baHeaderMain.style.width = '100%';
	}
});
// menu scroll

//слайдер
new Swiper('.swiper-container', {
	loop: true,
	autoplay: {
		delay: 2000,
		autoplay: true,
	},
	// slidesPerView : 3,
	// direction: 'vertical',
	speed: 300,
	pagination: {
		// el: '.swiper-pagination',
		dynamicBullets: true,
	},
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
