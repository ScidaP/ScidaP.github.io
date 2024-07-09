function openModal(shiftID, shiftStartTime, shiftDay) {
	var shiftNumberInput = document.getElementById('shiftNumber');
	var formModalTitle = document.getElementById('formModalLabel');
	var shiftTimeInput = document.getElementById('shiftTime');
	var shiftDayInput = document.getElementById('shiftDay');

	// Set the shift number and day in the modal inputs
	shiftNumberInput.value = shiftID;
	shiftTimeInput.value = shiftStartTime;
	shiftDayInput.value = shiftDay;
	formModalTitle.innerHTML = "Reservar turno<br>" + shiftDay;
}

function showForm() {
    // Get the form element by its ID
	var cardCheckmark = document.getElementById('card-checkmark');
    var registerForm = document.getElementById('frmRegister');
	var buttonShowForm = document.getElementById('button-show-form');
	var successH1 = document.getElementById('success_h1');

    // Check if the form is currently hidden
    if (registerForm.style.display === 'none') {
        // If hidden, show the form by changing display to 'inline-block'
        registerForm.style.display = 'inline-block';
		cardCheckmark.style.display = 'none';
		buttonShowForm.style.display = 'none';
		successH1.style.color = 'black';
		successH1.innerHTML = 'Notificar a:';
    } else {
        // If visible, hide the form by changing display to 'none'
        registerForm.style.display = 'none';
		cardCheckmark.style.display = 'inline-block';
		buttonShowForm.style.display = 'inline-block';
		successH1.style.color = '#88B04B';
		successH1.innerHTML = 'Turno reservado';
    }
}


$(document).ready(function () {
	// Handle the click event of the "Reservar" button
	$(".btn-primary-send").click(function () {
		// Explicitly submit the form when the "Reservar" button is clicked
		$("form#demo-form").submit();
	});
});