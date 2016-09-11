//直接创建一个成功的promise
//var promise = Promise.resolve('结果');
//直接创建一个失败态的promise
/*var promise = Promise.reject('失败');
promise.then(function(data){
    console.log(data);
},function(err){
    console.error(err);
});*/

var promise = Promise.resolve('结果');
var r1 = promise.then(function(data){
    //不管返回的是什么数据， then都返回promise
    //return false;
    //return Promise.resolve(1);
    return Promise.reject('我要让这个任务失败');
});
r1.then(function(data){
    console.log(data);
}).catch(function(errr){
    console.error(errr);
}).then().catch();
console.log(r1);