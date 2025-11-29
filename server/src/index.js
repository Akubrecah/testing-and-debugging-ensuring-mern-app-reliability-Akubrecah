const mongoose = require('mongoose');
const app = require('./app');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let mongoUri = process.env.MONGODB_URI;

  try {
    // Try connecting to provided URI
    if (mongoUri) {
      console.log('Attempting to connect to provided MongoDB URI...');
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    } else {
      throw new Error('No URI provided');
    }
  } catch (err) {
    console.log('Could not connect to local MongoDB, starting in-memory database...');
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  }

  console.log(`Connected to MongoDB at ${mongoUri}`);

  // Seed data
  const User = require('./models/User');
  const userCount = await User.countDocuments();
  
  // Optional: Uncomment to clear DB on every restart for fresh data
  // await User.deleteMany({}); 

  if (userCount === 0 || (await User.findOne({ name: 'User 1' }))) {
    console.log('Seeding database with real users...');
    
    // Clear old generic users if they exist
    await User.deleteMany({ name: /^User \d+/ });
    // Also clear previous "real" names to refresh with Kenyan names
    await User.deleteMany({ name: /^(Alice|Bob|Charlie|Diana|Evan|Fiona|George|Hannah|Ian|Julia|Kevin|Laura|Mike|Nina|Oscar|Paula|Quincy|Rachel|Steve|Tina)/ });

    const kenyanNames = [
      "Jomo Kenyatta", "Wangari Maathai", "Ngugi wa Thiong'o", "Lupita Nyong'o", "Eliud Kipchoge",
      "Dedan Kimathi", "Tom Mboya", "Mwai Kibaki", "Uhuru Kenyatta", "Raila Odinga",
      "Catherine Ndereba", "David Rudisha", "Tegla Loroupe", "Paul Tergat", "Vivian Cheruiyot",
      "Dennis Oliech", "Victor Wanyama", "McDonald Mariga", "Humphrey Kayange", "Collins Injera"
    ];

    const users = kenyanNames.map((name, i) => ({
      name,
      email: `${name.toLowerCase().replace(/[' ]/g, '.')}@example.com`
    }));

    await User.insertMany(users);
    console.log('Database seeded with 20 Kenyan users!');
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(err => console.error(err));
