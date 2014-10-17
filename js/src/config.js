'use strict'

require.config({
  baseUrl: './js/src',
  urlArgs: '_=' + (new Date()).getTime(),
  paths: {
    jquery: '../vendor/jquery/jquery.min',
    knockout: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
    underscore: '../vendor/underscore/underscore-min',
    baseviewmodel: '../vendor/baseviewmodel/baseviewmodel.min',
    app: 'app'
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});