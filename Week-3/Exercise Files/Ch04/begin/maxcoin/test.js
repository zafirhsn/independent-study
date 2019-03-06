// request is a module that makes http calls easier
const request = require('request');

const MongoClient = require('mongodb').MongoClient;

const dsn = 'mongodb://localhost:37017/maxcoin';


// Generic function that fetches the closing bitcoin dates of the last month from a public API
function fetchFromAPI(callback) {

    // We are using fat arrow (=>) syntax here. This is a new way to create anonymous functions in Node
    // Please review the Node.js documentation if this looks unfamiliar to you
    request.get('https://api.coindesk.com/v1/bpi/historical/close.json', (err, raw, body) => {
        return callback(err, JSON.parse(body));
    });
}

function insertMongodb(collection, data) {
    const promisedInserts = [];

    Object.keys(data).forEach((key) => {
        promisedInserts.push(
            collection.insertOne({date: key, value: data[key]})
        );
    });
    return Promise.all(promisedInserts);
}

MongoClient.connect(dsn, (err, db) => {
    console.time('mongodb');
    if (err) throw err;
    console.log('Connected successfully to MongoDB server');
    fetchFromAPI((err, data) => {
        if (err) throw err;
        const collection = db.collection('value');

        insertMongodb(collection, data.bpi)
        .then((result) => {
            console.log(`Successfully inserted ${result.length} documents into mongodb`);

            const options = {'sort': [['value', 'desc']]};
            collection.findOne({}, options, (err, doc) => {
                if(err) throw err;
                console.log(`MongoDB: The one month max value is ${doc.value} and it was reached on ${doc.date}`); 
                console.timeEnd('mongodb');
                db.close();
            });
        })
        .catch((err) => {
            console.log(err);
            process.exit();
        });
    });
});


