### Introduction

When working with JavaScript, we may encounter situations that require us to obtain the minimum and maximum elements of an array.


> In this guide, we will learn how to get the minimum and maximum element of an array in JavaScript. We'll also look at four different methods and how fast they are when dealing with a large array.


### Get Minimum Element of an Array Using the `Math.min()` Function in JavaScript

`Math.min()` is a static function that returns the lowest number/element passed to it and returns `NaN` if at least one of the elements passed is not a number and cannot be converted to a number.

```javascript
console.log(Math.min(20, 23, 27)); // 20

console.log(Math.min(-20, -23, -27)); // -27
```

These elements are normally passed in, and using this static function with arrays becomes difficult. If we try to pass an array directly into this `Math.min()` function, for example, we get a `NaN` error:

```javascript
const myArray = [2, 3, 1];

console.log(Math.min(myArray)); // NaN
```

There are various ways we can check for the minimum element of an array using the `Math.min()` static function, let’s get started:

#### ES6 Spread Operator

The spread operator is used to spread out array items, as the name implies. It allows us to get a list of elements from an array. Using the spread operator will assist in listing out all the array's elements into the `Math.min()` static function, thereby resolving the `NaN` error:

```javascript
const myArray = [20, 23, 27];

console.log(Math.min(...myArray)); // 20
```

#### JavaScript Reduce

This is arguably the most powerful array function, as it runs a reducer function on each array element and returns a single value. 

When we run an array of about a million elements through the [JSBen benchmark](http://jsben.ch/dUHDP), it turns out to be the slowest to return either the minimum or maximum element. This was done alongside every other method we will be highlighting in this guide. 

It's worth noting, however, because certain circumstances may necessitate the use of this method:

```javascript
const myArray = [20, 23, 27];

let minElement = myArray.reduce((a, b) => {
    return Math.min(a, b);
});

console.log(minElement); // 20
```

#### Apply Method

The `apply()` method is used to invoke a function with a given `this` value and an array of arguments. This makes it possible for us to enter arrays into the `Math.min()` static function:

```javascript
const myArray = [20, 23, 27];

let minElement = Math.min.apply(Math, myArray);
console.log(minElement); // 20
// Or
let minElement = Math.min.apply(null, myArray);
console.log(minElement); // 20
```

### Get Maximum Element of an Array Using the `Math.max()` Function in JavaScript

`Math.max()` is a static function that returns the highest number/element passed to it and returns `NaN` if at least one of the elements passed is not a number and cannot be converted into one.

```javascript
console.log(Math.max(20, 23, 27)); // 27

console.log(Math.max(-20, -23, -27)); // -20
```

We'll notice that these elements are normally passed in as lists, making it difficult to directly input arrays. If we try to pass an array directly into this `Math.max()` function, for example, we get a `NaN` error:

```javascript
const myArray = [2, 3, 1];

console.log(Math.max(myArray)); // NaN
```

There are various ways we can check for the maximum element of an array using the `Math.max()` static function, let’s get started:

#### ES6 Spread Operator

The spread operator, as the name implies, is used to spread out array items. It gives us the ability to get a list of elements from an array. Using the spread operator will help list out all the elements of the array into the `Math.max()` static function, thereby resolving the `NaN` error:

```javascript
const myArray = [20, 23, 27];

console.log(Math.max(...myArray)); // 27
```

#### JavaScript Reduce

This method compares between each value and checks for the minimum value from each two values picked from the array:

```javascript
const myArray = [20, 23, 27];

let maxElement = myArray.reduce((a, b) => {
    return Math.max(a, b);
});

console.log(maxElement); // 27
```

#### Apply Method

The `**apply()**` method is used to call a function with a given `this` value, and `arguments` provided as an array. This makes it possible for us to enter arrays into the Math.max() static function:

```javascript
const myArray = [20, 23, 27];

let maxElement = Math.max.apply(Math, myArray);
console.log(maxElement); // 27
// Or
let maxElement = Math.max.apply(null, myArray);
console.log(maxElement); // 27
```

### Getting Min and Max Elements With Standard Loops

Loops are used in JavaScript to perform repeated tasks based on a condition. Conditions typically return `true` or `false`. A loop will continue running until the defined condition returns `false`. In our case, we will be making use of the `for` loop. `for` loops are commonly used to run code a set number of times. This turned out to be the fastest method when we run all tests on [JSBEN.CH](http://jsben.ch/dUHDP).

#### Get Minimum Element

What we are doing is first initializing the minimum element to the first array element, we then loop through the entire array to see if any other element is less than the initialized element, so it replaces it. This will run until the loop is over:

```javascript
const myArray = [20, 23, 27];

let minElement = myArray[0];
for (let i = 1; i < arrayLength; ++i) {
    if (myArray[i] < minElement) {
        minElement = myArray[i];
    }
}

console.log(minElement); // 20
```

#### Get Maximum Element

We will first initialize the maximum element to the first element in the array. Then we will loop through the entire array to see if any other element is greater than the initialized element, so it replaces it. This will run until the loop is over:

```javascript
const myArray = [20, 23, 27];

let maxElement = myArray[0];
for (let i = 1; i < arrayLength; ++i) {
    if (myArray[i] > maxElement) {
        maxElement = myArray[i];
    }
}

console.log(maxElement); // 27
```

### Conclusion

When we try to get the minimum and maximum element from an array of over a million elements, it becomes easier to notice some little delays. Although, when we test all the methods, they will give almost the same result. When the above methods were tested on [JSBEN](http://jsben.ch/dUHDP). It returned the following result:


![](https://paper-attachments.dropbox.com/s_33B0F8B2F0EAFE16204303E4EDFFB02D0BC99C8289B4DF992BB6A4E297CE333E_1650974655930_image.png)


This clearly shows how fast making use of standard loops could work compared to using the reduce method which is way too slow.

