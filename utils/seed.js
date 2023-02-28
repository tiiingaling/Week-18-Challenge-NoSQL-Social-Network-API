const db = require('../config/connection');
const { User, Thought } = require('../models');

db.once('open', async () => {
  try {
    // Delete existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create new users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@gmail.com',
      },
      {
        name: 'Jane Smith',
        email: 'jane@gmail.com',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@gmail.com',
      }
    ]);

    // Create new thoughts
    await Thought.create([
      {
        thoughtText: 'Hello, world!',
        user: users[0]._id
      },
      {
        thoughtText: 'I love coding!',
        user: users[0]._id
      },
      {
        thoughtText: 'This app is awesome!',
        user: users[1]._id
      },
      {
        thoughtText: 'I want to learn more!',
        user: users[1]._id
      },
      {
        thoughtText: 'Coding is hard, but I will persist!',
        user: users[2]._id
      },
    ]);

    console.log('Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
