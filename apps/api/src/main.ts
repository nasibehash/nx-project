import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(cors()); // <-- Use cors middleware
app.use(bodyParser.json());

// Mock user database
const users: { [key: string]: { password: string } } = {};

// Secret key for JWT
const SECRET_KEY = 'your-secret-key';

// Register endpoint
app.post('/register', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({message: 'Username and password are required.'});
  }

  if (users[username]) {
    return res.status(400).json({message: 'User already exists.'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user in "database"
  users[username] = {password: hashedPassword};

  return res.status(201).json({message: 'User registered successfully.'});
});

// Login endpoint
app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({message: 'Username and password are required.'});
  }

  const user = users[username];

  if (!user) {
    return res.status(400).json({message: 'Invalid credentials.'});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({message: 'Invalid credentials.'});
  }

  const token = jwt.sign({username}, SECRET_KEY, {expiresIn: '1h'});

  return res.status(200).json({message: 'Login successful.', token});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
