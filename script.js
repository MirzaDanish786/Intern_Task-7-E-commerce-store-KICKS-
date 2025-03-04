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












})
