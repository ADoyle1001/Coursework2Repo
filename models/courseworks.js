//import the nedb module
const Datastore = require("nedb");

//the class can be instantiated with the db in embedded mode by providing a 
//data file or in-memory mode without it
class DAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
        } else {
            //in memory 
            this.db = new Datastore();
        }
}


init() {
    this.db.insert({
        Ctitle: 'Web Dev',
        module: 'Test', 
        milestones: 'made a website'
    });
    console.log('record inserted in init');
    
    this.db.insert({
        Ctitle: 'IP3',
        module: 'Integrated', 
        milestones: 'made a mockup'
    });
    console.log('record inserted in init');
}

    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, entries) {
                if (err) {
                    reject(err);
                    console.log('get all entries rejected');
                } else {
                    resolve(entries);
                    console.log('get all entries resolved');
                }
            });
        })
    }

     //insert a new coursework entry
     addCoursework(Ctitle, module, milestones) {
        var entry = {
            Ctitle: Ctitle,
            module: module,
            milestones: milestones
        };

        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document into database", Ctitle);
            } else {
                console.log('add coursework:', Ctitle);
            }
        });
    }

    //delete coursework 
    deleteCoursework(title) {
        this.db.remove({ "Ctitle": Ctitle }, {}, function (err, numRemoved) {
            if (err) {
                console.log('Error deleting coursework', Ctitle, err);
            } else {
                console.log('deleted coursework:', Ctitle, numRemoved);
            }
        });
    }

    //update details for a coursework
    updateCoursework(Ctitle, module, milestones) {
        this.db.update({ "Ctitle": Ctitle }, { $set: { "module": module, "milestones": milestones } },
            function (err, numReplaced) {
                if (err) {
                    console.log('Error updating coursework', Ctitle, err);
                } else {
                    console.log('update coursework:', Ctitle);
                }
            });
    }

   
    getCoursework(Ctitle) {
        return new Promise((resolve, reject) => {
            this.db.find({ "Ctitle": Ctitle }, function (err, entries) {
                if (err) {
                    reject(err);
                    
                } else {
                    resolve(entries);
                    
                }
            });
        });
    }
}
module.exports = DAO;



