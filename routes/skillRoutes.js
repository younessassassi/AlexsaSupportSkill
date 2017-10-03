var express = require('express');
var responsestub = require('../misc/response');

var routes = function (Skill) {
    var skillRouter = express.Router();

    skillRouter.use('/', function(req, res, next) {
        Skill.findOne({}, function(err, skill) {
            if (err) {
                res.status(500).send(err);
            } else if(skill) {
                req.skill = skill;
                next();
            } else {
                res.status(404).send('no skill found');
            }
        });
    });
    skillRouter.route('/')
        .post(function(req, res) {
            res.status(201).json(req.skill); 
        })
        .get(function (req, res) {
            res.json(req.skill);
        });
    return skillRouter;
};

module.exports = routes;