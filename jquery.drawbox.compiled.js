/**
 * jQuery DrawBox Plug-In 1.0
 *
 * http://github.com/crowdsavings/drawbox
 * http://plugins.jquery.com/project/drawbox
 *
 * Author: Josh Sherman <josh@crowdsavings.com>
 * Copyright (c) 2010 CrowdSavings.com, LLC
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){a.fn.extend({drawbox:function(d){d=a.extend({lineWidth:1,lineCap:"butt",lineJoin:"miter",miterLimit:10,strokeStyle:"black",fillStyle:"none",shadowOffsetX:0,shadowOffsetY:0,shadowBlur:0,shadowColor:"none",colorSelector:false,colors:["black","red","orange","yellow","green","blue","indigo","violet"],showClear:true,clearLabel:"Clear Canvas",clearStyle:"button"},d);return this.each(function(){if(this.nodeName=="CANVAS"||navigator.userAgent.indexOf("MSIE")!=-1){a(this).css("cursor","pointer"); a(this).attr("onclick","function onclick(event) { void 1; }");if(this.getContext){var l=this,b=this.getContext("2d"),e=a(this).attr("id");a(this).after('<div id="'+e+'-controls" style="width:'+a(this).width()+'px"></div>');b.underInteractionEnabled=true;b.lineWidth=d.lineWidth;b.lineCap=d.lineCap;b.lineJoin=d.lineJoin;b.miterLimit=d.miterLimit;b.strokeStyle=d.strokeStyle;b.fillStyle=d.fillStyle;b.shadowOffsetX=d.shadowOffsetX;b.shadowOffsetY=d.shadowOffsetY;b.shadowBlur=d.shadowBlur;b.shadowColor= d.shadowColor;if(d.colorSelector==true){var j="";for(i in d.colors){var u=d.colors[i];if(i==0)b.strokeStyle=u;j=j+'<div style="height:16px;width:16px;background-color:'+u+";margin:2px;float:left;border:2px solid "+(i==0?"#000":"transparent")+'"'+(i==0?' class="selected"':"")+"></div>"}a("#"+e+"-controls").append('<div style="float:left" id="'+e+'-colors">'+j+"</div>")}if(d.showClear==true){j=d.clearStyle=="link"?"div":"button";a("#"+e+"-controls").append("<"+j+' id="'+e+'-clear" style="float:right">'+ d.clearLabel+"</"+j+'><br style="clear:both" />');clear=true}var m=e+"-data";a(this).after('<input type="hidden" id="'+m+'" name="'+m+'" />');var p=false,q=a("#"+e).height(),r=a("#"+e).width(),f="",k=false,s=false,g=false,h=false;a(document).mousedown(function(c){v(c)});a(document).mousemove(function(c){w(c)});a(document).mouseup(function(){t()});a(document).bind("touchstart",function(c){v(c)});a(document).bind("touchmove",function(c){w(c)});a(document).bind("touchend",function(){t()});a(document).bind("touchcancel", function(){t()});a("#"+e+"-colors div").click(function(){a("#"+e+"-controls div").css("borderColor","transparent").removeClass("selected");a(this).addClass("selected");a(this).css("borderColor","#000")});a("#"+e+"-clear").click(function(){b.save();b.beginPath();b.closePath();b.restore();b.clearRect(0,0,a(l).width(),a(l).height());a("#"+m).val("")});var x=function(c){if(typeof event!="undefined"&&typeof event.touches!="undefined")c=event.touches.item(0);else{a(document).scrollLeft();a(document).scrollTop()}if(g!= false)s=g;g=c.pageX-a(l).position().left;h=c.pageY-a(l).position().top;return c},n=function(c){if(c!="stop"){if(c=="start"){s=k=false;b.beginPath();b.moveTo(g,h);f='<polyline points="'}else{if(s==false){g+=1;h+=1}b.lineTo(g,h)}b.stroke();if(f.length>0&&f.substring(f.length-1)!='"')f+=" ";f=f+g+","+h;q=a("#"+e).height();r=a("#"+e).width();if(g>0&&g<=r&&h>0&&h<=q)k=true}else{n("move");if(k==true){f=f+'" style="fill:'+d.fillStyle+";stroke:"+b.strokeStyle+";stroke-width:"+b.lineWidth+'" /></svg>';c=a("#"+ m);var o=c.val();if(o=="")o='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="'+r+'" height="'+q+'" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';c.val(o.substring(0,o.length-6)+f)}}},v=function(c){k==true&&c.preventDefault();p=true;x(c);b.strokeStyle=a("#"+e+"-colors div.selected").css("backgroundColor");n("start")},w=function(c){k==true&&c.preventDefault();if(p==true){x(c);n("move")}return false}, t=function(){p=false;n("stop")}}else alert("Your browser does not support <canvas>")}else alert(".drawbox() only works on <canvas> elements")})}})})(jQuery);
