
/*calcPwds = function() {
  //Remove all previous table rows
  var elmtTable = document.getElementById("pwdTable");
  var tRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tRows.length;

  for (var x=rowCount-1; x>-1; x--) {
     elmtTable.removeChild(tRows[x]);
  }
  //Generate new table row
  var minword = document.querySelector("#minword").value;
  var maxword = document.querySelector("#maxword").value;
  var maxlen = document.querySelector("#maxlen").value;
  var ezt = document.querySelector("#ezt").checked;
  var numSub = document.querySelector("#numSub").checked;
  console.log(minword);
  console.log(maxword);
  console.log(maxlen);
  console.log(ezt);
  console.log(numSub);

  //Generate the password data
  for(i = 0; i<10;i++){
    t = document.querySelector("#pwdTable");
    trow = document.createElement("tr");
    var totLen = 0;
    var actLen = 0;

    var randfirstLet = Math.floor(Math.random() * 999);
    var firstLet = tbl[randfirstLet].charAt(0);

    while(totLen <= maxlen){
      var randnum = Math.floor(Math.random() * 999);
      var thisLet = tbl[randnum].charAt(0);
      if(minword <= tbl[randnum].length && tbl[randnum].length <= maxword){
        if((ezt == true && thisLet == firstLet) || ezt == false){
          if((totLen +tbl[randnum].length) <= maxlen){
            td = document.createElement("td");
            var newWord = tbl[randnum];
            if(numSub == true){
              var newWord = "";
              var thisWord = tbl[randnum];
              newWord = thisWord.replace(/o/g, "0");
              newWord = newWord.replace(/i/g, "1");
              newWord = newWord.replace(/e/g, "3");
            }
            console.log(newWord);
            contents = document.createTextNode(newWord);
            td.appendChild(contents);
            trow.appendChild(td);
            totLen+=tbl[randnum].length;
            actLen += tbl[randnum].length;
          }
          else{
            totLen += 10000;
          }
        }

      }


    }
    totLen -= 10000;
    td = document.createElement("td");
    contents = document.createTextNode(actLen);
    td.appendChild(contents);
    trow.appendChild(td);
    t.appendChild(trow);
  }

}*/

var giphyApiKey = "K6w8XZnRy9AFYulG7K2O93nmLsyLPSx3";

async function getWeatherHere() {

  var curzip = document.querySelector("#maxlen").value;

  console.log("CURCITY: "+ curzip);
  console.log(curzip.length);
  //Remove all previous table rows
  var elmtTable = document.getElementById("pwdTable");
  var tRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tRows.length;

  for (var x=rowCount-1; x>-1; x--) {
     elmtTable.removeChild(tRows[x]);
  }

  const response2 = await fetch('http://api.ipstack.com/check?access_key=8d65c9b303bb3dcae75300fc9f9f599b&output=json');
  const myJson2 = await response2.json();
  console.log(JSON.stringify(myJson2));

  var item2 = JSON.parse(JSON.stringify(myJson2));


  console.log(item2.latitude);
  console.log(item2.longitude);
  console.log(item2.location.geoname_id);



  //var lat = item.latitude;
  //var log = item.longitude;
  var curcity = item2.city;



  var response = "";
  if(curzip.length!=0){
    response = await fetch('https://api.openweathermap.org/data/2.5/weather?appid=65eb62db3157df3e6d9e81b0e2e6ffcf&zip='+curzip+'&units=imperial');
    console.log(response);
    if(response.status!=200){
      alert("Invalid ZIP code");
      exit(0);
    }

  }
  else{
    response = await fetch('https://api.openweathermap.org/data/2.5/weather?appid=65eb62db3157df3e6d9e81b0e2e6ffcf&id='+item2.location.geoname_id+'&units=imperial');

  }

  const myJson = await response.json();
  console.log(JSON.stringify(myJson));

  var item = JSON.parse(JSON.stringify(myJson));
  console.log("Current temp: " + item.main.temp + "\u00B0Fahrenheit");




  if(curzip.length == 0){
     curcity = item2.city;
  } else {
    curcity = item.name;
  }
  //Current City
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Current city: ");
  contents2 = document.createTextNode(curcity);
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);

  //Temperature entry
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Current temperature: ");
  contents2 = document.createTextNode(item.main.temp+"\u00B0F");
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);

  //Daily high
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Daily high: ");
  contents2 = document.createTextNode(item.main.temp_max+"\u00B0F");
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);

  //Daily Low
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Daily low: ");
  contents2 = document.createTextNode(item.main.temp_min+"\u00B0F");
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);

  //humidity
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Humidity: ");
  contents2 = document.createTextNode(item.main.humidity+ "%");
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);
  //description
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Weather description: ");
  contents2 = document.createTextNode(item.weather[0].description);
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);

  //Wind speed
  t = document.querySelector("#pwdTable");
  trow = document.createElement("tr");
  td = document.createElement("td");
  td2 = document.createElement("td2");
  contents = document.createTextNode("Wind speed: ");
  contents2 = document.createTextNode(item.wind.speed+ " MPH");
  td.appendChild(contents);
  td2.appendChild(contents2);
  trow.appendChild(td);
  trow.appendChild(td2);
  t.appendChild(trow);

  getImage(item.weather[0].description);
  console.log(item.weather[0].description);
}

