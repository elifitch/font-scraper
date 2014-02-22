var request = require('request');
var cheerio = require('cheerio');
var URI = require('url');
var exec = require('child_process').exec;

(function() {
    var str = '@charset "UTF-8";@font-face{font-family:"BentonSansRegular";src:url("d14dadb9-9478-485d-b2ef-50391bc26c1b-2.eot");src:url("d14dadb9-9478-485d-b2ef-50391bc26c1b-2.eot?") format("embedded-opentype"),url("d14dadb9-9478-485d-b2ef-50391bc26c1b-3.woff") format("woff"),url("d14dadb9-9478-485d-b2ef-50391bc26c1b-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansMedium";src:url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-2.eot");src:url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-2.eot?") format("embedded-opentype"),url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-3.woff") format("woff"),url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-1.ttf") format("truetype");font-style:normal;font-weight:bold}@font-face{font-family:"BentonSansLight";src:url("b35ebeff-439e-4606-8e27-e48d9d48d11a-2.eot");src:url("b35ebeff-439e-4606-8e27-e48d9d48d11a-2.eot?") format("embedded-opentype"),url("b35ebeff-439e-4606-8e27-e48d9d48d11a-3.woff") format("woff"),url("b35ebeff-439e-4606-8e27-e48d9d48d11a-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansBook";src:url("b934fe58-6faa-40de-a80c-37c2bd5fd874-2.eot");src:url("b934fe58-6faa-40de-a80c-37c2bd5fd874-2.eot?") format("embedded-opentype"),url("b934fe58-6faa-40de-a80c-37c2bd5fd874-3.woff") format("woff"),url("b934fe58-6faa-40de-a80c-37c2bd5fd874-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansRegular";src:url("21eafd49-85ac-45c0-8c44-0301205fc73c-2.eot");src:url("21eafd49-85ac-45c0-8c44-0301205fc73c-2.eot?") format("embedded-opentype"),url("21eafd49-85ac-45c0-8c44-0301205fc73c-3.woff") format("woff"),url("21eafd49-85ac-45c0-8c44-0301205fc73c-1.ttf") format("truetype");font-style:normal;font-weight:bold}'
    var regex = new RegExp('url\\("([\\S]+.[eot|woff|ttf])"');
    // var downloads = str.match( 'url\\("([\S]+.[eot|woff|ttf])"' );
    var downloads = str.match( regex );
    // console.log(str);
    document.write(downloads);
}());