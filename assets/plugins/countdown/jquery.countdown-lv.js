/* http://keith-wood.name/countdown.html
 * Latvian initialisation for the jQuery countdown extension
 * Written by JÄnis Peisenieks janis.peisenieks@gmail.com (2010) */
(function($) {
	$.countdown.regionalOptions['lv'] = {
		labels: ['Gadi', 'MÄ“neÅ¡i', 'NedÄ“Ä¼as', 'Dienas', 'Stundas', 'MinÅ«tes', 'Sekundes'],
		labels1: ['Gads', 'MÄ“nesis', 'NedÄ“Ä¼a', 'Diena', 'Stunda', 'MinÅ«te', 'Sekunde'],
		compactLabels: ['l', 'm', 'n', 'd'], compactLabels1: ['g', 'm', 'n', 'd'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['lv']);
})(jQuery);