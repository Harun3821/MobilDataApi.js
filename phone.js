
const loadPhone = async (SerchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SerchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll) =>{
 
 const phoneConiter = document.getElementById("phone-continer");
    phoneConiter.textContent = '';

     // বারো টা ফোনোর বেশি হলে শো অল বাটন দেখাবো 

      const ShowAllButon = document.getElementById("Show-all-container");
     if(phones.length > 12 && (!isShowAll)){
       ShowAllButon.classList.remove('hidden');
     }
     else{
        ShowAllButon.classList.add('hidden');
     }

    
    // only fairst 12 display phone
    if(!isShowAll){
      phones = phones.slice(0, 12);
    }

 phones.forEach(phone =>{
    // console.log(phone)
   // create a div
   const phoneCard = document.createElement('div')
   phoneCard.classList = `card p-3 bg-gray-300 shadow-xl`
   // step number -3 set inner html
   phoneCard.innerHTML = `
   <figure><img src="${phone.image}" alt="Shoes" /></figure>
   <div class="card-body">
     <h2 class="card-title">${phone.phone_name}</h2>
     <p>If a dog chews shoes whose shoes does he choose?</p>
     <div class="card-actions justify-center">
       <button  onclick="handelShowDetails('(${phone.slug})')"class="btn btn-primary">Show Details</button>
     </div>
   </div>
 `
 // step number -4 appendChild
 phoneConiter.appendChild(phoneCard);
});

toggelLodingSpiner(false);
}


const handelShowDetails = async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/(${id})`);
  const data = await res.json();
  const phone = data.data
  ShowPhoneDetils(phone);
}


const ShowPhoneDetils = (phone) =>{
  console.log(phone)
   const phoneName = document.getElementById("phone-name");
   phoneName.innerText = phone.name;

   const ShowdelesConiter = document.getElementById("Show-detils-continer");
    ShowdelesConiter.innerHTML = `
    <img src="${phone.image}">

    `



 
  Show-ditles-modal.showModal();
}







// hendel search buttoun

const handleSearch = (isShowAll) =>{
    toggelLodingSpiner(true)
    const inputFild = document.getElementById("search-filed");
    const SerchText = inputFild.value;
    loadPhone(SerchText, isShowAll)
}


const toggelLodingSpiner = (isloding) =>{
  const lodingSpinner = document.getElementById("loading-spinner");
  if(isloding){
    lodingSpinner.classList.remove('hidden');
  }
  else{
    lodingSpinner.classList.add('hidden');
  }
}


const handleShowAll = () =>{
  handleSearch(true)
}








// const handleSearch2 = () =>{
//     const inPut = document.getElementById("search-filed2");
//     const SerchText = inPut.value;
//     loadPhone(SerchText);

// }






