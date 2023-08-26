export const limitString = (str, length)=>str.length>length ? str.slice(0, length).trim()+'...' : str;

export const titleString = (string, sep=" ")=>{
    const subArrays = string.trim().split(sep).map((str)=>`${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`);
    return subArrays.join(" ");
};

export const slugifyString = (string)=>{
    const subArrays = string.toLowerCase().trim().split(" ");
    return subArrays.join("-")
}

export const base64String= (file)=>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }