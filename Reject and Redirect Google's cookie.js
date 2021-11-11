// ==UserScript==
// @name         Reject and Redirect Google's cookie
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       9j3tr0
// @match        https://www.google.com/*
// @match        https://www.google.it/*
// @match        https://consent.google.it/*
// @match        https://consent.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var count = 0;
    const continua = 'Conferma';
    const nonAttiva = 'Non attiva';
    const personalizza = "Personalizza";
    var x = document.querySelectorAll('button');
    if(new RegExp(/\google.*/ig).exec(window.location.href) != null) {
        for(var k = 0; k < x.length; k++) {
            if(x[k].innerHTML.toLowerCase().includes(personalizza.toLowerCase())) {
                console.log(document.getElementsByTagName("button")[k].getAttribute('id'));
                document.getElementsByTagName("button")[k].click();
            }
        }
    }
    for(var i = 0; i < x.length; i++) {
        if(x[i].innerHTML.toLowerCase().includes(nonAttiva.toLowerCase()) && count < 3) {
            console.log(document.getElementsByTagName('button')[i].getAttribute('class'));
            x[i].scrollIntoView(true);
            document.getElementsByTagName('button')[i].click();
            count++;
        }
    }
    setTimeout(function(){
        console.log('after');
        for(var j = 0; j < x.length; j++) {
            if(x[j].innerHTML.toLowerCase().includes(continua.toLowerCase())) {
                console.log('j = ' + j);
                x[j].scrollIntoView(true);
                document.getElementsByTagName('button')[j].click();
            }
        }
    },500);
})();

//http://jsfiddle.net/xvHYw/2/