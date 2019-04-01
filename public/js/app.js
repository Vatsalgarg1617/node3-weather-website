console.log('Client side javaScript file is loaded');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit' , (e) => {
     e.preventDefault()

     messageOne.textContent = "Loading...."
     messageTwo.textContent = ""
     fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent = data.error;
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
        }
    })
})
     
})