const statuses = {
	"-3": "Pending",
	"-2": "Returned",
	"-1": "Canceled",
	"0": "Stocked",
	"1": "In Delivery",
	"2": "Delivered"
};


let selectedPendingOrders = [], allProducts = [];

window.onload = () => {
	const trs = document.querySelector('table.orders#pending').rows;
	for (let tr of trs) {
		tr.onclick = () => {
			if (selectedPendingOrders.includes(tr.id)) {
				selectedPendingOrders.splice(tr.id, 1);
				tr.classList.remove('active');
			} else {
				selectedPendingOrders.push(tr.id);
				tr.classList.add('active');
			}
			document.getElementById('converting-orders-count').innerHTML = `${selectedPendingOrders.length} Products`
		}
	}
}

const stockAllOrders = async (allOrders) => {
	if (allOrders.length != 0) {

		for (let order of allOrders) {
			try {
				await window.open(`/webapp/adminstration/orders/invoices/?oid=${order["_id"]}`)
				fetch(`./?oid=${order["_id"]}&status=0`, {
					method: 'PATCH'
				}).then(async r => {
					if (r.status === 200) {
						return;
					}

					document.getElementById('converting-all-orders-submission').innerHTML = "Failed!";
					setTimeout(() => { document.getElementById('converting-all-orders-submission').innerHTML = "Update" }, 3000);
				});
			} catch (e) {
				console.log(e);
				document.getElementById('converting-all-orders-submission').innerHTML = "Failed!";
				setTimeout(() => { document.getElementById('converting-all-orders-submission').innerHTML = "Update" }, 3000);
			}
		}
		window.open('./', '_self');
		return;
	}
	document.getElementById('converting-orders-count').innerHTML = `There is no orders to stock!`

}


const printAllOrders = async (allOrders) => {
	if (allOrders.length != 0) {
		for (let order of allOrders) {
			try {
				window.open(`/webapp/adminstration/orders/invoices/?oid=${order['id']}`);
			} catch (e) {
				console.log(e);
				document.getElementById('print-all-orders-submission').innerHTML = "Failed!";
				setTimeout(() => { document.getElementById('print-all-orders-submission').innerHTML = "Update" }, 3000);
				document.getElementById('print-all-orders-submission').onclick = () => { printAllOrders(allOrders); }
			}
		}
		window.open('./', '_self');
		return;
	}
	document.getElementById('converting-orders-count').innerHTML = `There is no orders to stock!`

}

const stockMultiple = () => {
	if (selectedPendingOrders.length != 0) {

		for (let order of selectedPendingOrders) {
			try {
				fetch(`./?oid=${order}&status=0`, {
					method: 'PATCH'
				}).then(r => {
					if (r.status === 200) {
						window.open(`${url}/webapp/adminstration/orders/invoices/?oid=${order}`)
						return;
					}

					document.getElementById('update').innerHTML = "Failed!";
					setTimeout(() => { document.getElementById('update').innerHTML = "Update" }, 3000);
				});
			} catch (e) {
				console.log(e);
				document.getElementById('update').innerHTML = "Failed!";
				setTimeout(() => { document.getElementById('update').innerHTML = "Update" }, 3000);
			}
		}
		window.open('./', '_self');
		return;
	}
	document.getElementById('converting-orders-count').innerHTML = `Select Orders First!`


}


const ordersFiltrationClear = () => {
	const startDateFieldContainer = document.getElementById('start-date-field-container');
	const startDateField = document.getElementById('start-date-field');

	const endDateFieldContainer = document.getElementById('end-date-field-container');
	const endDateField = document.getElementById('end-date-field');

	const emailFieldContainer = document.getElementById('email-field-container');
	const emailField = document.getElementById('email-field');

	const idFieldContainer = document.getElementById('police-number-field-container');
	const idField = document.getElementById('police-number-field');


	if (
		!startDateField.value.trim().length &&
		!endDateField.value.trim().length &&
		!emailField.value.trim().length &&
		!idField.value.trim().length
	) {
		startDateFieldContainer.style.border = "1px red solid";
		endDateFieldContainer.style.border = "1px red solid";
		emailFieldContainer.style.border = "1px red solid";
		idFieldContainer.style.border = "1px red solid";
		return;
	}

	window.open(window.location.href.split('?')[0], '_self')

}

