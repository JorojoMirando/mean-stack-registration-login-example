var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    db.questions.findById(_id, function (err, question) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (question) {
            // return user (without hashed password)
            //deferred.resolve(_.omit(user, 'hash'));
            deferred.resolve(question);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(questionParam) {
    var deferred = Q.defer();

    // validation
    db.questions.findOne(
        { questao: questionParam.questao },
        function (err, questao) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (questao) {
                // username already exists
                deferred.reject('A questao "' + questionParam.questao + '" já existe');
            } else {
                createQuestion();
            }
        });

    function createQuestion() {
        // set user object to userParam without the cleartext password
        //var user = _.omit(userParam, 'password');

        // add hashed password to user object
        //user.hash = bcrypt.hashSync(userParam.password, 10);

        db.questions.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, questionParam) {
    var deferred = Q.defer();

    // validation
    db.questions.findById(_id, function (err, question) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (question.questao !== questionParam.questao) {
            // username has changed so check if the new username is already taken
            db.questions.findOne(
                { questao: questionParam.questao },
                function (err, questao) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (questao) {
                        // username already exists
                        deferred.reject('Questao "' + req.body.questao + '" já existe')
                    } else {
                        updateQuestion();
                    }
                });
        } else {
            updateQuestion();
        }
    });

    function updateQuestion() {
        // fields to update
        var set = {
            questao: questionParam.questao
        };

        db.questions.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}