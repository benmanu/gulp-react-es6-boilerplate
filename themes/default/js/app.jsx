/**
 * @file App
 * @module Default
 * @requires module:babel/polyfill
 * @requires module:react
 * @requires module:./components/heading
 */

"use strict";

require("babel/polyfill");

var React = require('react');
import Heading from './components/heading';

React.render(
    <Heading />,
    document.getElementById('app')
);