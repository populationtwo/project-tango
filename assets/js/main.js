function init() {

	var $submitFormBtn = $( document.getElementById( 'submitForm' ) ),//Wrap HTML in jQuery because it's faster. http://jsperf.com/wrap-an-element-or-html-collection-in-jquery
		$radioInput = $( "input[type='radio']" );

	// Set event handler
	$submitFormBtn.click( validateForm );
	$radioInput.change( displayTextField );
}

// Check URL
function is_valid_url(url) {
	return url.match( /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/ );
}

// Check Email
function is_valid_email(email) {
	return email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ );
}

// Validate form elements
function validateForm() {
	var formMessages = Array(),
		emailValue = $( "input[type='email']" ).val(),
		urlValue = $( "input[type='url']" ).val(),
		otherSource = $( '#otherSource' ).val();
	$radioOther = $( ":radio[value=Other]" );
	// If email and URL is empty.
	if (!emailValue && !urlValue) {
		formMessages.push( 'Please enter all required fields.' );
	} else {
		// If email is empty or invalid.
		if (!emailValue || !is_valid_email( emailValue )) {
			formMessages.push( 'Please enter a valid email address.' );
		}
		// If URL is empty or invalid.
		if (!urlValue || !is_valid_url( urlValue )) {
			formMessages.push( 'Please enter URL' );
		}
	}
	// If Other is selected and the source text field is empty.
	if ($radioOther.is( ":checked" ) && !otherSource) {
		formMessages.push( 'Please enter other source' );
	}

	// Display error messages
	showDialog( formMessages );

	if (formMessages.length) {
		return false;
	}

}

function displayTextField() {
	var $otherSource = $( document.getElementById( 'otherSource' ) );

	// If Other is selected, show the text field.
	if ($( this ).val() == "Other") {
		$otherSource.fadeIn( 'fast' );
	}
	else {
		$otherSource.hide();
	}
}

function showDialog(alertMsg) {
	var $errorDialog = $( document.getElementById( 'errorDialog' ) ),
		messageString;

	// If there is no error, remove the error dialog.
	if (!alertMsg.length) {
		$errorDialog.empty();
		return false;
	}

	messageString = '<div class="warning">';

	// Loop thorough each error messages
	for (var i = 0; i < alertMsg.length; i++) {
		messageString += '<p>' + alertMsg[i] + '</p>';
	}

	messageString += '</div>';

	// Display the error message.
	$errorDialog.hide().html( messageString ).fadeIn();
}

document.addEventListener( 'DOMContentLoaded', init );