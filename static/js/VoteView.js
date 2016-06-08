Vue.component('VoteView',{
  template:`
    <div class="container">
      <div class="panel panel-success">
         <div class="panel-heading"><h4>投票</h4></div>
         <div class="panel-body">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <th>姓名</th>
              <th>口号</th>
              <th>颜色</th>
              <th>票数</th>
              <th>投票</th>
            </thead>
            <tr v-for="candidate of candidates">
               <td>{{candidate.realName}}</td>
               <td>{{candidate.slogan}}</td>
               <td :style="{background:candidate.color}"></td>
               <td><strong style="font-size: 18px;">{{candidate.votes}}</strong></td>
               <td>
                 <button class="btn btn-success btn-sm" 
                  :disabled="disableAllButton"
                  @click="vote(candidate)">
                    投 {{candidate.realName}} 一票
                 </button>
               </td>
            </tr>
          </table>
         </div>
      </div>
    </div>
  `,
  data(){
    return {
      candidates:[],
      disableAllButton:false
    }
  },
  route:{
    data(){
      return this.fetch();
    }
  },
  methods:{
    fetch(){
      return this.$http.get('/candidate')
        .then(function (resp) {
          this.candidates=resp.data;
          return {};
        });
    },
    vote(candidate){
      var _this=this;

      //点击投票后，禁用所有按钮，以防误点
      this.disableAllButton=true;

      this.$http.put('/candidate/'+candidate._id+'/vote')
        .then(function (resp) {
          candidate.votes=resp.data.votes;
          setTimeout(function () {
            _this.disableAllButton=false;
          },1000);
        });
    }
  }
});