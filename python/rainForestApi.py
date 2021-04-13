import requests
from dotenv import load_dotenv
import os

class RainForestApi:
    def __init__(self):
        load_dotenv()
        self.api_key=os.getenv('RAINFOREST_API_KEY')
        self.request_url='https://api.rainforestapi.com/request'
        self.product_list=[]
        self.marketplace={
            'US':'amazon.com',
            'CA':'amazon.ca',
            'UK':'amazon.co.uk',
            'FR':'amazon.fr',
            'DE':'amazon.de',
            'ES':'amazon.es',
            'IT':'amazon.it',
            'MX':'amazon.com.mx',
            'JP':'amazon.co.jp',
            'IN':'amazon.in',
            'AU':'amazon.com.au',
            'NL':'amazon.nl',
            'SE':'amazon.se',
            'AE':'amazon.ae',
            'SG':'amazon.sg',
        }
    def searchProducts(self,query='',marketplace=['US']):
        for market in marketplace:
            params={
                'api_key':self.api_key,
                'type':'search',
                'amazon_domain':self.marketplace[market],
                'search_term':query
            }
            result=requests.get(self.request_url,params)
            data=result.json()
            if(data['request_info']['success']==True):
                search_results=data['search_results']
                for item in search_results:
                    product={}
                    try:
                        product['asinid']=item['asin']
                    except:
                        product['asinid']=''
                    try:
                        product['title']=item['title']
                    except:
                        product['title']=''
                    try:
                        product['brand']=item['brand']
                    except:
                        product['brand']=''
                    try:
                        product['image']=item['image']
                    except:
                        product['image']=''
                    product['description']=''
                    product['features']=''    
                    try:
                        product['price']=item['price']['value']
                    except:
                        product['price']='0.00'
                    product['model_no']=''
                    product['source']='Rainforest API'
                    try:
                        product['product_url']=item['link']
                    except:
                        product['product_url']=''   
                        
                    
                    self.product_list.append(product)
                
            else:
                continue
        return self.product_list

        
    def getProduct(self,upc='',asin='',marketplace=['US']):
        if not(upc==''):
            for market in marketplace:
                params={
                    'api_key':self.api_key,
                    'type':'product',
                    'amazon_domain':self.marketplace[market],
                    'gtin':upc
                }

                result=requests.get(self.request_url,params)
                data=result.json()
                
                if(data['request_info']['success']==True):
                    product=data['product']
                    item = {
                        'asinid': upc,
                        'title': product['title'],
                        'brand': product['brand'],
                        'image': product['images'][0]['link'],
                        'description':'',
                        'features':product['feature_bullets_flat'],
                        'price': '',
                        'model_no':product['asin'],
                        'source':'Rainforest API',
                        'product_url':product['link']  
                    }
                    try:
                        item['description']=product['description']
                        # print(item)
                        try:
                            item['description']=item['description']+'<br><h6>Product Features</h6>'
                            item['description']=item['description']+'<ul>'
                            for bimbo in product['feature_bullets']:
                                item['description']=item['description']+'<li>'+bimbo+'</li>'
                            item['description']=item['description']+'</ul>'
                        except:
                            pass
                    except:
                        item['description']=item['title']
                    
                    try:
                        item['price']=product['buybox_winner']['price']['value']
                    except:
                        item['price']=product['more_buying_choices'][0]['price']['value']
                    
                    self.product_list.append(item)
                    
                else:
                    continue
            return self.product_list
        elif not(asin==''):
            for market in marketplace:
                params={
                    'api_key':self.api_key,
                    'type':'product',
                    'amazon_domain':self.marketplace[market],
                    'asin':asin
                }

                result=requests.get(self.request_url,params)
                data=result.json()
                # print("kalk")
                # print(data)
                if(data['request_info']['success']==True):
                    product=data['product']
                    item = {
                        'asinid': asin,
                        'title': product['title'],
                        'brand': product['brand'],
                        'image': product['images'][0]['link'],
                        'description':'',
                        'features':product['feature_bullets_flat'],
                        'price': '',
                        'model_no':product['asin'],
                        'source':'Rainforest API',
                        'product_url':product['link']  
                    }
                    try:
                        item['description']=product['description']
                        # print(item)
                        try:
                            item['description']=item['description']+'<br><h6>Product Features</h6>'
                            item['description']=item['description']+'<ul>'
                            for bimbo in product['feature_bullets']:
                                item['description']=item['description']+'<li>'+bimbo+'</li>'
                            item['description']=item['description']+'</ul>'
                        except:
                            pass
                    except:
                        item['description']=item['title']
                
            
                    # print(product['buybox_winner']['price']['value'])
                    try:
                        item['price']=product['buybox_winner']['price']['value']
                    except:
                        item['price']=product['more_buying_choices'][0]['price']['value']    
                    self.product_list.append(item)
                    
                else:
                    continue
            return self.product_list
        else:
            return []


def main():
    api=RainForestApi()
    products=api.getProduct(asin="B07WHFLR7B")
if __name__=='__main__':
    main()