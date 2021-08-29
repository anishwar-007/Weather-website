console.log("This is the original javaScript page");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const ERROR = document.querySelector('#error');
const DATA = document.querySelector('#data');

weatherForm.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    const location = search.value;
    // console.log(location);
    fetch(`/weather?address=${location}`).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
          ERROR.textContent = data.error;
        }
        else{
            console.log(data.forecast);
            ERROR.textContent = data.location;
            DATA.textContent = data.forecast;
        }
    })
})
})

