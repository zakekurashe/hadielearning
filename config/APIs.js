// export const baseUrl = "http://localhost:5000";
export const baseUrl = "https://api.hadielearning.com";

export const API = `${baseUrl}/api`;

export const toImageUrl = (filePath) => {
  return `${baseUrl}/${filePath.replace(/\\/g, "/")}`;
};
