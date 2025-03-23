


    AjaxUtility.getJSON('/api/data')
    .then(data => {
        let rows = '';
        console.log(data);

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



