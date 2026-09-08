import axios from 'axios';
import chalk from 'chalk';

// 1. External Library & Asynchronous Data Fetching with Exception Handling
async function fetchTasks() {
    try {
        console.log(chalk.blue('Fetching mock task data from API...'));

        // Using a public placeholder API for demonstration
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        if (!response.data || response.data.length === 0) {
            throw new Error('Retrieved dataset is empty or invalid.');
        }

        // Return the first 10 items for a manageable dataset
        return response.data.slice(0, 10);
    } catch (error) {
        console.error(chalk.red(`Error fetching data: ${error.message}`));
        // Graceful fallback data if network fails
        return [
            { id: 1, title: 'Fallback Task 1', completed: false, priority: 3 },
            { id: 2, title: 'Fallback Task 2', completed: true, priority: 1 }
        ];
    }
}

// 2. Recursive Function
function calculateRecursiveScore(tasks, index = 0) {
    if (index >= tasks.length) {
        return 0;
    }
    
    const currentWeight = tasks[index].completed ? 1 : 5;
    return currentWeight + calculateRecursiveScore(tasks, index + 1);
}

// 3. Main Application Logic
async function runCLI() {
    console.log(chalk.green.bold('=== Node.js CLI Task & Data Processor ===\n'));

    const tasks = await fetchTasks();

    
    if (tasks.length === 0) {
        throw new Error('Fatal: No tasks available to process.');
    }

    
    console.log(chalk.yellow('\n--- Processing Tasks ---'));

    
    const pendingTasks = tasks.filter(task => !task.completed);
    console.log(chalk.cyan(`Pending Tasks Count: ${pendingTasks.length}`));

    
    const taskTitles = pendingTasks.map(task => `- [ ] ${task.title}`);
    taskTitles.forEach(title => console.log(title));

    
    const totalIdSum = tasks.reduce((acc, task) => acc + task.id, 0);
    console.log(chalk.magenta(`\nSum of Task IDs: ${totalIdSum}`));

    // Run Recursive Function
    const totalPriorityScore = calculateRecursiveScore(tasks);
    console.log(chalk.green(`Calculated Recursive Priority Score: ${totalPriorityScore}\n`));

    console.log(chalk.blue.bold('=== Processing Complete ==='));
}

// Execute the CLI tool with global error catching
runCLI().catch(err => {
    console.error(chalk.red(`Unhandled Exception: ${err.message}`));
});