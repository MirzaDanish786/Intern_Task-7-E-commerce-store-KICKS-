const urlParams = new URLSearchParams(window.location.search);
let item_id = urlParams.get('id');
const item_category = urlParams.get('category');
console.log(item_id);
console.log(item_category);

const fetchDetails = async (category, id) => {
  let url = category ? `https://dummyjson.com/products/category/${category}` : `https://dummyjson.com/products?limit=100`;
  let response = await fetch(url);
  let data = await response.json();

  // Check if the products array is available
  if (!data.products) {
    console.error("No products found for the given category");
    return;
  }

  let filteredProduct = data.products.filter(product => product.id == id);
  if (filteredProduct.length === 0) {
    console.error(`No product found with id ${id} in category ${category}`);
  } else {
    console.log(filteredProduct[0].thumbnail);
  }

  let productImageContainer = document.querySelector(".productImageContainer");

  // Remove the previous image:
  let previousImage = document.querySelector(".productImage");
  if (previousImage) {
    previousImage.remove();
  }

  let productTtle = document.querySelector(".productTtle");
  let price = document.querySelector(".price");
  let description = document.querySelector(".description");
  let stock = document.querySelector(".stock");
  let warranty = document.querySelector(".warranty");
  let shipping = document.querySelector(".shipping");
  let productImage = document.createElement("img");

  productImage.classList.add("productImage");
  productImage.classList.add("object-contain");
  productImage.classList.add("w-full");
  productImage.src = filteredProduct[0].thumbnail;
  productImageContainer.append(productImage);

  productTtle.innerHTML = filteredProduct[0].title;
  price.innerHTML = `$${filteredProduct[0].price}`;
  description.innerHTML = filteredProduct[0].description;
  stock.innerHTML = `• Stock: ${filteredProduct[0].stock}`;
  warranty.innerHTML = `• Warranty: ${filteredProduct[0].warrantyInformation}`;
  shipping.innerHTML = `• Shipping: ${filteredProduct[0].shippingInformation}`;
};
fetchDetails(item_category, item_id);

// Suggestion Section:
function createCard(imageSrc, title, price, id) {
  const swiperSlide = document.createElement('div');
  swiperSlide.className = 'swiper-slide';

  const cardContainer = document.createElement('div');
  cardContainer.className = 'newDrops_Card1 flex flex-col gap-[16px] min-h-[500px] justify-between';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'p-[8px] bg-white rounded-[24px] min-h-[340px] min-w-[280px]';

  const img = document.createElement('img');
  img.className = 'newDropsCard_img object-contain w-full';
  img.src = imageSrc;
  img.alt = '';

  imageContainer.appendChild(img);

  // Create the title element
  const titleElement = document.createElement('div');
  titleElement.className = 'newDropsTitle font-semibold text-[24px] flex-grow';
  titleElement.textContent = title;

  // Create the button container
  const buttonContainer = document.createElement('div');

  const button = document.createElement('button');
  button.className = 'bg-[#232321] px-[24px] justify-center w-full py-[15.5px] flex gap-1 rounded-[8px] cursor-pointer';

  // Event listener to change the item id to show the details:
  button.addEventListener('click', (e) => {
    item_id = id;
    const newURL = new URL(window.location);
    newURL.searchParams.set('id',id);
    window.location.href = newURL.toString();
    console.log(item_id);
    fetchDetails(item_category, id);
  });

  // Create the button text elements
  const buttonText = document.createElement('div');
  buttonText.className = 'text-[#FFFFFF]';
  buttonText.textContent = 'View Product';

  const buttonSeparator = document.createElement('div');
  buttonSeparator.className = 'text-[#FFFFFF]';
  buttonSeparator.textContent = '-';

  const buttonPrice = document.createElement('div');
  buttonPrice.className = 'newDropsPrice text-[#FFA52F]';
  buttonPrice.textContent = price;

  button.appendChild(buttonText);
  button.appendChild(buttonSeparator);
  button.appendChild(buttonPrice);

  buttonContainer.appendChild(button);

  cardContainer.appendChild(imageContainer);
  cardContainer.appendChild(titleElement);
  cardContainer.appendChild(buttonContainer);

  swiperSlide.appendChild(cardContainer);

  return swiperSlide;
}
const swiperWrapper = document.querySelector('.swiper-wrapper');

const fetchSuggestedProducts = async (category) => {
  let response = await fetch(`https://dummyjson.com/products/category/${category}`);
  let data = await response.json();

  data.products.forEach((e, index) => {
    console.log(data.products[index].id);
    let card = createCard(data.products[index].thumbnail, data.products[index].title, data.products[index].price, data.products[index].id);
    swiperWrapper.appendChild(card);
  });
}
fetchSuggestedProducts(item_category);