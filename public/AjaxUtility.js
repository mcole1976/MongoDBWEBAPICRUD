class AjaxUtility {

static fnMakeAjaxCall(url, method, data,token) {
    return fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json(); // Parse JSON if the response is JSON
        } else {
            return null; // Return null if there is no response body
        }
        //return response.json();
    });
}

static getJSON(url, token) {
    return fetch(url,  {
        headers: {
            'Authorization': `Bearer ${token}` // Include the token here
        } })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        });
}

// static logapi(url) {
//     return AjaxUtility.getJSON(url)
//         .then(function(response) {
//             if (!response.token) {
//                 throw new Error('Token is missing in the response');
//             }
//             console.log(response.token);
//             return response.token; // Return the token
//         })
//         .catch(function(error) {
//             console.error('Error:', error);
//             throw error; // Re-throw the error to handle it in the calling code
//         });
// }
static async logapi(url) {
    try {
        const response = await AjaxUtility.getJSON(url);
        
        if (!response?.token) {
            throw new Error('Token is missing in the response');
        }

        console.log('Token received:', response.token);
        return response.token; // Resolve with the token
    } catch (error) {
        console.error('Error in logapi:', error);
        throw error; // Re-throw to let caller handle it
    }
}



}
