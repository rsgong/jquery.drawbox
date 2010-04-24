/**
 * jQuery DrawBox Plug-In 0.2
 *
 * http://github.com/crowdsavings/drawbox
 *
 * Author: Josh Sherman <josh@crowdsavings.com>
 * Copyright (c) 2010 CrowdSavings.com
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
					if (this.getContext)
					{
						var context = this.getContext('2d');
					}
					else
					{
						alert('Your browser does not support <canvas>');
					}

					var drawing = false;
					var offsetX = $(this).attr('offsetLeft');
					var offsetY = $(this).attr('offsetTop');

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
						if (typeof(event) != "undefined")
						{
							e = event.touches.item(0);
						}

						drawing = true;
						context.moveTo(e.clientX - offsetX, e.clientY - offsetY);
					}
						
					function drawingMove(e)
					{
						// Keeps iPad from scrolling while drawing
						e.preventDefault();
						
						// iPhone/iPad/iPod support
						if (typeof(event) != "undefined")
						{
							e = event.touches.item(0);
						}

						if (drawing == true)
						{
							context.underInteractionEnabled = true;
							context.lineTo(e.clientX - offsetX, e.clientY - offsetY);
							context.strokeStyle = '#000';
							context.stroke();
						}
					}

					function drawingStop()
					{
						drawing = false;
					}

					// iPad / Touch System events
					$(this).bind('touchstart',  function(e) { drawingStart(e); });
					$(this).bind('touchmove',   function(e) { drawingMove(e);  });
					$(this).bind('touchend',    function()  { drawingStop();   });
					$(this).bind('touchcancel', function()  { drawingStop();   });
				}
				else
				{
					alert('.drawbox() only works on <canvas> elements');					
				}
			});
		}
	});
})(jQuery);
