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
            CourseworkDueDate: '06/05/2020',
            CourseworkCompletionDate: '06/05/2020'
        });
        
        this.db.insert({
            CourseworkTitle: 'IP3 Individual Report',
            CourseworkModule: 'Integrated Project 3', 
            ProjectMilestones: 'Started development',
            CourseworkDueDate: '06/05/2020',
            CourseworkCompletionDate: '06/05/2020'            
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
     addCoursework(CourseworkTitle, CourseworkModule, ProjectMilestones, CourseworkDueDate , CourseworkCompletionDate) {
        var entry = {
            CourseworkTitle: CourseworkTitle,
            CourseworkModule: CourseworkModule,
            ProjectMilestones: ProjectMilestones,
            CourseworkDueDate: CourseworkDueDate,
            CourseworkCompletionDate: CourseworkCompletionDate
            
        };

        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document into database", title);
            } else {
                console.log('add coursework:', student);
            }
        });
    }
}
module.exports = DAO;



