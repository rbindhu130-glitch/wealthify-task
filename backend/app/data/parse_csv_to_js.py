import csv
import json
import os

csv_path = os.path.join(os.path.dirname(__file__), "dataset.csv")
delimiter = "\t"

with open(csv_path, newline="", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f, delimiter=delimiter)
    rows = list(reader)

def clean_str(s):
    if not s: return ""
    s = s.strip()
    if s.startswith("'") and s.endswith("'"):
        s = s[1:-1]
    return s.strip()

cleaned_rows = []
for r in rows:
    clean_row = {clean_str(k): clean_str(v) for k, v in r.items()}
    cleaned_rows.append(clean_row)

investors = []
investor_map = {} # (name, pan) -> id
for r in cleaned_rows:
    name = r["INV_NAME"]
    pan = r["PAN"]
    if (name, pan) not in investor_map:
        inv_id = len(investor_map) + 1
        investor_map[(name, pan)] = inv_id
        investors.append({"id": inv_id, "name": name, "pan_number": pan})

funds = []
fund_map = {} # name -> id
for r in cleaned_rows:
    name = r["SCHEME"]
    amc = r["AMC_CODE"]
    st = r["SCHEME_TYPE"]
    if name not in fund_map:
        f_id = len(fund_map) + 1
        fund_map[name] = f_id
        funds.append({"id": f_id, "name": name, "amc_code": amc, "scheme_type": st})

txns = []
for idx, r in enumerate(cleaned_rows):
    name = r["INV_NAME"]
    pan = r["PAN"]
    fund_name = r["SCHEME"]
    
    inv_id = investor_map[(name, pan)]
    fund_id = fund_map[fund_name]
    
    date_part = r["TRADDATE"].split(" ")[0]
    try:
        parts = date_part.split("/")
        if len(parts) == 3:
            m = parts[0].zfill(2)
            d = parts[1].zfill(2)
            y = parts[2]
            txn_date = f"{y}-{m}-{d}"
        else:
            txn_date = date_part
    except Exception:
        txn_date = date_part
        
    txns.append({
        "id": idx + 1,
        "investor_id": inv_id,
        "fund_id": fund_id,
        "transaction_date": txn_date,
        "amount": float(r["AMOUNT"]),
        "nav": float(r["PURPRICE"]),
        "units": float(r["UNITS"]),
        "folio_no": r["FOLIO_NO"],
        "location": r["LOCATION"],
        "tax_status": r["TAX_STATUS"]
    })

output = {
    "investors": investors,
    "funds": funds,
    "transactions": txns
}
print(json.dumps(output))