const ordersFiltrationSubmit = () => {
	const startDateFieldContainer = document.getElementById('start-date-field-container');
	const startDateField = document.getElementById('start-date-field');

	const endDateFieldContainer = document.getElementById('end-date-field-container');
	const endDateField = document.getElementById('end-date-field');

	const emailFieldContainer = document.getElementById('email-field-container');
	const emailField = document.getElementById('email-field');

	const policeNumberFieldContainer = document.getElementById('police-number-field-container');
	const policeNumberField = document.getElementById('police-number-field');


	if (
		!startDateField.value.trim().length &&
		!endDateField.value.trim().length &&
		!emailField.value.trim().length &&
		!policeNumberField.value.trim().length
	) {
		startDateFieldContainer.style.border = "1px red solid";
		endDateFieldContainer.style.border = "1px red solid";
		emailFieldContainer.style.border = "1px red solid";
		policeNumberFieldContainer.style.border = "1px red solid";
		return;
	}

	window.open(`./?start=${startDateField.value}&end=${endDateField.value}&email=${emailField.value.trim()}&policeNumber=${policeNumberField.value.trim()}`, '_self');
	return;
}


const fragmentsSwitch = (mode) => {
	const pendingFragmentController = document.getElementById('pending-fragment-controller');
	const pendingFragment = document.getElementById('pending-fragment');

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
		case -3:
			pendingFragment.classList.add('active-fragment');
			pendingFragmentController.classList.add('active-fragment-controller');

			returnedFragment.classList.remove('active-fragment');
			returnedFragmentController.classList.remove('active-fragment-controller');

			canceledFragment.classList.remove('active-fragment');
			canceledFragmentController.classList.remove('active-fragment-controller');

			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');

			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');

			deliveredFragment.classList.remove('active-fragment');
			deliveredFragmentController.classList.remove('active-fragment-controller');
			break;
		case -2:
			returnedFragment.classList.add('active-fragment');
			returnedFragmentController.classList.add('active-fragment-controller');

			canceledFragment.classList.remove('active-fragment');
			canceledFragmentController.classList.remove('active-fragment-controller');

			stockedFragment.classList.remove('active-fragment');
			stockedFragmentController.classList.remove('active-fragment-controller');

			inDeliveryFragment.classList.remove('active-fragment');
			inDeliveryFragmentController.classList.remove('active-fragment-controller');

			pendingFragment.classList.remove('active-fragment');
			pendingFragmentController.classList.remove('active-fragment-controller');

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

			pendingFragment.classList.remove('active-fragment');
			pendingFragmentController.classList.remove('active-fragment-controller');
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

			pendingFragment.classList.remove('active-fragment');
			pendingFragmentController.classList.remove('active-fragment-controller');
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

			pendingFragment.classList.remove('active-fragment');
			pendingFragmentController.classList.remove('active-fragment-controller');
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

			pendingFragment.classList.remove('active-fragment');
			pendingFragmentController.classList.remove('active-fragment-controller');
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

			pendingFragment.classList.remove('active-fragment');
			pendingFragmentController.classList.remove('active-fragment-controller');
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
	if (wtoggle ?? true) {
		toggleStatusDropdown();
	}

	if (statuses[currentStatus] != statuses[baseStatus]) {
		document.getElementById('update').style.display = "flex";
		document.getElementById('update').onclick = () => {
			try {
				fetch(`./?oid=${currentOrderId}&status=${currentStatus}`, {
					method: 'PATCH'
				}).then(r => {
					if (r.status === 200) {
						window.open('./', '_self');
						return;
					}

					document.getElementById('update').innerHTML = "Failed!";
					setTimeout(() => { document.getElementById('update').innerHTML = "Update" }, 3000);
				});
			} catch (e) {
				console.log(e);
				document.getElementById('update').innerHTML = "Failed!";
				setTimeout(() => { document.getElementById('update').innerHTML = "Update" }, 3000);
			}
		}
		return;
	} else {
		document.getElementById('update').style.display = "none";
		document.getElementById('update').onclick = undefined;
	}

}


