var button = document.querySelector('#search-button');
var inputValue = document.querySelector('.inputValue');
var artist_name = document.querySelector(".artist-name");
var artist_image = document.querySelector('.artist-image');
var artist_div = document.querySelector('.artist-info-display');
var fb_link = document.querySelector(".fb-link");
var fb_profile_button = document.querySelector("#fb-button");
var artist_events_link = document.querySelector(".events-link");
var artist_events_button = document.querySelector("#events-button");
var number_of_events = document.querySelector('.number-of-events');
var event_heading = document.querySelector(".event-heading");
var event_country = document.querySelector(".event-country");
var event_city = document.querySelector(".event-city");
var event_venue = document.querySelector(".event-venue");
var event_date = document.querySelector(".event-date");
var event_div = document.querySelector(".event-info-display");

var ul = document.createElement('ul');
var li = document.createElement('li');
var counter = 0;



var artist_search_array = [];
var artist_events_array = []

				
inputValue.addEventListener("keyup", function(event) {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
	  // Cancel the default action, if needed
	  event.preventDefault();
	  // Trigger the button element with a click
	  button.click();
	}
  });



button.addEventListener('click', function(){

	
	fetch('https://rest.bandsintown.com/artists/'+inputValue.value+'/?app_id=codingbootcamp')
	.then(response => response.json())
	.then(data => {

		if(counter >= 1){

			console.log(artist_events_array.length);
			while(artist_events_array.length > 0){
				artist_events_array.pop();
				if(artist_events_array.length == 0){
					break;
				}
			}

			console.log(artist_events_array.length);

			artist_events_array.length = 0;

			
			
			ul.innerHTML = " ";
			ul.parentNode.removeChild(ul); 

			counter -= 1;
		}


		

		


	
		
		artist_search_array.push(data);
		

		for( var x= 0; x< artist_search_array.length; x++) {


		number_of_events.innerHTML = '';

		//var nameValue = data["name"]
		//var fbPageUrl = data['facebook_page_url'];
		//var artistImageUrl = data['image_url'];

		var nameValue = artist_search_array[x].name;
		var fbPageUrl = artist_search_array[x].facebook_page_url;
		var artistImageUrl = artist_search_array[x].image_url;


		// console.log(artist_search_array.length);
		// console.log(artist_search_array[x].name);
		

		
		if(nameValue == undefined){
			
			number_of_events.innerHTML = '';
			// hide event detail div as artist does not exist.
			//event_div.classList.add('hide-display');
			artist_name.innerHTML = "0 Results Found for " + inputValue.value;
			//hide artist image, fb profile view button and view events button as artist does not exist.
			artist_image.classList.add("hide-display");
			fb_profile_button.classList.add("hide-display");
			artist_events_button.classList.add("hide-display");
		}
		
		else{
			
			artist_name.innerHTML = nameValue;
			fb_profile_button.classList.remove("hide-display");
			artist_events_button.classList.remove("hide-display");
			artist_image.classList.remove("hide-display");
			fb_link.onclick = function(){
				fb_link.setAttribute("href",fbPageUrl);
			}

			artist_image.setAttribute("src",artistImageUrl);

		}

		artist_search_array.length = [];
	
	}
		
	})
	.catch((err)=>console.log(err))

});






artist_events_button.addEventListener('click',function(){

	fetch('https://rest.bandsintown.com/artists/'+inputValue.value+'/events/?app_id=codingbootcamp')
	.then(
		response => response.json()
		)
	.then(data => { 

	
		var events_length = data.length;
		console.log(events_length);
		number_of_events.innerHTML = events_length+ " upcoming events";

		
		
				if (events_length == 0){

					//event_div.classList.add('hide-display');
					number_of_events.innerHTML = "No Upcoming Events";
					//country.innerHTML = '';
					//city.innerHTML = '';
					//venue.innerHTML = '';
					
					
				}
				
				else {

					counter += 1;

					for (var x = 0 ; x < events_length; x++){

					


					//artist_events_array.push(data);
					//console.log(artist_events_array);

					//console.log(artist_events_array[0]);

				

					artist_events_array.push(data[x]);
					console.log(artist_events_array[x]);

				

					// var ul = document.createElement('ul');
					ul.setAttribute('class', 'event-list');
					var heading = document.createElement('h3');
					heading.setAttribute('class', 'event-heading');

					heading.innerHTML = "EVENT DETAILS";

					var country = document.createElement('li');
					var city = document.createElement('li');
					var venue = document.createElement('li');
					var date = document.createElement('li');

					country.setAttribute('class', 'event-country');
					city.setAttribute('class', 'event-city');
					venue.setAttribute('class', 'event-venue');
					date.setAttribute('class', 'event-date');


					// country.innerHTML = "Country: " + data[x]['venue']['country'];
					// city.innerHTML = "City: " + data[x]['venue']['city'];
					// venue.innerHTML = "Venue: " + data[x]['venue']['name'];
					// date.innerHTML = "Date: " + data[x]['datetime'];

					

					country.innerHTML = "Country: " + artist_events_array[x].venue.country;
					city.innerHTML = "City: " + artist_events_array[x].venue.city;
					venue.innerHTML = "Venue: " + artist_events_array[x].venue.name;
					date.innerHTML = "Date: " + artist_events_array[x].datetime;

					// date = data[x]['datetime']; 
					// date = JSON.stringify(date);
					// var dateStr = JSON.parse(date);
					// var formatted_date = new Date(dateStr);
					// date.innerHTML = "Date: " + formatted_date;

					ul.appendChild(heading);
					ul.appendChild(country);
					ul.appendChild(city);
					ul.appendChild(venue);
					ul.appendChild(date);

					event_div.appendChild(ul);
					console.log(artist_events_array.length);

					}
					//console.log(ul)

					
			

		}

		




		

				


					

					// console.log(event_div);

					// event_country.innerHTML += "Country: " + data[x]['venue']['country'];
					// event_city.innerHTML += "City: " + data[x]['venue']['city'];
					// event_venue.innerHTML += "Venue: " + data[x]['venue']['name'];
					// date = data[x]['datetime']; 
					// date = JSON.stringify(date);
					// var dateStr = JSON.parse(date);
					// var formatted_date = new Date(dateStr);
					// event_date.innerHTML += "Date: " + formatted_date;
			

					
					

		
		
		

	

		

		

			
		

		
		
		
	
		

		
		
		
		
	
	})
	.catch((err)=>console.log(err))

})

