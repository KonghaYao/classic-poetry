
import meilisearch 
client = meilisearch.Client('http://meili_chinese_poetry:7700', "KongHaYaoForChinesePoetry") # masterKey 是密码

# index 相当于数据库的表
index = client.index('poetry')

import os
 
dirs = os.listdir( '../csv' )
print("共",len(dirs))
index.update_filterable_attributes([
    'belongTo',
])
index.update_ranking_rules([
    'author',
    'title',
    'content',
])
client.create_key(options={
  'description': 'Viewer Key',
  'actions': ["search"],
  'indexes': ['poetry'],
  'expiresAt': None,
  "uid":"8866472f-a457-470b-94ab-7248e9801049"
})

# 输出所有文件和文件夹
import csv
for path in dirs:
    with open('../csv/'+path,mode='r',encoding='utf-8-sig') as f:
        
        reader = csv.DictReader(f)
        col = []
        for row in reader:
            col.append(row)
        index.add_documents(col,'id')
        print(path,"完成")
        
