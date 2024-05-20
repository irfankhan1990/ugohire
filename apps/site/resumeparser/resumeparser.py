import tkinter as tk
from tkinter import filedialog, messagebox
import nltk
from nltk.tokenize import word_tokenize
import pdfplumber
import pandas as pd
import os
import re
import warnings
from nltk.tokenize import word_tokenize
import io
from docx import Document
from pyresparser import ResumeParser
# import fitz
from nltk.tokenize import sent_tokenize, word_tokenize
# nltk.download('punkt')
import joblib
import spacy
import pymongo
import cloudinary
import cloudinary.uploader
# # Load the English language model
nlp = spacy.load("en_core_web_sm")
from datetime import datetime
from cloudinary.utils import cloudinary_url
# Suppress all warnings
warnings.filterwarnings("ignore", category=Warning)
# app = FastAPI()

          
cloudinary.config( 
  cloud_name = "de1d7ego8", 
  api_key = "681149826221123", 
  api_secret = "Ycpgvan28O_N8WnfDqASzCRPnj0" 
)
# Get the directory path of the current script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Set the working directory to the script directory
os.chdir(script_dir)

# Load the saved TF-IDF vectorizer and KNeighborsClassifier
tfidf_vectorizer = joblib.load('tfidf_vectorizer.pkl')
knn_classifier = joblib.load('knn_classifier.pkl')



def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                text += page_text
        return text
    except Exception as e:
        print(f"Error occurred while extracting text: {e}")
        return None

def extract_email(text):
    """Extracts email address from text."""
    pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    match = re.search(pattern, text)
    return match.group(0) if match else None

def extract_phone_number(text):
    """Extracts phone number from text."""
    pattern = r'\b(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\b'
    match = re.search(pattern, text)
    if match:
        # Filter out None values from the match groups before joining
        return ''.join([group for group in match.groups() if group is not None])
    return None

def extract_skills(resume_text, skills_list):
    """Extracts skills from resume text."""
    

def extract_name(text):
    """Extracts the candidate's name from text."""
    match = re.search(r"^(.+?)\n", text)
    if match:
        print(match)
        return match.group(1).strip()   

    return 'none'

def extract_degrees(text):
    """Extracts degrees from text."""
    pattern = r"(?i)\b(Bachelor|bachelors|Master|masters|master's|B.sc|M.sc|BS|MS|Doctor(?: of Philosophy)?|Phd|Associate)+(\s|)+(?:of|in|\w)?\s+(.+?)\b"
    return re.findall(pattern, text)

def cleanResume(resumeText):
    resumeText = resumeText.lower()  # Convert to lowercase
    resumeText = re.sub(r'\b\d+\b', '', resumeText)  # remove numbers
    resumeText = re.sub(r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b', '', resumeText)  # remove dates (e.g., dd/mm/yyyy or dd-mm-yyyy)
    resumeText = re.sub('http\S+\s*', ' ', resumeText)  # remove URLs
    resumeText = re.sub('RT|cc', ' ', resumeText)  # remove RT and cc
    resumeText = re.sub('#\S+', '', resumeText)  # remove hashtags
    resumeText = re.sub('@\S+', '  ', resumeText)  # remove mentions
    resumeText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resumeText)  # remove punctuations
    resumeText = re.sub(r'[^\x00-\x7f]',r' ', resumeText)
    resumeText = re.sub('\s+', ' ', resumeText)  # remove extra whitespace
    return resumeText




