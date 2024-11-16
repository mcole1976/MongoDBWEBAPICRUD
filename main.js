
$(document).ready(function () 
{ 
    $.getJSON('/api/data', function (data) 
    
    { var rows = ''; 
        console.log(data);
        $.each(data, function (index, item) 
        { rows += '<tr>'; rows += '<td>' + item.meal + '</td>'; rows += '<td>' + item.meal_Description + '</td>' + '<td>' + item.calorie_Count + '</td>'; rows += '<td>' + item.date + '</td>'; rows += '</tr>'; }); 
        $('#data-table').html(rows); });
 }); 
  