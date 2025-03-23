$(document).ready(function() {

    fetchAndRenderFoodDetails('/api/getexercisedetails')
    .then(data => {
        console.log('Data fetched and rendered successfully!', data);
    })
    .catch(error => {
        console.error('Failed to fetch or render data:', error);
    });

  



});


function fetchAndRenderFoodDetails(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                let rows = '';
                data.forEach(item => {
                    rows += `<tr data-id="${item.id}">
                        <td><input type="text" value="${item.exercise_Name}" class="editable description"></td>
                        <td><input type="text" value="${item.calorieCount}" class="editable calories"></td>
                        <td><input type="text" value="${item.exercise_Time}" class="editable time"></td>
                        <td><input type="text" value="${new Date(item.date).toISOString().split('T')[0]}" class="editable date"></td>
                        <td><button class="save-btn">Save</button></td>
                    </tr>`;
                });
                document.getElementById('data-table').innerHTML = rows;

                 // Add event listeners to all save buttons
                 const saveButtons = document.querySelectorAll('.save-btn');
                 saveButtons.forEach(button => {
                     button.addEventListener('click', handleSave);
                 });


                resolve(data); // Resolve the promise with the fetched data
            })
            .catch(error => {
                console.error('Error fetching or rendering data:', error);
                reject(error); // Reject the promise if there's an error
            });
    });


}

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