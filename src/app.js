const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT||3000;

// Define paths for express config
const publicDirName = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirName));

app.get('', (req, res) =>
{
    res.render('index', 
    {
        title: 'Weather',
        name: 'David!'
    })
});

app.get('/about', (req, res) =>
{
    res.render('about', 
    {
        title: 'About',
        name: 'David!'
    });
    //res.status(404).send('Sorry, we cannot find that!')
});

app.get('/help', (req, res) =>
{
    res.render('help', 
    {
        title: 'Help',
        name: 'David!'
    });
});

// app.get('/help', (req, res) =>
// {
//     res.send(
//     {
//         name: 'David',
//         age: 22
//     });
// });

// app.get('/about', (req, res) =>
// {
//     res.send('<h1><i>About page!</i></h1>');
// });

// app.get('/weather', (req, res) =>
// {
//     res.send(
//     {
//         forecast: '25 degrees',
//         location: 'Grudziadz'
//     });
// });

app.get('/weather', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send(
        {
            error: 'You must provide an address!',
        });
    }

    let address = req.query.address;

    geocode(address, (error, {longitude, latitude, location} = {}) =>
    {
        if (error)
            return res.send({ error });

        forecast(longitude, latitude, (error, forecast) =>
        {
            if (error)
                return res.send({ error });

            res.send(
            {
                address: req.query.address,
                forecast,
                location,
            });
        });

    });

   

});

app.get('/products', (req, res) =>
{
    if (!req.query.search)
    {
        return res.send(
        {
            error: 'You must provide a search term!',
        });
    }

    res.send(
    {
        products: [],
    })
});

app.get('/help/*', (req, res) =>
{
    res.render('404-page',
    {
        msg: 'Help article not found!',
        name: 'David!',
    });
});

app.get('*', (req, res) =>
{
    res.render('404-page',
    {
        msg: 'Page not found!',
        name: 'David!',
    });
});

// app.listen(3000, () =>
// {
//     console.log('Server is up on port 3000!')
// });

app.listen(port, () =>
{
    console.log('Server is up on port ' + port + '!')
});