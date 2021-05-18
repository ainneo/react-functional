## Searching, Filtering, Loading, and Sorting with Hooks
I built this project to demo searching, filtering, loading, and sorting using hooks in react. This project is all about functionality, not design - there will be the least amount of css as possible. 
### Building the search component:
To show some data on a list we will be using a link to an API that returns images and titles of those images from this link.
https://jsonplaceholder.typicode.com/albums/1/photos

The next step is to create 2 pieces of state within the App component. The first piece of state will hold all of the information that we retrieve from the json place holder, the second state will hold a copy of the first state and then the second states value will change when we search for a word in the data.
```
const [allData,setAllData] = useState([]);
const [filteredData,setFilteredData] = useState(allData);
```
Create an arrow function like the below, this function will be run on the onChange method of the TextInput component.
```
const handleSearch = (event) =>{}
```

Now inside of this useEffect hook we will need to use axios to make a request to the API and then set the response of the API call equal to the first and second piece of state we created.
```
useEffect(() => {
axios('https://jsonplaceholder.typicode.com/albums/1/photos')
}, []);
```
Since axios returns a promise we need to add a then and catch to do something when either the response succeeds or fails.
So now our axios will look like the below.
```
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
```
In our then we are taking the response parameter and setting the response.data property (which will be equal to a bunch of objects containing various keys and values about the data from the API) equal to the first and second piece of state.

Open the developer tools of your browser and check the console, you should see a bunch of data coming from the API.


The input text box element will implement the handleSearch function we created earlier. It will be used on the onChange event which allows us to listen for changes on the inputs value and pass this new value into our handleSearch function.

Ok so our next task is to showcase the data we have retrieved on the screen. To do this we will map over the filteredData state and return a div which contains the title property returned from the API as well as setting the key of the div equal to the id returned. We could have put this jsx into a component of its own. In a real world application you would more than likely do that. Now our App component looks like the below.

Our final task is to implement the search/filter functionality on this list of data.
Within the handleSearch function we need to retrieve the value that is passed into our function so create a variable called value equal to the below and set the value to lowercase.
```
let value = event.target.value.toLowerCase();
```
We then need to create an array which will hold the return value(s) of the data that has been searched for.
```
let result = [];
```
We will be filtering on the allData state. So we will be returning an array value. Inside of the filter we will be filtering on the title property that is found within the allData state. In other APIs you may want to filter on different properties such as album name, first name. You can also filter on multiple keys/properties by using the || (OR operator) but for this example we will only be filtering on the title.
To do this we will set result equal to allData.filter
```
result = allData.filter
```
We will then pass in data as an argument to the callback function of filter that represents each item in the array.
```
result = allData.filter((data) => {
});
```
Inside of the filter we will return an array that contains values which is equal to the value entered into the search box. So if the user entered “arm” then the result variable should contain an array which contains values that have the word arm in it.
So inside of the filter will look like the below.
```
return data.title.search(value) != -1;
```
Here we are looking at the title property of each element in the array and then within the title property we are doing a search of the value that the user entered into the textbox and will return the value if it is not equal to -1.
The .search function searches for a string that has been specified in the parameter, so in our case the value we are searching for is within the data.title property and we are seeing if what the user entered into the textbox is within the data.title property. The .search method returns -1 if no search match is found, so we are returning values that match the search criteria as they will not equal -1 as some values will be found.
We then need to set the filtered data state equal to the result value and set the filtered data state equal to the result variable.
```
const handleSearch = (event) => {
let value = event.target.value.toLowerCase();
let result = [];
console.log(value);
result = allData.filter((data) => {
return data.title.search(value) != -1;
});
setFilteredData(result);
}
```
