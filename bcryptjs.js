/** Call this as 'node genhash.js <password>' and you'll get the hash */
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const password = process.argv[2];

bcryptjs.hash(password, saltRounds).then(function(hash) {
    console.log(hash);
});
