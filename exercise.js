$(document).ready(function() {

    $('#updateForm').on('submit', function(event) {
        event.preventDefault();

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
                alert(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', errorThrown);

            }
        });
    });
});

    