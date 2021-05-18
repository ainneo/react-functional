The first thing we need to do is create a react project. To do this create a folder on your desktop which will contain the project. In addition, navigate to this folder in a terminal and then enter the below command.
npx create-react-app reactsearchable
Now open the project in your chosen code editor.
To show some data on a list we will be using a link to an API that returns images and titles of those images from this link.
https://jsonplaceholder.typicode.com/albums/1/photos
Now open the App.js file and add the below import.
import React,{useState} from 'react';
We will using the hook “useState” to hold our data returned from the API as well as our the data that is returned from the search.
The next step is to create 2 pieces of state within the App component. The first piece of state will hold all of the information that we retrieve from the json place holder, the second state will hold a copy of the first state and then the second states value will change when we search for a word in the data.
const [allData,setAllData] = useState([]);
const [filteredData,setFilteredData] = useState(allData);
Furthermore, create an arrow function like the below in the App component, this function will be run on the onChange method of the TextInput component.
const handleSearch = (event) =>{
}
Next we will install a package named axios to handle the retrieving of the API data.
npm install axios
Once this has installed you can import axios in App.js like below.
import axios from 'axios';
We will now import and use a React hook named useEffect, this will be used to implement a side effect and retrieve the data from the API after the App.js component has rendered. So now our import statement will look like the below.
import React, { useState, useEffect } from 'react';
The next step is to implement the useEffect and give it a callback function as well as an empty array as a second argument.
useEffect(() => {
}, []);
Now inside of this useEffect hook we will need to use axios to make a request to the API and then set the response of the API call equal to the first and second piece of state we created.
useEffect(() => {
axios('https://jsonplaceholder.typicode.com/albums/1/photos')
}, []);
Since axios returns a promise we need to add a then and catch to do something when either the response succeeds or fails.
So now our axios will look like the below.
useEffect(() => {
axios('https://jsonplaceholder.typicode.com/albums/1/photos')
.then(response => {
console.log(response.data)
setAllData(response.data);
setFilteredData(response.data);
})
.catch(error => {
console.log('Error getting fake data: ' + error);
})
}, []);
In our then we are taking the response parameter and setting the response.data property (which will be equal to a bunch of objects containing various keys and values about the data from the API) equal to the first and second piece of state.
If you now run the project using the command.
npm start
Open the developer tools of your browser and check the console, you should see a bunch of data coming from the API.

Instead of just plopping the code in the useEffect we could have moved it into a function to run inside of the useEffect to make the code cleaner but this will do for now.
Our next step is to replace the code within the App function with the below. This will give us a simple, centred input text box to enter our search query in. The input text box element will implement the handleSearch function we created earlier. It will be used on the onChange event which allows us to listen for changes on the inputs value and pass this new value into our handleSearch function.

<div className="App">
<div style={{ margin: '0 auto', marginTop: '10%' }}>
<label>Search:</label>
<input type="text" onChange={(event) =>handleSearch(event)} />
</div>
</div>
So now your project page should look like the below.

Amazing right?
Ok so our next task is to showcase the data we have retrieved on the screen. To do this we will map over the filteredData state and return a div which contains the title property returned from the API as well as setting the key of the div equal to the id returned. We could have put this jsx into a component of its own. In a real world application you would more than likely do that. Now our App component looks like the below.

<div className="App">
<div style={{ margin: '0 auto', marginTop: '10%' }}>
<label>Search:</label>
<input type="text" onChange={(event) =>handleSearch(event)} />
</div>
<div style={{padding:10}}>
{filteredData.map((value,index)=>{
return(
<div key={value.id}>
<div style={styles}>
{value.title}
</div>
</div>
)
})}
</div>
</div>
We need to add some css too to make the information look somewhat presentable.
Add the below object before the return statement of the App component.
const styles = {
display:'inline',
width:'30%',
height:50,
float:'left',
padding:5,
border:'0.5px solid black',
marginBottom:10,
marginRight:10
}
Now remove the inline styles from the div and replace it with the styles object.
<div>
<div style={styles} key={value.id}>
{value.title}
</div>
</div>
Now after doing that you should see the below :)

The design will win no awards on the dribbble website but it is sufficient for now.
Our final task is to implement the search/filter functionality on this list of data.
Within the handleSearch function we need to retrieve the value that is passed into our function so create a variable called value equal to the below and set the value to lowercase.
let value = event.target.value.toLowerCase();
We then need to create an array which will hold the return value(s) of the data that has been searched for.
let result = [];
We will be filtering on the allData state. So we will be returning an array value. Inside of the filter we will be filtering on the title property that is found within the allData state. In other APIs you may want to filter on different properties such as album name, first name. You can also filter on multiple keys/properties by using the || (OR operator) but for this example we will only be filtering on the title.
To do this we will set result equal to allData.filter
result = allData.filter
We will then pass in data as an argument to the callback function of filter that represents each item in the array.
result = allData.filter((data) => {
});
Inside of the filter we will return an array that contains values which is equal to the value entered into the search box. So if the user entered “arm” then the result variable should contain an array which contains values that have the word arm in it.
So inside of the filter will look like the below.
return data.title.search(value) != -1;
Here we are looking at the title property of each element in the array and then within the title property we are doing a search of the value that the user entered into the textbox and will return the value if it is not equal to -1.
The .search function searches for a string that has been specified in the parameter, so in our case the value we are searching for is within the data.title property and we are seeing if what the user entered into the textbox is within the data.title property. The .search method returns -1 if no search match is found, so we are returning values that match the search criteria as they will not equal -1 as some values will be found.
We then need to set the filtered data state equal to the result value and set the filtered data state equal to the result variable.
const handleSearch = (event) => {
let value = event.target.value.toLowerCase();
let result = [];
console.log(value);
result = allData.filter((data) => {
return data.title.search(value) != -1;
});
setFilteredData(result);
}
That is it for our application. I will show a quick example.

I will search for the word “rep” and as you can see it returns all the values in the list with the word “rep” within the title.

That is a basic example of how to search a list using React, there are multiple ways to do this but I thought I would just showcase one way, if there is anything I could improve in my article writing then feel free to let me know in the responses, have a good day and remember to clap the article if you like it :)
