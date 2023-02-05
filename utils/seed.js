const { User, Thought } = require('../models');
const db = require('../config/connection');

db.once('open', async () => {
    await User.deleteMany({});
    await User.insertMany([
        { username: 'Candace Owens', email: 'candace@email.com' },
        { username: 'Matt Walsh', email: 'matt@email.com' },
        { username: 'Joe Rogan', email: 'joe@email.com' },
        { username: 'Tucker Carlson', email: 'tucker@email.com' },
    ]);
    await Thought.deleteMany({});
    await Thought.insertMany([
        { thoughtText:'Chinese intelligence had clearly already completed their surveillance.', username:'Candace Owens', reactionsBody:'like'},
        { thoughtText:'There is no such thing as a happy marriage without gratitude.', username:'Matt Walsh'},
        { thoughtText:'The Biden Administration is trying to criminalize memes and political satire.', username:'Tucker Carlson'},
    ]);
    
    console.log('Database seeded');
    process.exit(0);
});
