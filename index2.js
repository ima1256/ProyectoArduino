let serverHost = '192.161.1.48';
let serverPort = '8000';
let theUrl = 'http://' + serverHost + ':' + serverPort;

function httpGet(url) {
    let xmlHttpReq = new XMLHttpRequest();
    console.log(url);
    xmlHttpReq.open("GET", url, true); 
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
}

function ajaxget () {
    // (A) GET FORM DATA
    var form = new FormData(document.getElementById("form"));
    var data = new URLSearchParams(form).toString();
    console.log('Data sent: ', data);
   
    // (B) AJAX
    var xhr = new XMLHttpRequest();
    var formAction = document.getElementById('form').getAttribute('action');
    xhr.open("GET", formAction + '?' + data);
    // What to do when server responds
    xhr.onload = function () { 
        console.log('Response received: ', this.response); 
    };

    xhr.send();
   
}

function openTab(urlP) {
    let url = theUrl + '/misc' + '?' + urlP;
    httpGet(url);
}

function main() {
    var form = document.getElementById('form');
    $('#form').on('submit', (e) => {
        e.preventDefault();
        console.log()
        ajaxget();
        // (C) PREVENT HTML FORM SUBMIT
        return false;
    });

    $('#open-tab .btn').on('click', () => {
        console.log($('#open-tab input'));
        openTab($('#open-tab input')[0].value);
    });
}

window.onload = main;