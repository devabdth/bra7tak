
let currentCity;

const toggleCitiesDropdown = () => {
  document.getElementById(`cities-dropdown`).classList.toggle("show");
}

const filter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("city-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("cities-dropdown");
  button = div.getElementsByTagName("button");
  for (i = 0; i < button.length; i++) {
    txtValue = button[i].textContent || button[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
}


const chooseCity = (cityText, city, lang) => {
  const btn = document.getElementById(`cities-dropbtn`);
  currentCity = city;
  btn.innerHTML = cityText;
  btn.innerText = cityText;
  btn.textContent = cityText;

  toggleCitiesDropdown();

}

let currentGender;

const toggleGendersDropdown = () => {
  document.getElementById(`genders-dropdown`).classList.toggle("show");
}

const gendersFilter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("gender-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("genders-dropdown");
  button = div.getElementsByTagName("button");
  for (i = 0; i < button.length; i++) {
    txtValue = button[i].textContent || button[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      button[i].style.display = "";
    } else {
      button[i].style.display = "none";
    }
  }
}


const chooseGender = (genderText, gender, lang) => {
  const btn = document.getElementById(`genders-dropbtn`);
  currentGender = gender;
  btn.innerHTML = genderText;
  btn.innerText = genderText;
  btn.textContent = genderText;

  toggleGendersDropdown();

}


const initFormsSections = () => {
  document.getElementById('personal-information').style.display= "flex";
  document.getElementById('shipping-information').style.display= "none";
  document.getElementById('payment-information').style.display= "none";
  document.getElementById('complete-order').style.display= "none";
}

const initFormsFields = (userData, cities, genders, lang) => {
  document.getElementById('username').value = userData.name;
  document.getElementById('email').value = userData.email;
  document.getElementById('phone').value = userData.phone;

  const genderBtn = document.getElementById(`genders-dropbtn`);
  currentGender = userData.gender;
  genderBtn.innerHTML = genders[lang][userData.gender];
  genderBtn.innerText = genders[lang][userData.gender];
  genderBtn.textContent = genders[lang][userData.gender];


  document.getElementById('address-line-one').value = userData.addressLineOne;
  document.getElementById('address-line-two').value = userData.addressLineTwo;

  const cityBtn = document.getElementById(`cities-dropbtn`);
  currentCity = userData.cityCode;
  cityBtn.innerHTML = cities[lang][userData.cityCode];
  cityBtn.innerText = cities[lang][userData.cityCode];
  cityBtn.textContent = cities[lang][userData.cityCode];
}

const personalInformationConfirmation= ()=> {
  document.getElementById('shipping-information').style.display= "flex";
  document.getElementById('personal-information').style.display= "none";
}

const shippingInformationConfirmation= ()=> {
  document.getElementById('shipping-information').style.display= "none";
  document.getElementById('payment-information').style.display= "flex";
}

const paymentInformationConfirmation= ()=> {
  document.getElementById('payment-information').style.display= "none";
  document.getElementById('complete-order').style.display= "flex";
}