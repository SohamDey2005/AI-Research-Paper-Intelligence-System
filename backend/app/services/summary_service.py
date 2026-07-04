from google import genai

from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


class SummaryService:

    def summarize(self, abstract: str) -> str:

        prompt = f"""
You are an AI research assistant.

Summarize the following AI research paper in exactly 4 concise bullet points.

Abstract:

{abstract}
"""

        try:

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            if response.text:
                return response.text

        except Exception as e:

            print("\nGemini API Error:")
            print(e)

        # -----------------------------
        # Fallback Summary
        # -----------------------------

        sentences = abstract.split(".")

        bullets = []

        for sentence in sentences:

            sentence = sentence.strip()

            if sentence:

                bullets.append(f"• {sentence}.")

            if len(bullets) == 4:
                break

        return "\n".join(bullets)


summary_service = SummaryService()