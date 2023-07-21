let express = require('express');
const app = express();

app.use(express.json());

require(`dotenv`).config();

const { Pool } = require('pg');

// Replace 'YOUR_DATABASE_URL' with your actual PostgreSQL database URL
const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

// Function to check the connection
async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    // Close the connection pool to exit the Node.js process (optional)
    await pool.end();
  }
}

app.get('/check-db-connection', async function(req, res) {
  try {
    console.log("Checking connection");
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    client.release();
    return res.status(200).send({
      "status": "Connected",
      "message": "Connected to the database successfully!",
      "database": process.env.DB_NAME
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
    return res.status(500).send(`Error connecting to the database: ${err}`); 
  } finally {
    // Close the connection pool to exit the Node.js process (optional)
    await pool.end();
  }
});

const userRoutes = require('./src/routes/user.routes.js');

app.use('/users', userRoutes);

let port = process.env.APP_PORT ? process.env.APP_PORT : 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});