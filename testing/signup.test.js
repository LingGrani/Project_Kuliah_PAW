const request = require('supertest');
const express = require('express');
const session = require('express-session');
const router = require('../routes/auth'); // Adjust path to your signup route file

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mock session setup
app.use(
    session({
        secret: 'hai123',
        resave: false,
        saveUninitialized: true,
    })
);

// Use your signup router
app.use('/signup', router);

describe('POST /signup', () => {
    it('should register a user and create a session', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ username: 'testuser', email: 'test@mail.com', password: 'password123' });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Signup successful and session created');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ email: 'test@example.com' });

        expect(response.status).toBe(400);
        expect(response.text).toBe('All fields are required');
    });
});