def predict_category(text):
    # Mapping of numerical labels to designations
    label_to_designation = {
        0: 'Advocate',
        1: 'Arts',
        2: 'Automation Testing',
        3: 'Blockchain',
        4: 'Business Analyst',
        5: 'Civil Engineer',
        6: 'Data Science',
        7: 'Database',
        8: 'DevOps Engineer',
        9: 'DotNet Developer',
        10: 'ETL Developer',
        11: 'Electrical Engineering',
        12: 'HR',
        13: 'Hadoop',
        14: 'Health and fitness',
        15: 'Java Developer',
        16: 'Mechanical Engineer',
        17: 'Network Security Engineer',
        18: 'Operations Manager',
        19: 'PMO',
        20: 'Python Developer',
        21: 'SAP Developer',
        22: 'Sales',
        23: 'Testing',
        24: 'Web Designing'
    }
    preprocessed_resume_text = cleanResume(text)

    # Transform the preprocessed resume text using the loaded TF-IDF vectorizer
    resume_vectorized = tfidf_vectorizer.transform([preprocessed_resume_text])

    # Use the trained KNeighborsClassifier to predict the category of the preprocessed resume text
    predicted_category = knn_classifier.predict(resume_vectorized)

    
    # Convert the predicted numerical label to the corresponding designation
    predicted_designation = label_to_designation[predicted_category[0]]

    return predicted_designation



def extract_text_from_docx(docx_bytes):
    """Extracts text from a Word document."""
    try:
        doc = Document(io.BytesIO(docx_bytes))
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + '\n'
        return text
    except Exception as e:
        print(f"Error extracting text from Word document: {e}")
        return None


def extract_professional_title(resume_text):
    # Define a list of common professional titles with compound titles
    professional_titles = [
        'software engineer', 'data analyst', 'business analyst', 'systems engineer',
        'network engineer', 'quality assurance engineer', 'technical support engineer',
        'software developer', 'web developer', 'frontend developer', 'backend developer',
        'full stack developer', 'data scientist', 'data engineer', 'machine learning engineer',
        'product manager', 'project manager', 'technical consultant', 'sales consultant',
        'financial analyst', 'marketing analyst', 'security analyst', 'systems analyst',
        'solution architect', 'cloud architect', 'enterprise architect', 'UX designer',
        'UI designer', 'graphic designer', 'interaction designer', 'IT manager',
        'operations manager', 'marketing manager', 'product owner', 'scrum master',
        'technical writer', 'business consultant', 'cybersecurity specialist',
        'AI specialist', 'cloud specialist', 'network specialist', 'devops engineer',
        'systems administrator', 'database administrator', 'IT director', 'CTO', 'CIO',
        'CEO', 'CTO', 'research scientist', 'senior software engineer', 'junior software engineer',
        'senior data scientist', 'junior data scientist', 'senior web developer', 'junior web developer',
        'senior systems analyst', 'junior systems analyst', 'senior business analyst', 'junior business analyst',
        'senior project manager', 'junior project manager', 'senior UX designer', 'junior UX designer',
        'senior UI designer', 'junior UI designer', 'senior product manager', 'junior product manager',
        'senior network engineer', 'junior network engineer', 'senior systems engineer', 'junior systems engineer'
    ]

    # Regular expression pattern to find professional titles
    pattern = r'\b(?:' + '|'.join(professional_titles) + r')\b'

    # Find matches in the resume text
    matches = re.findall(pattern, resume_text, flags=re.IGNORECASE)

    # Return unique matches
    return list(set(matches))

def preprocess_resume(resume_text):
    # Remove email addresses
    resume_text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '', resume_text)

    # Remove phone numbers
    resume_text = re.sub(r'\b(?:\+\d{1,2}\s)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b', '', resume_text)

    # Tokenize the text into sentences
    sentences = sent_tokenize(resume_text)

    # Initialize an empty list to store preprocessed sentences
    preprocessed_sentences = []

    # Loop through each sentence for preprocessing
    for sentence in sentences:
        # Convert the sentence to lowercase
        sentence = sentence.lower()

        # Remove punctuation marks
        sentence = re.sub(r'[^\w\s]', '', sentence)

        # Tokenize the sentence into words
        words = word_tokenize(sentence)

        # Remove single-word items
        words = [word for word in words if len(word) > 1]

        # Join the words back into a sentence
        preprocessed_sentence = ' '.join(words)

        # Append the preprocessed sentence to the list
        preprocessed_sentences.append(preprocessed_sentence)

    # Combine preprocessed sentences into a single text block
    preprocessed_text = ' '.join(preprocessed_sentences)

    return preprocessed_text

