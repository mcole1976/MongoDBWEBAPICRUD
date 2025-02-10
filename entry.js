$(document).ready(function() {

    $('#updateForm').on('submit', function(event) {
        event.preventDefault();
        var button = document.getElementById('entryB');
        button.disabled = true;
        const formData = {
            meal: $('#meal').val(),
            calorie_Count: $('#calorie_Count').val(),
            meal_Description: $('#meal_Description').val(),
            date: new Date().toISOString() // Add current timestamp
            
        };


        fnMakeAjaxCall('http://192.168.0.2:3000/add-data', 'POST', formData)
            .then (function(response) {
                // This function will be called when the AJAX request is successful
                clearForm(); // Clear the form only after the data has been successfully posted
                button.disabled = false; // Re-enable the button
            })
            .catch( function(error) {
                // This function will be called if the AJAX request fails
                console.error('Error:', error);
                button.disabled = false; // Re-enable the button even if the request fails
            })
            .finally(function() {
                // This block runs regardless of success or failure
                button.disabled = false; // Re-enable the button
            }


        );

        
        
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

function fnMakeAjaxCall(url, method, data)
{
    return new Promise((resolve, reject) =>
    {
        $.ajax(
            {
                url: url,
                type: method,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    resolve(response); // Resolve the Promise with the response
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown); // Reject the Promise with the error
                }

            });
    });
}


 
