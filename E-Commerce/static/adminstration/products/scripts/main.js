let cats= [];
const initCategoriesCheckboxes= (catIds)=> {
	cats = catIds.map((catId)=> {
		return document.getElementById(`${catId}-checkbox`)
	});
}

const initWithParams= (params)=> {
	if (!params) {
		return;
	}

	if(params.token) {
		const tokenField= document.getElementById('token-field');
		tokenField.value = `${params.token}`;
	}

	if(params.minPrice) {
		const minPriceField= document.getElementById('min-price-field');
		minPriceField.value = `${params.minPrice}`;
	}

	if(params.maxPrice) {
		const maxPriceField= document.getElementById('max-price-field');
		maxPriceField.value = `${params.maxPrice}`;
	}

	if (params.cats){
		const cats_= params.cats.split(',');
		for(cat in cats_){
			if(cat.trim() !== ''){
			 	document.getElementById(`${cats_[cat]}-checkbox`).checked= true;
			}
		}

	}

}


const filterApply= ()=> {
	const tokenField= document.getElementById('token-field');
	const minPriceField= document.getElementById('min-price-field');
	const maxPriceField= document.getElementById('max-price-field');

	const token= tokenField.value.trim();
	const minPrice= Number.parseInt(minPriceField.value.trim());
	const maxPrice= Number.parseInt(maxPriceField.value.trim());

	const selectedCats= [];
	for(let cat in cats) {
		if(cats[cat].checked){
			selectedCats.push(cats[cat].id.split('-')[0]);
		}
	}
	console.log(selectedCats)

	const url= window.location.href.split('?')[0];
	let tokenPart, minPricePart, maxPricePart, selectedCatsPart;
	if(!(token.trim().length === '')) {
		tokenPart= `token=${token}&`;
	}
	
	if(minPrice) {
		minPricePart= `minPrice=${minPrice}&`;
	}
	
	if(maxPrice) {
		maxPricePart= `maxPrice=${maxPrice}&`;
	}

	if(selectedCats.length !== 0){
		selectedCatsPart= `cats=${selectedCats.toString()}&`;
	}

	let newUrl=	`${url}?${tokenPart || ''}${minPricePart || ''}${maxPricePart || ''}${selectedCatsPart || ''}`;
	window.open(newUrl, '_self');
}


const filterClear= ()=> {
	window.open(window.location.href.split('?')[0], '_self');
}

const closeProductEdit= ()=> {

	document.getElementById('product-edit-dialog').style.display= "none";
	document.getElementById('overlay').style.display= "none";
	clearForm();

}

