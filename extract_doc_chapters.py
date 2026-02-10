
import win32com.client
import os
import json
import re

def extract_chapters(doc_path, json_path):
    print(f"Opening Word document: {doc_path}")
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    
    try:
        doc = word.Documents.Open(doc_path)
        print("Document opened successfully.")
        
        paragraphs = []
        for p in doc.Paragraphs:
            text = p.Range.Text.strip()
            if text:
                paragraphs.append(text)
        
        doc.Close()
        word.Quit()
        
        print(f"Extracted {len(paragraphs)} paragraphs.")
        
        # Load existing verse data to match against
        with open(json_path, 'r', encoding='utf-8') as f:
            verses = json.load(f)
            
        verse_map = {v['text']: v['number'] for v in verses}
        
        chapters = [] # { name, startVerse }
        current_chapter = "المقدمة" # Default start
        
        # Basic Heuristic:
        # A line matching a known verse is a verse.
        # A line NOT matching a verse, containing "باب" or "سورة", is a chapter title.
        
        # However, verse text in DOC might differ slightly (diacritics etc).
        # So matching is hard.
        
        # Let's just dump the PARAGRAPHS to a file first so I can inspect manually.
        with open('extracted_doc_text.txt', 'w', encoding='utf-8') as f:
            for p in paragraphs:
                f.write(p + "\n")
                
        print("Dumped text to extracted_doc_text.txt")
        
    except Exception as e:
        print(f"Error: {e}")
        try:
            doc.Close()
            word.Quit()
        except:
            pass

if __name__ == "__main__":
    base_dir = os.getcwd()
    doc_path = os.path.join(base_dir, "client", "src", "pages", "متن الشاطبية حرز الأماني ووجه التهاني في القراءات السبع.doc")
    json_path = os.path.join(base_dir, "server", "data", "bayt_text.json")
    
    extract_chapters(doc_path, json_path)
