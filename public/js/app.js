console.log('Javascript is running!');

// fetch('http://puzzle.mead.io/puzzle').then((res) =>
// {
//     res.json().then((data) =>
//     {
//         console.log(data);
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const statement = document.querySelectorAll('p')[1];

weatherForm.addEventListener('submit', (event) =>
{
    event.preventDefault();
    let location = search.value;
    
    const url = `http://localhost:3000/weather?address=${location}`

    statement.textContent = 'Loading...';

    fetch(url).then((resp) =>
    {
        //console.log(resp)
        //fetch();
        resp.json().then((data) =>
        {
            
            if (data.error)
            {   
                statement.textContent = data.error; 
                return console.log(data.error);
            }
            //statement.innerHTML = data.location + '\n' + data.forecast;
            statement.textContent = data.location + '\n' + data.forecast;
            
            //console.log(data.location);
            //console.log(data.forecast);
        });
    });

});