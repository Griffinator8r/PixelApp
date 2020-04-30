//the stuff and the things that make things do things

//////////////////////////////////
//////////////////////////////////
//BS FUNCTION
//////////////////////////////////
//////////////////////////////////
function poop(){
  $("#blarf").append("Dookie");
}

//////////////////////////////////
//////////////////////////////////
//CREATE THE LOW RES IMAGE
//////////////////////////////////
//////////////////////////////////
function converttopng(){
//source info:
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
//http://www.cheminfo.org/Tutorial/8._Images/9.7_Create_a_PNG_image_in_javascript/index.html
//getting color info from canvas example:
//http://jsfiddle.net/DV9Bw/1/

//Getting the image size
var height=$("#imgheight").val();
var width=$("#imgwidth").val();

var srccvanvas = $("#srcimgbox").get(0);
var srcheight = srccvanvas.height;
var srcwidth = srccvanvas.width;
var c = document.getElementById("srcimgbox").getContext('2d');
var srcdata = c.getImageData(0,0,srcwidth,srcheight);

// we create a canvas element
var outputimg = document.createElement('canvas');
outputimg.setAttribute('height',height);
outputimg.setAttribute('width',width);

//here we are setting up the output image
var context = outputimg.getContext("2d");// getting the context will allow to manipulate the image
var imageData=context.createImageData(width, height);// We create a new imageData.
var data=imageData.data;// The property data will contain an array of int8

//reading the data to populate the image with
var i=0;
for(var h=0;h<height;h++){
  var row = h*4*srcwidth*Math.floor(srcheight/height);
  for(var w=0;w<width;w++){
    var col = w*4*Math.floor(srcwidth/width);
    var pix = col+row;

    data[i*4+0]=srcdata.data[pix+0];// Red
    data[i*4+1]=srcdata.data[pix+1];// Green
    data[i*4+2]=srcdata.data[pix+2];// Blue
    data[i*4+3]=srcdata.data[pix+3];// alpha (transparency)
    i++;
  }
}

console.log("num pixels = " + i);

context.putImageData(imageData, 0, 0); // we put this random image in the contextat coords 0,0

$("#imgbox").html("<img src=\"" + outputimg.toDataURL() + "\"></img>");
}

//////////////////////////////////
//////////////////////////////////
//LOAD A SOURCE IMAGE
//////////////////////////////////
//////////////////////////////////
function loadimg(){
  createGrid();

  var srch = $("#sourceimagecontainer").width();
  var srcw = $("#sourceimagecontainer").height();

  var imgname = $("#imgnametext").val();

  var newimg = new Image();
  newimg.src = "../../APP/IMAGES/" + imgname;

  newimg.onload = function(){
    var srcimgcanvas = $("#srcimgbox").get(0);
    srcimgcanvas.setAttribute('height',srch);
    srcimgcanvas.setAttribute('width',srcw);
    var srccontext = srcimgcanvas.getContext("2d");
    srccontext.drawImage(newimg,0,0,newimg.width,newimg.height,0,0,srch,srcw);
  }
}

//////////////////////////////////
//////////////////////////////////
//GENERATE GRID OVER SOURCE IMAGE
//////////////////////////////////
//////////////////////////////////
function createGrid() {
$("#gridsvg").attr('position','absolute');
$("#gridsvg").attr('top',$("#sourceimagecontainer").attr('top') + "px");
$("#gridsvg").attr('left',$("#sourceimagecontainer").attr("left") + "px");

var gridh=$("#imgheight").val();
var gridw=$("#imgwidth").val();

var srch = $("#sourceimagecontainer").width();
var srcw = $("#sourceimagecontainer").height();

var rowdist = Math.floor(srch/gridh);
var coldist = Math.floor(srcw/gridw);

$("#gridsvg").empty();
$("#gridsvg").height(srch);
$("#gridsvg").width(srcw);

//VERTICAL GRID
for(var i=1;i<gridw;i++){
  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('x1',i*coldist);
    newLine.setAttribute('y1','0');
    newLine.setAttribute('x2',i*coldist);
    newLine.setAttribute('y2',srch);
    newLine.setAttribute('class',"grid");
    $("#gridsvg").append(newLine);
}
//HORIZONTAL GRID
for(var i=1;i<gridh;i++){
  var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('x1',"0");
    newLine.setAttribute('y1',i*rowdist);
    newLine.setAttribute('x2',srcw);
    newLine.setAttribute('y2',i*rowdist);
    newLine.setAttribute('class',"grid");
    $("#gridsvg").append(newLine);
}
}
