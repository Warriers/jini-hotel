from flask import Flask, Response
import json
from model import ChatBot
# create the flask object
app = Flask(__name__)
# @app.route('/')
# def index():
#     return "Index Page"
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


@app.route('/ask/<botType>/<message>')
def reply(botType: str, message: str):
    if message == None or botType == None:
        return Response(json.dumps({"error": "Got None"}), status=404, mimetype='application/json')
    elif botType.lower() not in ("restaurant", "hotel"):
        return Response(json.dumps({"error": "No such bot"}), status=404, mimetype='application/json')
    else:
        # model.predict.predict returns a dictionary
        chatbot = ChatBot(botType.lower())
        response = chatbot.ask(message)
        data = {"reply": response}
        return Response(json.dumps(data), status=200, mimetype='application/json')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
