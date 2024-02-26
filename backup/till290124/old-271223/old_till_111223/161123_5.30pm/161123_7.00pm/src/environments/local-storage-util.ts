// local-storage-util.ts

// Get a value from localStorage
export function getFromLocalStorage(key: string): string | null {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(`Error getting "${key}" from localStorage:`, error);
      return null;
    }
  }
  
  // Set a value in localStorage
  export function setInLocalStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting "${key}" in localStorage:`, error);
    }
  }
  