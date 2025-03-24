// Firebase Firestore Services for Localfy
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  serverTimestamp,
  GeoPoint
} from 'firebase/firestore';
import { db } from './config';

// Date Ideas Collection
const dateIdeasCollection = collection(db, 'dateIdeas');
const usersCollection = collection(db, 'users');
const matchesCollection = collection(db, 'matches');

// Create a new date idea
export const createDateIdea = async (dateIdeaData) => {
  try {
    // Add coordinates as GeoPoint for Firestore
    const dataWithGeoPoint = {
      ...dateIdeaData,
      coordinates: dateIdeaData.coordinates ? 
        new GeoPoint(dateIdeaData.coordinates.lat, dateIdeaData.coordinates.lng) : 
        null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(dateIdeasCollection, dataWithGeoPoint);
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error creating date idea:", error);
    return { id: null, error: error.message };
  }
};

// Get a date idea by ID
export const getDateIdea = async (id) => {
  try {
    const docRef = doc(db, 'dateIdeas', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Convert GeoPoint back to {lat, lng} format
      const formattedData = {
        ...data,
        id: docSnap.id,
        coordinates: data.coordinates ? 
          { lat: data.coordinates.latitude, lng: data.coordinates.longitude } : 
          null
      };
      return { dateIdea: formattedData, error: null };
    } else {
      return { dateIdea: null, error: "Date idea not found" };
    }
  } catch (error) {
    console.error("Error getting date idea:", error);
    return { dateIdea: null, error: error.message };
  }
};

// Get all date ideas with optional filtering
export const getDateIdeas = async (filters = {}, lastDoc = null, itemsPerPage = 20) => {
  try {
    let q = query(dateIdeasCollection, orderBy('createdAt', 'desc'));
    
    // Apply filters if provided
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.setting) {
      q = query(q, where('setting', '==', filters.setting));
    }
    
    if (filters.budget) {
      q = query(q, where('budget', '==', filters.budget));
    }
    
    // Apply pagination
    q = query(q, limit(itemsPerPage));
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const querySnapshot = await getDocs(q);
    const dateIdeas = [];
    let lastVisible = null;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Convert GeoPoint to {lat, lng} format
      dateIdeas.push({
        ...data,
        id: doc.id,
        coordinates: data.coordinates ? 
          { lat: data.coordinates.latitude, lng: data.coordinates.longitude } : 
          null
      });
      lastVisible = doc;
    });
    
    return { 
      dateIdeas, 
      lastDoc: lastVisible, 
      error: null 
    };
  } catch (error) {
    console.error("Error getting date ideas:", error);
    return { dateIdeas: [], lastDoc: null, error: error.message };
  }
};

// Update a date idea
export const updateDateIdea = async (id, dateIdeaData) => {
  try {
    const docRef = doc(db, 'dateIdeas', id);
    
    // Prepare data for update
    const updateData = { ...dateIdeaData, updatedAt: serverTimestamp() };
    
    // Convert coordinates to GeoPoint if provided
    if (dateIdeaData.coordinates) {
      updateData.coordinates = new GeoPoint(
        dateIdeaData.coordinates.lat, 
        dateIdeaData.coordinates.lng
      );
    }
    
    await updateDoc(docRef, updateData);
    return { error: null };
  } catch (error) {
    console.error("Error updating date idea:", error);
    return { error: error.message };
  }
};

// Delete a date idea
export const deleteDateIdea = async (id) => {
  try {
    const docRef = doc(db, 'dateIdeas', id);
    await deleteDoc(docRef);
    return { error: null };
  } catch (error) {
    console.error("Error deleting date idea:", error);
    return { error: error.message };
  }
};

// Get date ideas created by a specific user
export const getUserDateIdeas = async (userId) => {
  try {
    const q = query(
      dateIdeasCollection, 
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const dateIdeas = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dateIdeas.push({
        ...data,
        id: doc.id,
        coordinates: data.coordinates ? 
          { lat: data.coordinates.latitude, lng: data.coordinates.longitude } : 
          null
      });
    });
    
    return { dateIdeas, error: null };
  } catch (error) {
    console.error("Error getting user date ideas:", error);
    return { dateIdeas: [], error: error.message };
  }
};

// Like a date idea (add to user's favorites)
export const likeDateIdea = async (userId, dateIdeaId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const likedIdeas = userData.likedDateIdeas || [];
      
      // Add to liked ideas if not already liked
      if (!likedIdeas.includes(dateIdeaId)) {
        await updateDoc(userRef, {
          likedDateIdeas: [...likedIdeas, dateIdeaId]
        });
      }
      
      return { error: null };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    console.error("Error liking date idea:", error);
    return { error: error.message };
  }
};

// Unlike a date idea (remove from user's favorites)
export const unlikeDateIdea = async (userId, dateIdeaId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const likedIdeas = userData.likedDateIdeas || [];
      
      // Remove from liked ideas
      const updatedLikedIdeas = likedIdeas.filter(id => id !== dateIdeaId);
      
      await updateDoc(userRef, {
        likedDateIdeas: updatedLikedIdeas
      });
      
      return { error: null };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    console.error("Error unliking date idea:", error);
    return { error: error.message };
  }
};

// Get user's liked date ideas
export const getLikedDateIdeas = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const likedIdeas = userData.likedDateIdeas || [];
      
      if (likedIdeas.length === 0) {
        return { dateIdeas: [], error: null };
      }
      
      // Get all liked date ideas
      const dateIdeas = [];
      
      for (const ideaId of likedIdeas) {
        const { dateIdea, error } = await getDateIdea(ideaId);
        if (!error && dateIdea) {
          dateIdeas.push(dateIdea);
        }
      }
      
      return { dateIdeas, error: null };
    } else {
      return { dateIdeas: [], error: "User not found" };
    }
  } catch (error) {
    console.error("Error getting liked date ideas:", error);
    return { dateIdeas: [], error: error.message };
  }
};

// Check if two users have liked the same date idea
export const checkForMatch = async (userId1, userId2) => {
  try {
    const user1Ref = doc(db, 'users', userId1);
    const user2Ref = doc(db, 'users', userId2);
    
    const [user1Doc, user2Doc] = await Promise.all([
      getDoc(user1Ref),
      getDoc(user2Ref)
    ]);
    
    if (user1Doc.exists() && user2Doc.exists()) {
      const user1Data = user1Doc.data();
      const user2Data = user2Doc.data();
      
      const user1Likes = user1Data.likedDateIdeas || [];
      const user2Likes = user2Data.likedDateIdeas || [];
      
      // Find common liked date ideas
      const commonLikes = user1Likes.filter(ideaId => user2Likes.includes(ideaId));
      
      return { 
        isMatch: commonLikes.length > 0,
        matchedDateIdeas: commonLikes,
        error: null 
      };
    } else {
      return { 
        isMatch: false, 
        matchedDateIdeas: [],
        error: "One or both users not found" 
      };
    }
  } catch (error) {
    console.error("Error checking for match:", error);
    return { 
      isMatch: false, 
      matchedDateIdeas: [],
      error: error.message 
    };
  }
};
