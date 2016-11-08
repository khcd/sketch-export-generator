// The MIT License (MIT)
//
// Copyright (c) 2015 Philippe Hong (www.philippehong.com) & Kang Chen (kangchen.me, www.satoriwild.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


var SIZES = []; // e.g. [16, 32, 128, 256, 512]
var SCALES = [];

function setScale(scales) {
  SCALES = scales;
}

function prepareExportSizes(layer, format) {
  //log('=== ' + layer.name() + ' ===');
  //log('Remove all export sizes of layer \'' + layer.name() + '\'.');
  var sizes = layer.exportOptions().exportFormats();
  layer.exportOptions().removeAllExportFormats();

  SCALES.forEach(function(scale) {
    addExportSize(layer, scale.size, scale.suffix, format);
  });

  // add and remove a new export size to refresh UI
  layer.exportOptions().addExportFormat();
  layer.exportOptions().removeExportFormat(layer.exportOptions().exportFormats().objectAtIndex(layer.exportOptions().exportFormats().count() -1));
}

function addExportSize(layer, scale, suffix, format) {

  if (!format) {
    format = "png";
  }
  //log('Add \'' + layer.name() + suffix + '\' (' + scale + 'h' + ')');
  var size = layer.exportOptions().addExportFormat();
  // var size = layer.exportOptions()
  log('*************** size **************** ');
  log(layer);
  log(layer.format);
  log(layer.exportOptions().format);
  log(layer.exportOptions().addExportFormat().format);
  log('*************** size **************** ');

  log(size);
  size.setName(suffix);
  log('set scale.');
  log(scale);
  size.setScale(scale);

	// size.scale = scale;
	// size.name = suffix;
	// size.format = "SVG";
  // log(size.format);


  //size.setVisibleScaleType(2); // e.g. 512h
}

function runExportIOS(context) {
  runExport(context);
}

function runExportAndroid(context) {
  runExport(context);
}

function runExportPDF(context) {
  runExport(context, "pdf");
}

function runExportSVG(context) {
  runExport(context, "svg");
}

function runExport(context, format) {

  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();

  if (selectedCount == 0) {
    //log('No layers are selected.');
    return;
  }

  // use this if you want to override default scales for IOS and Android
  // prompt();

  //Experimental crap
  // var exports = context.exports;
  //
  // for (var i=0; i < exports.count(); i++) {
  //   var currentExport = exports.objectAtIndex(i);
  //   log("^^^^^^^^^ request format ^^^^^^^^^^^^^^");
  //   log(currentExport.request.format());
  // }

  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    if (i != 0) {
      log("");
    }
    prepareExportSizes(layer, format);
  }
  context.document.currentPage().deselectAllLayers();


  log("\nDone.");
}

function runClear(context) {
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();
  if (selectedCount == 0) {
    //log('No layers are selected.');
    return;
  }
  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    if (i != 0) {
      log("");
    }
    var sizes = layer.exportOptions().exportFormats()
    layer.exportOptions().removeAllExportFormats();
  }
  context.document.currentPage().deselectAllLayers();
}
