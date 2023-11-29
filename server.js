const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.static('public'))
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const ATLAS_URI = process.env.ATLAS_URI || "mongodb+srv://bernardnjlwork:mongo@cluster0.kyvuvfu.mongodb.net/";
const client = new MongoClient(ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/',async(requ,res)=> {
  const html = fs.readFile(__dirname +'index.html')
  console.log(html)
});

async function run() {
  try {
    // Connect to the MongoDB database
    await client.connect();

    // Ping the database to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// run().catch(console.dir);

// // Handle GET requests to the '/' route
// app.get("/", (req, res) => {
//   // Read the index.html file from the root directory
//   const html = fs.readFile(path.join(__dirname, 'index.html'));

//   // Send the HTML content to the client
//   res.send(html);
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
