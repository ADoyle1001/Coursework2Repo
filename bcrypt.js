/** Call this as 'node genhash.js <password>' and you'll get the hash */
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = process.argv[2];

bcrypt.hash(password, saltRounds).then(function(hash) {
    console.log(hash);
});
