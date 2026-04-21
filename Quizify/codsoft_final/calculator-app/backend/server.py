from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json(silent=True)
    if not data:
        return jsonify(error='Invalid request'), 400

    left = data.get('left', '')
    right = data.get('right', '')
    operator = data.get('operator')

    try:
        a = float(left)
        b = float(right)
    except (TypeError, ValueError):
        return jsonify(error='Invalid number'), 400

    if operator == '+':
        result = a + b
    elif operator == '-':
        result = a - b
    elif operator == '*':
        result = a * b
    elif operator == '/':
        if b == 0:
            return jsonify(error='Division by zero'), 400
        result = a / b
    else:
        return jsonify(error='Unsupported operator'), 400

    result_text = str(result).rstrip('0').rstrip('.') if '.' in str(result) else str(result)
    return jsonify(result=result_text)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
