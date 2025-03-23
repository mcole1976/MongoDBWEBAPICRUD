document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('updateForm');
    const submitButton = document.getElementById('exAddB');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Disable the button
        FormUtils.disableButton(submitButton);

        // Gather form data
        const formData = {
            exercise_Name: document.getElementById('Description').value,
            calorie_Count: parseFloat(document.getElementById('Calories').value),
            exercise_Time: parseFloat(document.getElementById('Time_taken').value),
            date: new Date().toISOString(), // Add current timestamp
            exercise_ID: 4,
        };

        // Validation rules
        const rules = {
            exercise_Name: 'string',
            exercise_Time: 'number',
            calorie_Count: 'number',
            date: 'date',
        };

        console.log(formData);

        // Validate the form data
        const validationResult = Validator.validate(formData, rules);
        if (!validationResult.isValid) {
            console.log("Validation errors:", validationResult.errors);
            alert("Please fix the validation errors before submitting.");
            ButtonUtils.enableButtonAfterDelay(submitButton, 1000); // Re-enable the button after 1 second
        } else {
            // Make an AJAX call
            AjaxUtility.fnMakeAjaxCall('http://192.168.0.2:3000/add-ex', 'POST', formData)
                .then(function (response) {
                    console.log('Success:', response);
                    clearForm(); // Clear the form
                })
                .catch(function (error) {
                    console.error('Error:', error);
                })
                .finally(function () {
                    FormUtils.enableButtonAfterDelay(submitButton, 1000); // Re-enable the button
                });
        }
    });

    // Function to clear the form
    function clearForm() {
        document.getElementById('Description').value = '';
        document.getElementById('Calories').value = '';
        document.getElementById('Time_taken').value = '';
    }

    // Function to make an AJAX call (vanilla JS replacement for jQuery.ajax)
    function fnMakeAjaxCall(url, method, data) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
});