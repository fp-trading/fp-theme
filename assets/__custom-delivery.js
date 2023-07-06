const deliveryTimeListItem = [...document.querySelectorAll('.icon-with-text__item')].filter(element => element.innerHTML.includes('Lieferzeit'))[0];

if (deliveryTimeListItem) {
    const deliveryTime = /[0-9]+/.exec(deliveryTimeListItem.innerHTML);
    if (deliveryTime <= 5) {
        deliveryTimeListItem.classList.add('__delivery-green');
    } else if (deliveryTime <= 10) {
        deliveryTimeListItem.classList.add('__delivery-yellow');
    } else {
        deliveryTimeListItem.classList.add('__delivery-red');
    }
}

const freeDeliveryListItem = [...document.querySelectorAll('.icon-with-text__item')].filter(element => element.innerHTML.includes('Versandkostenfrei'))[0];

if (freeDeliveryListItem) {
    freeDeliveryListItem.classList.add('__delivery-green');
}