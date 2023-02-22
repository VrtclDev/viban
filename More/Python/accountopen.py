from flask import Flask
import json,requests
from nanopy import *
API = "https://kaliumapi.appditto.com/api"
app = Flask(__app__)
def node(action, extra={}):
	build = {
		"action": action
	}
	build.update(extra)
	req = requests.post(URL, json=build)
	return json.loads(req.text)
def send(receiver):
  keypair = deterministic_key(seed)
  priv_key = keypair[0]
  adr = keypair[2]
	info = node("account_info", {"account":adr})
	frontier = info["frontier"]
	calc = int(info["balance"])-1
	block = {
		"type": "state",
		"account":adr,
		"previous":frontier,
		"representative":rep,
		"balance":calc,
		"link":account_key(receiver),
		"signature":""
	}
	hash = block_hash(block)
	block["signature"] = sign(key=priv_key, block=block)
	build = {
		"json_block":"true",
		"subtype":"send",
		"do_work":True,
		"block": block
	}
	a = node("process", build)
	return "transaction_success"
@app.route('/<adr>')
def open(adr):
  return send(adr)
app.run(host="0.0.0.0")