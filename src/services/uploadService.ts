import axios from "axios";

export const uploadFile = async (
  file: File,
  folder = "uploads"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await axios.post("/api/upload", {
          file: reader.result,
          folder,
        });
        resolve(res.data.url);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });
};
