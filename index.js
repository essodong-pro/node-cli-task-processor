/**
 * @file index.js
 * @description A Node.js Command-Line Utility Tool for task processing, API fetching, 
 * ES6 array manipulation, recursion, and error handling.
 * @author Essodong N’GNAMA
 * @course CSE 310 - Applied Programming
 */

import axios from 'axios';
import chalk from 'chalk';

/**
 * Asynchronously fetches mock task data from a public REST API.
 * Demonstrates external library usage (axios), async/await, and exception handling.
 * 
 * @async
 * @function fetchTasks
 * @returns {Promise<Array<Object>>} An array of task objects or fallback data on failure.
 * @throws {Error} Throws an error if the retrieved dataset is empty or invalid.
 */
async function fetchTasks() {
    try {
        console.log(chalk.blue('Fetching mock task data from API...'));

        // Using a public placeholder API for demonstration
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        // Validate dataset integrity
        if (!response.data || response.data.length === 0) {
            throw new Error('Retrieved dataset is empty or invalid.');
        }

        // Return the first 10 items for a manageable dataset
        return response.data.slice(0, 10);
    } catch (error) {
        console.error(chalk.red(`Error fetching data: ${error.message}`));

        // Graceful fallback data if network fails or validation triggers
        return [
            { id: 1, title: 'Fallback Task 1', completed: false, priority: 3 },
            { id: 2, title: 'Fallback Task 2', completed: true, priority: 1 },
            { id: 3, title: 'Fallback Task 3', completed: false, priority: 2 }
        ];
    }
}

/**
 * Recursively computes a total priority score based on task completion status.
 * Demonstrates recursion with a clear base case.
 * 
 * @function calculateRecursiveScore
 * @param {Array<Object>} tasks - The array of tasks being processed.
 * @param {number} [index=0] - The current index pointer for recursion.
 * @returns {number} The aggregated recursive priority score.
 */
function calculateRecursiveScore(tasks, index = 0) {
    // Base case: if we reach the end of the array, stop recursion
    if (index >= tasks.length) {
        return 0;
    }

    // Assign higher weight to uncompleted tasks for priority calculation
    const currentWeight = tasks[index].completed ? 1 : 5;

    // Recursive step: add current weight and move to the next index
    return currentWeight + calculateRecursiveScore(tasks, index + 1);
}

/**
 * Main execution function for the Command-Line Interface (CLI) tool.
 * Orchestrates data retrieval, error handling, ES6 array operations, and styled terminal output.
 * 
 * @async
 * @function runCLI
 * @returns {Promise<void>}
 * @throws {Error} Throws a fatal error if tasks cannot be processed.
 */
async function runCLI() {
    console.log(chalk.green.bold('=== Node.js CLI Task & Data Processor ===\n'));

    // Fetch tasks using external library
    const tasks = await fetchTasks();

    // Custom Error Check Example
    if (!tasks || tasks.length === 0) {
        throw new Error('Fatal: No tasks available to process.');
    }

    console.log(chalk.yellow('\n--- Processing Tasks ---'));

    // ES6 Array Method: .filter()
    const pendingTasks = tasks.filter(task => !task.completed);
    console.log(chalk.cyan(`Pending Tasks Count: ${pendingTasks.length}`));

    // ES6 Array Method: .map() and iteration
    const taskTitles = pendingTasks.map(task => `- [ ] ${task.title}`);
    taskTitles.forEach(title => console.log(title));

    // ES6 Array Method: .reduce()
    const totalIdSum = tasks.reduce((acc, task) => acc + task.id, 0);
    console.log(chalk.magenta(`\nSum of Task IDs: ${totalIdSum}`));

    // Execute Recursive Function
    const totalPriorityScore = calculateRecursiveScore(tasks);
    console.log(chalk.green(`Calculated Recursive Priority Score: ${totalPriorityScore}\n`));

    console.log(chalk.blue.bold('=== Processing Complete ==='));
}

// Execute the CLI tool with global top-level error catching
runCLI().catch(err => {
    console.error(chalk.red(`Unhandled Exception: ${err.message}`));
    process.exit(1);
});