/**
 * MatchmakingEngine.js
 * 
 * This utility provides advanced matchmaking algorithms for Localfy,
 * focusing on matching users based on their interest in date ideas.
 */

/**
 * MatchmakingEngine class for handling all matchmaking functionality
 */
export class MatchmakingEngine {
  /**
   * Calculate match score between a user and a date idea
   * @param {Object} user - User profile with preferences
   * @param {Object} dateIdea - Date idea to evaluate
   * @returns {Number} Score from 0-100 indicating match quality
   */
  calculateDateIdeaMatchScore(user, dateIdea) {
    if (!user || !dateIdea) return 0;
    
    let score = 0;
    const weights = {
      categories: 35,
      setting: 20,
      priceLevel: 15,
      location: 20,
      popularity: 10
    };
    
    // Match by categories (e.g., Adventure, Romantic, etc.)
    if (user.preferences && user.preferences.categories && dateIdea.categories) {
      const categoryMatches = dateIdea.categories.filter(category => 
        user.preferences.categories.includes(category.toLowerCase())
      ).length;
      
      const categoryScore = categoryMatches > 0 
        ? (categoryMatches / Math.max(dateIdea.categories.length, user.preferences.categories.length)) * weights.categories
        : 0;
      
      score += categoryScore;
    } else if (user.preferredCategories && dateIdea.categories) {
      // Backward compatibility with old user profile format
      const categoryMatches = dateIdea.categories.filter(category => 
        user.preferredCategories.includes(category)
      ).length;
      
      const categoryScore = categoryMatches > 0 
        ? (categoryMatches / Math.max(dateIdea.categories.length, user.preferredCategories.length)) * weights.categories
        : 0;
      
      score += categoryScore;
    }
    
    // Match by setting (Indoor/Outdoor preference)
    if (user.preferences && user.preferences.settings && dateIdea.setting) {
      const settingScore = user.preferences.settings.includes(dateIdea.setting.toLowerCase())
        ? weights.setting
        : 0;
      
      score += settingScore;
    } else if (user.preferredSettings && dateIdea.setting) {
      // Backward compatibility with old user profile format
      const settingScore = user.preferredSettings.includes(dateIdea.setting)
        ? weights.setting
        : 0;
      
      score += settingScore;
    }
    
    // Match by price level
    if (user.preferences && user.preferences.priceLevel && dateIdea.priceLevel) {
      const inBudget = dateIdea.priceLevel >= user.preferences.priceLevel[0] && 
                      dateIdea.priceLevel <= user.preferences.priceLevel[1];
      
      const priceScore = inBudget ? weights.priceLevel : 0;
      score += priceScore;
    } else if (user.budgetRange && dateIdea.priceLevel) {
      // Backward compatibility with old user profile format
      const inBudget = dateIdea.priceLevel >= user.budgetRange[0] && 
                      dateIdea.priceLevel <= user.budgetRange[1];
      
      const priceScore = inBudget ? weights.priceLevel : 0;
      score += priceScore;
    }
    
    // Match by location (if user has preferred locations)
    if (user.preferences && user.preferences.location && dateIdea.location) {
      const locationMatches = dateIdea.location.toLowerCase().includes(user.preferences.location.toLowerCase());
      
      const locationScore = locationMatches ? weights.location : 0;
      score += locationScore;
    } else if (user.preferredLocations && dateIdea.location) {
      // Backward compatibility with old user profile format
      const locationMatches = user.preferredLocations.some(location => 
        dateIdea.location.toLowerCase().includes(location.toLowerCase())
      );
      
      const locationScore = locationMatches ? weights.location : 0;
      score += locationScore;
    }
    
    // Add bonus for popular date ideas
    if (dateIdea.interestedCount) {
      const popularityFactor = Math.min(dateIdea.interestedCount / 10, 1);
      score += popularityFactor * weights.popularity;
    }
    
    // Add bonus for matching interests
    if (user.interests && dateIdea.categories) {
      const interestMatches = dateIdea.categories.filter(category => 
        user.interests.some(interest => category.toLowerCase().includes(interest.toLowerCase()))
      ).length;
      
      if (interestMatches > 0) {
        score += Math.min(interestMatches * 5, 15);
      }
    }
    
    return Math.min(Math.round(score), 100);
  }

