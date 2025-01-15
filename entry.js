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

    $.getJSON('/api/oneday', function (data) 
    
        { 
            var rows = ''; 
            console.log(data);
            $.each(data, function (index, item) 
            { 
                rows += '<tr>'; rows += '<td>' 
                + item.meal + '</td>'; rows += '<td>' + 
                item.meal_Description + '</td>' 
                + '<td>' + item.calorie_Count 
                + '</td>'; rows += '<td>' 
                + moment(item.date).format("MM/DD/YYYY");+ '</td>'; rows += '</tr>'; }); 
            $('#data-table').html(rows); 
        }
    );



});
function clearForm() { 
    const form = document.getElementById('updateForm'); 
    if (form) 
    { 
        form.reset(); 
        location.reload();
    } 
    else 
    { 
        console.error("Form not found with ID:"); 
    } 
}

 
