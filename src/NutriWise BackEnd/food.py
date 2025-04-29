import firebase_admin as fa
from firebase_admin import credentials, firestore
import csv
from datetime import datetime

cred = credentials.Certificate("ServiceAccountKey.json")
fa.initialize_app(cred)

db = firestore.client()

#Insert Food List from CSV
def insert_food_list_csv(user_uid, file_path):
    with open(file_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            food_item = {
                "food_type": row["food_type"],
                "quantity": int(row["quantity"]),
                "expiry_date": row["expiry_date"]
            }
            db.collection('users').document(user_uid).collection('food_list').add(food_item)
            print(f"Added food: {food_item['food_type']}")

#Fetch and Display Food List
def fetch_food_list(user_uid):
    food_ref = db.collection('users').document(user_uid).collection('food_list')
    foods = food_ref.stream()

    print("Food List:")
    today = datetime.today()

    for food in foods:
        data = food.to_dict()
        expiry_date = datetime.strptime(data['expiry_date'], "%Y-%m-%d")
        days_left = (expiry_date - today).days

        if days_left < 0:
            status = "Expired"
        else:
            status = f"{days_left} days left"

        print(f"- {data['food_type']} (Qty: {data['quantity']}), Expires: {data['expiry_date']} → {status}")

#Delete Expired Foods
def delete_expired_foods(user_uid):
    food_ref = db.collection('users').document(user_uid).collection('food_list')
    foods = food_ref.stream()

    today = datetime.today()
    deleted_count = 0

    for food in foods:
        data = food.to_dict()
        expiry_date = datetime.strptime(data['expiry_date'], "%Y-%m-%d")

        if expiry_date < today:
            food.reference.delete()
            deleted_count += 1
            print(f"Deleted expired food: {data['food_type']}")

    if deleted_count == 0:
        print("No expired foods found.")

if __name__ == "__main__":
    user_uid = "logged_in_user_uid" #belum diisi
    file_path = "csv_file_path" #need to add csv file nnt

    insert_food_list_csv(user_uid, file_path)
    fetch_food_list(user_uid)
    delete_expired_foods(user_uid)
    fetch_food_list(user_uid)