  /**
   * Find potential matches based on shared interest in date ideas
   * @param {Object} currentUser - Current user profile
   * @param {Array} otherUsers - Array of other user profiles
   * @param {Array} dateIdeas - Array of all date ideas
   * @returns {Array} Array of potential matches with match scores
   */
  findPotentialMatches(currentUser, otherUsers, dateIdeas) {
    if (!currentUser || !otherUsers || !dateIdeas) return [];
    
    // Get date ideas the current user is interested in
    const userInterestedIdeas = dateIdeas.filter(idea => 
      currentUser.likedDateIdeas && currentUser.likedDateIdeas.includes(idea.id)
    );
    
    // Calculate potential matches
    const potentialMatches = otherUsers.map(otherUser => {
      // Find date ideas both users are interested in
      const sharedInterests = userInterestedIdeas.filter(idea => 
        otherUser.likedDateIdeas && otherUser.likedDateIdeas.includes(idea.id)
      );
      
      // Calculate overall match score
      let matchScore = 0;
      
      // Match based on shared date idea interests
      if (sharedInterests.length > 0) {
        matchScore += Math.min(sharedInterests.length * 15, 60);
      }
      
      // Match based on compatibility of preferences
      const preferencesScore = this.calculatePreferenceCompatibility(currentUser, otherUser);
      matchScore += preferencesScore;
      
      // Normalize score to 0-100
      matchScore = Math.min(Math.round(matchScore), 100);
      
      return {
        user: otherUser,
        matchScore,
        sharedDateIdeas: sharedInterests,
        compatibilityFactors: this.getCompatibilityFactors(currentUser, otherUser, sharedInterests)
      };
    });
    
    // Sort by match score (highest first)
    return potentialMatches.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Calculate preference compatibility between two users
   * @param {Object} user1 - First user profile
   * @param {Object} user2 - Second user profile
   * @returns {Number} Compatibility score (0-40)
   */
  calculatePreferenceCompatibility(user1, user2) {
    let score = 0;
    
    // Compare preferred categories
    if (user1.preferredCategories && user2.preferredCategories) {
      const commonCategories = user1.preferredCategories.filter(category => 
        user2.preferredCategories.includes(category)
      ).length;
      
      const totalCategories = Math.max(
        user1.preferredCategories.length, 
        user2.preferredCategories.length
      );
      
      if (totalCategories > 0) {
        score += (commonCategories / totalCategories) * 15;
      }
    }
    
    // Compare budget ranges
    if (user1.budgetRange && user2.budgetRange) {
      const budgetOverlap = this.calculateRangeOverlap(
        user1.budgetRange[0], user1.budgetRange[1],
        user2.budgetRange[0], user2.budgetRange[1]
      );
      
      if (budgetOverlap > 0) {
        score += budgetOverlap * 10;
      }
    }
    
    // Compare preferred settings
    if (user1.preferredSettings && user2.preferredSettings) {
      const commonSettings = user1.preferredSettings.filter(setting => 
        user2.preferredSettings.includes(setting)
      ).length;
      
      const totalSettings = Math.max(
        user1.preferredSettings.length, 
        user2.preferredSettings.length
      );
      
      if (totalSettings > 0) {
        score += (commonSettings / totalSettings) * 15;
      }
    }
    
    return Math.min(Math.round(score), 40);
  }

  /**
   * Calculate overlap between two ranges as a percentage (0-1)
   */
  calculateRangeOverlap(min1, max1, min2, max2) {
    const overlapStart = Math.max(min1, min2);
    const overlapEnd = Math.min(max1, max2);
    
    if (overlapStart <= overlapEnd) {
      const overlap = overlapEnd - overlapStart;
      const range1 = max1 - min1;
      const range2 = max2 - min2;
      const maxRange = Math.max(range1, range2);
      
      return overlap / maxRange;
    }
    
    return 0;
  }

  /**
   * Get detailed compatibility factors between two users
   * @param {Object} user1 - First user profile
   * @param {Object} user2 - Second user profile
   * @param {Array} sharedDateIdeas - Date ideas both users are interested in
   * @returns {Object} Compatibility factors with explanations
   */
  getCompatibilityFactors(user1, user2, sharedDateIdeas) {
    const factors = {
      sharedInterests: {
        score: 0,
        details: []
      },
      preferenceAlignment: {
        score: 0,
        details: []
      },
      activityTypes: {
        score: 0,
        details: []
      }
    };
    
    // Analyze shared date ideas
    if (sharedDateIdeas && sharedDateIdeas.length > 0) {
      factors.sharedInterests.score = Math.min(sharedDateIdeas.length * 10, 100);
      factors.sharedInterests.details = sharedDateIdeas.map(idea => idea.title);
      
      // Extract common categories from shared date ideas
      const categories = {};
      sharedDateIdeas.forEach(idea => {
        idea.categories.forEach(category => {
          categories[category] = (categories[category] || 0) + 1;
        });
      });
      
      // Find top activity types
      const sortedCategories = Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([category]) => category);
      
      factors.activityTypes.score = sortedCategories.length * 20;
      factors.activityTypes.details = sortedCategories;
    }
    
    // Analyze preference alignment
    if (user1.preferredCategories && user2.preferredCategories) {
      const commonCategories = user1.preferredCategories.filter(category => 
        user2.preferredCategories.includes(category)
      );
      
      if (commonCategories.length > 0) {
        factors.preferenceAlignment.score += commonCategories.length * 15;
        factors.preferenceAlignment.details.push(
          `Both enjoy ${commonCategories.join(', ')} activities`
        );
      }
    }
    
    return factors;
  }

