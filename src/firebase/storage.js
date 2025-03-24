// Firebase Storage Services for Localfy
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The storage path (e.g., 'users/userId/profile.jpg')
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return { url: downloadURL, error: null };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { url: null, error: error.message };
  }
};

/**
 * Upload a profile image
 * @param {File} file - The image file
 * @param {string} userId - The user ID
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadProfileImage = async (file, userId) => {
  const path = `users/${userId}/profile.${file.name.split('.').pop()}`;
  return uploadFile(file, path);
};

/**
 * Upload a date idea image
 * @param {File} file - The image file
 * @param {string} dateIdeaId - The date idea ID
 * @param {number} index - The image index (for multiple images)
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadDateIdeaImage = async (file, dateIdeaId, index = 0) => {
  const path = `dateIdeas/${dateIdeaId}/image_${index}.${file.name.split('.').pop()}`;
  return uploadFile(file, path);
};

/**
 * Delete a file from Firebase Storage
 * @param {string} path - The storage path
 * @returns {Promise<{error: string|null}>}
 */
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    
    return { error: null };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { error: error.message };
  }
};

/**
 * Get the download URL for a file
 * @param {string} path - The storage path
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const getFileURL = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    
    return { url, error: null };
  } catch (error) {
    console.error("Error getting file URL:", error);
    return { url: null, error: error.message };
  }
};
