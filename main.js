const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generatePassword(length) {
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

function deleteOldFile() {
  fs.unlink('generated_passwords.txt', function(err) {
    if (err) {
      console.error("Error when deleting an old file:", err);
    } else {
      console.log("The old file was successfully deleted");
    }
  });
}

rl.question("Password length: ", function(length) {
  rl.question("Password count: ", function(count) {
    let passwords = [];
    
    deleteOldFile();
    
    for (let i = 0; i < parseInt(count); i++) {
      let password = generatePassword(parseInt(length));
      passwords.push(password);
    }
    
    console.log("Generated passwords:");
    console.log(passwords);
    
    fs.writeFile('generated_passwords.txt', passwords.join('\n'), function(err) {
      if (err) {
        console.error("Error when writing to a file:", err);
      } else {
        console.log("Passwords successfully written to the file generated_passwords.txt");
      }
    });
    
    rl.close();
  });
});
