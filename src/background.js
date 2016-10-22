"use strict";

updateExchangeRates();

function updateExchangeRates() {
    debugger;
    sendRequestForExchangeRates()
}

function sendRequestForExchangeRates() {
    var today = new Date();
    var dateString = today.toISOString().substring(0, 10);
    debugger;
    $.ajax({
        url: `https://www.nbrb.by/API/ExRates/Rates?onDate=${dateString}&Periodicity=0`,
        type: "GET",
        success: findExchangeRates,
        error: error,
    });
}

function findExchangeRates(data) {
    debugger;
    for (let element of data) {
        switch (element['Cur_ID']) {
            case 292:
                var euro = element['Cur_OfficialRate'];
                break;
            case 145:
                var usd = element['Cur_OfficialRate'];
                break;
        }
    }
    debugger;
    saveExchangeRate(euro, usd);
}

function saveExchangeRate(euro, usd) {
    if (euro === undefined || usd === undefined) {
        return undefined
    }
    var obj = {
        euroExchangeRate: euro,
        usdExchangeRate: usd
    };
    chrome.storage.local.set(obj);
    console.log('Курс нац. банка сохранён!')
}

function error() {
    console.error('Курс нац. банка не подгружен!');
}