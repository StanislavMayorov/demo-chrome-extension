"use strict";

updateExchangeRates();

function updateExchangeRates() {
    debugger;
    getExchangeRates()
}


function getExchangeRates() {
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
    if (euroExchangeRate === undefined || usdExchangeRate === undefined) {
        return undefined
    }
    var obj = {
        euroExchangeRate: euro,
        usdExchangeRate: usd
    };
    chrome.storage.local.set(obj);
    // chrome.storage.local.set({
    //         euroExchangeRate2: euroExchangeRate,
    //         usdExchangeRate2: usdExchangeRate
    //     });
}

function error() {
    console.error('Курс из нац банка не подгружен!');
    //handleData(2.2, 2);
}