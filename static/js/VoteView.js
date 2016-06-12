Vue.component('VoteView',{
  template:`
    <div class="view-container">
      <div class="panel panel-primary">
         <div class="panel-heading"><h4>投票</h4></div>
         <div class="panel-body">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <th>姓名</th>
              <th>投票</th>
              <th>票数</th>
              <th>口号</th>
              <th>颜色</th>
              <th>删除</th>
              
            </thead>
            <tr v-for="candidate of candidates">
               <td>{{candidate.realName}}</td>
               <td>
                 <button class="btn btn-primary btn-sm" 
                  :disabled="disableAllButton"
                  @click="vote(candidate)">
                    +1
                 </button>
               </td>
               
               <td><strong style="font-size: 18px;">{{candidate.votes}}</strong></td>

               <td>{{candidate.slogan}}</td>
               <td :style="{background:candidate.color}"></td>
               <td>
                <button class="btn btn-danger btn-sm" @click="removeCandidate(candidate)">删除</button>
               </td>
            </tr>
          </table>
         </div>
         <div class="panel-footer">
          <button class="btn btn-danger" @click="resetVotes">重置所有候选人票数</button>
          <button class="btn btn-warning btn-lg" @click="finishVote">结束投票</button>
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
    },
    resetVotes(){
      if(confirm('你确定要重置所有票数吗？不可恢复，请谨慎操作。')){
        this.$http.put('/candidate/reset',function () {
          alert('重置成功!');
          this.candidates.forEach(function (item) {
            item.votes=0;
          });
        });
      }
    },
    removeCandidate(candidate){
      if(confirm('你确定要删除此候选人吗？')){
        this.$http.delete('/candidate/'+candidate._id,function () {
          alert('删除成功!');
          this.removeLocal(candidate);
        });
      }
    },
    removeLocal(candidate){
      var index=this.candidates.indexOf(candidate);
      this.candidates.splice(index,1);
    },
    finishVote(){
      this.$http.put('/candidate/finish',function () {
        alert('操作成功');
      });
    }
  }
});