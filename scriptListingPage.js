let paginationArray = [];
const productsPerPage = 9;
let currentPage = 0; 

const paginateProducts = (products) => {
  paginationArray = [];
  for (let i = 0; i < products.length; i += productsPerPage) {
    paginationArray.push(products.slice(i, i + productsPerPage));
  }
  document.querySelector(".totalPages").innerHTML = paginationArray.length;
  let arrayOfProducts = paginationArray.flatMap(item=> item);
  document.querySelector(".totalProducts").innerHTML = arrayOfProducts.length;
  // console.log("My",arrayOfProducts.length );
  
}

const displayPage = (pageIndex) => {
  let categoryListGrid = document.querySelector(".categoryListGrid");
  document.querySelector(".currentPage").innerHTML = pageIndex+1;
  categoryListGrid.innerHTML = '';
  paginationArray[pageIndex].forEach((product, index) => {
    let card = createProductCard(product, index);
    categoryListGrid.append(card);
  });
}


const handlePaginationButtons = () => {
  let previousBtn = document.querySelector(".previousBtn");
  let nextBtn = document.querySelector(".nextBtn");

  previousBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage -=1;
      displayPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < paginationArray.length - 1) {
      currentPage +=1;
      displayPage(currentPage);

    }
  });
}


// Functions for handle loading animation:
      // Show loading
      function showLoading() {
        document.getElementById("loadingOverlay").classList.remove("hidden");
      }
    
      // Hide loading
      function hideLoading() {
        document.getElementById("loadingOverlay").classList.add("hidden");
      }

async function filterCategoryData(categories, rating = 0) {
  let categoryListGrid = document.querySelector(".categoryListGrid");
  categoryListGrid.innerHTML = '';

  let url;
  let arrayURL = [];
  let arrayPromises = [];

  if (categories.length === 0) {
    showLoading();
    url = `https://dummyjson.com/products?limit=100`;
    let response = await fetch(url);
    let data = await response.json();
    let filteredProducts = data.products.filter(product => product.rating >= rating);
    console.log("Length",filteredProducts.length );
    hideLoading();
    
    paginateProducts(filteredProducts);
    // console.log(paginationArray.length );
    
    displayPage(currentPage);
  } else {
    // Loading Animation:
    showLoading()
    arrayURL = categories.map(category => `https://dummyjson.com/products/category/${category}`);
    arrayPromises = arrayURL.map(url => fetch(url));
    let responses = await Promise.all(arrayPromises);
    let data = await Promise.all(responses.map(response => response.json()));
    let products = data.flatMap(d => d.products);
    let filteredProducts = products.filter(product => product.rating >= rating);

    hideLoading()

    paginateProducts(filteredProducts);
    console.log(paginationArray.length );

    currentPage = 0;
    displayPage(currentPage);
  }
}

function send_Details_Of_Item(id, category){
  window.location.href = `ProductDetail.html?id=${id}&category=${category}`
}

function createProductCard(data, index) {
  let card = document.createElement("div");
  card.className = "categoryListGrid_Cards flex flex-col gap-[16px] justify-between";
    

  let imgContainer = document.createElement("div");
  imgContainer.className = "p-[8px] bg-white rounded-[24px] flex item-center justify-center max-lg:rounded-[18px]";

  let img = document.createElement("img");
  img.className = "categoryListGrid_Cards_img object-contain";
  img.src = data.thumbnail;

  imgContainer.appendChild(img);

  // Title
  let title = document.createElement("div");
  title.className = "categoryListGrid_Cards_Title font-semibold text-[24px] flex-grow max-lg:text-[18px]" ;
  // To make sure the title is display only two lines:
  title.style.display = "-webkit-box";
  title.style.webkitLineClamp = "2";  // Limit to 2 lines
  title.style.webkitBoxOrient = "vertical";
  title.style.overflow = "hidden";
  title.style.textOverflow = "ellipsis";
  
  title.textContent = data.title;

  // Button container
  let buttonContainer = document.createElement("div");
  let anchorTag = document.createElement("a");
  anchorTag.href = `ProductDetail.html?id=${index + 1}&categroy=${data.category}`;

  let button = document.createElement("button");

  button.addEventListener("click",(e)=>{
    e.preventDefault();

    send_Details_Of_Item(data.id, data.category);      

  })

  button.className = "bg-[#232321] px-[24px] justify-center w-full py-[15.5px] flex gap-1 rounded-[8px] cursor-pointer max-xl:p-[14px]  max-lg:p-[10px] max-lg:gap-0";

  let buttonText = document.createElement("div");
  buttonText.className = "text-[#FFFFFF] max-lg:text-[12px]";
  buttonText.textContent = "View Product";

  let separator = document.createElement("div");
  separator.className = "text-[#FFFFFF] max-lg:text-[12px]";
  separator.textContent = "-";

  let price = document.createElement("div");
  price.className = "categoryListGrid_Cards_Price text-[#FFA52F] max-lg:text-[12px]";
  price.textContent = `$${data.price}`; 

  // Append elements
  button.appendChild(buttonText);
  button.appendChild(separator);
  button.appendChild(price);
  anchorTag.appendChild(button);
  buttonContainer.appendChild(anchorTag);

  card.appendChild(imgContainer);
  card.appendChild(title);
  card.appendChild(buttonContainer);

  return card;
}

