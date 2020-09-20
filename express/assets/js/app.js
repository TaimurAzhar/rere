var artist_search_button = document.querySelector('#search-button');
var artist_input_form = document.querySelector('#artist-form');
var inputValue = document.querySelector('.inputValue');
var artist_info_section = document.querySelector('#artist-info-section');
var artist_name = document.querySelector('.artist-name');
var artist_image = document.querySelector('.artist-image');
var fb_link = document.querySelector('.fb-link');
var events_link = document.querySelector('.events-link');
var fb_button = document.querySelector('#fb-button');
var fb_error_display = document.querySelector('#fb-error');
var events_button = document.querySelector('#events-button');
var artist_info = document.querySelector('.artist-info');

var number_of_events = document.querySelector('.number-of-events');
var event_div = document.querySelector('.event-info-display');

//var event_style_div = document.querySelector('.event-style-div');




var ul = document.createElement('ul');
var li = document.createElement('li');

var counter = 0;

var artist_search_array = [];
var artist_events_array = []

function createNewUl(){

  var ul = document.createElement('ul');
  return ul;

}


inputValue.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    artist_search_button.click();
  }
  });



artist_search_button.addEventListener('click', function(){
  

  artist_info_section.classList.remove('hide-display');

  fb_error_display.classList.add("hide-display");



  fetch('https://rest.bandsintown.com/artists/'+inputValue.value+'/?app_id=codingbootcamp')
  .then(response => response.json())
  .then(data => {

    

    if(counter >= 1){


        artist_events_array.length = 0;
        ul.innerHTML = " ";
        ul.parentNode.removeChild(ul); 
        counter -= 1;
    }

   
    artist_search_array.push(data);
    for( var x= 0; x< artist_search_array.length; x++) {


    number_of_events.innerHTML = '';

    

    var nameValue = artist_search_array[x].name;
    var fbPageUrl = artist_search_array[x].facebook_page_url;
    var artistImageUrl = artist_search_array[x].image_url;

    


  
    if(nameValue == undefined){
      
      number_of_events.innerHTML = '';
      // hide event detail div as artist does not exist.
      artist_name.innerHTML = "0 Results Found for " + inputValue.value;
      //hide artist image, fb profile view button and view events button as artist does not exist.
      artist_image.classList.add("hide-display");
      // fb_button.parentNode.removeChild(fb_button);
      // events_button.parentNode.removeChild(events_button);
      fb_button.style.display='none';
      events_button.style.display='none';
      // fb_button.style.visibility='hidden';
      // events_button.style.visibility='hidden';



    }
    
    else{

      
      
      artist_name.innerHTML = nameValue;
      fb_button.style.display='inline-block';
      events_button.style.display='inline-block';
      artist_image.classList.remove("hide-display");

      

        fb_link.onclick = function(event){


          // Display error message if artist's FB page does not exist
          if(fbPageUrl != "") {

            
            fb_link.setAttribute("href",fbPageUrl); 
          }
          else{
            event.preventDefault();
            fb_error_display.classList.remove("hide-display");
            
          }

        }
    

      artist_image.setAttribute("src",artistImageUrl);




    }

    artist_search_array.length = [];
  
  }
    





  
    
  })
  .catch((err)=>console.log(err))

});


events_button.addEventListener('click',function(){




  fetch('https://rest.bandsintown.com/artists/'+inputValue.value+'/events/?app_id=codingbootcamp')
  .then(
    response => response.json()
    )
  .then(data => { 

  
    var events_length = data.length;
    console.log(events_length);
    number_of_events.innerHTML = events_length+ " Upcoming Events";

    
    
        if (events_length == 0){

          number_of_events.innerHTML = "No Upcoming Events";
          
          
        }
        
        else {

          counter += 1;

          for (var x = 0 ; x < events_length; x++){

      
              artist_events_array.push(data[x]);
              console.log(artist_events_array[x]);

              


              let eventCard = document.createElement('div');
              eventCard.className = 'event-card';
              var ul = document.createElement('ul');
              ul.setAttribute('class', 'event-details-list');
              var heading = document.createElement('h4');
              heading.setAttribute('class', 'event-heading');

              heading.innerHTML = "EVENT DETAILS";
              eventCard.appendChild(heading)

              var country = document.createElement('li');
              var city = document.createElement('li');
              var e_venue = document.createElement('li');
              var date = document.createElement('li');
              // var latitude = document.createElement('li');
              // var longitude = document.createElement('li');
              var map_button = document.createElement('button');

              country.setAttribute('class', 'event-country');
              city.setAttribute('class', 'event-city');
              e_venue.setAttribute('class', 'event-venue');
              date.setAttribute('class', 'event-date');
              // latitude.setAttribute('class', 'event-latitude');
              // longitude.setAttribute('class', 'event-longitude');

              // map_button.setAttribute('class', 'map-button');
          

              country.innerHTML = "<strong>Country: </strong>" + "<p>" + artist_events_array[x].venue.country + "</p>";
              city.innerHTML = "<strong>City: </strong>" + "<p>" + artist_events_array[x].venue.city + "</p>";
              e_venue.innerHTML = "<strong>Venue: </strong>" + "<p>" + artist_events_array[x].venue.name + "</p>";
             
              date.innerHTML = "<strong>Date: </strong>" + "<p>" + artist_events_array[x].datetime + "</p>";

              // latitude.innerHTML =  "<strong>Latitude value: </strong>" + artist_events_array[x].venue.latitude;
              // longitude.innerHTML =  "<strong>Longitude value: </strong>" + artist_events_array[x].venue.longitude;
              
              // map_button.innerHTML = "View on Map";

              
              
              // ul.appendChild(heading);
              ul.appendChild(country);
              ul.appendChild(city);
              ul.appendChild(e_venue);
              ul.appendChild(date);
              eventCard.appendChild(ul);
              event_div.appendChild(eventCard);

              // ul.appendChild(latitude);
              // ul.appendChild(longitude);
              // ul.appendChild(map_button);

              // map_button.addEventListener('click', function(){
              //   initMap();

              // });
              



              //event_div.appendChild(ul);
              //event_style_div.appendChild(ul);
              
               
              
            console.log(artist_events_array.length);
            

          }
          //console.log(ul)

          
      

    }

  

  
  })
  .catch((err)=>console.log(err))

})


