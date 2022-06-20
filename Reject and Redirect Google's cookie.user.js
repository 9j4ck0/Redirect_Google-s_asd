// ==UserScript==
// @name         Reject and Redirect Google's cookie
// @namespace    http//tampermonkey.net/
// @version      0.1.4
// @description  Reject and Redirect Google's cookie
// @author       9j3thr0
// @match        https://*.google.com/*
// @match        https://*.google.it/*
// @match        https://*.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    const bRj = ['Q7N4Oc', 'yUNjVb', 'FXYDXd', 'SHqtNc', 'VkrUPc', 'NHcovd'];
    var conf = '';
    var count = 0;
    var page = window.location.href.split('?continue=')[1];
    if(new RegExp(/(https?:\/\/consent\.*)/ig).exec(window.location.href) != null) {
        var x = document.querySelectorAll('button');
        if(x.length != 0) {
            x.forEach(el => {
                if(bRj.includes(el.getAttribute('jsname'))) {
                    el.scrollIntoView(true);
                    el.click();
                }
                else if(el.getAttribute('jsname') == 'j6LnYe' && conf == '') {
                    conf = el;
                }
                else if(el.getAttribute('jsname') == 'wsVcxe') {
                    conf = el;
                }
            });
        }
        else if((x = document.querySelectorAll('input')).length != 0) {
            var cont = 0;
            x.forEach(el => {
                if(el.getAttribute('type') == 'radio' && el.getAttribute('value') == 'false') {
                    cont++;
                    el.scrollIntoView(true);
                    el.click();
                }
                else if(el.getAttribute('type') == 'submit' && el.getAttribute('class') == 'basebutton button') {
                    conf = el;
                }
            });
            if(cont == 0) {
                document.querySelectorAll('div').forEach(e => {
                    if(e.getAttribute('class') == null) {
                        window.location.replace(e.firstElementChild.href);
                    }
                });
            }
        }
        setTimeout(function(){
            conf.scrollIntoView(true);
            conf.click();
            setTimeout(function(){
                window.location.replace(decodeURIComponent(page.split('UTF-8')[0] + 'UTF-8'));
            },600);
        },500);
    }
    else if(new RegExp(/\google.*/ig).exec(window.location.href) != null) {
        if(document.getElementById('CXQnmb') != null) {
            if(document.getElementById('VnjCcb') != null) {
                document.getElementById('VnjCcb').click();
            }
            else if(document.getElementById('W0wltc') != null) {
                document.getElementById('W0wltc').click();
            }
            else {
                document.getElementById('tHlp8d').click();
            }
        }
    }
    else if(new RegExp(/\youtube.*/ig).exec(window.location.href) != null) {
        setTimeout(function(){
            if(document.getElementById('dialog') != null) {
                if(document.getElementsByTagName("ytd-button-renderer")[9] != null) {
                    document.getElementsByTagName("ytd-button-renderer")[9].click();
                }
                else if(document.getElementsByTagName("ytd-button-renderer")[11].getElementsByTagName('a') != null) {
                    document.getElementsByTagName("ytd-button-renderer")[11].getElementsByTagName('a')[0].click();
                }
                //window.location.replace(document.getElementById('dialog').lastElementChild.children[2].lastElementChild.lastElementChild.firstElementChild.firstElementChild.href);
            }
        },500);
    }
})();
