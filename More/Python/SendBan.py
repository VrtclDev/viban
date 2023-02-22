from flask import Flask, request
from flask_cors import CORS
import json,requests
from nanopy import *
import math
from datetime import datetime as dt, timedelta as td
nanopy.account_prefix = "ban_"
app = Flask(__app__)
CORS(app)
rep = "ban_1ka1ium4pfue3uxtntqsrib8mumxgazsjf58gidh1xeo5te3whsq8z476goo"
API = "https://kaliumapi.appditto.com/api"
def node(action, extra={}):
	build = {
		"action": action
	}
	build.update(extra)
	req = requests.post(URL, json=build)
	return json.loads(req.text)
	
def send(user, receiver, amount):
  keypair = deterministic_key(seed)
  priv_key = keypair[0]
  adr = keypair[2]
	info = node("account_info", {"account":adr})
	frontier = info["frontier"]
	if float(info["balance_decimal"]) < amount:
		return "balance_empty"
	calc = float(info["balance_decimal"]) - amount
	raw=str(int(str(int(calc*10**16))+'0'*(int(math.log10(10**29))-16)))
	block = {
		"type": "state",
		"account":adr,
		"previous":frontier,
		"representative":rep,
		"balance":raw,
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
	
@app.route("/bal")

def bal(adr):
	bal = node("account_info", {"account":adr})["balance_decimal"]
	return bal
	
def Sort(data, key):
	def sFunc(value):
		return float(value[key])
	dSorted = sorted(data, key=sFunc, reverse=True)
	return dSorted
app.run(host="0.0.0.0")