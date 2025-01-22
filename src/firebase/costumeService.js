import { db, storage } from './config';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const costumeService = {
  // Get all costumes
  getCostumes: async () => {
    const querySnapshot = await getDocs(collection(db, 'costumes'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Add new costume with image
  addCostume: async (costumeData, imageFile) => {
    try {
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `costumes/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, 'costumes'), {
        ...costumeData,
        imageUrl,
        createdAt: new Date().toISOString()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error adding costume:', error);
      throw error;
    }
  },

  // Update costume status
  updateStatus: async (costumeId, status) => {
    const costumeRef = doc(db, 'costumes', costumeId);
    await updateDoc(costumeRef, { status });
  }
};
