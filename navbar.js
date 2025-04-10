 // Code for the hamburger:
 
 let hamburgerBtn = document.querySelector('.hamburgerBtn');
 let cancelBtn = document.querySelector('.cancelBtn');
 let hamburgerLayout = document.querySelector(".hamburgerLayout");
 let body = document.querySelector('body');
 
 hamburgerBtn.addEventListener("click", ()=>{
     hamburgerLayout.classList.remove("-left-full")
     hamburgerLayout.classList.add("left-0")
     hamburgerLayout.classList.add("hamburgerActive");
     body.classList.add("overflow-hidden")
 });
 
 cancelBtn.addEventListener("click", ()=>{
     hamburgerLayout.classList.add("-left-full")
     hamburgerLayout.classList.remove("left-0")
     hamburgerLayout.classList.remove("hamburgerActive");
     body.classList.remove("overflow-hidden")

 });

 // Code for the navbar:
const closeNavDropDowns = () =>{
    document.querySelector(".menDropDownImage")?.classList.remove("rotate-180");
    document.querySelector(".menDropDown")?.classList.add("hidden");
    document.querySelector(".womenDropDownImage")?.classList.remove("rotate-180");
    document.querySelector(".womenDropDown")?.classList.add("hidden")


    document.querySelector(".hamburgerMenDropDownImage")?.classList.remove("rotate-180");
    document.querySelector(".hamburgerMenDropDown")?.classList.add("hidden");
    document.querySelector(".hamburgerWomenDropDownImage")?.classList.remove("rotate-180");
    document.querySelector(".hamburgerWomenDropDown")?.classList.add("hidden")
    isNavDropDownMen = false;
    isNavDropDownWomen = false;
    isHamburgerNavDropDownMen = false;
    isHamburgerNavDropDownWomen = false;
  }
  
  let isNavDropDownMen = false;
  let isNavDropDownWomen = false;
  //MenNav drop down:
  document.querySelector(".menNav").addEventListener('click',(e)=>{
      if(!isNavDropDownMen){
          closeNavDropDowns();
          document.querySelector(".menDropDownImage").classList.add("rotate-180");
          document.querySelector(".menDropDown").classList.remove("hidden");
          console.log("Clicked" );
          
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








let isHamburgerNavDropDownMen = false;
let isHamburgerNavDropDownWomen = false;
//   Hamburger
  //MenNav drop down:
  document.querySelector(".hamburgerMenNav").addEventListener('click',(e)=>{
    if(!isHamburgerNavDropDownMen){
        closeNavDropDowns();
        document.querySelector(".hamburgerMenDropDownImage")?.classList.add("rotate-180");
        document.querySelector(".hamburgerMenDropDown")?.classList.remove("hidden");
        console.log("Clicked" );
        
        isHamburgerNavDropDownMen = true;
    }
    else{
      closeNavDropDowns();
    }
    e.stopPropagation();
  }) 
  
  // Women drop down:
  document.querySelector(".hamburgerWomenNav").addEventListener('click',(e)=>{
    if(!isHamburgerNavDropDownWomen){
        closeNavDropDowns();
        document.querySelector(".hamburgerWomenDropDownImage").classList.add("rotate-180");
        document.querySelector(".hamburgerWomenDropDown")?.classList.remove("hidden")
        isHamburgerNavDropDownWomen = true;
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