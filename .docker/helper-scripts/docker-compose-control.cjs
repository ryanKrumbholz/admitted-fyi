const { spawn } = require('child_process');

// Function to run docker-compose up
function dockerComposeUp() {
    return spawn('docker-compose', ['up'], { stdio: 'inherit', shell: true });
}

// Function to run docker-compose down
function dockerComposeDown() {
    console.log('\nShutting down...');
    const down = spawn('docker-compose', ['down', '-v'], { stdio: 'inherit', shell: true });

    down.on('exit', function(code, signal) {
        console.log('Docker Compose has been shut down');
        process.exit(code);
    });
}

// Start docker-compose up
const dcProcess = dockerComposeUp();

// Handle Ctrl+C (SIGINT)
process.on('SIGINT', () => {
    dockerComposeDown();
});

// Handle normal exit
process.on('exit', (code) => {
    dockerComposeDown();
});
