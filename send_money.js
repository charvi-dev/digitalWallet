const fs = require('fs');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMoneyPrompt() {
    r1.question("Enter your username: ", (senderUsername) => {
        // Read the JSON file
        fs.readFile('data1.json', 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading data1.json file: ${err.message}`);
                return;
            }

            try {
                const users = JSON.parse(data);

                // Check if the sender's username exists
                const sender = users.find(u => u.username === senderUsername);

                if (sender) {
                    r1.question("Enter the recipient's username: ", (recipientUsername) => {
                        // Check if the recipient's username exists and is different from sender
                        const recipient = users.find(u => u.username === recipientUsername && u.username !== senderUsername);

                        if (recipient) {
                            r1.question("Enter the amount to send: ", (amount) => {
                                sendMoney(sender, recipient, amount, users);
                            });
                        } else {
                            console.log("Invalid recipient username or same as sender. Please try again.");
                            sendMoneyPrompt();
                        }
                    });
                } else {
                    console.log("Invalid sender username. Please try again.");
                    sendMoneyPrompt();
                }
            } catch (parseError) {
                console.error(`Error parsing data1.json file: ${parseError.message}`);
            }
        });
    });
}

function sendMoney(sender, recipient, amount, users) {
    // Check if the sender has sufficient balance
    if (sender.account_balance >= parseInt(amount)) {
        // Update sender's and recipient's account_balance
        sender.account_balance -= parseInt(amount);
        recipient.account_balance += parseInt(amount);

        // Save the updated data back to the file
        fs.writeFile('data1.json', JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing to data1.json file: ${writeErr.message}`);
            } else {
                console.log(`Money sent successfully!`);
            }
            r1.close();
        });
    } else {
        console.log("Insufficient balance. Please try again.");
        sendMoneyPrompt();
    }
}

// Start the money transfer prompt
sendMoneyPrompt();
