document.addEventListener('DOMContentLoaded',async()=>{

    const send_Details_Of_Item =(id, category)=>{
        window.location.href = `ProductDetail.html?id=${id}&category=${category}`
    }
    
    // Get categories names;
    const getAllCategroies=async()=>{
        let response = await fetch('https://dummyjson.com/products/category-list');
        let data = await response.json();
        return data
    }

    // Get first product of each category:
    const getFirstProductOfCategories = async([categories])=>{
        let arrayOfCategories = categories.map(category => fetch(`https://dummyjson.com/products/category/${category}`));
        let responses = await Promise.all(arrayOfCategories);
        let data = await Promise.all(responses.map(response => response.json()))

        // Filter the first product of each category;
        let firstProductOfCategory = data.map((e, index)=> data[index].products[0]);
        return firstProductOfCategory;
    }
   

    let newDropsCard_img = document.querySelectorAll(".newDropsCard_img");
    let newDropsTitle = document.querySelectorAll(".newDropsTitle");
    let newDropsPrice = document.querySelectorAll(".newDropsPrice");
    let categoryImage = document.querySelectorAll(".categoryImage");
    
    // Fetching API:
    let response =await fetch("https://dummyjson.com/products")
    let data = await response.json();
    // console.log(data.products[5].thumbnail );
    // newDropsCard_img.src = data.products[9].thumbnail;
    
    // Set the images on the newDropSection:
    newDropsCard_img.forEach((e,index)=>{
        newDropsCard_img[index].src = data.products[index].thumbnail
        // console.log( data.products[index].thumbnail);
    })
    // Set the title on the newDropdownSection:
    newDropsTitle.forEach((e, index)=>{
        e.innerHTML = data.products[index].title;
        // console.log(data.products[index].title );
    })
    newDropsPrice.forEach((e, index)=>{
        e.innerHTML = `$${data.products[index].price}`
    })

    // Set the images on the categoryImage:
    categoryImage.forEach((e, index)=>{
        categoryImage[index].src = data.products[index].thumbnail;
    })

    // Navigate to the details page:
    let productDetailBtn = document.querySelectorAll(".productDetailBtn");
    // console.log(productDetailBtn );
    
    productDetailBtn.forEach((btn, index)=>{
        btn.addEventListener('click',(e)=>{
            send_Details_Of_Item(data.products[index].id, data.products[index].category);
        })
    })


 

    const closeNavDropDowns = () =>{
        document.querySelector(".menDropDownImage").classList.remove("rotate-180");
        document.querySelector(".menDropDown").classList.add("hidden");
        document.querySelector(".womenDropDownImage").classList.remove("rotate-180");
        document.querySelector(".womenDropDown").classList.add("hidden")
        isNavDropDownMen = false;
        isNavDropDownWomen = false;
    }

    let isNavDropDownMen = false;
    let isNavDropDownWomen = false;
    //MenNav drop down:
    document.querySelector(".menNav").addEventListener('click',(e)=>{
        if(!isNavDropDownMen){
            closeNavDropDowns();
            document.querySelector(".menDropDownImage").classList.add("rotate-180");
            document.querySelector(".menDropDown").classList.remove("hidden");
            isNavDropDownMen = true;
        }
        else{
          closeNavDropDowns();
        }
        e.stopPropagation();
    }) 

    // Women drop down:
    document.querySelector(".womenNav").addEventListener('click',(e)=>{
        if(!isNavDropDownWomen){
            closeNavDropDowns();
            document.querySelector(".womenDropDownImage").classList.add("rotate-180");
            document.querySelector(".womenDropDown").classList.remove("hidden")
            isNavDropDownWomen = true;
        }
        else{
           closeNavDropDowns();
        }
        
        e.stopPropagation();
    })


    // Close the dropdown when click outside the dropdown:
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menNav') && !e.target.closest('.menDropDown')) {
            document.querySelector(".menDropDownImage").classList.remove("rotate-180");
            document.querySelector(".menDropDown").classList.add("hidden");
            isNavDropDownMen = false;
        }

        if (!e.target.closest('.womenNav') && !e.target.closest('.womenDropDown')) {
            document.querySelector(".womenDropDownImage").classList.remove("rotate-180");
            document.querySelector(".womenDropDown").classList.add("hidden");
            isNavDropDownWomen = false;
        }
    });

    // Function to send the category to the Listing page to show:
    const setURL_Category = (category)=>{
        window.location.href = `ListingPage.html?category=${category}`
        
    }

    // Get the category name when click on the li and modify the string in the format that parameter API accept:
    let menDropDownList = document.querySelectorAll(".menDropDownList");
    let womenDropDownList = document.querySelectorAll(".womenDropDownList");
    menDropDownList.forEach((category)=>{
        category.addEventListener("click",()=>{
            // console.log(category.textContent );
            let product = (category.textContent).toLowerCase().split(" ").join("-");
            setURL_Category(product);
            // console.log(product );
        })
    });
    womenDropDownList.forEach((category)=>{
        category.addEventListener("click",()=>{
            // console.log(category.textContent );
            let product = (category.textContent).toLowerCase().split(" ").join("-");
            setURL_Category(product);
            // console.log(product );
        })
    });



    // HeroSection images selection Code:
    const productsWithThreeImages = async()=>{
        let response = await fetch('https://dummyjson.com/products?limit=100');
        let data  = await response.json();
        
        // Filter the products that have three images:
        let filterProducts = data.products.filter(product=> product.images.length === 3)
        console.log(filterProducts );

        // Generate the random number to show the random images each time page load:
        let randomNo = Math.floor(Math.random()*filterProducts.length)
        
        // Return the images with random index:
        return filterProducts[randomNo].images
        

    }
    let heroSectionImages = await productsWithThreeImages()
    console.log(heroSectionImages );
    let heroMainSection = document.querySelector(".heroMainSection");
    heroMainSection.style.backgroundImage = "url('" + heroSectionImages[0] + "')"
    


   
    // Function to create the cards of categories
    function createCategoryCard(categoryImageSrc, categoryText) {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'swiper-slide catergory w-[50%] px-[48px] py-[30px] rounded-tl-[64px] max-lg:p-7 max-md:p-5 max-sm:p-4';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'catergory_imageContainer w-[80%] mx-auto';

        const image = document.createElement('img');
        image.className = 'categoryImage w-full object-contain';
        image.src = categoryImageSrc;
        image.alt = '';

        imageContainer.appendChild(image);

        const textButtonContainer = document.createElement('div');
        textButtonContainer.className = 'flex justify-between items-center';

        const textDiv = document.createElement('div');
        textDiv.className = 'catergory_text font-semibold text-[36px] w-[40%] uppercase max-xl:text-[30px] max-lg:text-[24px] max-sm:text-[18px]';
        textDiv.innerText = categoryText;

        const buttonContainer = document.createElement('div');

        const button = document.createElement('button');
        button.className = 'bg-[#232321] p-[12px] rounded-[8px] cursor-pointer max-lg:p-2 max-sm:w-6';

        const buttonImage = document.createElement('img');
        buttonImage.className = 'w-full object-contain';
        buttonImage.src = 'icons/gotoIcon.svg';
        buttonImage.alt = '';

        button.appendChild(buttonImage);
        buttonContainer.appendChild(button);

        textButtonContainer.appendChild(textDiv);
        textButtonContainer.appendChild(buttonContainer);

        cardContainer.appendChild(imageContainer);
        cardContainer.appendChild(textButtonContainer);

        return cardContainer;
    }

    let categoriesArray = await getAllCategroies()


    // Filter Categories:
    let productCategory = await getFirstProductOfCategories([categoriesArray])
    // console.log(productCategory );
    
    // console.log(productCategory[0].thumbnail );


    let swiperWrapper = document.querySelector(".swiper-wrapper");
    productCategory.forEach(product=>{
        let card = createCategoryCard((product.thumbnail),(product.category));
        swiperWrapper.append(card);
        // console.log(product.thumbnail );
        
    })
    


    
    













})
