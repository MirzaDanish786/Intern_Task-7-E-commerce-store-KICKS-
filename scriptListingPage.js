async function filterCategoryData(categories, rating = 0) {
  let categoryListGrid = document.querySelector(".categoryListGrid");
  categoryListGrid.innerHTML = '';

  let url;
  let arrayURL= [];
  let arrayPromises = [];

  if(categories.length === 0){
    url = `https://dummyjson.com/products?limit=100`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data.products[0].rating );
    let filteredProducts = data.products.filter(product => product.rating >= rating); 
    filteredProducts.forEach((product, index)=>{
      let card = createProductCard(product, index);
      categoryListGrid.append(card);
    })
  }
  else{
    arrayURL = categories.map(categroy => `https://dummyjson.com/products/category/${categroy}` );
    // console.log("URL Array: "+arrayURL );
    arrayPromises = arrayURL.map(url => fetch(url));
    // console.log(arrayPromises );

    let responses = await Promise.all(arrayPromises);
    let data = await Promise.all(responses.map(response => response.json()));
    // console.log(data );
    
    let products = data.flatMap(d => d.products);
    console.log("Data: ",products );

    // FilteredProducts according to rating:
    let filteredProducts = products.filter(product => product.rating>=rating);
    console.log(filteredProducts );
    filteredProducts.forEach((product, index)=>{
      let card = createProductCard(product, index);
      categoryListGrid.append(card);
    })
    
    
    
        
    

  }

  // url = categories ? `https://dummyjson.com/products/category/${categories}` : `https://dummyjson.com/products?limit=100`;
  // let response = await fetch(url);
  
  // let data = await response.json();

  // let filteredProducts = data.products.filter(product => product.rating >= rating);
  // // console.log("Filter cards: ",filteredProducts );
  
  // filteredProducts.forEach((item, index) => {
  //   let card = createProductCard(item, index);
  //   categoryListGrid.appendChild(card);
  // });
}

function send_Details_Of_Item(id, category){
  window.location.href = `ProductDetail.html?id=${id}&category=${category}`
}

function createProductCard(data, index) {
  let card = document.createElement("div");
  card.className = "categoryListGrid_Cards flex flex-col gap-[16px] min-h-[500px] justify-between";
    

  let imgContainer = document.createElement("div");
  imgContainer.className = "p-[8px] bg-white rounded-[24px] min-h-[340px] flex item-center justify-center";

  let img = document.createElement("img");
  img.className = "categoryListGrid_Cards_img object-contain";
  img.src = data.thumbnail;

  imgContainer.appendChild(img);

  // Title
  let title = document.createElement("div");
  title.className = "categoryListGrid_Cards_Title font-semibold text-[24px] flex-grow";
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

  button.className = "bg-[#232321] px-[24px] justify-center w-full py-[15.5px] flex gap-1 rounded-[8px] cursor-pointer";

  let buttonText = document.createElement("div");
  buttonText.className = "text-[#FFFFFF]";
  buttonText.textContent = "View Product";

  let separator = document.createElement("div");
  separator.className = "text-[#FFFFFF]";
  separator.textContent = "-";

  let price = document.createElement("div");
  price.className = "categoryListGrid_Cards_Price text-[#FFA52F]";
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
  let response = await fetch("https://dummyjson.com/products/categories");
  let data = await response.json();
  let selectedCategoriesSet = new Set();
  console.log(typeof selectedCategoriesSet );
  
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

  const seeAllInput = document.createElement("input");
  seeAllInput.type = "checkbox";
  seeAllInput.id = "see-all";
  seeAllInput.name = "category";
  seeAllInput.style.width = "20px";
  seeAllInput.style.cursor = "pointer";
  seeAllInput.checked = true;
  filterCategoryData([], filterRating);

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
          // For debuing
           console.log(typeof selectedCategoriesSet );

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

      const label = document.createElement("label");
      label.setAttribute("for", category.slug);
      
      label.textContent = category.name;
      label.classList.add("w-full");
      
      label.style.fontSize = "20px";
      label.style.cursor = "pointer";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = category.slug;
      input.name = "category";
      input.style.width = "20px";
      input.style.cursor = "pointer";

      
     

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
              // console.log(input.id );
              console.log(selectedCategoriesSet );

              // For debuging
              console.log(typeof selectedCategoriesSet );

              
              filterCategoryData([...selectedCategoriesSet], filterRating);
          }
          else if(input.checked == false){
            selectedCategoriesSet.delete(input.id);
              console.log(selectedCategoriesSet );
              filterCategoryData([...selectedCategoriesSet], filterRating)
              
              
          }
      });

      div.appendChild(input);
      div.appendChild(label);
      categoryListContainer.appendChild(div);
  });

  let productsCount = document.querySelector(".productsCount");
  productsCount.innerHTML = `${categories.length} items`;

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
  filterCategoryData([...selectedCategoriesSet], filterRating);

  // Code of the trending button drop down:
  let trendingBtn = document.querySelector(".trendingBtn");
  trendingBtn.addEventListener('click',()=>{
    let trendingDropDown = document.querySelector(".trendingDropDown");
    trendingDropDown.classList.toggle("hidden");
    document.querySelector(".trendingDropDownImage").classList.toggle("rotate-180")
  })

  let mostTrending = document.querySelector(".mostTrending");
  let hotProducts = document.querySelector(".hotProducts");

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

  })
  hotProducts.addEventListener('click',()=>{
    filterCategoryData([...selectedCategoriesSet], 3);
    document.querySelector(".trendingDropDown").classList.add("hidden")
    document.querySelector(".trendingDropDownImage").classList.toggle("rotate-180")

  })
});