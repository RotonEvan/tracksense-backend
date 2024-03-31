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
const Glance = require('./src/db/glance');


app.get('/getexpenses', async(req, res) => {
    // console.log(Glance.findOne({ uid: '1' }));
    if (await Glance.countDocuments({}) === 0) {
        console.log('Creating Glance');
        const glance = new Glance({
            uid: '1',
            daily: 0,
            weekly: 0,
            monthly: 0
        });
        await glance.save();
        // console.log('Glance created');
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    try {
        const expenses = await Expense.find({});
        const todayExpenses = expenses.filter(expense => new Date(expense.date) >= today);
        const weeklyExpenses = expenses.filter(expense => new Date(expense.date) >= weekStart);
        const monthlyExpenses = expenses.filter(expense => new Date(expense.date) >= monthStart);

        console.log(todayExpenses);
        // console.log(weeklyExpenses);
        // console.log(monthlyExpenses);

        const totalTodayExpense = todayExpenses.reduce((total, expense) => total + expense.cost, 0);
        const totalWeeklyExpense = weeklyExpenses.reduce((total, expense) => total + expense.cost, 0);
        const totalMonthlyExpense = monthlyExpenses.reduce((total, expense) => total + expense.cost, 0);

        const expenseSummary = {
            daily: totalTodayExpense,
            weekly: totalWeeklyExpense,
            monthly: totalMonthlyExpense
        };

        console.log(expenseSummary);

        // const glance = new Glance(expenseSummary);
        await Glance.findOneAndUpdate({ uid: '1' }, expenseSummary);

        console.log({ expenseSummary, expenses });

        res.json({ expenseSummary, expenses });
    } catch (err) {
        res.status(500).send(err);
    }
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