"use strict";
//145 usd
//292 euro

$(function () {
    getExchangeRatesFromStorage();
    attachRemoveListener();
    attachQuantityListener();
});

function attachRemoveListener() {
    $('.save-or-remove').click(function () {
        setTimeout(function () {
            debugger;
            getExchangeRatesFromStorage();
        }, 3500);
    });
}

function attachQuantityListener() {
    $('#div_shoppingCart').on('change', function () {
        setTimeout(function () {
            debugger;
            getExchangeRatesFromStorage();
            attachRemoveListener();
        }, 700);
    });
}

function calculateCustomsDuty(euroExchangeRate, usdExchangeRate, orderPrice) {
    //(45 - 22* 1.1) * 0.3 + оформление + почтовый сбор.
    const customsRegistrationFeeEuro = 5;
    const postServiceRub = 5.2;
    const customsDutyFreeLimitEuro = 22;
    var euroToUsd = euroExchangeRate / usdExchangeRate;
    var customsFreeUsd = customsDutyFreeLimitEuro * euroToUsd;
    if (orderPrice - customsFreeUsd <= 0) {
        return 0
    }
    else {
        return (orderPrice - customsFreeUsd) * 0.3 +
            customsRegistrationFeeEuro * euroToUsd +
            postServiceRub / usdExchangeRate;
    }

}

function getExchangeRatesFromStorage() {
    chrome.storage.local.get(setExchangeRates);
}

function setExchangeRates(items) {
    var euroExchangeRate = items.euroExchangeRate;
    var usdExchangeRate = items.usdExchangeRate;
    handleData(euroExchangeRate, usdExchangeRate);
}


function handleData(euroExchangeRate, usdExchangeRate) {
    var customsDuty = calculateCustomsDuty(euroExchangeRate, usdExchangeRate, getOrderPrice());
    var sum = customsDuty + getTotalsPrice();
    $('#shopping-cart').find('.shopping-cart-row .summary-section .summary-actions')
        .before(createHtmlForCustomsDuty(customsDuty.toFixed(2), sum.toFixed(2)));
}

function createHtmlForCustomsDuty(customsDuty, sum) {
    var text =
        `<section class="col-xs-24 float-right last-col">
            <p class="totals extension-lines">
                <span class="type">Пошлина РБ:</span>
                <span class="price">$${customsDuty}</span>
            </p>
        </section>
        <section class="col-xs-24 float-right last-col">
            <p class="totals grand extension-lines">
                <span class="type">Итог:</span>
                <span class="price">$${sum}</span>
            </p>
        </section>`;
    return $(text);
}

function getOrderPrice() {
    var text = $('#pSubtotal').text();
    return parseFloat(text.slice(1))
}

function getTotalsPrice() {
    var text = $('#shopping-cart').find('.shopping-cart-row .summary-section .totals.grand .price').text();
    return parseFloat(text.slice(1))
}

// function setExchangeRates(data) {
//     debugger;
//     for (let element of data) {
//         var a = 3;
//         switch (element['Cur_ID']) {
//             case 292:
//                 var euro = element['Cur_OfficialRate'];
//                 break;
//             case 145:
//                 var usd = element['Cur_OfficialRate'];
//                 break;
//         }
//     }
//     debugger;
//     handleData(euro, usd);
// }
//
//
// function setDefaultExchangeRates() {
//     console.error('Курс из нац банка не подгружен!');
//     handleData(2.2, 2);
// }
