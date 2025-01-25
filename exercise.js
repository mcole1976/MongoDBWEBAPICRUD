$(document).ready(function() {

    $('#updateForm').on('submit', function(event) {
        event.preventDefault();

        var button = document.getElementById('exAddB');
        button.disabled = true;

        const formData = {
            exercise_Name: $('#Description').val(),
            calorie_Count: $('#Calories').val(),
            exercise_Time: $('#Time_taken').val(),
            date: new Date().toISOString(), // Add current timestamp
            exercise_ID: 4
            
        };
        console.log(formData);
        $.ajax({
            url: 'http://localhost:3000/add-ex',
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

        setTimeout(function() {
            //alert('Button Clicked!');
            button.disabled = false;
        }, 1000);


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
    