const openProductEdit= (product, mode, url)=> {
	let newAssets= [], newAssetsFiles= [];

	document.getElementById('product-edit-dialog').style.display= "flex";
	document.getElementById('overlay').style.display= "flex";
	const codeField = document.getElementById("code");
	const enNameField = document.getElementById("en-name");
	const arNameField = document.getElementById("ar-name");
	const enBioField = document.getElementById("en-bio");
	const arBioField = document.getElementById("ar-bio");
	const enSpecsField = document.getElementById("en-specs");
	const arSpecsField = document.getElementById("ar-specs");
	const peicePriceField = document.getElementById("peice-price");
	const twoPeicesPriceField = document.getElementById("2-peices-price");
	const fourPeicesPriceField = document.getElementById("4-peices-price");
	const sixPeicesPriceField = document.getElementById("6-peices-price");
	const dozinPeicesPriceField = document.getElementById("dozin-peices-price");
	const vatField = document.getElementById("vat");

	if(mode === 0) {

		document.getElementById('delete-product').onclick= ()=> {
			try {
				window.onload= ()=> {
					document.getElementById('form-submit').display.style= "none"
					document.getElementById('submit-status').innerHTML= "Loading...";
					document.getElementById('form-submit').onclick= ()=> {}
					document.getElementById('form-clear').onclick= ()=> {}
					document.getElementById('delete-product').onclick= ()=> {}
				}

				const res= fetch(
					`./?prodId=${product['id']}`, {
						method: 'delete',
					}
				).then(r => {
					if (r.status == 200)  {
						window.open('./', '_self');
					}
				})

			} catch (e) {
				console.log(e);
				document.getElementById('submit-status').innerHTML= "Failed, Please try again later!";
			}
		}
		codeField.value= product['code'];
		enNameField.value= product['name']['en'];
		arNameField.value= product['name']['ar'];
		enBioField.value= product['bio']['en'];
		arBioField.value= product['bio']['ar'];
		enSpecsField.value= product['specs']['en'];
		arSpecsField.value= product['specs']['ar'];
		peicePriceField.value= product["pricing"]["currentPrice"];
		twoPeicesPriceField.value= product["pricing"]["twoPiecesPrice"];
		fourPeicesPriceField.value= product["pricing"]["fourPiecesPrice"];
		sixPeicesPriceField.value= product["pricing"]["sixPiecesPrice"];
		dozinPeicesPriceField.value= product["pricing"]["dozinPiecesPrice"];
		vatField.value= product["vat"];
		newAssets= product["assets"];

		for (let cityCode in product["avgDelDays"]) {
			document.getElementById(`${cityCode}-del-days`).value= product["avgDelDays"][cityCode];
		}

		for (let cityCode in product["shippingFees"]) {
			document.getElementById(`${cityCode}-shipping-fees`).value= product["shippingFees"][cityCode];
		}

		for (let assetName in newAssets) {
			const assetDiv= document.createElement('div');
			assetDiv.className= "asset-card"
			assetDiv.id= newAssets[assetName];
			assetDiv.style.backgroundImage= `url('${url}/assets/products/name/${product["assets"][assetName]}')`
			assetDiv.ondblclick= ()=> {
				newAssets.splice(newAssets[assetName], 1);
				document.getElementById('assets').removeChild(assetDiv);
			}
			document.getElementById('assets').appendChild(assetDiv);
		}

		const addAssetBtn= document.getElementById('add-asset-btn');
		addAssetBtn.onclick= ()=> {
			const input = document.createElement("input");
			input.setAttribute("type", "file");
			input.setAttribute("accept", "image/*");
			input.onchange = e => {
				if (e.target.files.length === 0) {
					return;
				}
				const file_= e.target.files[0]
				const reader= new FileReader();
				reader.onload= ()=> {
					const assetDiv= document.createElement('img');
					assetDiv.className= "asset-card";
					assetDiv.id= file_.name;
					assetDiv.setAttribute('src', reader.result);
					assetDiv.style.objectFit= "contain";
					newAssets.push(file_.name);
					newAssetsFiles.push(file_)
					document.getElementById('assets').appendChild(assetDiv);
				}
				reader.readAsDataURL(file_)
			}

			input.click();
		}

		document.getElementById('form-submit').onclick= ()=> {
			const res= formFieldValidation(newAssets);
			console.log(res);
			if(res){
			
				document.getElementById('form-submit').innerHTML= "Loading..."
				document.getElementById('submit-status').innerHTML= "";
				document.getElementById('form-submit').onclick= ()=> {}

				product['code'] = codeField.value.trim();
				product['name']['en'] = enNameField.value.trim();
				product['name']['ar'] = arNameField.value.trim();
				product['bio']['en'] = enBioField.value.trim();
				product['bio']['ar'] = arBioField.value.trim();
				product['specs']['en'] = enSpecsField.value.trim();
				product['specs']['ar'] = arSpecsField.value.trim();
				product["pricing"]["currentPrice"] = peicePriceField.value.trim();
				product["pricing"]["twoPiecesPrice"] = twoPeicesPriceField.value.trim();
				product["pricing"]["fourPiecesPrice"] = fourPeicesPriceField.value.trim();
				product["pricing"]["sixPiecesPrice"] = sixPeicesPriceField.value.trim();
				product["pricing"]["dozinPiecesPrice"] = dozinPeicesPriceField.value.trim();
				product["vat"] = vatField.value.trim();
				product["assets"] = newAssets;

				for (let cityCode in product["avgDelDays"]) {
					 product["avgDelDays"][cityCode]= Number.parseInt(document.getElementById(`${cityCode}-del-days`).value);
				}

				for (let cityCode in product["shippingFees"]) {
					 product["shippingFees"][cityCode]= Number.parseInt(document.getElementById(`${cityCode}-shipping-fees`).value);
				}
				const editRes= submitProductEdit(
					product, url, newAssetsFiles, 
					(status)=> {
						if(status === 200) {
							window.open('./', '_self');
							return;
						} else {
							document.getElementById('submit-status').innerHTML= "Failed, Please try again later!";
						}

					},
					
				);
			} else {
				document.getElementById('submit-status').innerHTML= "Some Fields are missing!";
			}
		}

	} else if (mode === 1) {

		const addAssetBtn= document.getElementById('add-asset-btn');
		addAssetBtn.onclick= ()=> {
			const input = document.createElement("input");
			input.setAttribute("type", "file");
			input.setAttribute("accept", "image/*");
			input.onchange = e => {
				if (e.target.files.length === 0) {
					return;
				}
				const file_= e.target.files[0]
				const reader= new FileReader();
				reader.onload= ()=> {
					const assetDiv= document.createElement('img');
					assetDiv.className= "asset-card";
					assetDiv.id= file_.name;
					assetDiv.setAttribute('src', reader.result);
					assetDiv.style.objectFit= "contain";
					newAssets.push(file_.name);
					newAssetsFiles.push(file_)
					document.getElementById('assets').appendChild(assetDiv);
				}
				reader.readAsDataURL(file_)
			}

			input.click();
		}

		document.getElementById('form-submit').onclick= ()=> {
			const res= formFieldValidation(newAssets);
			if(res){
				product["name"]= {}
				product["bio"]= {}
				product["specs"]= {}
				product["pricing"]= {}
				product["avgDelDays"]= {}
				product["shippingFees"]= {}

				product['code'] = codeField.value.trim();
				product['name']['en'] = enNameField.value.trim();
				product['name']['ar'] = arNameField.value.trim();
				product['bio']['en'] = enBioField.value.trim();
				product['bio']['ar'] = arBioField.value.trim();
				product['specs']['en'] = enSpecsField.value.trim();
				product['specs']['ar'] = arSpecsField.value.trim();
				product["pricing"]["currentPrice"] = peicePriceField.value.trim();
				product["pricing"]["twoPiecesPrice"] = twoPeicesPriceField.value.trim();
				product["pricing"]["fourPiecesPrice"] = fourPeicesPriceField.value.trim();
				product["pricing"]["sixPiecesPrice"] = sixPeicesPriceField.value.trim();
				product["pricing"]["dozinPiecesPrice"] = dozinPeicesPriceField.value.trim();
				product["vat"] = vatField.value.trim();
				product["assets"] = newAssets;

				for (let cityCode= 0; cityCode != 27; cityCode++) {
					 product["avgDelDays"][cityCode]= Number.parseInt(document.getElementById(`${cityCode}-del-days`).value);
					 product["shippingFees"][cityCode]= Number.parseInt(document.getElementById(`${cityCode}-shipping-fees`).value);
				}

				submitProductCreate(product, url, newAssetsFiles, (status)=> {
						if(status === 201) {
							window.open('./', '_self');
							return;
						} else {
							document.getElementById('submit-status').innerHTML= "Failed, Please try again later!";
						}

				});

			} else {
				document.getElementById('submit-status').innerHTML= "Some Fields are missing!";

			}
		}
			

	}

}

