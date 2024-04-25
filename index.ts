import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('My name is Saumin!')
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  address: string;
  gender: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// Read users from db.json
const dbFilePath = path.resolve(__dirname, 'client/db.json');
let users: User[] = [];
let products: Product[] = [];

try {
  const data = fs.readFileSync(dbFilePath, 'utf8');
  const jsonData = JSON.parse(data);
  if (Array.isArray(jsonData.user)) {
    users = jsonData.user;
  } else {
    console.error('Invalid format in db.json: "user" key should contain an array');
  }
  if (Array.isArray(jsonData.product)) { 
    products = jsonData.product;
  } else {
    console.error('Invalid format in db.json: "product" key should contain an array');
  }
} catch (err) {
  console.error('Error reading or parsing db.json:', err);
}

// route login
app.post('/login', (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  const user = users.find(user => {
    return user.email === email && user.password === password
  });

  if (!user) {  
    return res.status(404).send('User Not Found!')
  }

  return res.status(200).json(user)
});

// route registration
app.post('/user', (req: Request, res: Response) => {
  const { id, name, email, password, phone, country, address, gender }: User = req.body;

  // Check if user with the same email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send('User already exists with this email!');
  }

  // Create a new user object
  const newUser: User = { id, name, email, password, phone, country, address, gender };

  // Add the new user to the array
  users.push(newUser);

  // Update the db.json file
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify({ user: users }, null, 2));
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  return res.status(201).json(newUser);
});

app.post('/product', (req: Request, res: Response) => {
  const { id, name, description, price, quantity }: Product = req.body;

  const newProduct: Product = { id, name, description, price, quantity };

  products.push(newProduct);

  try {
    fs.writeFileSync(dbFilePath, JSON.stringify({ user: users, product: products }, null, 2));
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  return res.status(201).json(newProduct);
});

app.get('/products', (req: Request, res: Response) => {
  return res.status(200).json(products);
});

app.delete('/product/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  console.log('Received request to delete product with ID:', productId);
  
  const index = products.findIndex(product => product.id === productId);

  if (index === -1) {
    return res.status(404).send('Product not found');
  }

  const deletedProduct = products.splice(index, 1)[0];

  try {
    fs.writeFileSync(dbFilePath, JSON.stringify({ user: users, product: products }, null, 2));
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return res.status(500).send('Internal Server Error');
  }

  return res.status(200).json(deletedProduct);
});
