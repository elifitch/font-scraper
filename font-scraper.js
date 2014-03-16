var request = require('request');
var cheerio = require('cheerio');
var URI = require('url');
var exec = require('child_process').exec;

(function() {
	var dlDir = './downloads';
	var tmpDir = './tmp';
    //path, host, and str need to be generated, not hard coded
    var path = 'https://cae.careersite.ingageprojects.com/Content/fonts/'
	var host = 'https://cae.careersite.ingageprojects.com/Content/fonts/bentonfonts.min.css';
    var str = '@charset "UTF-8";@font-face{font-family:"BentonSansRegular";src:url("d14dadb9-9478-485d-b2ef-50391bc26c1b-2.eot");src:url("d14dadb9-9478-485d-b2ef-50391bc26c1b-2.eot?") format("embedded-opentype"),url("d14dadb9-9478-485d-b2ef-50391bc26c1b-3.woff") format("woff"),url("d14dadb9-9478-485d-b2ef-50391bc26c1b-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansMedium";src:url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-2.eot");src:url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-2.eot?") format("embedded-opentype"),url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-3.woff") format("woff"),url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-1.ttf") format("truetype");font-style:normal;font-weight:bold}@font-face{font-family:"BentonSansLight";src:url("b35ebeff-439e-4606-8e27-e48d9d48d11a-2.eot");src:url("b35ebeff-439e-4606-8e27-e48d9d48d11a-2.eot?") format("embedded-opentype"),url("b35ebeff-439e-4606-8e27-e48d9d48d11a-3.woff") format("woff"),url("b35ebeff-439e-4606-8e27-e48d9d48d11a-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansBook";src:url("b934fe58-6faa-40de-a80c-37c2bd5fd874-2.eot");src:url("b934fe58-6faa-40de-a80c-37c2bd5fd874-2.eot?") format("embedded-opentype"),url("b934fe58-6faa-40de-a80c-37c2bd5fd874-3.woff") format("woff"),url("b934fe58-6faa-40de-a80c-37c2bd5fd874-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansRegular";src:url("21eafd49-85ac-45c0-8c44-0301205fc73c-2.eot");src:url("21eafd49-85ac-45c0-8c44-0301205fc73c-2.eot?") format("embedded-opentype"),url("21eafd49-85ac-45c0-8c44-0301205fc73c-3.woff") format("woff"),url("21eafd49-85ac-45c0-8c44-0301205fc73c-1.ttf") format("truetype");font-style:normal;font-weight:bold}'
    
    //cleans string of any charset declaration that gets in the way of other manipulations
    // var charset = new RegExp('[@][c][h][a][r][s][e][t][\\s]["|\']([\\S]*?)(?=["][;])', 'g');

    var fontFaceRegex = new RegExp('[@][f][o][n][t][-][f][a][c][e]', 'g');

    var dlRegex = new RegExp('url\\("([\\S]+.[eot|woff|ttf])(?=")', 'g');
	var dlReplace = new RegExp('[u][r][l][(]["]', 'g');
	
	var nameRegex = new RegExp('[f][o][n][t][-][f][a][m][i][l][y][:]["]([\\S]+?.)(?=")','g');
    //INCLUSIVE NAMEREGEX [f][o][n][t][-][f][a][m][i][l][y][:](?:"|'|\s+"|\s+')([\S]+?.)(?="|')
	var nameReplace = new RegExp('[f][o][n][t][-][f][a][m][i][l][y][:]["]');
    //INCLUSIVE NAMEPREPLACE ([f][o][n][t][-][f][a][m][i][l][y][:])("|'|\s+"|\s+')

    // var downloads = str.match( dlRegex );
    // var cleanString = str.replace(charset, '');

    //Splits CSS into substrings based on where font-face is declared so you can capture
    //the font family as the file name of the font files that follow it
    var fontFace = str.split( fontFaceRegex );

    //loop thru the substrings
    for(var i=0; i<fontFace.length; i++) {
        //First lets make this shit an object
        var font = {};
        // finds font family reference
        var fontFam = fontFace[i].match( nameRegex );
        //makes the file name, fails when null so check if null first
        if(fontFam !== null){
            font.name = fontFam.toString().replace( nameReplace, '' );
        }
        //find file urls and don't process object if it doesn't have a name
        //to avoid issues with stuff like charset and other CSS declarations
        if(font.name) {
            font.downloadList = fontFace[i].match( dlRegex ).toString().replace(dlReplace, '').split(',');

            //splits download list into individual files, notes the extension, and creates a real dl URL
            for(var j=0; j<font.downloadList.length; j++) {
                var filePieces = font.downloadList[j].toString().split('.');
                font.fileName = filePieces[0];
                font.fileExtension = filePieces[1];

                var wget ='mkdir '+ dlDir + '\n' + 'wget '+ path + font.fileName+'.'+font.fileExtension + ' -O ' + dlDir +'/'+ font.name+'.'+font.fileExtension;
                var child = exec(wget, function(err, stdout,stderr){
                    if (err) throw err;
                    else console.log(font.fileName + '.' + font.fileExtension + ' saved as '+font.name+'.'+font.fileExtension);
                 });

            };
        };  
    };
}());





//var wget = 'wget -O ' + the font name + the font extension + ' ' + base path + file url in downloadList