export const mean = (arr)=>{
    return arr.reduce((a,b)=>a+b, 0) / arr.length
}

export const intersect = (arr1, arr2)=>{
    return arr1.filter(val=>arr2.includes(val)).length>0;
}