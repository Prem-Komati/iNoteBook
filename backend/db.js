const mongoose = require('mongoose');

//const dbName = 'your_database_name'; // Replace 'your_database_name' with the name of your database
const mongoURI = `mongodb://localhost:27017/inotebook?directConnection=true`;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Re-throw the error to handle it outside this function
    }
};

module.exports = connectToMongo;
