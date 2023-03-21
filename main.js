document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("search-button");
    const searchBar = document.getElementById("search-bar");
    const apiKey = '6c3bac3b84a441efa92232928232003';
    let location ;

    searchBar.addEventListener( "input",()=>{
        if(searchBar.value===""){
            button.disabled= true;

        }else{
            button.disabled=false;
        }
    })


    //if the user decides to press enter instead of clicking the fucking button , the same thing will happen w this function//
    searchBar.addEventListener('keydown',(event)=>{
        if (event.key === 'Enter'){event.preventDefault();
            let searchValue = searchBar.value;
            // console.log(searchValue);
            location = searchValue;
            fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`).then(response=>{if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
    
            }).then(data => {
                //log the data
                console.log(data);
                //change the image in the card to the current icon
                let iconurl = data.current.condition.icon; 
                let imageEl = document.getElementById("image");
                imageEl.src = iconurl; 
                // change the text in the temp element to the current temp in c

                document.getElementById("temp").textContent = data.current.temp_c;

                // use the weather data as needed
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        }
        
    })

    //when button pressed , send whatever was in the search box to the weatrher api and get info//
    button.addEventListener('click',()=>{
        event.preventDefault();

        let searchValue = searchBar.value;
        
        location = searchValue;
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
        .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        //log the data
        console.log(data);
        //change the image in the card to the current icon
        let iconurl = data.current.condition.icon; 
        let imageEl = document.getElementById("image");
        imageEl.src = iconurl; 
        // change the text in the temp element to the current temp in c

        document.getElementById("temp").textContent = data.current.temp_c;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
    })
    
    
    

    
});