const submitProductCreate= (product, url, newAssetsFiles, listener)=> {
	try {
		const reqData= new FormData();
		reqData.append('product', JSON.stringify(product));
		for (let assetFile in newAssetsFiles) {
			console.log(assetFile)
			reqData.append(`${newAssetsFiles[assetFile].name}`, newAssetsFiles[assetFile])
		}

		const req= new XMLHttpRequest();
		req.onload= ()=> {
			listener(req.status);
			
		}
		req.open('post', './');
		req.send(reqData);
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
}


const submitProductEdit= (product, url, newAssetsFiles, listener)=> {
	try {
		const reqData= new FormData();
		reqData.append('product', JSON.stringify(product));
		for (let assetFile in newAssetsFiles) {
			console.log(assetFile)
			reqData.append(`${newAssetsFiles[assetFile].name}`, newAssetsFiles[assetFile])
		}

		const req= new XMLHttpRequest();
		req.onload= ()=> {
			listener(req.status);
			
		}
		req.open('patch', './');
		req.send(reqData);
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
}

const formFieldValidation = (assetsList)=> {
	const codeField = document.getElementById("code");
	const enNameField = document.getElementById("en-name");
	const arNameField = document.getElementById("ar-name");
	const enBioField = document.getElementById("en-bio");
	const arBioField = document.getElementById("ar-bio");
	const enSpecsField = document.getElementById("en-specs");
	const arSpecsField = document.getElementById("ar-specs");
	const peicePriceField = document.getElementById("peice-price");
	const twoPeicesPriceField = document.getElementById("2-peices-price");
	const fourPeicesPriceField = document.getElementById("4-peices-price");
	const sixPeicesPriceField = document.getElementById("6-peices-price");
	const dozinPeicesPriceField = document.getElementById("dozin-peices-price");
	const vatField = document.getElementById("vat");
	const cairoDelDays=  document.getElementById(`5-del-days`)
	const cairoShippingFees= document.getElementById(`5-shipping-fees`)

	if (codeField.value.trim().length < 8) {
		codeField.value= "code"
		codeField.style.color= 'red';
		return false;
	}
	codeField.style.color= "var(--secondary-color);";

	if (enNameField.value.trim().length < 8) {
		enNameField.value= "Name"
		enNameField.style.color= 'red';
		return false;
	}
	enNameField.style.color= "var(--secondary-color);";

	if (arNameField.value.trim().length < 8) {
		arNameField.value= "Name"
		arNameField.style.color= 'red';
		return false;
	}
	arNameField.style.color= "var(--secondary-color);";

	if (enBioField.value.trim().length < 8) {
		enBioField.value= "Bio"
		enBioField.style.color= 'red';
		return false;
	}
	enBioField.style.color= "var(--secondary-color);";

	if (arBioField.value.trim().length < 8) {
		arBioField.value= "Bio"
		arBioField.style.color= 'red';
		return false;
	}
	arBioField.style.color= "var(--secondary-color);";

	if (enSpecsField.value.trim().length < 8) {
		enSpecsField.value= "Specs"
		enSpecsField.style.color= 'red';
		return false;
	}
	enSpecsField.style.color= "var(--secondary-color);";

	if (arSpecsField.value.trim().length < 8) {
		arSpecsField.value= "Specs"
		arSpecsField.style.color= 'red';
		return false;
	}
	arSpecsField.style.color= "var(--secondary-color);";

	if (peicePriceField.value.length === 0 || Number.parseInt(peicePriceField.value.trim()) === 0) {
		peicePriceField.value= "0";
		peicePriceField.style.color= 'red';
		return false;
	}
	peicePriceField.style.color= "var(--secondary-color);";

	if (twoPeicesPriceField.value.length === 0 || Number.parseInt(twoPeicesPriceField.value.trim()) === 0) {
		twoPeicesPriceField.value= "0";
		twoPeicesPriceField.style.color= 'red';
		return false;
	}
	twoPeicesPriceField.style.color= "var(--secondary-color);";

	if (fourPeicesPriceField.value.length === 0 || Number.parseInt(fourPeicesPriceField.value.trim()) === 0) {
		fourPeicesPriceField.value= "0";
		fourPeicesPriceField.style.color= 'red';
		return false;
	}
	fourPeicesPriceField.style.color= "var(--secondary-color);";

	if (sixPeicesPriceField.value.length === 0 || Number.parseInt(sixPeicesPriceField.value.trim()) === 0) {
		sixPeicesPriceField.value= "0";
		sixPeicesPriceField.style.color= 'red';
		return false;
	}
	sixPeicesPriceField.style.color= "var(--secondary-color);";

	if (dozinPeicesPriceField.value.length === 0 || Number.parseInt(dozinPeicesPriceField.value.trim()) === 0) {
		dozinPeicesPriceField.value= "0";
		dozinPeicesPriceField.style.color= 'red';
		return false;
	}
	dozinPeicesPriceField.style.color= "var(--secondary-color);";

	if (Number.parseInt(vatField.value) < 0 || Number.parseInt(vatField.value) > 1) {
		vatField.style.color= 'red';
		return false;
	}
	vatField.style.color= "var(--secondary-color);";


	if (cairoDelDays.value.length === 0 || Number.parseInt(cairoDelDays.value) < 1) {
		cairoDelDays.value= "0"
		cairoDelDays.style.color= 'red';
		return false;
	}
	cairoDelDays.style.color= "var(--secondary-color);";

	
	if (cairoShippingFees.value.length === 0 || Number.parseInt(cairoShippingFees.value) < 1) {
		cairoShippingFees.value= "0"
		cairoShippingFees.style.color= 'red';
		return false;
	}
	cairoShippingFees.style.color= "var(--secondary-color);";

	if(assetsList.length < 3) {
		document.getElementById('add-asset-btn').style.color= 'red';
		return false;
	}
	document.getElementById('add-asset-btn').style.color= 'var(--main-color);';
	
	return true;	

}


const clearForm= ()=> {
	const codeField = document.getElementById("code");
	codeField.value= "";
	codeField.style.color= "var(--secondary-color);";

	const enNameField = document.getElementById("en-name");
	enNameField.value= "";
	enNameField.style.color= "var(--secondary-color);";

	const arNameField = document.getElementById("ar-name");
	arNameField.value= "";
	arNameField.style.color= "var(--secondary-color);";

	const enBioField = document.getElementById("en-bio");
	enBioField.value= "";
	enBioField.style.color= "var(--secondary-color);";

	const arBioField = document.getElementById("ar-bio");
	arBioField.value= "";
	arBioField.style.color= "var(--secondary-color);";

	const enSpecsField = document.getElementById("en-specs");
	enSpecsField.value= "";
	enSpecsField.style.color= "var(--secondary-color);";

	const arSpecsField = document.getElementById("ar-specs");
	arSpecsField.value= "";
	arSpecsField.style.color= "var(--secondary-color);";

	const peicePriceField = document.getElementById("peice-price");
	peicePriceField.value= "0";
	peicePriceField.style.color= "var(--secondary-color);";

	const twoPeicesPriceField = document.getElementById("2-peices-price");
	twoPeicesPriceField.value= "0";
	twoPeicesPriceField.style.color= "var(--secondary-color);";

	const fourPeicesPriceField = document.getElementById("4-peices-price");
	fourPeicesPriceField.value= "0";
	fourPeicesPriceField.style.color= "var(--secondary-color);";

	const sixPeicesPriceField = document.getElementById("6-peices-price");
	sixPeicesPriceField.value= "0";
	sixPeicesPriceField.style.color= "var(--secondary-color);";

	const dozinPeicesPriceField = document.getElementById("dozin-peices-price");
	dozinPeicesPriceField.value= "0";
	dozinPeicesPriceField.style.color= "var(--secondary-color);";

	const vatField = document.getElementById("vat");
	vatField.value= "0";
	vatField.style.color= "var(--secondary-color);";

	const cairoDelDays=  document.getElementById(`5-del-days`)
	cairoDelDays.value= "0";
	cairoDelDays.style.color= "var(--secondary-color);";

	const cairoShippingFees= document.getElementById(`5-shipping-fees`)
	cairoShippingFees.value= "0";
	cairoShippingFees.style.color= "var(--secondary-color);";


	while (document.getElementById('assets').lastChild.id !== "add-asset-btn") {
 	   document.getElementById('assets').removeChild(document.getElementById('assets').lastChild);
	}


	for (let cityCode =0; cityCode !== 27; cityCode++) {
		document.getElementById(`${cityCode}-del-days`).value= "0";
		document.getElementById(`${cityCode}-shipping-fees`).value= "0";
	}


}