from keybert import KeyBERT

kw_model = KeyBERT()


class KeywordService:

    def extract_keywords(self, text: str):
        
        try:
            
            keywords = kw_model.extract_keywords(
                text,
                top_n=5,
                stop_words="english"
            )
        
        except Exception:
            
            return []

        return [keyword for keyword, score in keywords]


keyword_service = KeywordService()