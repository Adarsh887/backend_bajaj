/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Sample user data
const userData = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};

// POST method endpoint
//process
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [lowercaseAlphabets.sort().slice(-1)[0]] 
        : [];

    res.json({
        is_success: true,
        user_id: userData.user_id,
        email: userData.email,
        roll_number: userData.roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET method endpoint
//operation_code
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: "OP123456" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());

//test
app.post('/bfhl', (req, res) => {
    console.log("Received request body:", req.body);

    const { data } = req.body;

    // Check if "data" is an array
    if (!Array.isArray(data)) {
        console.log("Invalid input: data is not an array");
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input format. "data" should be an array.'
        });
    }
        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
            ? [lowercaseAlphabets.sort().pop()]
            : [];

        // Example static user details
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        return res.json(response);
    });



// GET endpoint to return operation code
app.get('/bfhl', (req, res) => {
    const operationCode = "OP123456"; // Example operation code
    return res.json({
        operation_code: operationCode
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

