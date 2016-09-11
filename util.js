//对字符串进行md5加密,upate指定输入，digest进行输出 hex十六进制
exports.md5 = function(str){
  return require('crypto').createHash('md5').update(str).digest('hex');
}
// 16个字节
//console.log(exports.md5('83687401@qq.com'));
// 0-255
// 00-ff
// 100
//console.log(16*16-1);
//console.log(15+15*16);