"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('My name is Saumin!');
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// Read users from db.json
const dbFilePath = path_1.default.resolve(__dirname, 'client/db.json');
let users = [];
let products = [];
try {
    const data = fs_1.default.readFileSync(dbFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    if (Array.isArray(jsonData.user)) {
        users = jsonData.user;
    }
    else {
        console.error('Invalid format in db.json: "user" key should contain an array');
    }
    if (Array.isArray(jsonData.product)) {
        products = jsonData.product;
    }
    else {
        console.error('Invalid format in db.json: "product" key should contain an array');
    }
}
catch (err) {
    console.error('Error reading or parsing db.json:', err);
}
// route login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => {
        return user.email === email && user.password === password;
    });
    if (!user) {
        return res.status(404).send('User Not Found!');
    }
    return res.status(200).json(user);
});
// route registration
app.post('/user', (req, res) => {
    const { id, name, email, password, phone, country, address, gender } = req.body;
    // Check if user with the same email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send('User already exists with this email!');
    }
    // Create a new user object
    const newUser = { id, name, email, password, phone, country, address, gender };
    // Add the new user to the array
    users.push(newUser);
    // Update the db.json file
    try {
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify({ user: users }, null, 2));
    }
    catch (err) {
        console.error('Error writing to db.json:', err);
        return res.status(500).send('Internal Server Error');
    }
    return res.status(201).json(newUser);
});
app.post('/product', (req, res) => {
    const { id, name, description, price, quantity } = req.body;
    const newProduct = { id, name, description, price, quantity };
    products.push(newProduct);
    try {
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify({ user: users, product: products }, null, 2));
    }
    catch (err) {
        console.error('Error writing to db.json:', err);
        return res.status(500).send('Internal Server Error');
    }
    return res.status(201).json(newProduct);
});
app.get('/products', (req, res) => {
    return res.status(200).json(products);
});
app.delete('/product/:id', (req, res) => {
    const productId = req.params.id;
    console.log('Received request to delete product with ID:', productId);
    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        return res.status(404).send('Product not found');
    }
    const deletedProduct = products.splice(index, 1)[0];
    try {
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify({ user: users, product: products }, null, 2));
    }
    catch (err) {
        console.error('Error writing to db.json:', err);
        return res.status(500).send('Internal Server Error');
    }
    return res.status(200).json(deletedProduct);
});