const openOrderDialog = (url, orderData, city) => {
	currentOrderId = orderData["id"];
	document.getElementById('order-id').innerHTML = orderData["id"];
	document.getElementById('order-user-id').innerHTML = orderData["uid"].trim() == "" ? orderData["userEmail"] : orderData["uid"];
	document.getElementById('order-user-address').innerHTML = orderData["address"];
	document.getElementById('order-user-city').innerHTML = city;
	document.getElementById('order-price').innerHTML = orderData["price"];
	document.getElementById('order-price').style.fontFamily = "Raleway";
	document.getElementById('order-time').innerHTML = `Date: ${orderData["placedIn"].split(' ')[0].replaceAll('-', ' / ')} -  Time: ${orderData["placedIn"].split(' ')[1].substring(0, 8).replaceAll(':', ' : ')}`;
	document.getElementById('order-time').style.fontFamily = 'Poppins';
	document.getElementById('downlowd-recipet').onclick = () => {
		window.open(`${url}/webapp/adminstration/orders/invoices/?oid=${orderData['id']}`)
	}
	const productsTable = document.getElementById('products-table');
	for (let prod of orderData["products"]) {
		const row = document.createElement('tr');
		const product = allProducts.filter(e => e["id"] == prod["id"]);
		const cells = [
			document.createElement('td'),
			document.createElement('td'),
			document.createElement('td'),
		];
		cells[0].innerHTML = product[0]['name']['en'];
		cells[1].innerHTML = prod["size"];
		cells[2].innerHTML = prod["color"];
		for (let cell of cells) row.appendChild(cell);
		productsTable.appendChild(row);
	}

	if (orderData["status"] === -1 || orderData["status"] === 2 || orderData["status"] === -2) {
		document.getElementById('status-dropbtn').style.display = "none";
	} else {
		document.getElementById('status-dropbtn').style.display = "flex";
		baseStatus = (orderData["status"]);
		console.log((orderData["status"]));
		chooseStatus(statuses[(orderData["status"])], (orderData["status"]), 'en', false);
	}

	document.getElementById('overlay').style.display = "flex";
}

const closeOrderDialog = () => {
	document.getElementById('overlay').style.display = "none";
	currentStatus = undefined;
	currentOrderId = undefined;
}


let currentProduct, currentGender, currentCity, cart;
cart = [];

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

	let color, size;
	const colorsSection = document.getElementById('form-colors-pick');
	const sizesSection = document.getElementById('form-sizes-pick');
	const optionsSection = document.getElementById('product-add-options');
	const formProductAction = document.getElementById('form-add-to-cart');
	const formProductAmount = document.getElementById('form-product-amount');
	for (prodColor of product['colors']) {
		let colorDiv = document.createElement('div');
		colorDiv.setAttribute('id', prodColor);
		colorDiv.style.backgroundColor = prodColor;
		colorDiv.onclick = () => {
			if (color) {
				document.getElementById(color).classList.remove('active');
			}
			if (color === colorDiv.id) {
				colorDiv.classList.remove('active');
				color = undefined;
				return;
			}
			color = colorDiv.id;
			colorDiv.classList.add('active');
		}
		colorsSection.appendChild(colorDiv);
	}
	for (prodSize in product['sizes']) {
		let sizeDiv = document.createElement('div');
		sizeDiv.setAttribute('id', product['sizes'][prodSize]);
		sizeDiv.innerHTML = product['sizes'][prodSize];
		sizeDiv.onclick = () => {
			if (size) {
				document.getElementById(size).classList.remove('active');
			}
			if (size === sizeDiv.id) {
				sizeDiv.classList.remove('active');
				size = undefined;
				return;
			}
			size = sizeDiv.id;
			sizeDiv.classList.add('active');
		}
		sizesSection.appendChild(sizeDiv);
	}
	formProductAction.onclick = () => {
		const amount = Number.parseInt(formProductAmount.value.trim() || '1');
		for (let i = 0; i != amount; i++) {
			// cart.push(product)
			product['color'] = color;
			product['size'] = size;
			cart.push(product)
			updateCart(product);

		}
	}

	optionsSection.style.display = 'flex';

	toggleProductsDropdown();

}



