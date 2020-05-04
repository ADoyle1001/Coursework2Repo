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
            CourseworkTitle: 'Web Development Video Presentation',
            CourseworkModule: 'Web Development', 
            ProjectMilestones: 'working on database',
            
        });
        
        this.db.insert({
            CourseworkTitle: 'IP3 Individual Report',
            CourseworkModule: 'Integrated Project 3', 
            ProjectMilestones: 'Started development',
                       
        });
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
     addCoursework(CourseworkTitle, CourseworkModule, ProjectMilestones) {
        var entry = {
            CourseworkTitle: CourseworkTitle,
            CourseworkModule: CourseworkModule,
            ProjectMilestones: ProjectMilestones,
            
            
        };

        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document into database", title);
            } else {
                console.log('add coursework:', CourseworkTitle);
            }
        });
    }

    //delete coursework 
    deleteCoursework(CourseworkTitle) {
        this.db.remove({ "CourseworkTitle": CourseworkTitle }, {}, function (err, numRemoved) {
            if (err) {
                console.log('Error deleting coursework', CourseworkTitle, err);
            } else {
                console.log('deleted coursework:', CourseworkTitle, numRemoved);
            }
        });
    }

    //update details for a coursework
    updateStudent(CourseworkTitle, CourseworkModule, ProjectMilestones) {
        this.db.update({ "CourseworkTitle": CourseworkTitle }, { $set: { "CourseworkModule": CourseworkModule, "ProjectMilestones": ProjectMilestones } }, { multi: true },
            function (err, numReplaced) {
                if (err) {
                    console.log('Error updating coursework', CourseworkTitle, err);
                } else {
                    console.log('update coursework:', CourseworkTitle);
                }
            });
    }
}
module.exports = DAO;



