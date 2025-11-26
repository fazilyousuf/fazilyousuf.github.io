import os
from dotenv import load_dotenv
from google import genai

# Load .env (in case it wasn't loaded yet)
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set in environment/.env")

# Create a single client instance
client = genai.Client(api_key=api_key)

# Use a current, supported model
MODEL_NAME = "gemini-2.5-flash"  # widely available in Gemini API free tier


def generate_answer(prompt: str) -> str:
    """
    Call Gemini with a text prompt and return the response text.
    """
    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )
        # response.text should contain the plain text answer
        return (response.text or "").strip()
    except Exception as e:
        # Let FastAPI wrap this into a 500
        raise RuntimeError(f"Gemini API call failed: {e}")