const updateCart = (product) => {
	const prodsLen = document.getElementById('products-length');
	prodsLen.innerHTML = `<span style="font-family: 'Poppins';">${cart.length}</span> Products`

	if (product !== undefined) {
		const element = document.createElement('div');
		const closeElement = document.createElement('div')
		closeElement.innerHTML = "x";
		closeElement.onclick = () => {
			cart.splice(cart.indexOf(product), 1);
			document.getElementById('picked-products').removeChild(element);
			updateCart();
		}
		console.log(product)
		closeElement.style.cursor = "pointer";
		element.classList.add('picked-product-row');
		element.innerHTML = `
			<p>${product['name']['en']} (${product['color'] || 'No Color'})/(${product['size'] || 'No Size'})</p>`;
		element.appendChild(closeElement);
		document.getElementById('picked-products').appendChild(element);
	}
	const cartCalc = cartCalculation();
	const price = document.getElementById('price');
	price.innerHTML = `Price<br><span style="font-family: 'Poppins';">${Number.parseInt(cartCalc.totalPrice)}</span> L.E.`;

	const vat = document.getElementById('vat');
	vat.innerHTML = `Vat<br><span style="font-family: 'Poppins';">${Number.parseInt(cartCalc.totalVat)}</span> L.E.`;

	const shippingFees = document.getElementById('shipping-fees');
	shippingFees.innerHTML = `shipping Fees<br><span style="font-family: 'Poppins';">${Number.parseInt(cartCalc.totalShippingFees)}</span> L.E.`;;

}

const cartCalculation = () => {
	let totalPrice = 0, totalVat = 0, shippingFees = 0;
	const cart_ = {
		totalPrice: {},
		totalVat: {},
		shippingFees: {},
		productsLength: cart.length,
	}

	let uniqueProducts = new Set(cart);
	const count = {}
	cart.forEach(e => {
		count[e.id] = (count[e.id] || 0) + 1
	});


	uniqueProducts.forEach(prod => {
		const product = productsList.filter(prod_ => {
			if ((prod_["id"]).toString() == prod["id"].toString()) return prod_
		})[0];
		let price_;
		switch (count[product["id"]]) {
			case 2:
			case 3:
				cart_.totalPrice[product["id"]] = (product['pricing']['twoPiecesPrice'] * count[product["id"]]);
				break;
			case 4:
			case 5:
				cart_.totalPrice[product["id"]] = (product['pricing']['fourPiecesPrice'] * count[product["id"]]) || (product['pricing']['currentPrice'] * count[product["id"]]);
				break;
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
				cart_.totalPrice[product["id"]] = (product['pricing']['sixPiecesPrice'] * count[product["id"]]) || (product['pricing']['currentPrice'] * count[product["id"]]);
				break;
			case 12:
			case 13:
			case 14:
			case 15:
				cart_.totalPrice[product["id"]] = (product['pricing']['dozinPiecesPrice'] * count[product["id"]]) || (product['pricing']['currentPrice'] * count[product["id"]]);
				totalVat += product['vat'] * price_
				break;
			case 1:
				cart_.totalPrice[product["id"]] = (product['pricing']['currentPrice'] * count[product["id"]]);
				break;
		}
		cart_.totalVat[product["id"]] = (product['vat'] || 0) * cart_.totalPrice[product["id"]]
		totalPrice = 0;
		if (currentCity !== undefined) {
			cart_.shippingFees[product["id"]] = (product['shippingFees'][currentCity] * count[product["id"]]) || (product['shippingFees'][5] * count[product["id"]])
		} else {
			cart_.shippingFees[product["id"]] = (product['shippingFees'][5] * count[product["id"]])
		}
	});
	for (let i in cart_.totalPrice) {
		totalPrice += cart_.totalPrice[i];
	}
	for (let i in cart_.totalVat) {
		totalVat += cart_.totalVat[i];
	}
	for (let i in cart_.shippingFees) {
		shippingFees += cart_.shippingFees[i];
	}

	return {
		totalPrice: totalPrice,
		totalVat: totalVat,
		totalShippingFees: shippingFees
	}
}


