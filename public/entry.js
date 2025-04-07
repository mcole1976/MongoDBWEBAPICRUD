    const getToken = async  ()  => {
        try {
            const token = await AjaxUtility.logapi('https://localhost:44377/api/access/token');
            console.log('Token received by getToken:', token); // Debug
            return token;
        } catch (error) {
            console.error('Error in getToken:', error);
            throw error;
        }
        
    };


    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('updateForm');
        const submitButton = document.getElementById('entryB');

        // Add a submit event listener to the form
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Disable the button
            FormUtils.disableButton(submitButton);



            const formData = {
                meal: $('#meal').val(),
                calorie_Count: $('#calorie_Count').val(),
                meal_Description: $('#meal_Description').val(),
                date: new Date().toISOString() // Add current timestamp
                
            };

            const rules = {
                meal: 'string',
                meal_Description: 'string',
                calorie_Count: 'number',
                date: 'date',
            };


            const validationResult = Validator.validate(formData, rules);

            if (!validationResult.isValid) {
                console.log("Validation errors:", validationResult.errors);
                alert("Please fix the validation errors before submitting.");
            } 
            else
            {
                getToken()
                .then(token => {
                    console.log('Token passed to further code:', token);
                    AjaxUtility.fnMakeAjaxCall('http://192.168.0.166:3000/add-data', 'POST', formData, token)
                    .then (function(response) {
                        // This function will be called when the AJAX request is successful
                        clearForm(); // Clear the form only after the data has been successfully posted
                        submitButton.disabled = false; // Re-enable the button
                    })
                    .catch( function(error) {
                        // This function will be called if the AJAX request fails
                        console.error('Error:', error);
                        submitButton.disabled = false; // Re-enable the button even if the request fails
                    })
                    .finally(function() {
                        // This block runs regardless of success or failure
                        //submitButton.disabled = false; // Re-enable the button
                        console.error('Finally: Complete');
                    }


                );
                })
                .catch( function(error) {
                    // This function will be called if the AJAX request fails
                    console.error('Error:', error);
                    //submitButton.disabled = false; // Re-enable the button even if the request fails
                })
                .finally(function() {
                    // This block runs regardless of success or failure
                    //submitButton.disabled = false; // Re-enable the button
                    console.error('Finally: Complete');
                })



            }

                
            
            
            
        });


        fnSetGrid('/api/oneday')
        // $.getJSON('/api/oneday', function (data) 
        
        //     { 
        //         var rows = ''; 
        //         console.log(data);
        //         $.each(data, function (index, item) 
        //         { 
        //             rows += '<tr>'; rows += '<td>' 
        //             + item.meal + '</td>'; rows += '<td>' + 
        //             item.meal_Description + '</td>' 
        //             + '<td>' + item.calorie_Count 
        //             + '</td>'; rows += '<td>' 
        //             + moment(item.date).format("MM/DD/YYYY");+ '</td>'; rows += '</tr>'; }); 
        //         $('#data-table').html(rows); 
        //     }
        // );




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

    function fnSetGrid(address)
    {
        
        
        // Usage
        getToken()
    .then(token => {
        console.log('Token passed to further code:', token);
        AjaxUtility.getJSON(address, token)
        .then(data => {
            let rows = '';
            //console.log(data);
            console.log(token);
            // Loop through the data and build the table rows
            data.forEach(item => {
                rows += '<tr>';
                rows += `<td>${item.meal}</td>`;
                rows += `<td>${item.meal_Description}</td>`;
                rows += `<td>${item.calorie_Count}</td>`;
                rows += `<td>${moment(item.date).format('MM/DD/YYYY')}</td>`;
                rows += '</tr>';
            });

            // Insert the rows into the table
            document.getElementById('data-table').innerHTML = rows;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        
        
    })
    
    .catch(error => console.error('Error:', error));

    
    }


    });

    function logapi()
    {
        const data = {};
        AjaxUtility.getJSON('https://localhost:44377/api/access/token')
                    .then (function(response) {
                        // This function will be called when the AJAX request is successful
                        //clearForm(); // Clear the form only after the data has been successfully posted
                        //submitButton.disabled = false; // Re-enable the button
                        console.log(response);
                        console.log(response.token);

                    })
                    .catch( function(error) {
                        // This function will be called if the AJAX request fails
                        console.error('Error:', error);
                        //submitButton.disabled = false; // Re-enable the button even if the request fails
                    })
                    .finally(function() {
                        // This block runs regardless of success or failure
                        //submitButton.disabled = false; // Re-enable the button
                        console.error('Finally: Complete');
                    }


                );
    }
 
