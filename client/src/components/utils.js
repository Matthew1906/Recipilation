export const limitString = (str, length)=>str.length>length ? str.slice(0, length).trim()+'...' : str;
