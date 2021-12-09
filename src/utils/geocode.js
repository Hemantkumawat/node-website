const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGVtYW50aW5kIiwiYSI6ImNrd214ZDY4ZzI0ZHYyb21sdGtnYWU5a2MifQ.KorARZ2bSGcrga3E1eHiPQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        console.log(error,body.features.length);
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode