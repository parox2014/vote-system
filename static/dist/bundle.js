'use strict';

Vue.component('CandidateView', {
  template: '\n    <div class="view-container">\n      <validator name="form">\n        <form novalidate class="panel panel-primary" @submit.prevent="onSubmit">\n          <div class="panel-heading">\n            <h4>添加候选人</h4>\n          </div>\n          <div class="panel-body">\n            <div class="row">\n              <div class="col-md-6 col-md-offset-3">\n                <h5 class="margin-top">姓名</h5>\n                <div class="input-group margin-top" style="width: 100%;">\n                  <input type="text" \n                    name="realName" \n                    class="form-control" \n                    v-model="realName"\n                    v-validate:realName="{required:true,minlength:2,maxlength:10}" \n                    placeholder="姓名">\n                </div>\n                <h5 class="margin-top">口号</h5>\n                <div class="input-group margin-top" style="width: 100%;">\n                  <input type="text" \n                    name="slogan" \n                    class="form-control" \n                    v-model="slogan"\n                    v-validate:slogan="{required:true,minlength:2,maxlength:100}" \n                    placeholder="口号">\n                </div>\n                <h5 class="margin-top">柱状图背景色</h5>\n                <div class="input-group margin-top" style="width: 100%;">\n                  <input type="color" \n                    name="color" \n                    class="form-control" \n                    v-model="color"\n                    placeholder="柱状图背景色">\n                </div>\n            \n                <div class="row margin-top">\n                  <div class="col-md-6">\n                    <button type="submit" \n                      :disabled="$form.invalid" \n                      class="btn btn-block btn-primary">立即添加</button>\n                  </div>\n                  \n                  <div class="col-md-6">\n                    <button type="reset" class="btn btn-block">重置</button>\n                   </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </validator>\n    </div> \n  ',
  data: function data() {
    return {
      realName: '',
      slogan: '',
      color: ''
    };
  },

  methods: {
    onSubmit: function onSubmit() {
      var _this = this;
      var params = {
        realName: this.realName,
        slogan: this.slogan,
        color: this.color
      };
      this.$http.post('/candidate', params).then(function (resp) {
        console.log(resp);
        _this.reset();
        alert('添加候选人成功!');
      }).catch(function () {
        alert('添加候选人失败，请重试');
      });
      this.$log('$data');
    },
    reset: function reset() {
      this.realName = '';
      this.slogan = '';
      this.color = '';
    }
  }
});
'use strict';

(function () {
  var router = new VueRouter();

  window.addEventListener('DOMContentLoaded', function () {
    router.map({
      '/': {
        name: 'vote',
        component: Vue.component('VoteView')
      },
      '/candidate': {
        name: 'candidate',
        component: Vue.component('CandidateView')
      }
    });

    router.start({}, '#app');
  });
})();
'use strict';

Vue.component('VoteView', {
  template: '\n    <div class="view-container">\n      <div class="panel panel-primary">\n         <div class="panel-heading"><h4>投票</h4></div>\n         <div class="panel-body">\n          <table class="table table-bordered table-striped table-hover">\n            <thead>\n              <th>姓名</th>\n              <th>投票</th>\n              <th>票数</th>\n              <th>口号</th>\n              <th>颜色</th>\n              <th>删除</th>\n              \n            </thead>\n            <tr v-for="candidate of candidates">\n               <td>{{candidate.realName}}</td>\n               <td>\n                 <button class="btn btn-primary btn-sm" \n                  :disabled="disableAllButton"\n                  @click="vote(candidate)">\n                    +1\n                 </button>\n               </td>\n               \n               <td><strong style="font-size: 18px;">{{candidate.votes}}</strong></td>\n\n               <td>{{candidate.slogan}}</td>\n               <td :style="{background:candidate.color}"></td>\n               <td>\n                <button class="btn btn-danger btn-sm" @click="removeCandidate(candidate)">删除</button>\n               </td>\n            </tr>\n          </table>\n         </div>\n         <div class="panel-footer">\n          <button class="btn btn-danger" @click="resetVotes">重置所有候选人票数</button>\n          </div>\n      </div>\n    </div>\n  ',
  data: function data() {
    return {
      candidates: [],
      disableAllButton: false
    };
  },

  route: {
    data: function data() {
      return this.fetch();
    }
  },
  methods: {
    fetch: function fetch() {
      return this.$http.get('/candidate').then(function (resp) {
        this.candidates = resp.data;
        return {};
      });
    },
    vote: function vote(candidate) {
      var _this = this;

      //点击投票后，禁用所有按钮，以防误点
      this.disableAllButton = true;

      this.$http.put('/candidate/' + candidate._id + '/vote').then(function (resp) {
        candidate.votes = resp.data.votes;
        setTimeout(function () {
          _this.disableAllButton = false;
        }, 1000);
      });
    },
    resetVotes: function resetVotes() {
      if (confirm('你确定要重置所有票数吗？不可恢复，请谨慎操作。')) {
        this.$http.put('/candidate/reset', function () {
          alert('重置成功!');
          this.candidates.forEach(function (item) {
            item.votes = 0;
          });
        });
      }
    },
    removeCandidate: function removeCandidate(candidate) {
      if (confirm('你确定要删除此候选人吗？')) {
        this.$http.delete('/candidate/' + candidate._id, function () {
          alert('删除成功!');
          this.removeLocal(candidate);
        });
      }
    },
    removeLocal: function removeLocal(candidate) {
      var index = this.candidates.indexOf(candidate);
      this.candidates.splice(index, 1);
    }
  }
});
//# sourceMappingURL=bundle.js.map