const placeOrderConfirmation = async () => {
	const nameField = document.getElementById('name-field');
	const nameFieldContainer = document.getElementById('name-field-container');

	const emailField = document.getElementById('dialog-email-field');
	const emailFieldContainer = document.getElementById('dialog-email-field-container');

	const phoneField = document.getElementById('dialog-phone-field');
	const phoneFieldContainer = document.getElementById('dialog-phone-field-container');

	const addressOneField = document.getElementById('address-line-one-field');
	const addressOneFieldContainer = document.getElementById('address-line-one-field-container');

	const addressTwoField = document.getElementById('address-line-two-field');
	const addressTwoFieldContainer = document.getElementById('address-line-two-field-container');

	const citiesBtn = document.getElementById(`cities-dropbtn`);
	const gendersBtn = document.getElementById(`genders-dropbtn`);
	const productsBtn = document.getElementById(`products-dropbtn`);

	if (!nameField.value) {
		nameFieldContainer.style.border = "1px red solid";
		return;
	}
	nameFieldContainer.style.border = "none";


	if (!phoneField.value) {
		phoneFieldContainer.style.border = "1px red solid";
		return;
	}
	phoneFieldContainer.style.border = "none";

	if (!currentGender) {
		gendersBtn.style.border = "1px solid red";
		return;
	}
	gendersBtn.style.border = "none";

	if (!addressOneField.value) {
		addressOneFieldContainer.style.border = "1px red solid";
		return;
	}
	addressOneFieldContainer.style.border = "none";

	if (!currentCity) {
		citiesBtn.style.border = "1px red solid";
		return;
	}
	citiesBtn.style.border = "none";

	if (cart.length === 0) {
		productsBtn.style.border = "1px red solid";
		return;
	}
	productsBtn.style.border = "none";

	document.getElementById('place-order-confirmation').innerHTML = "Loading...";
	document.getElementById('place-order-confirmation').onclick = () => { }
	try {
		const cartCalc = cartCalculation();
		const res = await fetch(
			'./', {
			method: 'POST',
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
				products: cart.map(ci => {
					return {
						id: ci['id'],
						color: ci['color'] || 'undefined',
						size: ci['size'] || 'undefined',
					};
				}),
			}),
			headers: { 'Content-Type': 'application/json' }
		}
		);

		console.log(res);
		if (res.status === 201) {
			window.open('./', '_self');
			return;
		}
		document.getElementById('place-order-confirmation').innerHTML = "Failed!";
		setTimeout(() => {
			document.getElementById('place-order-confirmation').innerHTML = "Place";
			document.getElementById('place-order-confirmation').onclick = placeOrderConfirmation;
		}, 3000);

	} catch (e) {
		document.getElementById('place-order-confirmation').innerHTML = "Failed!";
		setTimeout(() => {
			document.getElementById('place-order-confirmation').innerHTML = "Place";
			document.getElementById('place-order-confirmation').onclick = placeOrderConfirmation;
		}, 3000);

	}
}


const closePlaceOrderDialog = () => {
	document.getElementById('place-order-dialog').style.display = "none";
	document.getElementById('place-order-dialog-overlay').style.display = "none";
	document.getElementById('name-field').value= "";
	document.getElementById('dialog-email-field').value= "";
	document.getElementById('dialog-phone-field').value= "";
	document.getElementById('address-line-one-field').value= "";
	document.getElementById('address-line-two-field').value= "";
}

const openPlaceOrderDialog = (mode, order) => {
	if ((mode || 0) === 0) {
		document.getElementById('place-order-dialog').style.display = "flex";
		document.getElementById('place-order-dialog-overlay').style.display = "flex";
		document.getElementById('place-order-confirmation').innerHTML = "Place";
		document.getElementById('place-order-confirmation').onclick = placeOrderConfirmation;
	} else {
		document.getElementById('place-order-confirmation').innerHTML = "Edit";
		document.getElementById('place-order-confirmation').onclick = () => { EditOrderConfirmation(order["id"]) };
		document.getElementById('name-field').value= order["username"];
		document.getElementById('dialog-email-field').value= order["userEmail"];
		document.getElementById('dialog-phone-field').value= order["userPhone"];
		document.getElementById('address-line-one-field').value= order["address"];
		document.getElementById('address-line-two-field').value= order["addressLineTwo"];
		document.getElementById('place-order-dialog').style.display = "flex";
		document.getElementById('place-order-dialog-overlay').style.display = "flex";

	}
}

const initializeProductsData = (allProducts_) => {
	allProducts = allProducts_;
}

const EditOrderConfirmation= ()=> {}