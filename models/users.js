const Datastore = require("nedb");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {

            this.db = new Datastore({ filename: dbFilePath, autoload: true });
        } else {

            this.db = new Datastore();
        }
    }

    init() {
        this.db.insert({
            user: 'Peter',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });

        
        this.db.insert({
            user: 'Ann',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'            
        });
   
        return this;
    }

    create(username, password) { 
        const that = this;
        bcryptjs.hash(password, saltRounds).then(function(hash) {
            var entry = {
                user: username,
                password: hash,
            };    
  
            
            that.db.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });  
    }

    lookup(user, cb) {
        this.db.find({'users': user}, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}

const dao = new UserDAO();
dao.init();
module.exports = dao;