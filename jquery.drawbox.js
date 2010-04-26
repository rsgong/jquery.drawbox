/**
 * jQuery DrawBox Plug-In 0.5
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

(function($)
{
	$.fn.extend(
	{
		drawbox: function(options)
		{
			var defaults = {
				lineWidth:     1.0,
				lineCap:       'butt',
				lineJoin:      'miter',
				miterLimit:    10,
				strokeStyle:   'black',
				shadowOffsetX: 0.0,
				shadowOffsetY: 0.0,
				shadowBlur:    0.0,
				shadowColor:   'transparent black',
				showClear:     true,
				clearLabel:    'Clear Canvas'
			}

			var options = $.extend(defaults, options);

			return this.each(function()
			{
				if (this.nodeName == 'CANVAS')
				{
					$(this).css('cursor',   'pointer');
					$(this).attr('onclick', 'function onclick(event) { void 1; }');

					if (this.getContext)
					{
						var canvas  = this;
						var context = this.getContext('2d');
						var id      = $(this).attr('id');

						context.underInteractionEnabled = true;

						// Overrides with passed options
						context.lineWidth     = options.lineWidth;
						context.lineCap       = options.lineCap;
						context.lineJoin      = options.lineJoin;
						context.miterLimit    = options.miterLimit;
						context.strokeStyle   = options.strokeStyle;
						context.shadowOffsetX = options.shadowOffsetX;
						context.shadowOffsetY = options.shadowOffsetY;
						context.shadowBlur    = options.shadowBlur;
						context.shadowColor   = options.shadowColor;
						
						if (options.showClear == true)
						{
							$(this).after('<div id="' + id + '-clear">' + options.clearLabel + '</div>');
							clear = true;
						}

						var data_input = id + '-data';
						$(this).after('<input type="hidden" id="' + data_input + '" name="' + data_input + '" />');

						var drawing = false;
						var offsetX = $(this).attr('offsetLeft');
						var offsetY = $(this).attr('offsetTop');
						var prevX   = false;
						var prevY   = false;
						var x       = false;
						var y       = false;

						// Mouse events
						$(this).mousedown(function(e) { drawingStart(e); });
						$(this).mousemove(function(e) { drawingMove(e);  });
						$(this).mouseup(  function()  { drawingStop();   });

						// Touch events
						$(this).bind('touchstart',  function(e) { drawingStart(e); });
						$(this).bind('touchmove',   function(e) { drawingMove(e);  });
						$(this).bind('touchend',    function(e) { drawingStop(e);  });
						$(this).bind('touchcancel', function()  { drawingStop();   });
							
						// Other events
						$('#' + id + '-clear').click(function(e)
						{
							context.save();
							context.beginPath();
							context.closePath();
							context.restore();
							context.clearRect(0, 0, $(canvas).width(), $(canvas).height());

							$('#' + data_input).val('');
						});

						function getTouch(e)
						{
							// iPhone/iPad/iPod uses event.touches and not the passed event
							if (typeof(event) != "undefined" && typeof(event.touches) != "undefined")
							{
								e = event.touches.item(0);
							}
							
							// Tracks last position to handle dots (as opposed to lines)
							if (x != false)
							{
								prevX = x;
								prevY = y;
							}

							// Calculates the X and Y values
							x = e.clientX - offsetX;
							y = e.clientY - offsetY;

							return e;
						}

						function draw(type)
						{
							var element = $('#' + data_input);

							if (type != 'stop')
							{
								if (element.val().length > 0)
								{
									element.val(element.val() + ' ');
								}

								if (type == 'start')
								{
									prevX = false;
									prevY = false;

									var command = 'M';
									context.moveTo(x, y);
								}
								else if (type == 'move')
								{
									var command = 'L';
								
									// If there's no previous increment since it's a .
									if (prevX == false)
									{
										x = x + 1;
										y = y + 1;
									}

									context.lineTo(x, y);
								}

								context.stroke();
								element.val(element.val() + command + x + ' ' + y);
							}
							else
							{
								draw('move');
							}
						}

						function drawingStart(e)
						{
							drawing = true;

							e = getTouch(e);

							draw('start');
						}
							
						function drawingMove(e)
						{
							// Keeps iPad from scrolling while drawing
							e.preventDefault();
						
							if (drawing == true)
							{
								e = getTouch(e);

								draw('move');
							}
						}

						function drawingStop()
						{
							drawing = false;

							// Draws one last line so we can draw dots (e.g. i)
							draw('stop');
						}
					}
					else
					{
						alert('Your browser does not support <canvas>');
					}
				}
				else
				{
					alert('.drawbox() only works on <canvas> elements');					
				}
			});
		}
	});
})(jQuery);
