const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const cors = require('cors');
app.use(express.json());
// app.use(cors);

let expenses = [];

const { connectDB, conn } = require('./src/db/connection');

connectDB();

const Expense = require('./src/db/expense');

app.get('/getexpenses', (req, res) => {
    Expense.find({}).then(expenses => {
        res.json(expenses);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/addexpense', (req, res) => {
    console.log(req.body);
    // const stExpense = JSON.parse(req.body);
    // req.body has { amount: 1000, timestamp: 1710077469631, type: 'travel', tag: 'blue' }, so we can use it to create a new Expense

    const expense = new Expense(req.body);
    expense.save()
        .then(expense => {
            res.json(expense);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));