import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function uploadCostumeImage(file) {
  const storage = getStorage();
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const fileName = `costumes/${timestamp}.${fileExtension}`;
  
  const storageRef = ref(storage, fileName);
  
  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      url: downloadURL,
      path: fileName
    };
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
}

export default uploadCostumeImage;
