var SITE = {
	init: function() {
		this.setVars();
		this.bindEvents();

		//this.$chapters.height($(document).height());
		//console.log(angular.element('.chapter'));
	},

	setVars: function() {
		// this.$document = $(window.document);
		// this.$body = $('body');
		// this.$chapters = $('.chapter');
	},

	bindEvents: function() {
	}

}

SITE.init();


/*$(document).ready(function() {
	$('.phase').height($(document).height());
	//$('.tile').height(($('.phase').height() - (3.4*50))/3);


	// $('.tile').css('background', 'url(' + '../../images/jin_blink1_small.gif' + ')')
	// $('.tile').css('background-repeat', 'no-repeat');
	// $('.tile').css('background-size', 'cover');

	var files = {

	}

	var options = {
		success: function(files) {
			//alert('here ya go: ' + files[0].link);
			for (var i = 0; i < files.length; i++) {
				console.log(files[i]);
				$('.tiles').append('<div class="tile"' + 'id=tile-' + i + '></div>');

				$('#tile-' + i).css('background', 'url("' + files[i].link + '")')
				$('#tile-' + i).css('background-repeat', 'no-repeat');
				$('#tile-' + i).css('background-size', 'cover');

			}


			$('.tiles').append('<div class="tile tile-plus"' + 'id=tile-' + files.length + '></div>');
			$('#tile-' + i).html('<span class="plus">+</span>');
			//$('#tile-' + i).find('.plus').css('line-height', $('.tile').height()/20);

			$('.tile').height(($('.phase').height() - (3.4*50))/3);
		},

		// Optional. Called when the user closes the dialog without selecting a file
	    // and does not include any parameters.
	    cancel: function() {

	    },

	    // Optional. "preview" (default) is a preview link to the document for sharing,
	    // "direct" is an expiring link to download the contents of the file. For more
	    // information about link types, see Link types below.
	    linkType: "direct", // or "direct"

	    // Optional. A value of false (default) limits selection to a single file, while
	    // true enables multiple file selection.
	    multiselect: true, // or true
	}

	// $('.btn').on('click', function(e) {
	// 	$(this).prop('contentEditable', true);
	// });

	//var button = Dropbox.createChooseButton(options);
	//document.getElementById("container").appendChild(button);

	$('#fetch-your-food').on('click', function(e) {
		Dropbox.choose(options);
	});
});*/
