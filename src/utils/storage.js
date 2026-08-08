/**
 * LocalStorage management utility for PrepWise state persistence & telemetry
 */

const STORAGE_KEYS = {
    DOMAIN: "prepwise_selected_domain",
    COMPLETED: "prepwise_completed_questions",
    BOOKMARKS: "prepwise_bookmarked_questions"
};

export const getStoredDomain = () => {
    try {
        return localStorage.getItem(STORAGE_KEYS.DOMAIN) || null;
    } catch {
        return null;
    }
};

export const setStoredDomain = (domain) => {
    try {
        if (domain) {
            localStorage.setItem(STORAGE_KEYS.DOMAIN, domain);
        } else {
            localStorage.removeItem(STORAGE_KEYS.DOMAIN);
        }
    } catch (e) {
        console.error("Failed to save domain", e);
    }
};

export const getCompletedQuestions = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.COMPLETED);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const toggleCompletedQuestion = (questionKey) => {
    try {
        const completed = getCompletedQuestions();
        const exists = completed.includes(questionKey);
        const updated = exists 
            ? completed.filter(id => id !== questionKey)
            : [...completed, questionKey];
        
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(updated));
        return updated;
    } catch {
        return [];
    }
};

export const getBookmarkedQuestions = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const toggleBookmarkedQuestion = (questionKey) => {
    try {
        const bookmarks = getBookmarkedQuestions();
        const exists = bookmarks.includes(questionKey);
        const updated = exists 
            ? bookmarks.filter(id => id !== questionKey)
            : [...bookmarks, questionKey];
        
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
        return updated;
    } catch {
        return [];
    }
};
