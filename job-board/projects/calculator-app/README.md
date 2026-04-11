# Simple Calculator with Python Backend

This project includes a front-end calculator using HTML, CSS, and JavaScript, and a Python Flask backend to perform arithmetic operations.

## Project Structure

```
calculator-app/
├── frontend/
│   ├── index.html      # Calculator UI
│   ├── styles.css      # Styling
│   └── script.js       # Frontend logic
└── backend/
    ├── server.py       # Flask backend
    └── requirements.txt # Python dependencies
```

## Features

- ✨ Modern, responsive calculator UI
- 🔧 Dark theme with gradient background
- ⚙️ Python Flask backend for calculations
- 📱 Mobile-friendly design
- 🎯 Real-time calculation display
- ➗ Support for +, -, *, / operations
- 🔄 Clear and Delete functions
- 💯 Decimal number support
- ⚠️ Division by zero handling

## Run locally

### Prerequisites

- Python 3.x
- pip (Python package manager)

### Steps

1. **Install dependencies:**

```bash
cd backend
pip install -r requirements.txt
```

2. **Start the backend server:**

```bash
python server.py
```

3. **Open the app in a browser:**

Navigate to: `http://127.0.0.1:5001`

## How it works

1. User enters numbers and operations on the frontend
2. When equals is clicked, frontend sends a POST request to backend
3. Backend performs the calculation and returns the result
4. Result is displayed on the calculator display

## API Endpoint

**POST** `/calculate`

Request body:
```json
{
  "left": "25",
  "right": "5",
  "operator": "+"
}
```

Response:
```json
{
  "result": "30"
}
```

## Customization

- Modify colors in `frontend/styles.css` (`:root` variables)
- Change port in `backend/server.py` (default: 5001)
- Add more operations by editing the `calculate()` function in `server.py`

## Supported Operations

- **Addition** (+)
- **Subtraction** (-)
- **Multiplication** (*)
- **Division** (/)

## Error Handling

- ✓ Handles division by zero
- ✓ Validates numeric input
- ✓ Prevents multiple decimal points
- ✓ User-friendly error messages

## Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Python Flask
- **Communication:** REST API with JSON