async function getImage(weather) {
		// Pairing Forecast.io icon values with giphy search strings.
		var searchTerms = {
				"clear-day": "blue sky",
				"clear sky": "blue sky",
				"clear-night": "stars",
				"rain": "rain",
				"snow": "snow",
				"sleet": "sleet",
				"wind": "tornado",
				"fog": "foggy",
				"cloudy": "clouds",
				"partly-cloudy-day": "cloudy",
				"partly-cloudy-night": "clouds night"
		};




		//var data = await fetch("http://api.giphy.com/v1/gifs/search?q=bluesky&api_key=K6w8XZnRy9AFYulG7K2O93nmLsyLPSx3");
		//console.log("Success got data", data);
		var xhr = $.get('http://api.giphy.com/v1/gifs/search?q=' + weather + '&api_key=' + giphyApiKey);
		xhr.done(function(data) {
			console.log("Success got data", data);
			var randomImage = randomItem(data['data']);
			var url = randomImage['images']['fixed_width']['url'];
			console.log(url);
			//document.write("the url is ",url);
			//setbackground(url);
		document.body.style.backgroundImage = "url("+url+")";
		//document.body.style.backgroundImage = "url('https://media2.giphy.com/media/3hJEosDIlwwAU/200w.gif?cid=23240eadc0e53a4072d25b1d1b07324eebff449122c418bc&rid=200w.gif')";
			$('.js-day-').append(
					$('<img>').prop('src', url)
			);
		});

		function randomItem(arrayName) {
				return arrayName[Math.floor(Math.random() * arrayName.length)];
		};



		//var url = randomImage['images']['fixed_width']['url'];




		// const response = await fetch('http://api.giphy.com/v1/gifs/search?q=' + searchTerms[weather] + '&api_key=' + giphyApiKey);
		// const myJson = await response.json();
		// console.log(JSON.stringify(myJson));
		//
		// var randomImage =
		// var url = randomImage['images']['fixed_width']['url'];
		//console.log(results);

		//var randomItem = randomItem();

		//$.ajax('http://api.giphy.com/v1/gifs/search?q=' + searchTerms[weather] + '&api_key=' + giphyApiKey).done(function(results)
// 		{
// 				console.log(results);
// 				var randomImage = randomItem(results['data']);
// 				var url = randomImage['images']['fixed_width']['url'];
// 				$('.js-day-').append(
// 						$('<img>').prop('src', url)
// 				);
// 		}).fail(function(jqXHR, textStatus) {
// 				alert( textStatus );
// 		});
// };
// function randomItem(arrayName) {
// 		return arrayName[Math.floor(Math.random() * arrayName.length)];
};
/*
{"coord":{"lon":-93.27,"lat":44.98},
"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],
"base":"stations",
"main":{"temp":35.33,"pressure":1027,"humidity":55,"temp_min":32,"temp_max":39.2},
"visibility":16093,
"wind":{"speed":5.41,"deg":276},
"clouds":{"all":1},
"dt":1571963632,
"sys":{"type":1,"id":2759,"country":"US","sunrise":1571920812,"sunset":1571958846},
"timezone":-18000,
"id":5037649,
"name":"Minneapolis",
"cod":200}
*/
