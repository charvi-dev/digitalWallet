const fs = require('fs');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function UserAuthenticate() {
    r1.question("Enter your username: ", (username) => {
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
                    // If the username exists, prompt for the PIN
                    r1.question("Enter your PIN: ", (enteredPin) => {
                        // Check if the entered PIN matches the stored PIN
                        if (enteredPin === user.pin) {
                            console.log(`Welcome, ${username}!`);
                            r1.close();  // Close the readline interface if both username and PIN are valid
                        } else {
                            console.log("Invalid PIN. Please try again.");
                            UserAuthenticate();  // Call the function recursively to prompt for username and PIN again
                        }
                    });
                } else {
                    console.log("Invalid username. Please try again.");
                    UserAuthenticate();  // Call the function recursively to prompt for username again
                }
            } catch (parseError) {
                console.error(`Error parsing data1.json file: ${parseError.message}`);
            }
        });
    });
}

UserAuthenticate();
