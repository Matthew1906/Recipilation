export const limitString = (str, length)=>str.length>length ? str.slice(0, length).trim()+'...' : str;

export const titleString = (string)=>{
    const subArrays = string.trim().split(" ").map((str)=>`${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`);
    return subArrays.join(" ");
};

export const unSlugString = (string)=>{
    const subArrays = string.trim().split("-").map((str)=>`${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`);
    return subArrays.join(" ");
}