// Global variable
let counter = 0;

// Fetch main four category
const fetchMainCategory = async () => {
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
        const catData = await response.json();
        displayFourBtnCategory(catData.categories);
    }catch(err){
        console.log(`This error occured displayFourBtnCategory function ${err}`)
    }
}

// Display four category with button ui 
function displayFourBtnCategory(getCategories) {
    const catBtn = document.getElementById('cat_container');

    getCategories.forEach((item) => {
        const btnDiv = document.createElement('div');
        
        btnDiv.innerHTML = `
            <button id="${item.category}" onclick="fetchSpecificCatOnBtnClick('${item.category}', this)" class="flex justify-center items-center gap-3 py-3 border rounded-2xl category_btn cat_btn">
                    <img src='${item.category_icon}' />
                    <span class="text-xl font-extrabold">
                    ${item.category}</span>
            </button>
        `;
        catBtn.appendChild(btnDiv)
    });
}

// fetch all pets categories
const fetchAllPetsCategory = async () => {

    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
        const catData = await response.json();
        displayAllCategory(catData.pets);

    }catch(err){
        console.log(`This error occured displayAllCategory function ${err}`)

    }
}

// show specific category with onbtnclick and active that btn
const fetchSpecificCatOnBtnClick = (pet_name, thisBtn) => {
    
    const allCatBtns = document.getElementsByClassName('cat_btn');
    for(let n = 0; n < allCatBtns.length; n++){
        allCatBtns[n].classList.remove('active_btn');
    }
    document.getElementById(`${thisBtn.id}`).classList.add('active_btn');

    let loadingBtn = document.getElementById('loader');
    loadingBtn.classList.remove('hidden');

    try{

        document.getElementById('cards_box').innerHTML = '';

        const xyz = setTimeout( async() => {
            const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${pet_name}`);
            const petCats = await response.json();

            displayAllCategory(petCats.data);

            clearTimeout(xyz)

        }, 2000);

    }catch(err){
        console.log(`This error occured while fetching specific category funciont is:  fetchSpecificCatOnBtnClick`)
    }finally{
        document.getElementById('append_image').classList.add('hidden');
        const clearLoading = setInterval(() => {
            loadingBtn.classList.add('hidden');
            clearInterval(clearLoading);
        }, 2000);
    }
}

// Show all categories with card ui
function displayAllCategory(petCategory){
    const cardDiv = document.getElementById('cards_box');

    cardDiv.innerHTML = '';
    petCategory?.length ? petCategory.forEach((item) => {
// ============= Card ui start here==============
        const card = document.createElement('div');
        card.classList = `lg:w-[auto] shadow-xl rounded-xl border sml_card`;
        card.innerHTML = `
            <figure class="px-6 pt-6 sml_padding_figer">
            <img
                src="${item.image}"
                alt="Image"
                class="rounded-xl w-full h-[160px] md:h-[190px] sm:h-[230px] card_img" />
            </figure>
            <div class="lg:w-[auto] p-6 grid sml_padding">
            <h2 class="text-2xl font-extrabold mb-2">${item.pet_name}</h2>
            <span class="text-LightText">
                <i class="fa-solid fa-briefcase pr-2"></i>
                <span class="text-lg font-semibold">Breed: 
                ${item?.breed ? item?.breed : '😥'}
                </span>
            </span>
            <span class="text-LightText">
                <i class="fa-solid fa-cake-candles pr-2"></i>
                <span class="text-lg font-semibold">Birth: ${item?.date_of_birth ? item?.date_of_birth : '😛'}</span>
            </span>
            <span class="text-LightText">
                <i class="fa-solid fa-mosque pr-2"></i>
                <span class="text-lg font-semibold">Gender: ${item?.gender ? item?.gender : '🤔'}</span>
            </span>
            <span class="text-LightText pb-4">
                <i class="fa-solid fa-dollar-sign ml-2 pr-2"></i>
                <span class="text-lg font-semibold">Price: ${item?.price ? item?.price : '😏'}</span>
            </span>
            <div class="lg:w-[auto] flex flex-wrap gap-1 border-gray-200 border-t pt-4">
                <button id="like_btn" onclick="appendImage('${item.image}')" class="buttons">
                <i class="fa-regular fa-thumbs-up"></i>
                </button>

                <button id="adopt_btn_${item.petId}" onclick="adoptModal('${item.petId}')" class="buttons text-[#0E7A81] font-bold">Adopt</button>
    <!-- ==========adopt btn modal start here========== -->
<div id="adopt_modal_${item.petId}" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
<div class="bg-white p-6 rounded shadow-lg text-center sml_modal_width">
    <p class="text-4xl">
    <img src='https://i.pinimg.com/originals/20/95/b0/2095b0ee0ff14085277df3b037075b6e.gif' class='w-[150px] h-[150px] mx-auto' alt='Shandshake'/>
    </p>
    <h3 class="text-5xl font-bold">Congrates</h3>
    <p class="py-4 text-xl font-bold">
    Adoption process is start for your pet
    </p>
    <p id="count_${item.petId}" class="text-[red] text-7xl font-bold pb-10">3</p>
</div>
</div>
<!-- ==========adopt btn modal end============ -->

                <button id="detail_btn" id="modal_btn" class="buttons text-[#0E7A81] font-bold" onclick="myModal('${item.petId}')">Details</button>
<!-- ==============Details btn modal start here=================== -->
                <dialog id="my_modal_${item.petId}" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                
                    <!-- card within modal start here -->
                    <figure>
                        <img
                        src="${item.image}"
                        alt="Modal Image" class='w-full h-[260px] rounded-lg' />
                    </figure>
                        <div class="p-6 sml_padding">
                        <h2 class="text-2xl font-extrabold mb-2">${item.pet_name}</h2>

                <!-- card left & right div start here -->
                        <div class="flex flex-wrap sml_grid">
                <!-- card left content start here -->
                        <div class="w-[55%] full_width">
                        <p class="text-LightText modal_card">
                        <i class="fa-solid fa-briefcase pr-2"></i>
                        <span class="text-lg font-semibold">Breed: ${item?.breed ? item?.breed : 'Not Found'}</span>
                        </span>
                        </p>
                        <p class="text-LightText modal_card">
                        <i class="fa-solid fa-mosque pr-2"></i>
                        <span class="text-lg font-semibold">Gender: ${item?.gender ? item?.gender : 'Not Found'}</span>
                        </p>
                        <p class="text-LightText modal_card">
                        <i class="fa-solid fa-syringe pr-2"></i>
                        <span class="text-lg font-semibold">Vaccinated status: ${item?.vaccinated_status ? item?.vaccinated_status : 'Not Found'}</span>
                        </p>
                        </div>
                    <!-- card right content end here -->

                    <!-- card left content start here -->
                        <div class="w-[45%] full_width">
                        <p class="text-LightText modal_card">
                        <i class="fa-solid fa-cake-candles pr-2"></i>
                        <span class="text-lg font-semibold">Birth: ${item?.date_of_birth ? item?.date_of_birth : 'Not Found'}
                        </p>
                        <p class="text-LightText modal_card">
                        <i class="fa-solid fa-dollar-sign pr-2"></i>
                        <span class="text-lg font-semibold">Price: ${item?.price ? item?.price : 'Not Found'}</span>
                        </p>
                        </div>
                <!-- card left content end here -->
                        </div>
                <!-- card left & right div end here -->
                        <div class="border-t pt-4">
                        <p class="text-xl font-semibold mb-3">details information</p>
                        <p>${item?.pet_details ? item?.pet_details : 'No pet details here!'}</p>
                        </div>
                    </div>
                    <!-- card within modal end here -->
                    <div>
                    <form method="dialog">
                        <button class="btn bg-[#0E7A811A] w-full mt-4 text-[#0E7A81]">Cancel</button>
                    </form>
                    </div>
                </div>
                </dialog>
<!-- ==================Details btn modal end here======================= -->
            </div>
        </div>
<!-- ============= Card ui end here============== -->
        `;
        cardDiv.appendChild(card);
    }) : 
    cardDiv.innerHTML = `
    <div class="lg:w-[600px] md:w-[500px] grid lg:justify-end md:justify-end sm:justify-center font_found mt-24">
        <img src='./images/error.webp' alt='Error Image' class='mx-auto' />
        <h1 class="text-[red] text-xl font-bold">No Information available</h1>
    <div>
    `;
}

function myModal(petId) {
    document.getElementById(`my_modal_${petId}`).showModal();
}

// like_btn functionaliy
function appendImage(img) {
    counter += 1;

    const imgContainer = document.getElementById('append_image');

    imgContainer.classList.remove('hidden');

    const createDiv = document.createElement('div');
    createDiv.classList = `lg:w-[45%] h-[170px] rounded-xl border img_box`;
    createDiv.innerHTML = `
        <div class="w-[100%] h-[100%] relative">
            <span id="absolute" onclick="closeImage(this)" class="absolute">
            <i class="fa-solid fa-xmark text-5xl text-[red]"></i>
            </span>
            <img src="${img}" class="w-[100%] h-[100%] rounded-xl" alt="" />
        </div>
    `;
    imgContainer.appendChild(createDiv);
}

// close new image
function closeImage(e) {

    counter -= 1;

    if(counter <= 0){
        document.getElementById('append_image').classList.add('hidden');
    }

    const pNode = e.parentNode;
    const upperPNode = pNode.parentNode;
    upperPNode.style.display = 'none';
}

// adopt btn & modal functionality
function adoptModal(pet_id){

    const modal = document.getElementById(`adopt_modal_${pet_id}`);
    modal.classList.remove('hidden');

    setTimeout(() => {
        closeModal(pet_id);
    }, 3000);

    let closeTimer = 2;
    const clearIntervalId = setInterval(() => {
        
        if(0 < closeTimer){
            document.getElementById(`count_${pet_id}`).innerHTML = closeTimer;
            closeTimer--;
            return;
        }else{
            document.getElementById(`count_${pet_id}`).innerHTML = 3;
            clearInterval(clearIntervalId);
        }
        
    }, 1000);

    document.getElementById(`adopt_btn_${pet_id}`).classList += ` btn btn-disabled`;
}

// Function to close the modal
function closeModal(pet_id) {
    const modal = document.getElementById(`adopt_modal_${pet_id}`);
    modal.classList.add('hidden');
}

// Scroll behavior funcion
function cat_section() {
    const scroll = document.getElementById('cat_section');
    scroll.scrollIntoView();
}

// sort by price Functionality
async function sortByPrice() {

    try{
        const allPetsResponse = await await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);

        const resData = await allPetsResponse.json();

        let allPrice = resData.pets;

        allPrice.sort((a, b) => {
            return parseFloat(b.price) - parseFloat(a.price);
        });

        const allCatBtns = document.getElementsByClassName('cat_btn');
        for(let n = 0; n < allCatBtns.length; n++){
            allCatBtns[n].classList.remove('active_btn');
        }
        displayAllCategory(allPrice);
        

    }catch(err){
        console.log(err)
    }
}

fetchMainCategory();
fetchAllPetsCategory();