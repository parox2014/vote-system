var Candidate=require('../models').Candidate;



exports.query=function (req, res) {
  Candidate.find()
    .exec(function (err,docs) {
      
    });
};

exports.add=function (req, res) {
  
};

exports.vote=function (req, res) {
  
};