function findMissingNumber(arr) {
    const n = arr.length + 1;
    const tSum = (n * (n + 1)) / 2;
    
    const aSum = arr.reduce((sum, num) => sum + num, 0);
    
    const missingNumber = tSum - aSum;
    
    return missingNumber;
}

const inputArray = [1, 3, 4, 5, 6, 7, 8, 9, 10];
const missingNumber = findMissingNumber(inputArray);
console.log('Missing Number:', missingNumber);