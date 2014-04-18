var request = require('request');
var cheerio = require('cheerio');
var URI = require('url');
var exec = require('child_process').exec;

(function() {
    var dlDir = './downloads';
    //path, host, and str need to be generated, not hard coded
    var path = 'https://cae.careersite.ingageprojects.com/Content/fonts/';
    var host = 'https://cae.careersite.ingageprojects.com/Content/fonts/bentonfonts.min.css';
    var str = '@charset "UTF-8";@font-face{font-family:"BentonSansRegular";src:url("d14dadb9-9478-485d-b2ef-50391bc26c1b-2.eot");src:url("d14dadb9-9478-485d-b2ef-50391bc26c1b-2.eot?") format("embedded-opentype"),url("d14dadb9-9478-485d-b2ef-50391bc26c1b-3.woff") format("woff"),url("d14dadb9-9478-485d-b2ef-50391bc26c1b-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansMedium";src:url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-2.eot");src:url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-2.eot?") format("embedded-opentype"),url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-3.woff") format("woff"),url("620be4bf-1d8f-4cab-9cd5-66020b87dd54-1.ttf") format("truetype");font-style:normal;font-weight:bold}@font-face{font-family:"BentonSansLight";src:url("b35ebeff-439e-4606-8e27-e48d9d48d11a-2.eot");src:url("b35ebeff-439e-4606-8e27-e48d9d48d11a-2.eot?") format("embedded-opentype"),url("b35ebeff-439e-4606-8e27-e48d9d48d11a-3.woff") format("woff"),url("b35ebeff-439e-4606-8e27-e48d9d48d11a-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansBook";src:url("b934fe58-6faa-40de-a80c-37c2bd5fd874-2.eot");src:url("b934fe58-6faa-40de-a80c-37c2bd5fd874-2.eot?") format("embedded-opentype"),url("b934fe58-6faa-40de-a80c-37c2bd5fd874-3.woff") format("woff"),url("b934fe58-6faa-40de-a80c-37c2bd5fd874-1.ttf") format("truetype");font-style:normal;font-weight:normal}@font-face{font-family:"BentonSansRegular";src:url("21eafd49-85ac-45c0-8c44-0301205fc73c-2.eot");src:url("21eafd49-85ac-45c0-8c44-0301205fc73c-2.eot?") format("embedded-opentype"),url("21eafd49-85ac-45c0-8c44-0301205fc73c-3.woff") format("woff"),url("21eafd49-85ac-45c0-8c44-0301205fc73c-1.ttf") format("truetype");font-style:normal;font-weight:bold}';
    // var str = "@font-face { font-family: 'Kite One'; font-style: normal; font-weight: 400;src: local('Kite One'), local('KiteOne-Regular'), url(http://themes.googleusercontent.com/static/fonts/kiteone/v2/VNHoD96LpZ9rGZTwjozAOnYhjbSpvc47ee6xR_80Hnw.woff?ieifix) format('woff');}";
 
    var fontFaceRegex = new RegExp('[@][f][o][n][t][-][f][a][c][e]', 'g');
    // old var dlRegex = new RegExp('url\\("([\\S]+.[eot|woff|ttf])(?=")', 'g');
    var dlRegex = new RegExp('url\\((?:\\s*?"\\s*?|\\s*?\'\\s*?)([\\S]+.[eot|woff|ttf])(?=\\s*?"\\s*?|\\s*?\'\\s*?)','g');
    // old var dlReplace = new RegExp('[u][r][l][(]["]', 'g');
    var dlReplace = new RegExp('url\\(\\s*?"\\s*?|url\\(\\s*?\'\\s*?', 'g');

    // old var nameRegex = new RegExp('[f][o][n][t][-][f][a][m][i][l][y][:]["]([\\S]+?.)(?=")','g');
    var nameRegex = new RegExp('[f][o][n][t][-][f][a][m][i][l][y][:](?:\\s*?"\\s*?|\\s*?\'\\s*?)([\\S].*?)(?=\\s*?"\\s*?|\\s*?\'\\s*?)','g');
    // old var nameReplace = new RegExp('[f][o][n][t][-][f][a][m][i][l][y][:]["]');
    var nameReplace = new RegExp('[f][o][n][t][-][f][a][m][i][l][y][:](?:\\s*?"\\s*?|\\s*?\'\\s*?)');

    //Splits CSS into substrings based on where font-face is declared so you can capture
    //the font family as the file name of the font files that follow it
    var fontFace = str.replace(/(\?.+?)(?=\))|(\?.+?)(?=")|(\?.+?)(?=\')/g, '').split( fontFaceRegex );
    console.log(fontFace);

    //loop thru the substrings
    for(var i=0; i<fontFace.length; i++) {
        //First lets make this shit an object
        var font = {};
        // finds font family reference
        var fontFam = fontFace[i].match( nameRegex );
        //makes the file name, fails when null so check if null first
        if(fontFam !== null){
            font.name = fontFam.toString().replace( nameReplace, '' ).trim();
        }
        //find file urls and don't process object if it doesn't have a name
        //to avoid issues with stuff like charset and other CSS declarations
        if(font.name) {
            //checks to see if url contains any " or ', has to use different regex if not
            if(fontFace[i].indexOf(/url\(\s*?"\s*?|url\(\s*?'\s*?/g) === -1) {
                // console.log(fontFace[i].indexOf(/url\(\s*?"\s*?|url\(\s*?'\s*?/g));
                font.downloadList = fontFace[i].match( dlRegex ).toString().replace(dlReplace, '').trim().split(',');
                console.log(font);
            } else {
                // console.log('nope'+fontFace[i].indexOf(/url\(\s*?"\s*?|url\(\s*?'\s*?/g));
                //selects font src urls without any " or '
                font.downloadList = fontFace[i].match( /url\((?:\s*?)([\S]+.[eot|woff|ttf])(?=\s*?\))/g ).toString().replace(/url\(/, '').trim().split(',');
                console.log(font);
            }
            

            // splits download list into individual files, notes the extension, and creates a real dl URL
            for(var j=0; j<font.downloadList.length; j++) {
                var filePieces = font.downloadList[j].toString().trim().split('.');
                font.fileName = filePieces[0];
                font.fileExtension = filePieces[1];
                // console.log(font.fileName + '.' + font.fileExtension + ' saved as '+font.name+'.'+font.fileExtension)
                //QUESTION: if you log font.fileName before child is exec'd you see all the loops are looped before DLing the files
                //How to properly set up loop so it DLs files WITHIN the 'j' for loop
                //if you log 'j' in child result to check loop status, it's alwasy 3...
                var wget ='wget '+ path + font.fileName+'.'+font.fileExtension + ' -O ' + dlDir +'/'+ font.name+'.'+font.fileExtension;
                var child = exec(wget, function(err, stdout,stderr){
                    if (err) throw err;
                    else console.log(font.fileName + '.' + font.fileExtension + ' saved as '+font.name+'.'+font.fileExtension);
                 });

            };
        };  
    };
}());
//Breaks when you try the google font string, because it says fontFace[i] is undefined...
//Can't handle download locations that aren't relative links atm
//Breaks when ?iefix at end of font location, check uhg scraper for more


//need to trim hash values off svg fonts, but the non-capturing group is captured. what gives
// var str = "url(https://cae.careersite.ingageprojects.com/Content/fonts/b35ebeff-439e-4606-8e27-e48d9d48d11a-3.svg#98732983749395)";
// var shit = str.replace(/(?:\.svg)(#\S+?)(?=\s*?\)|\s*?'|\s*?")/g, '');
// console.log(shit);
//SOLUTION: JUST SPLIT THE STRING ON # AND TAKE THE LEFT PART! Look to do this with ?iefix and other shit as well!

