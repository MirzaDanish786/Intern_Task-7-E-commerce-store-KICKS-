document.addEventListener('DOMContentLoaded',async()=>{

    // // Code for the hamburger:
    // let hamburgerBtn = document.querySelector('.hamburgerBtn');
    // let cancelBtn = document.querySelector('.cancelBtn');
    // let hamburgerLayout = document.querySelector(".hamburgerLayout");

    
    // hamburgerBtn.addEventListener("click", ()=>{
    //     hamburgerLayout.classList.remove("-left-full")
    //     hamburgerLayout.classList.add("left-0")
    //     hamburgerLayout.classList.add("hamburgerActive");
    // });
    
    // cancelBtn.addEventListener("click", ()=>{
    //     hamburgerLayout.classList.add("-left-full")
    //     hamburgerLayout.classList.remove("left-0")
    //     hamburgerLayout.classList.remove("hamburgerActive");
    // });

      // Show loading
  function showLoading() {
    document.getElementById("loadingOverlay").classList.remove("hidden");
  }

  // Hide loading
  function hideLoading() {
    document.getElementById("loadingOverlay").classList.add("hidden");
  }
    

    const send_Details_Of_Item =(id, category)=>{
        window.location.href = `ProductDetail.html?id=${id}&category=${category}`
    }
    const send_Category_Of_Item = (category)=>{
        window.location.href = `ListingPage.html?category=${category}`;
    }
    
    // Get categories names;
    const getAllCategroies=async()=>{
        showLoading();
        let response = await fetch('https://dummyjson.com/products/category-list');
        let data = await response.json();
        hideLoading()
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


 

    // const closeNavDropDowns = () =>{
    //     document.querySelector(".menDropDownImage").classList.remove("rotate-180");
    //     document.querySelector(".menDropDown").classList.add("hidden");
    //     document.querySelector(".womenDropDownImage").classList.remove("rotate-180");
    //     document.querySelector(".womenDropDown").classList.add("hidden")
    //     isNavDropDownMen = false;
    //     isNavDropDownWomen = false;
    // }

    // let isNavDropDownMen = false;
    // let isNavDropDownWomen = false;
    // //MenNav drop down:
    // document.querySelector(".menNav").addEventListener('click',(e)=>{
    //     if(!isNavDropDownMen){
    //         closeNavDropDowns();
    //         document.querySelector(".menDropDownImage").classList.add("rotate-180");
    //         document.querySelector(".menDropDown").classList.remove("hidden");
    //         isNavDropDownMen = true;
    //     }
    //     else{
    //       closeNavDropDowns();
    //     }
    //     e.stopPropagation();
    // }) 

    // // Women drop down:
    // document.querySelector(".womenNav").addEventListener('click',(e)=>{
    //     if(!isNavDropDownWomen){
    //         closeNavDropDowns();
    //         document.querySelector(".womenDropDownImage").classList.add("rotate-180");
    //         document.querySelector(".womenDropDown").classList.remove("hidden")
    //         isNavDropDownWomen = true;
    //     }
    //     else{
    //        closeNavDropDowns();
    //     }
        
    //     e.stopPropagation();
    // })


    // // Close the dropdown when click outside the dropdown:
    // document.addEventListener('click', (e) => {
    //     if (!e.target.closest('.menNav') && !e.target.closest('.menDropDown')) {
    //         document.querySelector(".menDropDownImage").classList.remove("rotate-180");
    //         document.querySelector(".menDropDown").classList.add("hidden");
    //         isNavDropDownMen = false;
    //     }

    //     if (!e.target.closest('.womenNav') && !e.target.closest('.womenDropDown')) {
    //         document.querySelector(".womenDropDownImage").classList.remove("rotate-180");
    //         document.querySelector(".womenDropDown").classList.add("hidden");
    //         isNavDropDownWomen = false;
    //     }
    // });

    // // Function to send the category to the Listing page to show:
    // const setURL_Category = (category)=>{
    //     window.location.href = `ListingPage.html?category=${category}`
        
    // }

    // // Get the category name when click on the li and modify the string in the format that parameter API accept:
    // let menDropDownList = document.querySelectorAll(".menDropDownList");
    // let womenDropDownList = document.querySelectorAll(".womenDropDownList");
    // menDropDownList.forEach((category)=>{
    //     category.addEventListener("click",()=>{
    //         // console.log(category.textContent );
    //         let product = (category.textContent).toLowerCase().split(" ").join("-");
    //         setURL_Category(product);
    //         // console.log(product );
    //     })
    // });
    // womenDropDownList.forEach((category)=>{
    //     category.addEventListener("click",()=>{
    //         // console.log(category.textContent );
    //         let product = (category.textContent).toLowerCase().split(" ").join("-");
    //         setURL_Category(product);
    //         // console.log(product );
    //     })
    // });



    // HeroSection images selection Code:
    const fetchHeroSectionData = async()=>{
        let response = await fetch('https://dummyjson.com/products?limit=100');
        let data  = await response.json();
        
        // Filter the products that have three images:
        let filterProducts = data.products.filter(product=> product.images.length === 3)

        // Generate the random number to show the random images each time page load:
        let randomNo = Math.floor(Math.random()*filterProducts.length);
        
        // Return the images with random index:
        return {
            images: filterProducts[randomNo].images,
            title: filterProducts[randomNo].title,
            category: filterProducts[randomNo].category,
            id: filterProducts[randomNo].id
        };
        

    }
    let heroSectionData = await fetchHeroSectionData();
    let heroSectionImages = heroSectionData.images;
    let heroSectionTitle = heroSectionData.title;
    let heroSectionCategory = heroSectionData.category;
    let heroSectionId = heroSectionData.id;
    console.log(heroSectionId );
    

    // Assigning title:
    document.querySelector(".heroSectionTitle").innerHTML = heroSectionTitle;

    // Navigate to the details page when click shop now button:
    document.querySelector(".heroShopNowBtn").addEventListener('click',()=>{
        send_Details_Of_Item(heroSectionId, heroSectionCategory);
    })

    let heroMainSection = document.querySelector(".heroMainSection");
    let hero_image_2 = document.querySelector(".hero_image_2");
    let hero_image_3 = document.querySelector(".hero_image_3");
    
    let currentImages = [...heroSectionImages];
    
    heroMainSection.style.backgroundImage = "url('" + currentImages[0] + "')"
    hero_image_2.style.backgroundImage = "url("+currentImages[1]+")";
    hero_image_3.style.backgroundImage = "url("+currentImages[2]+")";

    hero_image_2.addEventListener('click',(e)=>{
    [currentImages[0], currentImages[1]] = [currentImages[1], currentImages[0]];
    heroMainSection.style.backgroundImage = "url('" + currentImages[0] + "')"
    hero_image_2.style.backgroundImage = "url("+currentImages[1]+")";
    hero_image_3.style.backgroundImage = "url("+currentImages[2]+")";;
    })
    hero_image_3.addEventListener('click',(e)=>{
    [currentImages[0], currentImages[2]] = [currentImages[2], currentImages[0]];
    heroMainSection.style.backgroundImage = "url('" + currentImages[0] + "')"
    hero_image_2.style.backgroundImage = "url("+currentImages[1]+")";
    hero_image_3.style.backgroundImage = "url("+currentImages[2]+")";
    })

    
    


   
    // Function to create the cards of categories
    function createCategoryCard(categoryImageSrc, categoryText) {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'swiper-slide  catergory w-[50%] px-[48px] py-[30px] rounded-tl-[64px] max-lg:p-7 max-md:p-5 max-sm:p-4 ]';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'catergory_imageContainer w-[80%] mx-auto';

        const image = document.createElement('img');
        image.className = 'categoryImage w-full object-contain';
        image.src = categoryImageSrc;
        image.alt = '';

        imageContainer.appendChild(image);

        const textButtonContainer = document.createElement('div');
        textButtonContainer.className = 'flex justify-between';

        const textDiv = document.createElement('div');
        textDiv.className = 'catergory_text font-semibold text-[36px] uppercase max-xl:text-[30px] max-lg:text-[24px] max-md:text-[20px]';
        textDiv.innerText = categoryText;

        const buttonContainer = document.createElement('div');

        const button = document.createElement('button');
        button.className = 'bg-[#232321] p-[12px] rounded-[8px] cursor-pointer max-lg:p-2 max-sm:w-6';
        button.addEventListener('click',()=>{
            send_Category_Of_Item(categoryText)
        })

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



    let swiperWrapperCategory = document.querySelector(".swiperWrapperCategory");
    productCategory.forEach(product=>{
        let card = createCategoryCard((product.thumbnail),(product.category));
        swiperWrapperCategory.append(card);
 
        
    })

    const fetchReviews=async()=>{
        let response = await fetch('https://dummyjson.com/products?limit=100');
        let data = await response.json();
    
        let arrayOfReviews = [];
        data.products.forEach(product => arrayOfReviews.push(product.reviews))
     
        let arrayOfThumbnails = [];
        data.products.forEach(product=> arrayOfThumbnails.push(product.thumbnail));
        console.log(arrayOfThumbnails.length );
    
        
        
        
        return [arrayOfReviews.flatMap(reviews => reviews[0]), arrayOfThumbnails ]
        
        
    }
    let arrayOfReviewsData = await fetchReviews()
    let reviews = arrayOfReviewsData[0];
    let thumbnails = arrayOfReviewsData[1];

    

    reviews.forEach((review, index) => createReviewCard(review.reviewerName, review.comment, review.rating, thumbnails[index]));
    


    function createReviewCard(name, review, rating, image) {
        // Create the main card container
        const card = document.createElement('div');
        card.className = 'reviewsSectionCard_1 swiper-slide';
      
        // Create the upper section of the card
        const upperSection = document.createElement('div');
        upperSection.className = 'reviewsSectionCard_1_Upper p-[32px] rounded-tl-[32px] rounded-tr-[32px] bg-white max-xl:p-7 max-lg:p-4 max-xl:rounded-tl-3xl max-xl:rounded-tr-3xl max-lg:rounded-tl-2xl max-lg:rounded-tr-2xl h-[170px]';
      
        // Create the title and user section
        const titleUserSection = document.createElement('div');
        titleUserSection.className = 'flex gap-3 justify-between';
      
        // Create the title div
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
      
        // Create the title text
        const titleText = document.createElement('div');
        titleText.className = 'font-semibold text-[24px] max-xl:text-xl max-lg:text-lg';
        titleText.innerText = name;
      
        // Create the subtitle text
        const subtitleText = document.createElement('div');
        subtitleText.className = 'text-[16px] font-normal text-[#232321] max-lg:text-sm';
        subtitleText.innerText = review;
      
        // Append title and subtitle to title div
        titleDiv.appendChild(titleText);
        titleDiv.appendChild(subtitleText);
      
        // Create the user display picture container
        const userDpDiv = document.createElement('div');
        userDpDiv.className = 'userDp w-[50px] rounded-full';
      
        // Create the user display picture
        const userDpImg = document.createElement('img');
        userDpImg.className = 'w-full object-contain';
        userDpImg.src = 'icons/userIcon.svg';
        userDpImg.alt = '';
      
        // Append user display picture to its container
        userDpDiv.appendChild(userDpImg);
      
        // Append title div and user display picture container to title and user section
        titleUserSection.appendChild(titleDiv);
        titleUserSection.appendChild(userDpDiv);
      
        // Create the stars section
        const starsSection = document.createElement('div');
        starsSection.className = 'stars flex gap-1 items-center';
      
        // Create the star icons
        for (let i = 0; i < rating; i++) {
          const starDiv = document.createElement('div');
          const starImg = document.createElement('img');
          starImg.src = 'icons/star.svg';
          starImg.alt = '';
          starDiv.appendChild(starImg);
          starsSection.appendChild(starDiv);
        }
      
        // Create the rating text
        const ratingText = document.createElement('div');
        ratingText.innerText = `${rating}.0`;
      
        // Append rating text to stars section
        starsSection.appendChild(ratingText);
      
        // Append title and user section, and stars section to upper section
        upperSection.appendChild(titleUserSection);
        upperSection.appendChild(starsSection);
      
        // Create the lower section of the card
        const lowerSection = document.createElement('div');
        lowerSection.className = 'reviewSectionCard_1_Lower rounded-br-[32px] rounded-bl-[32px] bg-[#ebeef0] h-[325px]';
      
        // Create the review image
        const reviewImg = document.createElement('img');
        reviewImg.className = 'rounded-br-[32px] rounded-bl-[32px] w-full max-xl:rounded-bl-3xl max-xl:rounded-br-3xl max-lg:rounded-bl-2xl max-lg:rounded-br-2xl h-full object-contain';
        reviewImg.src = image;
        reviewImg.alt = '';
      
        // Append review image to lower section
        lowerSection.appendChild(reviewImg);
      
        // Append upper and lower sections to main card container
        card.appendChild(upperSection);
        card.appendChild(lowerSection);
      
        // Optionally, append the card to a specific section in your HTML
        let swiperWrapperReviews = document.querySelector('.swiperWrapperReviews');
        swiperWrapperReviews.append(card)
      }
      
      // Call the function to create and append the review card


    
    













})
