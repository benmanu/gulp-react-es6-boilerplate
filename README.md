# Website Project

## Requirements

 * [NPM](http://nodejs.org/download/)

## Installation

Frontend dependencies:

	$ npm install

## Usage

Compiling assets:

 * `gulp` to compile the minified JS/CSS.
 * `gulp js` and `gulp css` respectively to compile unminified JS/CSS.
 * `gulp js:prod` and `gulp css:prod` respectively to compile minified production JS/CSS.
 * `gulp watch` to watch for changes and recompile development files.
 * `gulp watch:prod` to watch for changes and recompile production files.

Using [Gulp](http://gulpjs.com/) to manage frontend tasks, with [SCSS](http://sass-lang.com/) and [Browserify](http://browserify.org/) as precompilers.

## App

The app is built with [React](http://facebook.github.io/react/).

## Broser support
IE8

React
https://facebook.github.io/react/docs/working-with-the-browser.html
https://github.com/es-shims/es5-shim
https://github.com/paulmillr/console-polyfill
https://github.com/aFarkas/html5shiv