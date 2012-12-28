2012 TT Fireworks Show
======================

This app was made for SCVSoft's 2012 Code Happening.

## Installation Instructions

Almost all the app is built with javascript and runs on the server site. Mostly you just need to unzip it and serve it from a regular HTTP server like apache.
However, in order to get it ready, you need to initialize its data first. You need to run the loadtrends.sh script from the script directory. The script is regular bash

## Acknoledgments

The app uses the following 3rd party libraries:

- [JQuery](http://jquery.com/) for general purpose javascript
- [JS Queues](http://code.stephenmorley.org/javascript/queues/) to handle concurrency and synchronize the fireworks show

The app fetches content from 

- [Twendit](http://twend.it/) To get historical trending topic information 
- [Twitter](http://twitter.com/) Is accessed indirectly, as Twendit records information from twitter
