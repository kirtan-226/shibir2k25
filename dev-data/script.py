import csv
from pymongo import MongoClient
from datetime import datetime, timezone

# MongoDB setup
client = MongoClient("mongodb+srv://saurabh:ytKueUsmu1o7bUiB@shibir-db.h69lx.mongodb.net/?retryWrites=true&w=majority&appName=shibir-db")
db = client["test"]
users_collection = db["users"]
mandals_collection = db["mandals"]
buses_collection = db["buses"]

# Fetch mapping from mandalInitial → _id
mandals = {m['mandalInitial']: m['_id'] for m in mandals_collection.find({}, {'_id': 1, 'mandalInitial': 1})}
# Fetch mapping from busSrNo → _id
buses = {b['busSrNo']: b['_id'] for b in buses_collection.find({}, {'_id': 1, 'busSrNo': 1})}

# Transformation function
def transform_row(row):
    utara_details = []
    if row["gondalUtara"]:
        utara_details.append({"location": "Gondal_Utara", "room": row["gondalUtara"]})
    if row["bhujUtara"]:
        utara_details.append({"location": "Bhuj_Utara", "room": row["bhujUtara"]})

    now = datetime.now(timezone.utc)
    
    return {
        "shibirId": row["shibirId"],
        "firstName": row["firstName"],
        "lastName": row["lastName"],
        "gender": row["gender"],
        "phoneNo": row["phoneNo"],
        "emergencyNo": row["emergencyNo"],
        "roles": [role.strip() for role in row["roles"].split(",")],
        "mandalDetails": mandals.get(row["mandal"]),
        "busDetails": {
            "busId": buses.get(int(row["busSrNo"])),
            "busSeatNo": int(row["busSeatNo"])
        },
        "utaraDetails": utara_details,
        "medicalDetails": {
            "bloodGroup": row["bloodGroup"],
            "illnes": None if row["illness"].lower() in ["", "none", "null"] else row["illness"]
        },
        "createdAt": now,
    }

# Load CSV
users = []
with open("D:/SAURABH/WebDev/Shibir Backend/shibir_backend_api/dev-data/users.csv", newline='', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        users.append(transform_row(row))

# Insert into MongoDB
if users:
    result = users_collection.insert_many(users)
    print(f"✅ Inserted {len(result.inserted_ids)} users successfully.")
else:
    print("⚠️ No data to insert.")
