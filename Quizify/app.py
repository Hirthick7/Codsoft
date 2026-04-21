"""
Quizify - Full-Stack Online Quiz Maker
Flask backend with MongoDB integration
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
import hashlib
import os
from datetime import datetime
from functools import wraps

# ─── App Configuration ────────────────────────────────────────────────────────
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "quizify_secret_2024_change_in_prod")

# ─── MongoDB Connection ───────────────────────────────────────────────────────
MONGO_URI = os.environ.get(
    "MONGO_URI",
    "mongodb+srv://hirthick07:bapcx5j97s@cluster0.jqdiyw1.mongodb.net/"
)
client = MongoClient(MONGO_URI)
db = client["quizify"]
users_col = db["users"]
quizzes_col = db["quizzes"]

# ─── Helpers ──────────────────────────────────────────────────────────────────

def hash_password(password):
    """Hash a password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

def login_required(f):
    """Decorator to protect routes that require authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in to access this page.", "warning")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

def get_current_user():
    """Return the current logged-in user document, or None."""
    if "user_id" in session:
        return users_col.find_one({"_id": ObjectId(session["user_id"])})
    return None

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def home():
    """Home page — welcome screen with quick-action buttons."""
    user = get_current_user()
    return render_template("home.html", user=user)


# ── Authentication ────────────────────────────────────────────────────────────

@app.route("/register", methods=["GET", "POST"])
def register():
    """User registration page."""
    if "user_id" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        name     = request.form.get("name", "").strip()
        email    = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        confirm  = request.form.get("confirm_password", "")

        # Basic validation
        if not name or not email or not password:
            flash("All fields are required.", "error")
            return render_template("register.html")

        if password != confirm:
            flash("Passwords do not match.", "error")
            return render_template("register.html")

        if len(password) < 6:
            flash("Password must be at least 6 characters.", "error")
            return render_template("register.html")

        # Check if email already exists
        if users_col.find_one({"email": email}):
            flash("An account with that email already exists.", "error")
            return render_template("register.html")

        # Create user
        user_doc = {
            "name": name,
            "email": email,
            "password": hash_password(password),
            "created_at": datetime.utcnow()
        }
        result = users_col.insert_one(user_doc)
        session["user_id"] = str(result.inserted_id)
        session["user_name"] = name
        flash(f"Welcome, {name}! Your account has been created.", "success")
        return redirect(url_for("home"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """User login page."""
    if "user_id" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        email    = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not email or not password:
            flash("Email and password are required.", "error")
            return render_template("login.html")

        user = users_col.find_one({
            "email": email,
            "password": hash_password(password)
        })

        if not user:
            flash("Invalid email or password.", "error")
            return render_template("login.html")

        session["user_id"] = str(user["_id"])
        session["user_name"] = user["name"]
        flash(f"Welcome back, {user['name']}!", "success")
        return redirect(url_for("home"))

    return render_template("login.html")


@app.route("/logout")
def logout():
    """Clear session and redirect to home."""
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for("home"))


# ── Quiz Creation ─────────────────────────────────────────────────────────────

@app.route("/create", methods=["GET", "POST"])
@login_required
def create_quiz():
    """Quiz creation page — dynamic question form."""
    if request.method == "POST":
        title = request.form.get("title", "").strip()

        if not title:
            flash("Quiz title is required.", "error")
            return render_template("create_quiz.html", user=get_current_user())

        # Parse questions from the form
        questions = []
        idx = 1
        while True:
            q_text = request.form.get(f"question_{idx}", "").strip()
            if not q_text:
                break

            options = [
                request.form.get(f"option_{idx}_1", "").strip(),
                request.form.get(f"option_{idx}_2", "").strip(),
                request.form.get(f"option_{idx}_3", "").strip(),
                request.form.get(f"option_{idx}_4", "").strip(),
            ]
            correct = request.form.get(f"correct_{idx}", "")

            # Validate
            if not all(options):
                flash(f"All 4 options are required for question {idx}.", "error")
                return render_template("create_quiz.html", user=get_current_user())
            if correct not in ["1", "2", "3", "4"]:
                flash(f"Please select a correct answer for question {idx}.", "error")
                return render_template("create_quiz.html", user=get_current_user())

            questions.append({
                "question": q_text,
                "options": options,
                "correctAnswer": int(correct) - 1   # 0-indexed
            })
            idx += 1

        if not questions:
            flash("Add at least one question.", "error")
            return render_template("create_quiz.html", user=get_current_user())

        quiz_doc = {
            "title": title,
            "createdBy": session["user_name"],
            "createdById": session["user_id"],
            "questions": questions,
            "created_at": datetime.utcnow()
        }
        quizzes_col.insert_one(quiz_doc)
        flash("Quiz created successfully!", "success")
        return redirect(url_for("quiz_list"))

    return render_template("create_quiz.html", user=get_current_user())


# ── Quiz Listing ──────────────────────────────────────────────────────────────

@app.route("/quizzes")
def quiz_list():
    """Browse all available quizzes."""
    user = get_current_user()
    quizzes = list(quizzes_col.find().sort("created_at", -1))

    # Convert ObjectId to string for template
    for q in quizzes:
        q["_id"] = str(q["_id"])

    return render_template("quiz_list.html", user=user, quizzes=quizzes)


# ── Quiz Taking ───────────────────────────────────────────────────────────────

@app.route("/quiz/<quiz_id>")
def take_quiz(quiz_id):
    """Render the quiz-taking page for a specific quiz."""
    user = get_current_user()
    try:
        quiz = quizzes_col.find_one({"_id": ObjectId(quiz_id)})
    except Exception:
        flash("Quiz not found.", "error")
        return redirect(url_for("quiz_list"))

    if not quiz:
        flash("Quiz not found.", "error")
        return redirect(url_for("quiz_list"))

    quiz["_id"] = str(quiz["_id"])
    return render_template("take_quiz.html", user=user, quiz=quiz)


# ── Submit & Results ──────────────────────────────────────────────────────────

@app.route("/submit", methods=["POST"])
def submit_quiz():
    """
    Receive JSON payload with quiz_id + answers list,
    compute the score and store in session, then redirect to result.
    """
    data    = request.get_json()
    quiz_id = data.get("quiz_id")
    answers = data.get("answers", [])   # list of 0-indexed chosen option indices

    try:
        quiz = quizzes_col.find_one({"_id": ObjectId(quiz_id)})
    except Exception:
        return jsonify({"error": "Invalid quiz ID"}), 400

    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404

    questions = quiz["questions"]
    total     = len(questions)
    score     = 0
    breakdown = []

    for i, q in enumerate(questions):
        user_ans = answers[i] if i < len(answers) else -1
        correct  = q["correctAnswer"]
        is_right = (user_ans == correct)
        if is_right:
            score += 1
        breakdown.append({
            "question":      q["question"],
            "options":       q["options"],
            "correctAnswer": correct,
            "userAnswer":    user_ans,
            "isCorrect":     is_right
        })

    # Persist result in session so /result can read it
    session["result"] = {
        "quiz_title": quiz["title"],
        "score":      score,
        "total":      total,
        "breakdown":  breakdown
    }

    return jsonify({"redirect": url_for("result")})


@app.route("/result")
def result():
    """Display the quiz result page."""
    user        = get_current_user()
    result_data = session.get("result")

    if not result_data:
        flash("No result found. Please take a quiz first.", "warning")
        return redirect(url_for("quiz_list"))

    return render_template("result.html", user=user, result=result_data)


# ─── Entry Point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, port=5000)
