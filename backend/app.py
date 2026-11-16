
from flask import Flask, jsonify
from flask_cors import CORS
from db import get_db_connection
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Employee Directory API is running!"

@app.route("/test-db")
def test_db():
    try:
        connection = get_db_connection()
        connection.close()
        return "MySQL connected successfully!"
    except Exception as e:
        return f"Database connection failed: {e}", 500

# GET API - Fetch all employees
@app.route("/employees", methods=["GET"])
def get_employees():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT * FROM employees ORDER BY id DESC")
        employees = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(employees), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# POST API - Add a new employee
@app.route("/employees", methods=["POST"])
def add_employee():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        role = data.get("role")

        # Validate required fields
        if not name or not email or not role:
            return jsonify({
                "error": "Name, email and role are required"
            }), 400

        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            INSERT INTO employees (name, email, role)
            VALUES (%s, %s, %s)
        """

        cursor.execute(query, (name, email, role))
        connection.commit()

        employee_id = cursor.lastrowid

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Employee added successfully",
            "id": employee_id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# PUT API - Update an employee
@app.route("/employees/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        role = data.get("role")

        if not name or not email or not role:
            return jsonify({
                "error": "Name, email and role are required"
            }), 400

        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            UPDATE employees
            SET name = %s, email = %s, role = %s
            WHERE id = %s
        """

        cursor.execute(query, (name, email, role, employee_id))
        connection.commit()

        if cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({"error": "Employee not found"}), 404

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Employee updated successfully"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# DELETE API - Delete an employee
@app.route("/employees/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = "DELETE FROM employees WHERE id = %s"

        cursor.execute(query, (employee_id,))
        connection.commit()

        if cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({"error": "Employee not found"}), 404

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Employee deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