def extract_locations(text):
    # Process the text with spaCy
    doc = nlp(text)

    # Initialize a list to store extracted locations
    locations = []

    # Iterate over each entity in the processed document
    for ent in doc.ents:
      if ent.label_ == "GPE":  # Check for GPE (Geopolitical Entity)
       locations.append(ent.text)

    return locations[0]
def save_to_mongodb(data):
    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb+srv://afzalrizwan198:bgJIAZQxUicDLCMz@cluster0.0y5qzni.mongodb.net/")
    db = client["test"]
    collection = db["resumes"]

    # Insert data into MongoDB
    collection.insert_one(data)


def upload_to_cloudinary(file_path):
    try:
        # Upload file to Cloudinary
        response = cloudinary.uploader.upload(file_path)
        public_id = response['public_id']
        
        # Generate URL for the uploaded file
        url, options = cloudinary_url(public_id, format="pdf", secure=True)
        
        # print("File uploaded successfully. Public ID:", public_id)
        # print("PDF URL:", url)
        return url
    except Exception as e:
        print("Error uploading file to Cloudinary:", e)
        return None
        

def process_resumes(folder_path):
    
    """Processes resumes in a folder and extracts information."""
    all_extracted_info = []
    for filename in os.listdir(folder_path):
            filepath = os.path.join(folder_path, filename)
            file_extension = filepath.split(".")[-1].lower()

            if file_extension == "pdf":
                text = extract_text_from_pdf(filepath)
            elif file_extension == "docx":
                text = extract_text_from_docx(filepath)
            else:
                print(f"Unsupported file format: {file_extension}")
                continue
            data = ResumeParser(filepath).get_extracted_data()
            if text:
                extracted_info = {
                    "status": {
                        "isPublished": True,
                        "isApproved": True,
                        "isActive": True
                    },
                    "name": data.get("name", None),
                    "email": extract_email(text),
                    "location": extract_locations(text),
                    "file": upload_to_cloudinary(filepath),
                    "professionalTitle": extract_professional_title(text),
                    "Video": "",
                    "category": predict_category(text),
                    "workingRate": 0,
                    "resumeContent": preprocess_resume(text),
                    "skills": data.get("skills", []),
                    "updatedAt": {"$date": {"$numberLong": str(int(datetime.now().timestamp() * 1000))}},
                    "createdAt": {"$date": {"$numberLong": str(int(datetime.now().timestamp() * 1000))}},
                    "__v": 0
                }
                save_to_mongodb(extracted_info)
                all_extracted_info.append(extracted_info)
                # cloudinary.uploader.upload(filepath)
                # upload_to_cloudinary(filepath)
                
    df = pd.DataFrame(all_extracted_info)
    df.to_csv('extracted_info.csv', index=False)
    return "Information saved to extracted_info.csv"

def run_extraction():
    folder_path = folder_path_entry.get()


    status_label.config(text="Processing...")
    result = process_resumes(folder_path)
    status_label.config(text=result)

def select_folder():
    folder_path = filedialog.askdirectory()
    folder_path_entry.delete(0, tk.END)
    folder_path_entry.insert(0, folder_path)

# Setup Tkinter window
root = tk.Tk()
root.title("Resume Extractor")

folder_path_label = tk.Label(root, text="Folder Path:")
folder_path_label.grid(row=0, column=0, padx=10, pady=10)
folder_path_entry = tk.Entry(root, width=50)
folder_path_entry.grid(row=0, column=1, padx=10, pady=10)
folder_path_button = tk.Button(root, text="Browse", command=select_folder)
folder_path_button.grid(row=0, column=2, padx=10, pady=10)



run_button = tk.Button(root, text="Run Extraction", command=run_extraction)
run_button.grid(row=2, column=0, columnspan=3, padx=10, pady=10)

status_label = tk.Label(root, text="")
status_label.grid(row=3, column=0, columnspan=3, padx=10, pady=10)

root.mainloop()
