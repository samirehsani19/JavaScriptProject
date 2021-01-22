
$(document).ready(()=>{
    $('#search-form').on('input', (e)=>{
        let searchText= $('#search-text').val();
        
        const regex= "^[a-zA-Z0-9 ]{3,25}$";
        const CheckValidInput = RegExp(regex);
        var result =CheckValidInput.test(searchText);
        GetApiKey();

        if(result)
        {
            getMovie(searchText);
            e.preventDefault();
        }
    })
    
});

let apiKey='';
function TryGetApiKey(){
    $.getJSON("../Key.json", (key)=> { apiKey =key.apiKey + '&s='; })
}


function getMovie(searchText){
    
    if(searchText=="")
    {
        console.log('Please type a movie name');
    }

   fetch(apiKey + searchText)
   .then(response => response.json())
   .then(data => {  

       let output='';
        data.Search.forEach(movie => {
            output += `
            <div class="movie">
                <img src="${movie.Poster}">
                <div class="-movie-details">
                    <div class="detial-item"> 
                        <h4 class="title"> ${movie.Title}</h4>
                        <p> ${movie.Year}</p>
                    </div>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary movie-btn" 
                    href="http://imdb.com/title/${movie.imdbID}" target="blank"> Movie Details</a> 
                    
                    <a id="trailer-btn" href="http://m.imdb.com/title/${movie.imdbID}/videogallery" target="popup">Watch trailer</a>
                </div>
            </div>

            `;
        });

        $('#movies').html(output);

   })
   .catch(err => {
       console.log('An error has occured', err);
   })
}

let index =0;
$('#bg-btn').on('click', ()=>{
    var color =['brown','black', 'darkblue', 'darkcyan', 'darkslateblue', 'darkslategray', 'teal', 'indigo','slategray', 'midnightblue'];
   
    $('body').css('background-color', color[index])
    index++;
    if(index==color.length){index = 0;}
})

