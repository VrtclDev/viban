from flask import Flask
from flask_cors import CORS
import requests, os, re
app = Flask(__name__)
CORS(app)
webhook = os.environ["webhook"]
@app.route("/report/<hash>", methods=["GET"])
def report(hash):
  if bool(re.search("^[0123456789abcdefABCDEF]{64}$", hash)) == False:
    return "invalid-hash"
  d = {
  "username":"🚩",
  "content":"",
  "embeds": [
    {
      "title":"New Report 🚩",
      "description":"A new report has been created\n\n> https://vi.ban.app/post?post="+hash,
      "color":16711680,
      "fields": [
        {
          "name":"# Hash",
          "value":hash
        }
      ]
    }
  ]
  }
  requests.post(webhook, json=d)
  return "Reported"
if __name__ == '__main__':
  app.run(port=5000)