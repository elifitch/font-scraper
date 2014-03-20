function asyncFunction (param) {
  // Scope local variables to this function
  // param is also both locally scoped
  var n = param.name
  var e = param.extension
  
  // Simulate something asynchronous happening
  setTimeout(function(){ 
    console.log("Downloaded file: " + n + "." + e)
  }, 500 + (Math.random() * 500))
  
}

var fonts = [
  { name: "kyle", extension: "woff" },
  { name: "eli", extension: "woff" },
  { name: "clownpenis", extension: "fart" }
]

// You can either do this through a standard for loop...
for (var i = 0; i < fonts.length; i++) {
  console.log("Downloading file (for loop): " + fonts[i].name + "." + fonts[i].extension)
  asyncFunction(fonts[i])
}

// Or you can do this through functional programming
fonts.forEach(function(font){
  console.log("Downloading file (functional): " + font.name + "." + font.extension)
  asyncFunction(font)
})