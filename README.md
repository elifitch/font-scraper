#Font-Scraper

This is a little node script you run in the command line to scrape all the fonts from a site.  Quickly grabbing all fonts on a site can be extremely useful when prototyping something for a client or prospect, experimenting on something for yourself, etc.

##How to use
Clone the repo, run ```npm install``` to take care of a few dependencies, and then run ```node font-scraper http://www.example.com```.  Simple as that.

##Known Issues
It's not without issues.  Currently it doesn't support typekit or other services that load font CSS with client side JS, nor does it support stylesheets brought in with @import.

##Planned Improvements
After its a bit more stable, I'll build a front end for it and turn it into a web app.