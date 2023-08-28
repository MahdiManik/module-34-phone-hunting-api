const loadPhone = async (searchText = 'a', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll)
  // console.log(phones)
}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  }
  else {
    showAllContainer.classList.add('hidden')
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12)
  }
  else {
    handleShowAll(true)
  }
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-300 shadow-xl p-4 rounded-lg`;
    phoneCard.innerHTML = `
        <figure class="bg-zinc-200"><img class="w-50 h-36 p-4" src="${phone.image}" alt="" /></figure>
        <div class="card-body  text-center">
          <h2 class="text-lg font-semibold">${phone.phone_name}</h2>
          <p></p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary rounded-lg px-7">Show Details</button>
          </div>
        </div>
        `
    phonesContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('Search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll)
  // console.log(searchText)
  searchField.innerText = " ";

}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden')
  }
}
const handleShowAll = () => {
  handleSearch(true)
}

const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  showPhoneDetail(phone)  
}
// handleShowDetails()

const showPhoneDetail = (phone) => {
  console.log(phone);

  const showDetailContainer = document.getElementById('phone-details');
  showDetailContainer.innerHTML = `
  <h3>${phone.name}</h3>
  <img src="${phone?.image}" alt="">
  <p class="text-lg"><span class="text-lg font-semibold">storage:</span> ${phone?.mainFeatures?.storage}</p>
  <p class="text-lg"><span class="text-lg font-semibold">displaySize:</span> ${phone?.mainFeatures?.displaySize}</p>
  <p class="text-lg"><span class="text-lg font-semibold">slug:</span> ${phone.slug}</p>
  <p class="text-lg"><span class="text-lg font-semibold">chipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
  
  `
  show_detail_modal.showModal()

}

loadPhone()
