
import { toast } from "sonner";

// Create a class to handle API interactions
export class ApiClient {
  private static apiKey: string | null = null;
  
  // Set the API key (will be stored in memory only)
  public static setApiKey(key: string): void {
    this.apiKey = key;
    
    // Store in session storage (cleared when browser closes)
    // Note: This is still not completely secure but better than localStorage
    sessionStorage.setItem('temp_api_key', key);
    
    toast.success("API key set successfully");
  }
  
  // Get the API key
  public static getApiKey(): string | null {
    if (!this.apiKey) {
      // Try to retrieve from session storage
      const storedKey = sessionStorage.getItem('temp_api_key');
      if (storedKey) {
        this.apiKey = storedKey;
      }
    }
    return this.apiKey;
  }
  
  // Clear the API key
  public static clearApiKey(): void {
    this.apiKey = null;
    sessionStorage.removeItem('temp_api_key');
  }
  
  // Check if API key is set
  public static hasApiKey(): boolean {
    return !!this.getApiKey();
  }
  
  // Make an API request
  public static async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      toast.error("API key not set. Please set your API key first.");
      throw new Error("API key not set");
    }
    
    try {
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${apiKey}`);
      
      const response = await fetch(endpoint, {
        ...options,
        headers,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("API request failed. Please check your API key and try again.");
      throw error;
    }
  }
}
