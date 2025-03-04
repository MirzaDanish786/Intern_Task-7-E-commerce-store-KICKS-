async function filterCategoryData(category) {
  let categoryListGrid = document.querySelector(".categoryListGrid");
  if(category!=""){
    // Clear previous category items
    categoryListGrid.innerHTML = '';
    let response = await fetch(`https://dummyjson.com/products/category/${category}`);
    let data = await response.json();
    data.products.forEach((item, index) => {
      let card = createProductCard(item, index);
      categoryListGrid.appendChild(card);
    });
  }
  else{
    categoryListGrid.innerHTML = '';
    let response = await fetch(`https://dummyjson.com/products?limit=100`);
    let data = await response.json();
    data.products.forEach((item, index) => {
      let card = createProductCard(item, index);
      categoryListGrid.appendChild(card);
    });
  }
}

function createProductCard(data, index) {
  // Create main card container
  let card = document.createElement("div");
  card.className = "categoryListGrid_Cards flex flex-col gap-[16px] min-h-[500px] justify-between";

  // Image container
  let imgContainer = document.createElement("div");
  imgContainer.className = "p-[8px] bg-white rounded-[24px] min-h-[340px]";

  let img = document.createElement("img");
  img.className = "categoryListGrid_Cards_img object-contain";
  // Place the image
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

  let button = document.createElement("button");
  button.className = "bg-[#232321] px-[24px] justify-center w-full py-[15.5px] flex gap-1 rounded-[8px] cursor-pointer";

  let buttonText = document.createElement("div");
  buttonText.className = "text-[#FFFFFF]";
  buttonText.textContent = "View Product";

  let separator = document.createElement("div");
  separator.className = "text-[#FFFFFF]";
  separator.textContent = "-";

  let price = document.createElement("div");
  price.className = "categoryListGrid_Cards_Price text-[#FFA52F]";
  price.textContent = `$${data.price}`; // API price

  // Append elements
  button.appendChild(buttonText);
  button.appendChild(separator);
  button.appendChild(price);
  buttonContainer.appendChild(button);

  card.appendChild(imgContainer);
  card.appendChild(title);
  card.appendChild(buttonContainer);

  return card;
}

document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch("https://dummyjson.com/products/categories");
  let data = await response.json();
  const categories = data;
  console.log(categories);

  // Some declarations:
  let categoryListContainer = document.querySelector(".categoryListContainer");
  let filterCategory = '';

  // Create See All checkbox
  const seeAllDiv = document.createElement("div");
  seeAllDiv.style.display = "flex";
  seeAllDiv.style.gap = "20px";
  seeAllDiv.style.cursor = "pointer";

  const seeAllLabel = document.createElement("label");
  seeAllLabel.setAttribute("for", "see-all");
  seeAllLabel.textContent = "See All";
  seeAllLabel.style.fontSize = "20px";
  seeAllLabel.style.cursor = "pointer";

  const seeAllInput = document.createElement("input");
  seeAllInput.type = "checkbox";
  seeAllInput.id = "see-all";
  seeAllInput.name = "category";
  seeAllInput.style.width = "20px";
  seeAllInput.style.cursor = "pointer";
  seeAllInput.checked = true;
  filterCategoryData("");

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
          console.log("See All Selected");
          filterCategoryData("");
      }
  });

  seeAllDiv.appendChild(seeAllInput);
  seeAllDiv.appendChild(seeAllLabel);
  categoryListContainer.appendChild(seeAllDiv);

  categories.forEach((category, index) => {
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.gap = "20px";
      div.style.cursor = "pointer";

      const label = document.createElement("label");
      label.setAttribute("for", category);
      label.textContent = category.name;
      console.log(category );
      
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
          document
              .querySelectorAll(".categoryListContainer input[type='checkbox']")
              .forEach((checkbox) => {
                  if (checkbox !== input) {
                      checkbox.checked = false;
                  }
              });

          if (input.checked) {
              filterCategory = `${input.id}`;
              console.log(input.id);
              filterCategoryData(filterCategory);
          }
      });

      div.appendChild(input);
      div.appendChild(label);
      categoryListContainer.appendChild(div);
  });

  let productsCount = document.querySelector(".productsCount");
  productsCount.innerHTML = `${categories.length} items`;

  // add event listener to display the categories dropdown
  let categoryFilter_Heading = document.querySelector(".categoryFilter_Heading").addEventListener('click', (e) => {
      categoryListContainer.classList.toggle("hidden");
      document.querySelector(".categoryFilterDropDownIcon").classList.toggle("rotate-180");
  });

  // Initially load smartphones category
  filterCategoryData("beauty");
});