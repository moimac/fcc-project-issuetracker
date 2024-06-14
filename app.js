var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// let IssueSchema = new mongoose.Schema({
//     issue_title: {
//         type: String,
//         required: true
//     },
//     issue_text: {
//         type: String,
//         required: true
//     },
//     created_on: {
//         type: Date,
//         default: Date.now
//     },
//     updated_on: {
//         type: Date,
//         default: Date.now
//     },
//     created_by: {
//         type: String,
//         required: true
//     },
//     assigned_to: {
//         type: String
//     },
//     open: {
//         type: Boolean,
//         default: true
//     },
//     status_text: {
//         type: String
//     }
// });
let IssueSchema = new mongoose.Schema({
    issue_title: String,
    issue_text: String,
    created_on: Date,
    updated_on: Date,
    created_by: String,
    assigned_to: String,
    open: Boolean,
    status_text: String
});

let Issue = mongoose.model('Issue', IssueSchema);

var createAndSaveIssue = function (data, done) {
    console.log('datas', data);
    try {

        const newIssue = new Issue({
            ...data,
            created_on: new Date(),
            updated_on: new Date()
        });
        console.log('newIssue', newIssue);
        newIssue.save(function (err, issue) {
            if (err) {
                console.log(err);
                return done(err);
            } else {
                console.log({ finished: issue });
                done(null, issue);
            }
        });
    } catch (error) {
        console.log({ error });
    }

};

var findIssueById = function (_id, done) {
    Issue.findById(_id, function (err, issue) {
        if (err) {
            console.log(err);
            return done(err);
        } else {
            done(null, issue);
        }
    });
};

var updateIssueById = function (_id, data, options, done) {
    Issue.findByIdAndUpdate(_id, data, options, function (err, issue) {
        if (err) {
            console.log(err);
            return done(err);
        } else {
            done(null, issue);
        }
    });
};

var removeIssueById = function (_id, done) {
    Issue.findByIdAndRemove(_id, function (err, issue) {
        if (err) {
            console.log(err);
            return done(err);
        } else {
            done(null, issue);
        }
    });
};

module.exports = {
    createAndSaveIssue,
    findIssueById,
    updateIssueById,
    removeIssueById
};