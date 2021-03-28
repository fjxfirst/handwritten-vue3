const fs = require('fs');
const execa = require('execa');//开启子进程，使用rollup打包
const target = `reactivity`;

// 对目标进行依次打包，并行打包

async function build(target) { // rollup -c --environment TARGET: xxx
    await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {stdio: 'inherit'});
}

build(target);
/*function runParallel(targets, iteratorFn) {
    const res = [];
    for(const item of targets) {
        const p = iteratorFn(item);
        res.push(p);
    }
    return Promise.all(res);
}

runParallel(targets, build);*/
