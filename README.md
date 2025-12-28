# Lexis Tools

<p align="center">
  <img src="https://raw.githubusercontent.com/Abdullah9779/LexisTools/main/static/logos/logo.svg" alt="Lexis Tools Logo" width="150"/>
</p>

<p align="center">
  <strong>A powerful suite of AI-powered tools built with Python and Django.</strong>
</p>

<p align="center">
    <a href="#"><img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python"></a>
    <a href="#"><img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django"></a>
    <a href="#"><img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"></a>
    <a href="#"><img src="https://img.shields.io/badge/LangChain-%2300A9FF?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain"></a>
    <a href="#"><img src="https://img.shields.io/badge/OpenAI-5A5A5A?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI"></a>
    <a href="#"><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"></a>
    <a href="#"><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></a>
    <a href="#"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
    <a href="#"><img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"></a>
    <a href="#"><img src="https://img.shields.io/badge/pythonanywhere-%2300678B.svg?style=for-the-badge&logo=pythonanywhere&logoColor=white" alt="PythonAnywhere"></a>
</p>

Lexis Tools is a web-based platform offering a variety of AI-driven functionalities, designed to enhance productivity and creativity. From text-to-speech and translation to content summarization and formatting, Lexis Tools provides a seamless and intuitive user experience.

#### 🌐Website: [https://lexistools.pythonanywhere.com](https://lexistools.pythonanywhere.com)

## ✨ Features

-   **🤖 AI-Powered Text-to-Speech (TTS):** Convert text into natural-sounding speech using models from ElevenLabs and Google.
-   **🌐 Advanced Translation:** Translate text between multiple languages leveraging powerful Large Language Models (LLMs) from Google, OpenAI, and Groq.
-   **✂️ Text Summarization:** Quickly condense long articles or documents into concise summaries.
-   **✍️ Text Formatter:** Customize and format text using user-defined prompts.
-   **👤 User Authentication:** Secure user registration, login, and profile management.
-   **⚙️ Personalized Dashboard:** Users can save their AI model configurations and manage their preferences.
-   **📝 Blog:** An integrated blog to share updates, guides, and articles.
-   **🚀 RESTful APIs:** A well-structured API for interacting with the AI models and other services.

## 🛠️ Tech Stack

-   **Backend:** Python, Django, Django REST Framework
-   **Database:** MySQL
-   **AI/LLM Integration:** LangChain, OpenAI, Google Gemini, Groq
-   **Text-to-Speech:** ElevenLabs, Google TTS
-   **Frontend:** HTML, CSS, JavaScript
-   **Deployment:** Pythonanywhere


## 🚀 Getting Started

Follow these instructions to get a local copy of Lexis Tools up and running for development and testing purposes.

### Prerequisites

-   Python 3.8+
-   MySQL Server
-   Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Abdullah9779/LexisTools.git
    cd LexisTools
    ```

2.  **Create and activate a virtual environment:**
    -   On Windows:
        ```sh
        python -m venv Lexis_Tools_venv
        .\Lexis_Tools_venv\Scripts\activate
        ```
    -   On macOS/Linux:
        ```sh
        python3 -m venv venv
        source Lexis_Tools_venv/bin/activate
        ```

3.  **Install the dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary API keys and configuration.
    ```env
    # --------------- Secret key ---------------
    SECRET_KEY = "your-secret-key"
    SERIALIZER_SALT_KEY = "serialiser-salt-key"

    # --------------- Email Configurations ---------------
    EMAIL_HOST_USER = 'your-email-address@gmail.com'
    EMAIL_HOST_PASSWORD = 'your-email-password'
    DEFAULT_FROM_EMAIL = 'Lexis Tools <your-email-address@gmail.com>'
    MAIL_SEND_TO = 'your-second-email-address@gmail.com'

    # --------------- MySQL Configurations ---------------

    DATABASE_NAME = 'lexis-tools-name'
    DATABASE_USER = 'lexis-tools-user'
    DATABASE_PASSWORD = 'lexis-tools-password'
    DATABASE_HOST = 'localhost'
    DATABASE_PORT = '3306'
    ```

5.  **Configure the database:**
    Make sure your MySQL server is running and you have created a database for the project. Update the `.env` file with your database credentials.

6.  **Run the migrations:**
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

7.  **Create a superuser (optional):**
    To access the Django admin panel, create a superuser.
    ```sh
    python manage.py createsuperuser
    ```

8.  **Run the development server:**
    ```sh
    python manage.py runserver
    ```
    The application will be available at `http://127.0.0.1:8000/`.

## 📂 Project Structure

The project is organized into several Django apps, following a modular architecture:

```
Lexis_Tools/
├── Lexis_Tools/            # Main Django project configuration
├── Lexis_Tools_ai_models/  # Core app for AI models (TTS, LLM, etc.)
├── Lexis_Tools_apis/       # API endpoints aggregator
├── Lexis_Tools_auth/       # User authentication and management
├── Lexis_Tools_blogs/      # Blog functionality
├── Lexis_Tools_pages/      # Frontend pages and views
├── static/                 # Static files (CSS, JS, images)
├── templates/              # HTML templates
├── manage.py               # Django's command-line utility
└── requirements.txt        # Project dependencies
```


## 📄 License

Distributed under the Apache License 2.0.

