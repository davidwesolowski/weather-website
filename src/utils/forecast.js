const request = require('request');

const forecast = (longitude, latitude, callback) =>
{
    const url = `https://api.darksky.net/forecast/7f994b546bad12c1d36e4bef3d476c07/${latitude},${longitude}?units=si&lang=pl`;
    request({ url, json: true}, (error, {body}) => 
    {
        if (error)
            callback('Unable to connect to weather service.');
        else if (body.error)
            callback('Unable to find location.');
        else
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);

    })
}

module.exports = forecast;

//STARY KOD
//const url = 'https://api.darksky.net/forecast/7f994b546bad12c1d36e4bef3d476c07/37.8267,-122.4233?units=si&lang=pl';
//const url = 'https://api.darksky.net/forecast/7f994b546bad12c1d36e4bef3d476c07/37.8267?units=si&lang=pl'; -> bez longitude
// request({ url: url, json: true }, (error, response) =>
// {
//     //const data = JSON.parse(response.body);
//     //console.log(response.body.currently);
//     if (error)
//     {
//         console.log('Unable to connect to weather service!');
//     }
//     else if (response.body.error)
//     {
//         console.log('Unable to find location!')
//     }
//     else
//     {
//         const data = response.body.currently;
//         console.log(`${response.body.daily.data[0].summary} It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain.`)
//     }
    
// })

// const forecast = (longitude, latitude, callback) =>
// {
//     const url = `https://api.darksky.net/forecast/7f994b546bad12c1d36e4bef3d476c07/${latitude},${longitude}?units=si&lang=pl`;
//     request({ url: url, json: true}, (error, response) => 
//     {
//         if (error)
//             callback('Unable to connect to weather service.');
//         else if (response.body.error)
//             callback('Unable to find location.');
//         else
//             callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`);

//     })
// }