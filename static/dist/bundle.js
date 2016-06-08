'use strict';

Vue.component('CandidateView', {
  template: '\n    <div class="container">\n      <validator name="form">\n        <div class="row"> \n          <div class="col-md-6 col-md-offset-3">\n            <form novalidate class="panel panel-success" @submit.prevent="onSubmit">\n              <div class="panel-heading">\n              <h4>添加候选人</h4>\n              </div>\n              <div class="panel-body">\n                <div class="input-group" style="width: 100%;">\n                  <input type="text" \n                    name="realName" \n                    class="form-control" \n                    v-model="realName"\n                    v-validate:realName="{required:true,minlength:2,maxlength:10}" \n                    placeholder="姓名">\n                </div>\n                \n                <div class="input-group" style="width: 100%;">\n                  <input type="text" \n                    name="slogan" \n                    class="form-control" \n                    v-model="slogan"\n                    v-validate:slogan="{required:true,minlength:2,maxlength:100}" \n                    placeholder="口号">\n                </div>\n                \n                <div class="input-group" style="width: 100%;">\n                  <input type="color" \n                    name="color" \n                    class="form-control" \n                    v-model="color"\n                    placeholder="柱状图背景色">\n                </div>\n                \n                <div class="input-group margin-top" style="width: 100%;">\n                  <button type="submit" :disabled="$form.invalid" class="btn btn-block btn-success">立即添加</button>\n                </div>\n                \n                <div class="input-group margin-top" style="width: 100%;">\n                  <button type="reset" class="btn btn-block">重置</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </validator>\n    </div> \n  ',
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
  template: '\n    <div class="container">\n      <div class="panel panel-success">\n         <div class="panel-heading"><h4>投票</h4></div>\n         <div class="panel-body">\n          <table class="table table-bordered table-striped table-hover">\n            <thead>\n              <th>姓名</th>\n              <th>口号</th>\n              <th>颜色</th>\n              <th>票数</th>\n              <th>投票</th>\n            </thead>\n            <tr v-for="candidate of candidates">\n               <td>{{candidate.realName}}</td>\n               <td>{{candidate.slogan}}</td>\n               <td :style="{background:candidate.color}"></td>\n               <td><strong style="font-size: 18px;">{{candidate.votes}}</strong></td>\n               <td>\n                 <button class="btn btn-success btn-sm" \n                  :disabled="disableAllButton"\n                  @click="vote(candidate)">\n                    投 {{candidate.realName}} 一票\n                 </button>\n               </td>\n            </tr>\n          </table>\n         </div>\n      </div>\n    </div>\n  ',
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
    }
  }
});
//# sourceMappingURL=bundle.js.map
