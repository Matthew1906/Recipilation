export const limitString = (str, length)=>str.length>length ? str.slice(0, length).trim()+'...' : str;

export const titleString = (string, sep=" ")=>{
    const subArrays = string.trim().split(sep).map((str)=>`${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`);
    return subArrays.join(" ");
};

export const slugifyString = (string)=>{
    const subArrays = string.toLowerCase().trim().split(" ");
    return subArrays.join("-")
}