const fs = require('fs');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage() {
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
                        // Check if the recipient's username exists
                        const recipient = users.find(u => u.username === recipientUsername);

                        if (recipient) {
                            r1.question("Enter your message: ", (message) => {
                                // Add the message to the recipient's messages
                                if (!recipient.messages) {
                                    recipient.messages = [];
                                }
                                recipient.messages.push({
                                    sender: senderUsername,
                                    content: message,
                                    timestamp: new Date().toISOString()
                                });

                                // Save the updated data back to the file
                                fs.writeFile('data1.json', JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
                                    if (writeErr) {
                                        console.error(`Error writing to data1.json file: ${writeErr.message}`);
                                    } else {
                                        console.log(`Message sent successfully!`);
                                    }
                                    r1.close();
                                });
                            });
                        } else {
                            console.log("Invalid recipient username. Please try again.");
                            sendMessage();
                        }
                    });
                } else {
                    console.log("Invalid sender username. Please try again.");
                    sendMessage();
                }
            } catch (parseError) {
                console.error(`Error parsing data1.json file: ${parseError.message}`);
            }
        });
    });
}

// Example usage of the sendMessage function
sendMessage();
