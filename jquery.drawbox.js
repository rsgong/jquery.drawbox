/**
 * jQuery DrawBox Plug-In 0.4
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
				showClear:  true,
				clearLabel: 'Clear Canvas'
			}

			var options = $.extend(defaults, options);

			return this.each(function()
			{
				if (this.nodeName == 'CANVAS')
				{
					$(this).css('cursor', 'pointer');

					if (this.getContext)
					{
						var canvas  = this;
						var context = this.getContext('2d');

						context.underInteractionEnabled = true;

						// Overrides with passed options
						if (typeof(options.strokeStyle) != 'undefined') { context.strokeStyle = options.strokeStyle; }
						if (typeof(options.lineWidth)   != 'undefined') { context.lineWidth   = options.lineWidth;   }
						if (typeof(options.lineCap)     != 'undefined') { context.lineCap     = options.lineCap;     }
						if (typeof(options.lineJoin)    != 'undefined') { context.lineJoin    = options.lineJoin;    }
						
						if (options.showClear == true)
						{
							$(this).after('<div class="drawbox-clear">' + options.clearLabel + '</div>');
							clear = true;
						}

						var drawing = false;
						var offsetX = $(this).attr('offsetLeft');
						var offsetY = $(this).attr('offsetTop');
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
						$('.drawbox-clear').click(function(e)
						{
							context.save();
							context.beginPath();
							context.closePath();
							context.restore();
							context.clearRect(0, 0, $(canvas).width(), $(canvas).height());
						});

						function getTouch(e)
						{
							// iPhone/iPad/iPod uses event.touches and not the passed event
							if (typeof(event) != "undefined" && typeof(event.touches) != "undefined")
							{
								e = event.touches.item(0);
							}

							// Calculates the X and Y values
							x = e.clientX - offsetX;
							y = e.clientY - offsetY;

							return e;
						}

						function drawingStart(e)
						{
							drawing = true;

							e = getTouch(e);

							context.moveTo(x, y);
						}
							
						function drawingMove(e)
						{
							// Keeps iPad from scrolling while drawing
							e.preventDefault();
						
							if (drawing == true)
							{
								e = getTouch(e);

								context.lineTo(x, y);
								context.stroke();
							}
						}

						function drawingStop()
						{
							drawing = false;

							// Draws one last line so we can draw dots (e.g. i)
							context.lineTo(x, y);
							context.stroke();
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
