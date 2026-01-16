"""
Supabase Client Service
Handles connection to Supabase using service role key.
Service role key should NEVER be exposed to frontend.

Supabase URL: https://cktqxgrbjnfkjwxexway.supabase.co
"""

import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import Optional

# Load .env file from server root directory
env_path = Path(__file__).resolve().parents[3] / '.env'
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

logger = logging.getLogger(__name__)


class SupabaseService:
    """Supabase service for backend operations with service role access."""
    
    _instance: Optional[Client] = None
    
    @classmethod
    def get_client(cls) -> Client:
        """
        Get or create Supabase client with service role key.
        
        Returns:
            Client: Supabase client instance
            
        Raises:
            ValueError: If required environment variables are missing
        """
        if cls._instance is None:
            supabase_url = "https://cktqxgrbjnfkjwxexway.supabase.co"
            supabase_service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdHF4Z3Jiam5ma2p3eGV4d2F5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzIwNjA3OCwiZXhwIjoyMDgyNzgyMDc4fQ.gVrIIKMcUHdZcZWEucgbLTo5o6_qsSnHHEh-b6yQOTU"
            
            if not supabase_service_key:
                raise ValueError("SUPABASE_SERVICE_KEY environment variable is not set")
            
            try:
                cls._instance = create_client(supabase_url, supabase_service_key)
                logger.info("Supabase client initialized successfully with service role key")
            except Exception as e:
                logger.error(f"Failed to initialize Supabase client: {str(e)}")
                raise
        
        return cls._instance
    
    @classmethod
    def reset_client(cls):
        """Reset the client instance (useful for testing)."""
        cls._instance = None


def get_supabase_client() -> Client:
    """
    Convenience function to get Supabase client.
    
    Returns:
        Client: Supabase client instance
    """
    return SupabaseService.get_client()


# For backwards compatibility with different import styles
get_client = get_supabase_client
