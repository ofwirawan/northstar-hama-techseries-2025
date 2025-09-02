# send a post request to create a new user
import requests
from models import Language

data = {"pref_lang": Language.tagalog.value}

response = requests.post("http://127.0.0.1:8000/user/signup/", json=data)

print(response.status_code)