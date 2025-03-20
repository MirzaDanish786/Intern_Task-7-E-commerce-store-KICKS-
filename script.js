const send_Details_Of_Item =(id, category)=>{
     window.location.href = `ProductDetail.html?id=${id}&category=${category}`
}
document.addEventListener('DOMContentLoaded',async()=>{
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
        console.log( data.products[index].thumbnail);
    })
    // Set the title on the newDropdownSection:
    newDropsTitle.forEach((e, index)=>{
        e.innerHTML = data.products[index].title;
        console.log(data.products[index].title );
    })
    newDropsPrice.forEach((e, index)=>{
        e.innerHTML = data.products[index].price
    })

    // Set the images on the categoryImage:
    categoryImage.forEach((e, index)=>{
        categoryImage[index].src = data.products[index].thumbnail;
    })

    // Navigate to the details page:
    let productDetailBtn = document.querySelectorAll(".productDetailBtn");
    console.log(productDetailBtn );
    
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
            console.log(category.textContent );
            let product = (category.textContent).toLowerCase().split(" ").join("-");
            setURL_Category(product);
            console.log(product );
        })
    });
    womenDropDownList.forEach((category)=>{
        category.addEventListener("click",()=>{
            console.log(category.textContent );
            let product = (category.textContent).toLowerCase().split(" ").join("-");
            setURL_Category(product);
            console.log(product );
        })
    });

   













})
