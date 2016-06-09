var candidateCtrl = require('../controllers');

module.exports = function (app) {
  var Router = require('express').Router;
  var candidateRouter = Router();
  
  //主页，展示投票结果
  app.get('/', function (req, res) {
    res.render('vote-result', {});
  });
  //管理界面
  app.get('/admin', function (req, res) {
    res.render('admin', {});
  });
  
  //投票接口
  candidateRouter.put('/:id/vote', candidateCtrl.vote);
  
  //添加候选人
  candidateRouter.post('/', candidateCtrl.add);

  //获取所有获选人
  candidateRouter.get('/', candidateCtrl.query);
  
  //重置所有候选人分数
  candidateRouter.put('/reset',candidateCtrl.resetAllVotes);
  //删除候选人
  candidateRouter.delete('/:id',candidateCtrl.remove);

  app.use('/candidate', candidateRouter);
};