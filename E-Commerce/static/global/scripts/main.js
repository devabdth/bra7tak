window.onload= ()=> {
    document.getElementById('drawer-icon').onclick= ()=> {
        openDrawer();
    }
    document.getElementById('drawer-overlay').onclick= ()=> {
        closeDrawer();
    }
    document.getElementById('drawer-close').onclick= ()=> {
        closeDrawer();
    }
}

const changeLang = async (url, newLang) => {
    console.log("Clicked");
    await fetch(`${url}/config/?lang=${newLang}`);
    location.reload();
}


const openDrawer= ()=> {
    const drawer= document.getElementById('drawer');
    const drawerOverlay= document.getElementById('drawer-overlay');
    drawer.style.left= '0%';
    drawer.style.boxShadow= '0px 0px 15px 1px #111';
    drawerOverlay.style.display= 'flex';

}


const closeDrawer= ()=> {
    const drawer= document.getElementById('drawer');
    const drawerOverlay= document.getElementById('drawer-overlay');
    drawer.style.left= '-70%';
    drawer.style.boxShadow= 'none';
    drawerOverlay.style.display= 'none';

}


const addToCart= async (url, productId, count)=> {
    try {
        const res = await fetch(
            `${url}/cart/add/`,
            {
                method: 'patch',
                body: JSON.stringify({
                    products: [
                        {
                            id: productId,
                            count: count
                        }
                    ]
                }),
                headers: { "Content-Type": "application/json" },

            }
        );

        if(res.status == 200) {
            window.open(`${url}/cart/?freshProduct=${productId}`, '_self');
        }

        if(res.status == 405) {
            window.open(`${url}/login/`, '_self');
        }
    } catch (e) {
        console.log(e);
    }
}

const addToFavourites= async (url, productId, toastContent, lang)=> {
    try {
        const res = await fetch(
            `${url}/favourites/add/`,
            {
                method: 'patch',
                body: JSON.stringify({
                    products: [
                        {
                            id: productId,
                        }
                    ]
                }),
                headers: { "Content-Type": "application/json" },

            }
        );

        if(res.status == 200) {
            window.open('.', '_self')
        }

        if(res.status == 405) {
            window.open(`${url}/login/`, '_self');
        }
    } catch (e) {
        console.log(e);
    }
}

const removeFromFavourites= async (url, productId, toastContent, lang)=> {
    try {
        const res = await fetch(
            `${url}/favourites/remove/`,
            {
                method: 'patch',
                body: JSON.stringify({
                    products: [
                        {
                            id: productId,
                            count: count
                        }
                    ]
                }),
                headers: { "Content-Type": "application/json" },

            }
        );

        if(res.status == 200) {
            window.open('.', '_self');
        }

        if(res.status == 405) {
            window.open(`${url}/login/`, '_self');
        }
    } catch (e) {
        console.log(e);
    }
}


const removeFromCart= async (url, productId, count)=> {
    try {
        const res = await fetch(
            `${url}/cart/remove/`,
            {
                method: 'patch',
                body: JSON.stringify({
                    products: [
                        {
                            id: productId,
                            count: count
                        }
                    ]
                }),
                headers: { "Content-Type": "application/json" },

            }
        );

        if(res.status == 200) {
            window.open(`${url}/cart/`, '_self');
        }
    } catch (e) {
        console.log(e);
    }
}

const clearCart= async (url) => {
    try {
        const res = await fetch(
            `${url}/cart/clear/`,
            {
                method: 'patch',
                headers: { "Content-Type": "application/json" },
            }
        );

        if(res.status == 200) {
            window.open(`${url}/cart/`, '_self');
        }
    } catch (e) {
        console.log(e);
    }
}

const checkout= (url, prods)=> {
    let prodsIds= prods.toString()
    prodsIds= prodsIds.replaceAll(',', '|');
    window.open(`${url}/checkout/?prods=${prodsIds}`, '_self')
}