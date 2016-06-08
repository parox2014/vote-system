var mongoose=require('mongoose');
var Scheme=mongoose.Schema;


var CandidateScheme=new Scheme({
  realName:{
    type:String,
    required:true
  },
  slogan:String,
  votes:{
    type:Number,
    default:0
  },
  color:{
    type:String,
    default:'#cccccc'
  }
},{
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/votesystem',{
  poolSize:20
},function (err) {
  if (!err) {
    logger.info('database connect success');
  } else {
    logger.error(err.message);
  }
});


exports.Candidate=mongoose.model('Candidate',CandidateScheme);