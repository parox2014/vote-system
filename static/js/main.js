(function () {
  var router=new VueRouter();
  
  window.addEventListener('DOMContentLoaded',function () {
    router.map({
      '/':{
        name:'vote',
        component:Vue.component('VoteView')
      },
      '/candidate':{
        name:'candidate',
        component:Vue.component('CandidateView')
      }
    });

    router.start({},'#app');
  });
})();
