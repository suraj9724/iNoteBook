const mongoose = require('mongoose');
async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/inotebook', {
        });

        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error(err);
    }
}
module.exports = connectToMongo;