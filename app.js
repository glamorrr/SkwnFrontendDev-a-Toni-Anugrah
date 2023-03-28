$(document).ready(function () {
  $("[data-js='menu-button']").click(function () {
    $("[data-js='mobile-nav']").slideToggle({
      start: function () {
        $(this).css('display', 'flex');
      },
    });
  });

  $('[data-js="product-prev-btn"]').click(function () {
    $("[data-js='products-list']").slick('slickPrev');
  });

  $('[data-js="product-next-btn"]').click(function () {
    $("[data-js='products-list']").slick('slickNext');
  });

  $('[data-js="form"]').submit(function (event) {
    event.preventDefault();
  });

  $('[data-js="category-description"]').first().slideDown();
  $('[data-js="category-item"]').first().addClass('categories__item--active');

  $('[data-js="category-name"]').click(function () {
    $('[data-js="category-description"]').parent().removeClass('categories__item--active');
    $('[data-js="category-description"]').slideUp();

    const descriptionEl = $(this).siblings('.categories__description');
    if (descriptionEl.is(':hidden')) {
      $(this).parent().addClass('categories__item--active');
      descriptionEl.slideDown();
    }
  });

  $.ajax({
    type: 'GET',
    url: '/furnitures.json',
    success: function (data) {
      const { furnitures } = data;
      furnitures.forEach((furniture) => {
        const productItemEl = document.createElement('div');
        productItemEl.classList.add('products__item');

        const imageEl = document.createElement('img');
        imageEl.src = furniture.img;
        imageEl.alt = furniture.name;
        imageEl.classList.add('products__img');

        const productInfoEl = document.createElement('div');
        productInfoEl.classList.add('products__info');

        const priceEl = document.createElement('span');
        priceEl.classList.add('products__price');
        priceEl.textContent = `$${furniture.price}`;

        const nameEl = document.createElement('span');
        nameEl.classList.add('products__name');
        nameEl.textContent = furniture.name;

        productInfoEl.appendChild(priceEl);
        productInfoEl.appendChild(nameEl);
        productItemEl.appendChild(imageEl);
        productItemEl.appendChild(productInfoEl);
        $('[data-js="products-list"]').append(productItemEl);
      });

      slickProducts();
    },
  });
});

function slickProducts() {
  $("[data-js='products-list']").slick({
    centerMode: true,
    arrows: false,
    variableWidth: true,
    infinite: false,
  });
}
