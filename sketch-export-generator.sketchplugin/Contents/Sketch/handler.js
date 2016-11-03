
@import 'export.js'

var exportIOS = function(context) {
  //setScale([1,2,3]);
  setScale([
    {size: 1, suffix: ""},
    {size: 2, suffix: "@2x"},
    {size: 3, suffix: "@3x"}
  ])
	runExportIOS(context);
  context.document.showMessage("iOS Exports added");
}

var exportAndroid = function(context) {
  /*
  mdpi = ~160dpi = 1×, or 100%
  hdpi = ~240dpi = 1.5×, or 150%
  xhdpi = ~320dpi = 2×, or 200%
  xxhdpi = ~480dpi = 3×, or 300%
  xxxhdpi = ~640dpi = 4×, or 400%
  */
  //setScale([1,1.5,2,3]);

  setScale([
    {size: 1, suffix: "-mdpi"},
    {size: 1.5, suffix: "-hdpi"},
    {size: 2, suffix: "-xhdpi"},
    {size: 3, suffix: "-xxhdpi"},
    {size: 4, suffix: "-xxxhdpi"}
  ])
	runExportAndroid(context);
  context.document.showMessage("Android Exports added");
}

var exportAll = function(context) {

  setScale([
    {size: 1, suffix: ""},
    {size: 2, suffix: "@2x"},
    {size: 3, suffix: "@3x"},
    {size: 1, suffix: "-mdpi"},
    {size: 1.5, suffix: "-hdpi"},
    {size: 2, suffix: "-xhdpi"},
    {size: 3, suffix: "-xxhdpi"},
    {size: 4, suffix: "-xxxhdpi"}
  ])
  runExport(context);
  context.document.showMessage("iOS and Android Exports added");
}

var clear = function(context) {

  runClear(context);
  context.document.showMessage("Exports cleared");
}
