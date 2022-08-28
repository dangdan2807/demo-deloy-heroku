const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`,
            // `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_POST}/${process.env.MONGODB_DB}`,
            {
                // useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify: false,
            },
        );
        console.log('connected to db');
    } catch (error) {
        console.log('error connecting');
    }
}

module.exports = { connect };
