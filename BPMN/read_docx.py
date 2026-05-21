import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    """
    Extracts text from a docx file using standard zipfile and xml libraries.
    """
    WORD_NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    PARA = WORD_NAMESPACE + 'p'
    TEXT = WORD_NAMESPACE + 't'
    
    with zipfile.ZipFile(path) as docx:
        tree = ET.parse(docx.open('word/document.xml'))
        root = tree.getroot()
        
        paragraphs = []
        for paragraph in root.iter(PARA):
            texts = [node.text for node in paragraph.iter(TEXT) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
        return '\n\n'.join(paragraphs)

if __name__ == '__main__':
    doc_path = '/Users/williamlima/Library/CloudStorage/OneDrive-TelehitS.A/HIT/Dev/BPMN/HIT Frontend Design System Manual.docx'
    out_path = '/Users/williamlima/Library/CloudStorage/OneDrive-TelehitS.A/HIT/Dev/BPMN/hit_design_system.txt'
    try:
        text = get_docx_text(doc_path)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Extracted {len(text)} characters and saved to {out_path}")
    except Exception as e:
        print(f"Error reading docx: {e}")
