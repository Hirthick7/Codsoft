# Quizify — Online Quiz Maker

Quizify is a premium full-stack web application that allows users to create, share, and take interactive quizzes. Built with a focus on modern aesthetics and smooth performance, it features a clean, card-based UI and a robust Flask backend.

## ✨ Features

-   **Seamless Authentication**: Secure user registration and login system.
-   **Dynamic Quiz Builder**: Create quizzes with any number of questions using an interactive form.
-   **Interactive Quiz Engine**: Take quizzes with a real-time progress bar and smooth transitions.
-   **Instant Results**: Detailed score breakdown with visual feedback on correct/incorrect answers.
-   **Modern Design**: Responsive layout with premium SVG illustrations and 0% dependence on CSS frameworks.

## 🛠️ Tech Stack

-   **Frontend**: Vanilla HTML5, CSS3 (Modern Flexbox/Grid), JavaScript (ES6+)
-   **Backend**: Python Flask
-   **Database**: MongoDB (via PyMongo)
-   **Tools**: SVGs for iconography, Google Fonts (Inter)

## 📂 Project Structure

```text
Quizify/
├── static/
│   ├── css/      # Custom typography and design system
│   └── js/       # Quiz engine and dynamic form logic
├── templates/    # Jinja2 HTML templates
├── app.py        # Core Flask application and MongoDB routes
└── requirements.txt
```

## 🚀 Getting Started

### Prerequisites

-   Python 3.10+
-   A MongoDB Atlas URI (or local MongoDB instance)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Hirthick7/Codsoft.git
    cd Codsoft/Quizify
    ```

2.  **Set up a virtual environment**:
    ```bash
    python -m venv venv
    ./venv/Scripts/activate  # On Windows
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment**:
    Update the `MONGO_URI` and `SECRET_KEY` in `app.py` or set them as environment variables.

5.  **Run the application**:
    ```bash
    python app.py
    ```

Access the app at `http://127.0.0.1:5000`.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
