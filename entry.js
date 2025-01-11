$(document).ready(function() {

    $('#updateForm').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            meal: $('#meal').val(),
            calorie_Count: $('#calorie_Count').val(),
            meal_Description: $('#meal_Description').val(),
            date: new Date().toISOString() // Add current timestamp
            
        };
        console.log(formData);
        $.ajax({
            url: 'http://localhost:3000/add-data',
            type: 'POST',
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            data: JSON.stringify(formData),
            success: function(data) {
                console.log(data);
                clearForm();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', errorThrown);

            }
        });
    });
});
function clearForm() { 
    const form = document.getElementById('updateForm'); 
    if (form) 
    { 
        form.reset(); 
    } 
    else 
    { 
        console.error("Form not found with ID:"); 
    } 
}

    
