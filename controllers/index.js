var Candidate = require('../models').Candidate;

exports.query = function (req, res) {
  Candidate.find()
    .exec(function (err, docs) {
      if (err) {
        return res.status(500)
          .json(err);
      }

      res.json(docs);
    });
};

exports.add = function (req, res) {
  var data = req.body;

  var candidate = new Candidate(data);

  candidate.save()
    .then(function (doc) {
      res.json(doc);
    })
    .catch(function (err) {
      res.status(500)
        .json(err);
    });
};

exports.vote = function (req, res) {
  var id = req.params.id;
  var modifier = {
    '$inc': {
      'votes': 1
    }
  };
  Candidate.update(modifier)
    .where('_id')
    .equals(id)
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }

      Candidate.findById(id)
        .then(function (doc) {
          //返回结果
          res.json(doc);
          //socket通知
          notification.emit('notification', doc);
        })
        .catch(function (err) {
          res.json(result);
          notification.emit('refresh', err);
        });
    });
};

exports.resetAllVotes = function (req, res) {
  Candidate.update({}, {$set: {votes: 0}}, {multi: true})
    .exec(function (err,result) {
      res.json(result);
    });
};

exports.remove = function (req, res) {
  
  Candidate.remove({_id:req.params.id},function (err, result) {
    if(err){
      return res.status(500).json(err);
    }
    
    res.json(result);
  });
};