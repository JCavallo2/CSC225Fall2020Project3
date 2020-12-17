jQuery(document).ready(function($){
    $('#consoles').html('<img id="load" src="images/0_DqHGYPBA-ANwsma2.gif" alt="Loading...">');
    const request = axios.get('http://csc225.mockable.io/consoles');
    request.then(function(response){
         const consoles = response.data;
         const consolesHTML = consoles.map(function(elem){
             const { id, name: consoleName, image } = elem;

             return `
                
                <div data-id="${id}"class="card media cursor-pointer bg-dark hover-text">
                    <img class="card-img" src="${image}" alt="Card image" style="height: 15rem;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${consoleName}</h5>
                    </div>
                </div>
               
             `;
         }).join('');
         $('#consoles').html(consolesHTML);
    });

    jQuery('#consoles').on('click', '.media', function(){
        const id = $(this).attr('data-id');
        const consoleUrl = `http://csc225.mockable.io/consoles/${id}`;
        $('#console').html('<img id="load" src="images/0_DqHGYPBA-ANwsma2.gif" alt="Loading...">');
        
        axios.get(consoleUrl).then(function(response){
            const { id, name, price, country, releaseYear, image } = response.data;
            $('#console').html(`
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">Price: $${price}</p>
                        <p class="card-text">Country: ${country}</p>
                        <p class="card-text">Year of Release: ${releaseYear}</p>
                        <a href="#" class="btn btn-primary">Buy</a>
                    </div>
                </div>
            `);
        }).catch(function(error){
            alert('error!!!');
        });
    });
});