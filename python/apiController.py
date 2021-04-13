# import sellerChamp
from rainForestApi import RainForestApi
import productDataApi
import json
import sys
import jsonpickle

def getChosenMarketplaces(jso):
    d_keys=list(jso.keys())
    values=list(jso.values())

    result=[]
    
    
    for i in range(len(values)):
        if(values[i]==True):
            result.append(d_keys[i])
    # print(result)
    return result

def main():
    query=sys.argv[1]
    queryType=sys.argv[2]
    marketplace_json=jsonpickle.loads(sys.argv[3])
    
    marketplace_arr=getChosenMarketplaces(marketplace_json)

    if(queryType=='ASIN'):
        api=RainForestApi()
        product_list=api.getProduct(asin=query)
        product_list[0]['key']='0'
        print(json.dumps(product_list))
    elif(queryType=='UPC'):
        api=RainForestApi()
        product_list=api.getProduct(upc=query,marketplace=marketplace_arr)
        if not (product_list==[{}]):
            product_list[0]['key']='0'
            print(json.dumps(product_list))
        else:
            api=productDataApi.ProductDataAPI(query)                
            prodDataApiList=api.product_list
            
            api=RainForestApi()
            productList=api.searchProducts(query=query,marketplace=marketplace_arr)
            amzProductList=productList
            productList=[]
            i=0 #this is required for react bootstrap table 2
            for item in prodDataApiList:
                item['key']=str(i)
                productList.append(item)
                i=i+1
            
            for item in amzProductList:
                item['key']=str(i)
                productList.append(item)
                i=i+1
            if(productList==[] or productList==[{}] or productList==[[{}]]):
                productList=[{}]
            print(json.dumps(productList))
    else:
        api=productDataApi.ProductDataAPI(query)                
        prodDataApiList=api.product_list
        
        api=RainForestApi()
        productList=api.searchProducts(query=query,marketplace=marketplace_arr)
        amzProductList=productList
        productList=[]
        i=0 #this is required for react bootstrap table 2
        for item in prodDataApiList:
            item['key']=str(i)
            productList.append(item)
            i=i+1
        
        for item in amzProductList:
            item['key']=str(i)
            productList.append(item)
            i=i+1
        if(productList==[] or productList==[{}] or productList==[[{}]]):
            productList=[{}]
        print(json.dumps(productList))
            

if __name__=='__main__':
    main()