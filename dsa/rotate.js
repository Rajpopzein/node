function rotateArray(nums, k) {
    k = k % nums.length;
    reverseArray(nums, 0, nums.length - 1);
    reverseArray(nums, 0, k - 1);
    reverseArray(nums, k, nums.length - 1);
}

function reverseArray(nums, start, end) {
    while (start < end) {
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

let inputArray = [1, 2, 3, 4, 5, 6, 7];
let k = 3;
rotateArray(inputArray, k);
console.log('Rotated Array:', inputArray);
