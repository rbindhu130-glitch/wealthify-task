import urllib.request
import json
import random

base_url = "http://127.0.0.1:8000/api"
rand_suffix = random.randint(1000, 9999)

def make_request(path, method="GET", body=None):
    url = f"{base_url}{path}"
    headers = {"Content-Type": "application/json"}
    data = json.dumps(body).encode("utf-8") if body else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode("utf-8"))
    except Exception as e:
        print(f"Error on {method} {url}: {e}")
        return None

# 1. Health check
print("1. Health check:", make_request("/health"))

# 2. List investors (list endpoint)
investors = make_request("/investors/list")
print(f"2. Current Investors count: {len(investors) if investors else 0}")

# 3. Create investor
new_investor = make_request("/investors", method="POST", body={
    "name": f"Karthik Subramanian {rand_suffix}",
    "pan_number": f"PANXYZ{rand_suffix}"
})
print("3. Created Investor:", new_investor)

# 4. Create fund
new_fund = make_request("/funds", method="POST", body={
    "name": f"Axis Bluechip Fund - Direct Plan {rand_suffix}",
    "amc_code": "AXIS",
    "scheme_type": "Equity"
})
print("4. Created Fund:", new_fund)

# 5. Create transaction linking them
if new_investor and new_fund:
    new_txn = make_request("/transactions", method="POST", body={
        "investor_id": new_investor["id"],
        "fund_id": new_fund["id"],
        "transaction_date": "2026-05-30",
        "amount": 10000.0,
        "nav": 55.4,
        "units": 180.5
    })
    print("5. Created Transaction:", new_txn)

# 6. Verify summaries
summary = make_request("/investor-summary")
print("6. Investor Summary row count:", len(summary) if summary else 0)
