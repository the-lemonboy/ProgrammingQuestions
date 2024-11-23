// const a = 1
// const obj = {
//     a: 2,
// }
// // const fn = () => {
// //     console.log(a)
// // }
// // fn.call(obj)
// // // 模拟箭头函数
// const a = 1;
// const obj = {
//     a: 2,
// };
// const fn = (function() {
//     console.log(this.a);
// }).bind(this); // 使用外层的 this（即全局 this）

// fn.call(obj); // 输出：1

// const arr = [1,2,3,4,5]
// const arr1 = arr.(2,4)
// console.log(arr,arr1)