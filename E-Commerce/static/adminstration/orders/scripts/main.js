const statuses= ["Canceled", "Stocked", "In Delivery", "Delivered"];


const ordersFiltrationClear= ()=> {
	const startDateFieldContainer= document.getElementById('start-date-field-container');
	const startDateField= document.getElementById('start-date-field');
	
	const endDateFieldContainer= document.getElementById('end-date-field-container');
	const endDateField= document.getElementById('end-date-field');
	
	const emailFieldContainer=  document.getElementById('email-field-container');
	const emailField=  document.getElementById('email-field');
	
	const idFieldContainer=  document.getElementById('id-field-container');
	const idField=  document.getElementById('id-field');


	if (
		!startDateField.value.trim().length  &&
		!endDateField.value.trim().length  &&
		!emailField.value.trim().length  &&
		!idField.value.trim().length  
		) {
		startDateFieldContainer.style.border= "1px red solid";
		endDateFieldContainer.style.border= "1px red solid";
		emailFieldContainer.style.border= "1px red solid";
		idFieldContainer.style.border= "1px red solid";
		return;
	}

	window.open(window.location.href.split('?')[0], '_self')

}

const ordersFiltrationSubmit= ()=> {
	const startDateFieldContainer= document.getElementById('start-date-field-container');
	const startDateField= document.getElementById('start-date-field');
	
	const endDateFieldContainer= document.getElementById('end-date-field-container');
	const endDateField= document.getElementById('end-date-field');
	
	const emailFieldContainer=  document.getElementById('email-field-container');
	const emailField=  document.getElementById('email-field');
	
	const idFieldContainer=  document.getElementById('id-field-container');
	const idField=  document.getElementById('id-field');


	if (
		!startDateField.value.trim().length  &&
		!endDateField.value.trim().length  &&
		!emailField.value.trim().length  &&
		!idField.value.trim().length  
		) {
		startDateFieldContainer.style.border= "1px red solid";
		endDateFieldContainer.style.border= "1px red solid";
		emailFieldContainer.style.border= "1px red solid";
		idFieldContainer.style.border= "1px red solid";
		return;
	}

	window.open(`./?start=${startDateField.value}&end=${endDateField.value}&email=${emailField.value.trim()}&id=${idField.value.trim()}`, '_self');
	return;
}


const fragmentsSwitch= (mode)=> {
	const returnedFragmentController = document.getElementById('returned-fragment-controller');
	const returnedFragment = document.getElementById('returned-fragment');
	
	const canceledFragmentController = document.getElementById('canceled-fragment-controller');
	const canceledFragment = document.getElementById('canceled-fragment');
	
	const stockedFragmentController = document.getElementById('stocked-fragment-controller');
	const stockedFragment = document.getElementById('stocked-fragment');
	
	const inDeliveryFragmentController = document.getElementById('in-delivery-fragment-controller');
	const inDeliveryFragment = document.getElementById('in-delivery-fragment');
	
	const deliveredFragmentController = document.getElementById('delivered-fragment-controller');
	const deliveredFragment = document.getElementById('delivered-fragment');
	switch (mode) {
		case -2:
			returnedFragment.classList.add('active-fragment');
			returnedFragmentController.classList.add('active-fragment-controller');

			canceledFragment.classList.remove('active-fragment');
			canceledFragmentController.classList.remove('active-fragment-controller');
			
			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');
			
			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');
			
			deliveredFragment.classList.remove('active-fragment');
			deliveredFragmentController.classList.remove('active-fragment-controller');
			break;

		case -1:
			returnedFragment.classList.remove('active-fragment');
			returnedFragmentController.classList.remove('active-fragment-controller');

			canceledFragment.classList.add('active-fragment');
			canceledFragmentController.classList.add('active-fragment-controller');

			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');
			
			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');
			
			deliveredFragment.classList.remove('active-fragment');
			deliveredFragmentController.classList.remove('active-fragment-controller');
			break;

		case 0:
			returnedFragment.classList.remove('active-fragment');
			returnedFragmentController.classList.remove('active-fragment-controller');
			
			canceledFragment.classList.remove('active-fragment');
			returnedFragment.classList.remove('active-fragment');

			returnedFragmentController.classList.remove('active-fragment-controller');
			canceledFragmentController.classList.remove('active-fragment-controller');

			stockedFragment.classList.add('active-fragment');
			stockedFragmentController.classList.add('active-fragment-controller');
			
			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');
			
			deliveredFragment.classList.remove('active-fragment');
			deliveredFragmentController.classList.remove('active-fragment-controller');
			break;
		case 1:
			returnedFragment.classList.remove('active-fragment');
			returnedFragmentController.classList.remove('active-fragment-controller');

			canceledFragment.classList.remove('active-fragment');
			canceledFragmentController.classList.remove('active-fragment-controller');

			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');
			
			inDeliveryFragment.classList.add('active-fragment');
			inDeliveryFragmentController.classList.add('active-fragment-controller');
			
			deliveredFragment.classList.remove('active-fragment');
			deliveredFragmentController.classList.remove('active-fragment-controller');
			break;
		case 2:
			returnedFragment.classList.remove('active-fragment');
			returnedFragmentController.classList.remove('active-fragment-controller');

			canceledFragment.classList.remove('active-fragment');
			canceledFragmentController.classList.remove('active-fragment-controller');

			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');
			
			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');
			
			deliveredFragment.classList.add('active-fragment');
			deliveredFragmentController.classList.add('active-fragment-controller');
			
			break;
		default:
			canceledFragment.classList.add('active-fragment');
			canceledFragmentController.classList.add('active-fragment-controller');

			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');
			
			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');
			
			deliveredFragment.classList.remove('active-fragment');
			deliveredFragmentController.classList.remove('active-fragment-controller');
			break;

	}
}
let currentOrderId, currentStatus, baseStatus;
const toggleStatusDropdown = () => {
  document.getElementById(`status-dropdown`).classList.toggle("show");
}

