'use strict'

require.config({
  baseUrl: './js/src',
  urlArgs: '_=' + (new Date()).getTime(),
  paths: {
    jquery: '../vendor/jquery/jquery.min',
    knockout: '../vendor/knockout/build/output/knockout-latest.debug',
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