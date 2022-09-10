
import meilisearch 
import json
client = meilisearch.Client('http://localhost:7700', "KongHaYaoForChinesePoetry") # masterKey 是密码

# index 相当于数据库的表
index = client.index('poetry')

# 删：清空指定 index
# index.delete_all_documents()
import json


import os, sys
 
dirs = os.listdir( './json' )
print("共",len(dirs))
index.update_filterable_attributes([
    'belongTo',
])
index.update_ranking_rules([
    'author',
    'title',
    'content',
])
# 输出所有文件和文件夹
for path in dirs:
    file =open('./json/'+path,encoding='utf-8')

    print('读取文件完毕',path)
    index.add_documents(json.load(file),'id')
