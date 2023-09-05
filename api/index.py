from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []

@app.route("/api/todos", methods=["GET"])
def get_all_todo_items():
    return todos

@app.route("/api/todos/<int:todo_id>", methods=["GET"])
def get_todo_item(todo_id):
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo:
        return todo
    return {"error": "Todo item not found"}, 404

@app.route("/api/todos", methods=["POST"])
def create_todo_item():
    data = request.get_json()
    id = data.get("id")
    title = data.get("title")
    status = data.get("status")
    date = data.get("date")
    if not title:
        return {"error": "Title is required"}, 400
    todo = {
        "id": id,
        "title": title,
        "status": status,
        "date" : date,
    }
    todos.append(todo)
    return {"status": "200","todo": todo}

@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def update_todo_item(todo_id):
    data = request.get_json()
    title = data.get("title")
    date = data.get("date")

    todo = next((todo for todo in todos if todo["id"] == str(todo_id)), None)
    if todo:
        if title is not None:
            todo["title"] = title
            todo["date"] = date
        return {"status": "200","todo":todo}
    return {"error": "Todo item not found"}, 404

@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo_item(todo_id):
    global todos  # Declare 'todos' as a global variable
    todos = [todo for todo in todos if todo["id"] != str(todo_id)]
    return {"status": "200"} 


@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


if __name__ == "__main__":
    app.run()