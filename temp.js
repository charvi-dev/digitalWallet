// Import the fs module
const fs = require('fs');

// Import the readline module
const readline = require('readline');

// Create an instance
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function UserAuthenticate(callback) {
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
                            callback();  // Execute the callback function if both username and PIN are valid
                        } else {
                            console.log("Invalid PIN. Authentication failed.");
                            r1.close();
                        }
                    });
                } else {
                    console.log("Invalid username. Authentication failed.");
                    r1.close();
                }
            } catch (parseError) {
                console.error(`Error parsing data1.json file: ${parseError.message}`);
            }
        });
    });
}

function viewBalance() {
    // Placeholder for viewing balance functionality
    console.log("View Balance");
    // Implement your logic here
    r1.close();
}

function sendMoney() {
    // Placeholder for sending money functionality
    console.log("Send Money");
    // Implement your logic here
    r1.close();
}

function sendMessage() {
    // Placeholder for sending messages functionality
    console.log("Send Message");
    // Implement your logic here
    r1.close();
}

function main() {
    console.log("SELECT OPTION");
    console.log("1. SEND MONEY");
    console.log("2. VIEW BALANCE");
    console.log("3. SEND MESSAGE");
    console.log("4. EXIT");

    r1.question("ENTER YOUR CHOICE: ", (choice) => {
        switch (choice) {
            case '1':
                sendMoney();
                break;
            case '2':
                viewBalance();
                break;
            case '3':
                sendMessage();
                break;
            case '4':
                console.log("Exiting the application");
                break;
            default:
                console.log("INVALID CHOICE. PLEASE ENTER A VALID CHOICE FROM THE MENU");
                main();
                break;
        }
    });
}

// Example usage with UserAuthenticate as a callback
UserAuthenticate(main);
