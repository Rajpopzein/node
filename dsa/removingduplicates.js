function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let i = 0;
    
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}

const inputArray = [1, 1, 1, 2, 2, 3, 3, 3, 4, 5];
const newLength = removeDuplicates(inputArray);
console.log('New Length:', newLength);
console.log('Array after removing duplicates:', inputArray.slice(0, newLength)); 
