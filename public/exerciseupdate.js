

    // fetchAndRenderFoodDetails('/api/getexercisedetails', logapi)
    // .then(data => {
    //     console.log('Data fetched and rendered successfully!', data);
    // })
    // .catch(error => {
    //     console.error('Failed to fetch or render data:', error);
    // });

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
      
      // Usage
      getToken()
  .then(token => {
    console.log('Token passed to fetchAndRenderFoodDetails:', token);
    return fetchAndRenderExerciseDetails('/api/getexercisedetails', token);
  })
  .then(foodData => console.log('Rendered data:', foodData))
  .catch(error => console.error('Error:', error));



  const fetchAndRenderExerciseDetails = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      let rows ='';
      data.forEach(item => {
        rows += `<tr data-id="${item.id}">
          <td><input type="text" value="${item.exercise_Name}" class="editable description"></td>
          <td><input type="text" value="${item.calorieCount}" class="editable calories"></td>
          <td><input type="text" value="${item.exercise_Time}" class="editable time"></td>
          <td><input type="text" value="${new Date(item.date).toISOString().split('T')[0]}" class="editable date"></td>
          <td><button class="save-btn">Save</button></td>
        </tr>`;
        document.getElementById('data-table').innerHTML = rows;

        return data;
      });
    } catch (error) {
      console.error('Error in Exercise Call Details:', error);
      throw error;
    }
  };

function handleSave(event) {
    const row = event.target.closest('tr'); // Get the closest row
    const id = row.getAttribute('data-id'); // Get the hidden ID from the data attribute
    const time = row.querySelector('.time').value;
    const description = row.querySelector('.description').value;
    const calories = row.querySelector('.calories').value;
    const date = row.querySelector('.date').value;

    //Create an object with the updated data
    const ExerciseData = {
        id: id,
        time: time,
        exercise_Name: description,
        calorie_Count: calories,
        date: new Date(date).toISOString(),
    };
    console.log(ExerciseData);
    const rules = {
        exercise_Name: 'string',
        time: 'number',
        calorie_Count: 'number',
        date: 'date',
    };

    
    console.log(calories);
    
    const validationResult = Validator.validate(ExerciseData, rules);
    if (!validationResult.isValid) {
        console.log("Validation errors:", validationResult.errors);
        alert("Please fix the validation errors before submitting.");
    } 
    else 
    {
    // // Send the updated data to the server
        fetch('api/updateE', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ExerciseData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            return response.text();
        })
        .then(text => {
            console.log('Data updated successfully:', text);
            //alert('Data updated successfully!');
        })
        
        .catch(error => {
            console.log('Error updating data:', error);
            //  alert('Failed to update data. Please try again.');
        });
    }
}
function logapi()
{

    AjaxUtility.getJSON('https://localhost:44377/api/access/token')
                .then (function(response) {
                    // This function will be called when the AJAX request is successful
                    //clearForm(); // Clear the form only after the data has been successfully posted
                    //submitButton.disabled = false; // Re-enable the button
                    console.log(response.token);
                    return response.token;
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
 
