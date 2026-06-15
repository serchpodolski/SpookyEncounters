import sanitize from "sanitize-html";

export const sanitizeData = (data) => {
  const keys = Object.keys(data);
  const sanitizedData = {};
  
  // Define strict options: ONLY allow <b> tags, and absolutely NO attributes on any tag
  const sanitizeOptions = {
    allowedTags: [ 'b' ],
    allowedAttributes: {} 
  };

  keys.forEach(key => {
    // Check if the value is a string before attempting to sanitize it
    if (typeof data[key] === 'string') {
      sanitizedData[key] = sanitize(data[key], sanitizeOptions);
    } else {
      sanitizedData[key] = data[key]; // Leave numbers, booleans, arrays untouched
    }
  });

  return sanitizedData;
};