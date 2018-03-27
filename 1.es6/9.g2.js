function double(val) {
    console.log(val);
    return function (next) {//当异步任务完成后会把返回值赋给next
        setTimeout(function () { next(val * val); }, 1000)
    }
}
co(function* () {
    var a = yield double(2);
    console.log('a');
    console.log(a);
    var b = yield double(3);
    console.log('b');
    console.log(b);
})();
//co 可以让迭代器自动执行
function co(gen) {
    return function () {
        var it = gen();//得到迭代器
        function next(val) {
            var result = it.next(val);
            console.log('------->');
            console.log(result);
            if (!result.done) {
                result.value(next);
            }
        }
        next();
    }
}

