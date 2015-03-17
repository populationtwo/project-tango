function init(e) {
	var $submitFormBtn = $( document.getElementById( 'submitForm' ) );
	$submitFormBtn.click( validateForm );
}

function is_valid_url(url) {
	return url.match( /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/ );
}
function is_valid_email(email) {
	return email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
}

function validateForm(e) {
	var formMessages = Array(),
		emailValue = $( "input[type='email']" ).val(),
		urlValue = $( "input[type='url']" ).val();


	if (!emailValue && !urlValue) {
		formMessages.push( 'Please enter all required fields.' );
	} else {
		if (!emailValue || !is_valid_email( emailValue )) {
			formMessages.push( 'Please enter a valid email address.' );
		}
		if (!urlValue || !is_valid_url( urlValue )) {
			formMessages.push( 'Please enter URL' );
		}
	}

	showDialog( formMessages );

	if (formMessages.length) {
		return false;
	}

}

function showDialog(errors) {
	var $errorDialog = $( document.getElementById( 'errorDialog' ) ),
		messageString;

	if (!errors.length) {
		$errorDialog.empty();
		return false;
	}

	messageString = '<div class="warning">';
	for (var i = 0; i < errors.length; i++) {
		messageString += '<p>' + errors[i] + '</p>';
	}
	messageString += '</div>';

	$errorDialog.html( messageString );
}

document.addEventListener( 'DOMContentLoaded', init );
