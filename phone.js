
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
       <button  onclick="handelShowDetails('${phone.slug}')"class="btn btn-primary">Show Details</button></div>
   </div>
 `
 // step number -4 appendChild
 phoneConiter.appendChild(phoneCard);
});

toggelLodingSpiner(false); 
}


const handelShowDetails = async (id) =>{

  // console.log('click showdetles', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data
  ShowPhoneDetils(phone);

}


const ShowPhoneDetils = (phone) =>{
  console.log(phone)
   const phoneName = document.getElementById('show-detils-phone-name');
   phoneName.innerText = phone.name;
  
   const ShowDetilesConiter = document.getElementById('show-detils-continer');
   ShowDetilesConiter.innerHTML = `
   <div class="justify-center flex items-center">
   <img src="${phone.image}">
   </div>  
    <p class="text-[22ppx] font-medium"><span class="text-2xl font-semibold">brand: </span>${phone?.brand}</p>
    <p class="text-[18px]"><span class="text-3xl font-semibold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p class="text-[18px]"><span class="text-2xl font-semibold">displaySize: </span>${phone?.mainFeatures?.displaySize}</p>
    <p class="text-[18px]"><span class="text-2xl font-semibold">memory: </span>${phone?.mainFeatures?.memory}</p>
    <p class="text-[18px]"><span class="text-2xl font-semibold">sensors: </span>${phone?.mainFeatures?.sensors}</p>
    <p class="text-[18px]"><span class="text-2xl font-semibold">GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
    <p class="text-[18px]"><span class="text-2xl font-semibold">ReleaseDate: </span>${phone?.releaseDate}</p>
   
    `
    my_modal_5.showModal()


  
    
  
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






