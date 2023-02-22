from flask import Flask, request
from flask_cors import CORS
import json,requests
from nanopy import *
import math
from replit import db
from datetime import datetime as dt, timedelta as td
nanopy.account_prefix = "ban_"
app = Flask(__name__)
CORS(app)
hcaptcha_key = os.environ['h-captcha-key']
rep = "ban_1ka1ium4pfue3uxtntqsrib8mumxgazsjf58gidh1xeo5te3whsq8z476goo"
seed = os.environ['seed']
keypair = deterministic_key(seed)
priv_key = keypair[0]
adr = keypair[2]
URL = "https://kaliumapi.appditto.com/api"
def verifyCaptcha(resp):
	build = {
		"secret": hcaptcha_key,
		"response": resp
	}
	req = requests.post("https://hcaptcha.com/siteverify", data=build)
	return json.loads(req.text)["success"]
def node(action, extra={}, use_nanoapi=False):
	build = {
		"action": action
	}
	build.update(extra)
	req = requests.post(URL, json=build)
	return json.loads(req.text)
def send(receiver, amount):
	info = node("account_info", {"account":adr})
	frontier = info["frontier"]
	if float(info["balance_decimal"]) < 6:
		return "faucet_dry"
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
	print(build)
	a = node("process", build)
	print(a)
@app.route("/top")
def top():
	jsn = node("account_history", {"account":adr, "count":256})["history"]
	jsn = [x for x in jsn if x['type'] == 'receive']
	jsn = Sort(jsn, "amount_decimal")
	dict = []
	for x in jsn:
	  if x['account'] != "ban_36izkzxba8b5puwcjf7gp6y1d4dsturj6u184wzx5h4ozh57ehwcsznghm3h":
	  	dict.append(f"{x['account']}/{x['amount_decimal']}")
	return dict[]
@app.route("/bal")
def bal():
	bal = node("account_info", {"account":adr})["balance_decimal"]
	return bal
def Sort(data, key):
	def sFunc(value):
		return float(value[key])
	dSorted = sorted(data, key=sFunc, reverse=True)
	return dSorted
def keyExists(key):
  try:
    db[key]
  except KeyError:
    return False
  return True
@app.route("/claim", methods=["POST"])
def claim():
	form = request.get_json()
	adr = form["address"]
	ip = None
	if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
		ip = request.environ['REMOTE_ADDR']
	else:
		ip = request.environ['HTTP_X_FORWARDED_FOR']
	amount = round(float(bal()) / 1500, 2)
	today = dt.today()
	if keyExists(ip):
	  if dt.strptime(db[ip], '%y/%m/%d %H:%M:%S') < today:
	    del db[ip]
	  else:
	    return ["Error", f"You can't claim yet", True]
	if keyExists(adr):
	  if dt.strptime(db[adr], '%y/%m/%d %H:%M:%S') < today:
	    del db[adr]
	  else:
	    return ["Error", f"You can't claim yet", True]
	captcha = verifyCaptcha(form["captcha"])
	if captcha == False:
		return ["Error", f"Invalid or expired captcha", True]
	try:
		account_key(adr)
	except AssertionError:
		return ["Error", f"Did your cat run on your keyboard or something? enter your banano address right", True]
	now = str((dt.today()+td(hours=38)).strftime('%y/%m/%d %H:%M:%S'))
	db[adr] = now
	db[ip] = now
	send(adr, 19)
	return ["Claimed", f"You have successfully claimed 19 Banano! Next claim in 38 hours", False]
app.run(host="0.0.0.0")