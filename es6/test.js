
// // function fn1() {
// //     return new Promise(resolve => {
// //         setTimeout(() => {
// //             // return resolve('result1')
// //             resolve('result1')
// //         }, 0)
// //     })
// // }
// // function fn2() {
// //     return new Promise(resolve => {
// //         resolve('result2')
// //     })
// // }


// // fn1().then(data => {
// //     console.log(data);

// // })
// // // console.log(2);

// // fn2().then(data => {
// //     console.log(data);

// // })

// new Promise(resolve => setTimeout(resolve(1),0)).then(data => console.log(data))
// console.log(2)

// function resolve(data) {
//     this.resolveData = data
// }

// function reject(data) {
//     this.rejectData = data
// }

// function MyPromise(func) {
//     func(resolve.bind(this), reject.bind(this))
// }

// MyPromise.prototype.then = function(func) {
//     // func(this.resolveData)
//     this.resolveFunc = func
//     return this
// }

// MyPromise.prototype.catch = function(func) {
//     // func(this.rejectData)
//     this.rejectFunc = func
//     return this
// }

// new MyPromise((resolve, reject) => {
//     console.log(0)
//     setTimeout(() => {
//         if (true) {
//             resolve(1)
//         } else {
//             reject(1)
//         }
//     }, 1);
// }).then()
// .catch()

new Promise();