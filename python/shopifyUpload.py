import json
import os
import requests
import jsonpickle
import sys
from dotenv import load_dotenv


def main():
    load_dotenv()
    product=sys.argv[1]
    api_url=os.getenv('SHOPIFY_PRODUCT_API_URL')
    product=jsonpickle.loads(product)
    dt = {
        "product": {
            "title": product['title'],
            "body_html": product['description'],
            "vendor": "Blitzstock",
            # "product_type": first_cat,
            # "tags": product['categories'][1:],
            "variants": [
                {
                    "title": product['title'],
                    "sku": product['sku'],
                    "inventory_management": "shopify",
                    "inventory_policy": "deny",
                    "inventory_quantity": product['quantity'],
                    "barcode": product['sku'],
                    "position": 1,
                    "price": float(product['discounted_price']),
                    "compare_at_price":float(product['retail']),
                    "requires_shipping": True,
                    "fulfillment_service": "manual",
                    "weight_unit": "lb"
                }
            ],
            "images": [
                {
                    "src": product["image"]
                }
            ]
        },
        "status": "Active"
    }
    if(len(product['categories'])>0):
        dt['product']['product_type']=product['categories'][0]
        if(len(product['categories'])>1):
            dt['product']['product_type']=product['categories'][1:]
    dt = json.dumps(dt)

    headers = {'Content-Type': 'application/json'}
    r = requests.post(api_url, headers=headers, data=dt)
    # print(r.status_code)
    print(jsonpickle.dumps(r.json()))
    # print(r.json()['product']['id'])


if __name__ == "__main__":
    main()