  /**
   * Recommend date ideas to a user based on their preferences and past interests
   * @param {Object} user - User profile
   * @param {Array} dateIdeas - All available date ideas
   * @param {Number} limit - Maximum number of recommendations to return
   * @returns {Array} Array of recommended date ideas with match scores
   */
  recommendDateIdeas(user, dateIdeas, limit = 10) {
    if (!user || !dateIdeas) return [];
    
    // Calculate match scores for all date ideas
    const scoredIdeas = dateIdeas.map(idea => {
      const matchScore = this.calculateDateIdeaMatchScore(user, idea);
      const reason = this.generateMatchReason(user, idea);
      
      return {
        ...idea,
        matchScore,
        reason
      };
    });
    
    // Filter out ideas the user has already liked or disliked
    const filteredIdeas = scoredIdeas.filter(idea => {
      const isLiked = user.likedDateIdeas && user.likedDateIdeas.includes(idea.id);
      const isDisliked = user.dislikedDateIdeas && user.dislikedDateIdeas.includes(idea.id);
      
      return !isLiked && !isDisliked;
    });
    
    // Sort by match score (highest first) and limit the results
    return filteredIdeas
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  /**
   * Generate a personalized explanation for why a date idea is recommended
   * @param {Object} user - User profile
   * @param {Object} dateIdea - Recommended date idea
   * @returns {String} Personalized explanation
   */
  generateMatchReason(user, dateIdea) {
    if (!user || !dateIdea) return '';
    
    const reasons = [];
    
    // Check for matching categories
    if (user.preferences && user.preferences.categories && dateIdea.categories) {
      const matchingCategories = dateIdea.categories.filter(category => 
        user.preferences.categories.includes(category.toLowerCase())
      );
      
      if (matchingCategories.length > 0) {
        if (matchingCategories.length === 1) {
          reasons.push(`This matches your interest in ${matchingCategories[0]} activities.`);
        } else {
          const lastCategory = matchingCategories.pop();
          reasons.push(`This combines your interests in ${matchingCategories.join(', ')} and ${lastCategory}.`);
        }
      }
    } else if (user.preferredCategories && dateIdea.categories) {
      // Backward compatibility
      const matchingCategories = dateIdea.categories.filter(category => 
        user.preferredCategories.includes(category)
      );
      
      if (matchingCategories.length > 0) {
        if (matchingCategories.length === 1) {
          reasons.push(`This matches your interest in ${matchingCategories[0]} activities.`);
        } else {
          const lastCategory = matchingCategories.pop();
          reasons.push(`This combines your interests in ${matchingCategories.join(', ')} and ${lastCategory}.`);
        }
      }
    }
    
    // Check for matching setting
    if (user.preferences && user.preferences.settings && dateIdea.setting) {
      if (user.preferences.settings.includes(dateIdea.setting.toLowerCase())) {
        reasons.push(`It's a ${dateIdea.setting.toLowerCase()} setting, which you prefer.`);
      }
    } else if (user.preferredSettings && dateIdea.setting) {
      // Backward compatibility
      if (user.preferredSettings.includes(dateIdea.setting)) {
        reasons.push(`It's a ${dateIdea.setting.toLowerCase()} setting, which you prefer.`);
      }
    }
    
    // Check for budget match
    if (user.preferences && user.preferences.priceLevel && dateIdea.priceLevel) {
      if (dateIdea.priceLevel >= user.preferences.priceLevel[0] && 
          dateIdea.priceLevel <= user.preferences.priceLevel[1]) {
        if (dateIdea.priceLevel === 1) {
          reasons.push("It's budget-friendly, fitting your price preferences.");
        } else if (dateIdea.priceLevel === 2) {
          reasons.push("It's moderately priced, aligning with your budget preferences.");
        } else {
          reasons.push("The price level matches your budget preferences.");
        }
      }
    } else if (user.budgetRange && dateIdea.priceLevel) {
      // Backward compatibility
      if (dateIdea.priceLevel >= user.budgetRange[0] && 
          dateIdea.priceLevel <= user.budgetRange[1]) {
        if (dateIdea.priceLevel === 1) {
          reasons.push("It's budget-friendly, fitting your price preferences.");
        } else if (dateIdea.priceLevel === 2) {
          reasons.push("It's moderately priced, aligning with your budget preferences.");
        } else {
          reasons.push("The price level matches your budget preferences.");
        }
      }
    }
    
    // Check for location match
    if (user.preferences && user.preferences.location && dateIdea.location) {
      if (dateIdea.location.toLowerCase().includes(user.preferences.location.toLowerCase())) {
        reasons.push(`The location (${dateIdea.location}) matches your preferences.`);
      }
    }
    
    // Check for interest match
    if (user.interests && dateIdea.categories) {
      const matchingInterests = user.interests.filter(interest => 
        dateIdea.categories.some(category => category.toLowerCase().includes(interest.toLowerCase()))
      );
      
      if (matchingInterests.length > 0) {
        reasons.push(`It aligns with your personal interests in ${matchingInterests.join(', ')}.`);
      }
    }
    
    // If no specific reasons, provide a generic one
    if (reasons.length === 0) {
      reasons.push("This date idea might be a refreshing new experience for you.");
    }
    
    // Combine reasons into a paragraph
    return reasons.join(' ');
  }
}

// For backward compatibility
export const calculateDateIdeaMatchScore = (user, dateIdea) => {
  const engine = new MatchmakingEngine();
  return engine.calculateDateIdeaMatchScore(user, dateIdea);
};

export const findPotentialMatches = (currentUser, otherUsers, dateIdeas) => {
  const engine = new MatchmakingEngine();
  return engine.findPotentialMatches(currentUser, otherUsers, dateIdeas);
};

export const recommendDateIdeas = (user, dateIdeas, limit = 10) => {
  const engine = new MatchmakingEngine();
  return engine.recommendDateIdeas(user, dateIdeas, limit);
};

export const generateRecommendationReason = (user, dateIdea) => {
  const engine = new MatchmakingEngine();
  return engine.generateMatchReason(user, dateIdea);
};
