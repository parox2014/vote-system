Vue.component('CandidateView', {
  template: `
    <div class="container">
      <validator name="form">
        <div class="row"> 
          <div class="col-md-6 col-md-offset-3">
            <form novalidate class="panel panel-success" @submit.prevent="onSubmit">
              <div class="panel-heading">
              <h4>添加候选人</h4>
              </div>
              <div class="panel-body">
                <div class="input-group" style="width: 100%;">
                  <input type="text" 
                    name="realName" 
                    class="form-control" 
                    v-model="realName"
                    v-validate:realName="{required:true,minlength:2,maxlength:10}" 
                    placeholder="姓名">
                </div>
                
                <div class="input-group" style="width: 100%;">
                  <input type="text" 
                    name="slogan" 
                    class="form-control" 
                    v-model="slogan"
                    v-validate:slogan="{required:true,minlength:2,maxlength:100}" 
                    placeholder="口号">
                </div>
                
                <div class="input-group" style="width: 100%;">
                  <input type="color" 
                    name="color" 
                    class="form-control" 
                    v-model="color"
                    placeholder="柱状图背景色">
                </div>
                
                <div class="input-group margin-top" style="width: 100%;">
                  <button type="submit" :disabled="$form.invalid" class="btn btn-block btn-success">立即添加</button>
                </div>
                
                <div class="input-group margin-top" style="width: 100%;">
                  <button type="reset" class="btn btn-block">重置</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </validator>
    </div> 
  `,
  data(){
    return {
      realName:'',
      slogan:'',
      color:''
    }
  },
  methods:{
    onSubmit(){
      var _this=this;
      var params={
        realName:this.realName,
        slogan:this.slogan,
        color:this.color
      };
      this.$http.post('/candidate',params)
        .then(function (resp) {
          console.log(resp);
          _this.reset();
          alert('添加候选人成功!');
        })
        .catch(function () {
          alert('添加候选人失败，请重试');
        });
      this.$log('$data');
    },
    reset(){
      this.realName='';
      this.slogan='';
      this.color='';
    }
  }
});