document.addEventListener("DOMContentLoaded", async () => {
  handlePaginationButtons();
  let response = await fetch("https://dummyjson.com/products/categories");
  let data = await response.json();
  let selectedCategoriesSet = new Set();
    // Get the categroy from the URL which was send from the landing page navbar:
    let urlParams = new URLSearchParams(window.location.search);
    let landingPage_category = urlParams.get('category');

    // Get the newDrops and show the rating 4 or greater products
    let newDrops = urlParams.get('newDrops');
    if(newDrops !== null){
      filterCategoryData([],4);
    } 
  const categories = data;

  // Some declarations:
  let categoryListContainer = document.querySelector(".categoryListContainer");
  // let filterCategory = '';
  let filterRating = 0; // Default rating filter

  // Create See All checkbox
  const seeAllDiv = document.createElement("div");
  seeAllDiv.style.display = "flex";
  seeAllDiv.style.gap = "20px";
  seeAllDiv.style.cursor = "pointer";
  seeAllDiv.className = "max-xl:!gap-[10px] max-lg:!line-clamp-1";
  
  seeAllDiv.addEventListener('mouseenter',(e)=>{
    seeAllDiv.classList.add("bg-gray-300");
    seeAllDiv.classList.add("px-[8px]");
    
  })
  seeAllDiv.addEventListener('mouseleave',(e)=>{
    seeAllDiv.classList.remove("bg-gray-300")
    seeAllDiv.classList.remove("px-[8px]");
    
  })
  
  const seeAllLabel = document.createElement("label");
  seeAllLabel.setAttribute("for", "see-all");
  seeAllLabel.textContent = "See All";
  seeAllLabel.style.fontSize = "20px";
  seeAllLabel.style.cursor = "pointer";
  seeAllLabel.classList.add("w-full");
  // For responsiveness:
  seeAllLabel.className = "max-lg:!text-[16px] max-lg:!font-semibold"

  const seeAllInput = document.createElement("input");
  seeAllInput.type = "checkbox";
  seeAllInput.id = "see-all";
  seeAllInput.name = "category";
  seeAllInput.style.width = "20px";
  seeAllInput.style.cursor = "pointer";
  // Check if the landingPage_category is null then checked the seeAll otherwise false
  seeAllInput.checked = landingPage_category === null;

  // Check if the landing page category is available then fetch it, otherwise fetch the all categories.
  if(landingPage_category === null){
    filterCategoryData([], filterRating);
  }
  else{
    selectedCategoriesSet.add(landingPage_category);
    filterCategoryData([...selectedCategoriesSet], filterRating)

  }

  // Add event listener to seeAll:
  seeAllInput.addEventListener("change", function () {
      document
          .querySelectorAll(".categoryListContainer input[type='checkbox']")
          .forEach((checkbox) => {
              if (checkbox !== seeAllInput) {
                  checkbox.checked = false;
              }
          });

      if (seeAllInput.checked) {
          // filterCategory = "";
          selectedCategoriesSet.clear();

          filterCategoryData([...selectedCategoriesSet], filterRating);
      }
  });

  seeAllDiv.appendChild(seeAllInput);
  seeAllDiv.appendChild(seeAllLabel);
  categoryListContainer.appendChild(seeAllDiv);

  categories.forEach((category, index) => {
      const div = document.createElement("div");

      div.addEventListener('mouseenter',(e)=>{
        div.classList.add("bg-gray-300");
        div.classList.add("px-[8px]");
      })
      div.addEventListener('mouseleave',(e)=>{
        div.classList.remove("bg-gray-300")
        div.classList.remove("px-[8px]");

      })


      div.style.display = "flex";
      div.style.gap = "20px";
      div.style.cursor = "pointer";
      div.className = "max-xl:!gap-[10px] max-lg:!line-clamp-1";

      const label = document.createElement("label");
      label.setAttribute("for", category.slug);
      
      label.textContent = category.name;
      label.classList.add("w-full");
      
      label.style.fontSize = "20px";
      label.style.cursor = "pointer";
      label.className = "max-lg:!text-[16px] max-lg:!font-semibold ";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = category.slug;
      input.name = "category";
      input.style.width = "20px";
      input.style.cursor = "pointer";
      // Checked the checkbox according to the landingPage_category.
      input.checked = landingPage_category === category.slug;

      
     

      input.addEventListener("change", function () {
          seeAllInput.checked = false;
          // document
          //     .querySelectorAll(".categoryListContainer input[type='checkbox']")
          //     .forEach((checkbox) => {
          //         if (checkbox !== input) {
          //             checkbox.checked = false;
          //         }
          //     });

          if(!input.checked && selectedCategoriesSet.size === 1){
            input.checked = true;
          }
          if (input.checked) {
              // filterCategory = `${input.id}`;
              selectedCategoriesSet.add(input.id);
              setTimeout(() => {
                input.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }, 1000);
              
              // console.log(input.id );
              // console.log(selectedCategoriesSet );


              
              filterCategoryData([...selectedCategoriesSet], filterRating);
          }
          else if(input.checked == false){
            selectedCategoriesSet.delete(input.id);
              // console.log(selectedCategoriesSet );
              filterCategoryData([...selectedCategoriesSet], filterRating)
              
              
          }
      });

      div.appendChild(input);
      div.appendChild(label);
      categoryListContainer.appendChild(div);
  });

  let productsCount = document.querySelector(".productsCount");
  productsCount.innerHTML = `${categories.length} Categories`;

  // add event listener to display the categories dropdown
  document.querySelector(".categoryFilter_Heading").addEventListener('click', (e) => {
      categoryListContainer.classList.toggle("hidden");
      document.querySelector(".categoryFilterDropDownIcon").classList.toggle("rotate-180");
  });

  // Add rating filter section
  document.querySelector(".ratingFilter").addEventListener('click', (e) => {
    document.querySelector(".ratingList").classList.toggle("hidden");
    document.querySelector(".ratingFilterDropDownIcon").classList.toggle("rotate-180");
  });

  // Create rating filter radio buttons
  const ratingInputs = document.querySelectorAll(".ratingList input[type='radio']");

  ratingInputs.forEach(input => {
    input.addEventListener("change", function () {
      filterRating = parseInt(input.value);
      filterCategoryData([...selectedCategoriesSet], filterRating);
    });
  });

  // Set default rating filter to 1 star and above
  document.querySelector(".ratingList input[value='0']").checked = true;

  // Initial load
  // filterCategoryData([...selectedCategoriesSet], filterRating);

  // Code of the trending button drop down:
  let trendingBtn = document.querySelector(".trendingBtn");
  let trendingBtnText = document.querySelector('.trendingBtnText');
  trendingBtn.addEventListener('click',()=>{
    let trendingDropDown = document.querySelector(".trendingDropDown");
    trendingDropDown.classList.toggle("hidden");
    document.querySelector(".trendingDropDownImage").classList.toggle("rotate-180")
  })

  // Declaeratoin of options:
  let mostTrending = document.querySelector(".mostTrending");
  let hotProducts = document.querySelector(".hotProducts");
  let noneOfAbove = document.querySelector('.noneOfAbove');

  mostTrending.addEventListener('mouseenter',(e)=>{
    mostTrending.classList.add("bg-gray-300");
  })
  mostTrending.addEventListener('mouseleave',(e)=>{
    mostTrending.classList.remove("bg-gray-300")
    
  })
  hotProducts.addEventListener('mouseenter',(e)=>{
    hotProducts.classList.add("bg-gray-300");
    
  })
  hotProducts.addEventListener('mouseleave',(e)=>{
    hotProducts.classList.remove("bg-gray-300")
    
  })
  
  
  mostTrending.addEventListener("click",()=>{
    filterCategoryData([...selectedCategoriesSet], 4);
    document.querySelector(".trendingDropDown").classList.add("hidden")
    document.querySelector(".trendingDropDownImage").classList.toggle("rotate-180")
    trendingBtnText.textContent = "Most Trending";

  })
  hotProducts.addEventListener('click',()=>{
    filterCategoryData([...selectedCategoriesSet], 3);
    document.querySelector(".trendingDropDown").classList.add("hidden")
    document.querySelector(".trendingDropDownImage").classList.toggle("rotate-180")
    trendingBtnText.textContent = "Hot Products"

  })
  noneOfAbove.addEventListener('click',()=>{
    filterCategoryData([...selectedCategoriesSet], 0);
    document.querySelector(".trendingDropDown").classList.add("hidden")
    document.querySelector(".trendingDropDownImage").classList.toggle("rotate-180");
    trendingBtnText.textContent = "Trending Options"
  })

  noneOfAbove.addEventListener('mouseenter',(e)=>{
    noneOfAbove.classList.add("bg-gray-300");
    
  })
  noneOfAbove.addEventListener('mouseleave',(e)=>{
    noneOfAbove.classList.remove("bg-gray-300")
    
  })




});