/**
 * jQuery DrawBox Plug-In 0.3
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
			}

			var options = $.extend(defaults, options);

			return this.each(function()
			{
				if (this.nodeName == 'CANVAS')
				{
					$(this).css('cursor', 'pointer');

					if (this.getContext)
					{
						var context = this.getContext('2d');

						context.underInteractionEnabled = true;

						// Overrides with passed options
						if (typeof(options.strokeStyle) != "undefined") { context.strokeStyle = options.strokeStyle; }
						if (typeof(options.lineWidth)   != "undefined") { context.lineWidth   = options.lineWidth;   }
						if (typeof(options.lineCap)     != "undefined") { context.lineCap     = options.lineCap;     }
						if (typeof(options.lineJoin)    != "undefined") { context.lineJoin    = options.lineJoin;    }

						var drawing = false;
						var offsetX = $(this).attr('offsetLeft');
						var offsetY = $(this).attr('offsetTop');
						var x       = false;
						var y       = false;

						$(this).mousedown(function(e)
						{
							drawingStart(e);
						});

						$(this).mousemove(function(e)
						{
							drawingMove(e);
						});

						$(this).mouseup(function()
						{
							drawingStop();
						});
							
						function drawingStart(e)
						{
							// iPhone/iPad/iPod support
							if (typeof(event) != "undefined" && typeof(event.touches) != "undefined")
							{
								e = event.touches.item(0);
							}

							drawing = true;

							x = e.clientX - offsetX;
							y = e.clientY - offsetY;

							context.moveTo(x, y);
						}
							
						function drawingMove(e)
						{
							// Keeps iPad from scrolling while drawing
							e.preventDefault();
							
							// iPhone/iPad/iPod support
							if (typeof(event) != "undefined" && typeof(event.touches) != "undefined")
							{
								e = event.touches.item(0);
							}

							if (drawing == true)
							{
								x = e.clientX - offsetX;
								y = e.clientY - offsetY;

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

						// iPad / Touch System events
						$(this).bind('touchstart',  function(e) { drawingStart(e); });
						$(this).bind('touchmove',   function(e) { drawingMove(e);  });
						$(this).bind('touchend',    function(e) { drawingStop(e);  });
						$(this).bind('touchcancel', function()  { drawingStop();   });
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