const filter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("status-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("status-dropdown");
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


const chooseStatus = (statusText, status, lang, wtoggle, changeListener) => {
  const btn = document.getElementById(`status-dropbtn`);
  currentStatus = status;
  btn.innerHTML = statusText;
  btn.innerText = statusText;
  btn.textContent = statusText;
  if(wtoggle ?? true){	
  	toggleStatusDropdown();
  }

  if(statuses[currentStatus] != statuses[baseStatus]) {
		document.getElementById('update').style.display= "flex";
		document.getElementById('update').onclick= ()=> {
			try {
				fetch(`./?oid=${currentOrderId}&status=${currentStatus-1}`, {
					method: 'patch'
				}).then(r => {
					if(r.status === 200) {
						window.open('./', '_self');
						return;
					}

					document.getElementById('update').innerHTML= "Failed!";
					setTimeout(()=> {document.getElementById('update').innerHTML="Update"}, 3000);
				});
			} catch(e) {
				console.log(e);
				document.getElementById('update').innerHTML= "Failed!";
				setTimeout(()=> {document.getElementById('update').innerHTML="Update"}, 3000);
			}
		}
		return;
  	} else {
		document.getElementById('update').style.display= "none";
		document.getElementById('update').onclick= undefined;
  	}

}


const openOrderDialog= (orderData, city)=> {
	currentOrderId= orderData["id"];
	document.getElementById('order-id').innerHTML= orderData["id"];
	document.getElementById('order-user-id').innerHTML= orderData["uid"];
	document.getElementById('order-user-address').innerHTML= orderData["address"];
	document.getElementById('order-user-city').innerHTML= city;
	document.getElementById('order-price').innerHTML= orderData["price"];
	document.getElementById('order-price').style.fontFamily= "Raleway";
	document.getElementById('order-time').innerHTML= orderData["placedIn"];
	document.getElementById('order-time').style.fontFamily= "Raleway";
	document.getElementById('qr').style.background= `url("${window.location.href}/qr/${orderData['id']}");`

	if(orderData["status"] === -1 || orderData["status"] === 2) {
		document.getElementById('order-status').innerHTML= statuses[(orderData["status"]+1)]
		document.getElementById('order-status').style.display= "flex";
		document.getElementById('status-dropbtn').style.display= "none";
	} else {
		document.getElementById('order-status').style.display= "none";
		document.getElementById('status-dropbtn').style.display= "flex";
		baseStatus=(orderData["status"] +1);
		chooseStatus(statuses[(orderData["status"] +1)], (orderData["status"] +1), 'en', false);
	}

	document.getElementById('overlay').style.display= "flex";
}

const closeOrderDialog= ()=> {
	document.getElementById('overlay').style.display= "none";
	currentStatus= undefined;
	currentOrderId= undefined;
}


let currentProduct, currentGender, currentCity, cart;
cart= [];

const toggleCitiesDropdown = () => {
  document.getElementById(`cities-dropdown`).classList.toggle("show");
}

const citiesFilter = () => {
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
  updateCart();

}


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



const toggleProductsDropdown = () => {
  document.getElementById(`products-dropdown`).classList.toggle("show");
}

const productsFilter = () => {
  var input, filter, ul, li, a, i;
  input = document.getElementById("product-search");
  filter = input.value.toUpperCase();
  div = document.getElementById("products-dropdown");
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


const chooseProduct = (productText, product, lang) => {
  const btn = document.getElementById(`products-dropbtn`);
  currentProduct = product;
  btn.innerHTML = productText;
  btn.innerText = productText;
  btn.textContent = productText;
	cart.push(product)
  updateCart(product);

  toggleProductsDropdown();

}



const updateCart= (product)=> {
	const prodsLen= document.getElementById('products-length');
	prodsLen.innerHTML= `<span style="font-family: 'Poppins';">${cart.length}</span> Products`

	if(product !== undefined) {
		const element= document.createElement('div');
		const closeElement= document.createElement('div')
		closeElement.innerHTML= "x";
		closeElement.onclick= ()=> {
			cart.splice(cart.indexOf(product), 1);
			document.getElementById('picked-products').removeChild(element);
			updateCart();
		}
		console.log(product)
		closeElement.style.cursor= "pointer";
		element.classList.add('picked-product-row');
		element.innerHTML= `
			<p>${product['name']['en']}</p>`;
		element.appendChild(closeElement);
		document.getElementById('picked-products').appendChild(element);
	}
	const cartCalc= cartCalculation();
	const price= document.getElementById('price');
	price.innerHTML= `Price<br><span style="font-family: 'Poppins';">${Number.parseInt(cartCalc.totalPrice)}</span> L.E.`;

	const vat= document.getElementById('vat');
	vat.innerHTML= `Vat<br><span style="font-family: 'Poppins';">${Number.parseInt(cartCalc.totalVat)}</span> L.E.`;

	const shippingFees= document.getElementById('shipping-fees');
	shippingFees.innerHTML= `shipping Fees<br><span style="font-family: 'Poppins';">${Number.parseInt(cartCalc.totalShippingFees)}</span> L.E.`;;

}

const cartCalculation= ()=> {
	let totalPrice= 0, totalVat= 0, shippingFees= 0;
	const cart_= {
		totalPrice: {},
		totalVat: {},
		shippingFees: {},
		productsLength: cart.length,
	}

	let uniqueProducts = new Set(cart);
	const count= {}
	cart.forEach(e => {
		count[e.id]= (count[e.id] || 0) + 1
	});


	uniqueProducts.forEach(prod => {
		const product= productsList.filter(prod_ => { 
			if((prod_["id"]).toString() == prod["id"].toString()) return prod_
		})[0];
		let price_;
		switch(count[product["id"]]) {
			case 2:
			case 3:
				cart_.totalPrice[product["id"]]= (product['pricing']['twoPiecesPrice'] * count[product["id"]]);
				break;
			case 4:
			case 5:
				cart_.totalPrice[product["id"]]= (product['pricing']['fourPiecesPrice'] * count[product["id"]]) || (product['pricing']['currentPrice'] * count[product["id"]]);
				break;
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
				cart_.totalPrice[product["id"]]= (product['pricing']['sixPiecesPrice'] * count[product["id"]]) || (product['pricing']['currentPrice'] * count[product["id"]]);
				break;
			case 12:
			case 13:
			case 14:
			case 15:
				cart_.totalPrice[product["id"]]= (product['pricing']['dozinPiecesPrice'] * count[product["id"]]) || (product['pricing']['currentPrice'] * count[product["id"]]);
				totalVat += product['vat'] * price_
				break;
			case 1:
				cart_.totalPrice[product["id"]]= (product['pricing']['currentPrice'] * count[product["id"]]);
				break;
		}
		console.log((product['vat'] || 0) * cart_.totalPrice[product["id"]])
		cart_.totalVat[product["id"]] = (product['vat'] || 0) * cart_.totalPrice[product["id"]]
		console.log(cart_.totalVat[product["id"]])
		totalPrice= 0;
		if(currentCity !== undefined){
			shippingFees += (product['shippingFees'][`${currentCity}`] * count[prod]) || (product['shippingFees'][`5`] * count[prod])
		} else {
			shippingFees += (product['shippingFees'][`5`] * count[prod])
		}
	});
		for (let i in cart_.totalPrice) {
			totalPrice += cart_.totalPrice[i];
		}
		console.log(cart_.totalVat)
		for (let i in cart_.totalVat) {
			totalVat += cart_.totalVat[i];
		}

	return {
		totalPrice: totalPrice,
		totalVat: totalVat,
		totalShippingFees: shippingFees
	}
}


const placeOrderConfirmation= async()=> {
	const nameField= document.getElementById('name-field');
	const nameFieldContainer= document.getElementById('name-field-container');

	const emailField= document.getElementById('dialog-email-field');
	const emailFieldContainer= document.getElementById('dialog-email-field-container');

	const phoneField= document.getElementById('dialog-phone-field');
	const phoneFieldContainer= document.getElementById('dialog-phone-field-container');
	
	const addressOneField= document.getElementById('address-line-one-field');
	const addressOneFieldContainer= document.getElementById('address-line-one-field-container');

	const addressTwoField= document.getElementById('address-line-two-field');
	const addressTwoFieldContainer= document.getElementById('address-line-two-field-container');

  const citiesBtn = document.getElementById(`cities-dropbtn`);
  const gendersBtn = document.getElementById(`genders-dropbtn`);
  const productsBtn = document.getElementById(`products-dropbtn`);

  if(!nameField.value) {
  	nameFieldContainer.style.border= "1px red solid";
  	return;
  }
  nameFieldContainer.style.border= "none";
	
	
  if(!phoneField.value) {
  	phoneFieldContainer.style.border= "1px red solid";
  	return;
  }
  phoneFieldContainer.style.border= "none";

  if(!currentGender) {
  	gendersBtn.style.border= "1px solid red";
  	return;
  }
  gendersBtn.style.border= "none";
	
  if(!addressOneField.value) {
  	addressOneFieldContainer.style.border= "1px red solid";
  	return;
  }
  addressOneFieldContainer.style.border= "none";
	
  if(!currentCity) {
  	citiesBtn.style.border= "1px red solid";
  	return;
  }
  citiesBtn.style.border= "none";
	
  if(cart.length=== 0) {
  	productsBtn.style.border= "1px red solid";
  	return;
  }
  productsBtn.style.border= "none";

  document.getElementById('place-order-confirmation').innerHTML= "Loading...";
  document.getElementById('place-order-confirmation').onclick= ()=> {}
  try {
  	const cartCalc= cartCalculation();
  	const res= await fetch(
  		'./', {
  			method: 'post',
  			body: JSON.stringify({
  				information: {
	  				customerName: nameField.value.trim(),
	  				customerEmail: emailField.value.trim(),
	  				customerPhone: phoneField.value.trim(),
	  				customerGender: currentGender,
	  				customerAddressLineOne: addressOneField.value.trim(),
	  				customerAddressLineTwo: addressTwoField.value.trim(),
	  				customerCity: currentCity,
  				},
	  			status: 0,
  				fees: {
  					price: cartCalc.totalPrice,
  					vat: cartCalc.totalVat,
  					shippingFees: cartCalc.totalShippingFees,
  				},
  				products: cart,
  			}),
  			headers: { 'Content-Type': 'application/json' }
  		}
  	);

  	console.log(res);
  	if (res.status === 201) {
  		window.open('./', '_self');
  		return;
  	}
	  document.getElementById('place-order-confirmation').innerHTML= "Failed!";
	  setTimeout(()=> {
	  	document.getElementById('place-order-confirmation').innerHTML= "Place";
		  document.getElementById('place-order-confirmation').onclick= placeOrderConfirmation;
	  }, 3000);

  } catch (e) {
		document.getElementById('place-order-confirmation').innerHTML= "Failed!";
	  setTimeout(()=> {
	  	document.getElementById('place-order-confirmation').innerHTML= "Place";
		  document.getElementById('place-order-confirmation').onclick= placeOrderConfirmation;
	  }, 3000);

  }	
}


const closePlaceOrderDialog= ()=> {
	document.getElementById('place-order-dialog').style.display= "none";
	document.getElementById('place-order-dialog-overlay').style.display= "none";
}

const openPlaceOrderDialog= ()=> {
	document.getElementById('place-order-dialog').style.display= "flex";
	document.getElementById('place-order-dialog-overlay').style.display= "flex";
}