const fs = require('fs');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayBalance() {
    r1.question("Enter your username to check balance: ", (username) => {
        // Read the JSON file
        fs.readFile('data1.json', 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading data1.json file: ${err.message}`);
                return;
            }

            try {
                const users = JSON.parse(data);

                // Check if the entered username exists
                const user = users.find(u => u.username === username);

                if (user) {
                    console.log(`Your account balance is: ${user.account_balance}`);
                    r1.close();
                } else {
                    console.log("Invalid username. Please try again.");
                    displayBalance();
                }
            } catch (parseError) {
                console.error(`Error parsing data1.json file: ${parseError.message}`);
            }
        });
    });
}

// Example usage of the displayBalance function
displayBalance();
