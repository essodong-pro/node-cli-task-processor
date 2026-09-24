/**
 * @file index.js
 * @description A simple Node.js program for working with tasks.
 * @author Essodong N’GNAMA
 * @course CSE 310 - Applied Programming
 */

import axios from 'axios';
import chalk from 'chalk';

// Get task data from the API
async function fetchTasks() {
    try {
        console.log(chalk.blue('Getting tasks from the API...'));

        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos'
        );

        if (!response.data || response.data.length === 0) {
            throw new Error('No task data was returned.');
        }

        return response.data.slice(0, 10);

    } catch (error) {
        console.error(chalk.red(`Could not get tasks: ${error.message}`));

        // Use these tasks if the API is not available
        return [
            {
                id: 1,
                title: 'Finish homework',
                completed: false
            },
            {
                id: 2,
                title: 'Read a book',
                completed: true
            },
            {
                id: 3,
                title: 'Practice JavaScript',
                completed: false
            }
        ];
    }
}

// Use recursion to calculate a score
function calculateScore(tasks, index = 0) {

    if (index >= tasks.length) {
        return 0;
    }

    const score = tasks[index].completed ? 1 : 5;

    return score + calculateScore(tasks, index + 1);
}

// Find the tasks that are not finished
function getPendingTasks(tasks) {
    return tasks.filter(task => !task.completed);
}

// Get the titles of the pending tasks
function getTaskTitles(tasks) {
    return tasks.map(task => task.title);
}

// Add all the task IDs together
function getIdTotal(tasks) {
    return tasks.reduce((total, task) => {
        return total + task.id;
    }, 0);
}

// Run the program
async function runCLI() {
    console.log(
        chalk.green.bold('=== Task Processing Program ===\n')
    );

    try {
        const tasks = await fetchTasks();

        if (!tasks || tasks.length === 0) {
            throw new Error('There are no tasks to process.');
        }

        console.log(chalk.yellow('--- Task Results ---'));

        const pendingTasks = getPendingTasks(tasks);

        console.log(
            chalk.cyan(
                `Pending tasks: ${pendingTasks.length}`
            )
        );

        const titles = getTaskTitles(pendingTasks);

        titles.forEach(title => {
            console.log(`- ${title}`);
        });

        const idTotal = getIdTotal(tasks);

        console.log(
            chalk.magenta(`\nTotal of task IDs: ${idTotal}`)
        );

        const score = calculateScore(tasks);

        console.log(
            chalk.green(`Recursive score: ${score}`)
        );

        console.log(
            chalk.blue.bold('\n=== Program Finished ===')
        );

    } catch (error) {
        console.error(
            chalk.red(`Program error: ${error.message}`)
        );

        process.exit(1);
    }
}

// Start the program
runCLI();