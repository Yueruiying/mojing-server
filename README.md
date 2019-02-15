# mojing-server
魔镜后端服务

## init
```
npm install
```

## run
```
npm run start
```

## daemon
```
npm run daemon-start
```

## deploy in server
```
git clone https://github.com/Yueruiying/mojing-server.git && cd mojing-server && npm i && npm run daemon-start
```

## nginx reverse proxy config
```
location /xiaobing/ {
    proxy_pass    http://127.0.0.1:9102/;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## api usage
```
1.) Get Service Token
curl -i -X GET \
 'http://127.0.0.1:9102/getServiceToken?service=yanzhi'
 
{
  "status": 1,
  "msg": "ok",
  "data": "73a0d77a-bf6f-480a-b050-f68de0977e73"
}
 
2.) Image Analyze By Service Token
curl -i -X POST \
   -H "Content-Type:multipart/form-data" \
   -F "image=" \
 'http://127.0.0.1:9102/imageAnalyze?token=73a0d77a-bf6f-480a-b050-f68de0977e73'

{
  "status": 1,
  "data":{
    "text": "8.3分！小哥颜值好高，帅帅的，有点是我的菜[坏笑]",
    "imageUrl": "http://mediaplatform.trafficmanager.cn/image/fetchimage?  key=UQAfAC8ABAAAAFcAFgAGABYASgBNAEIAMQBGAEIARAAyADMAMwAzADAAQwAxADYAMQBDADcAMwAzAEIANgBCADUANgBGAEUARQA2AEUAMABBAEMA",
    "metadata":{
      "AnswerFeed": "FaceBeautyRanking",
      "w": "YEdSisHliuTohN_Ghvb9gMPzrOPZvczchuL7iuTlhNfMht3djvvrpt_pvvXoiMvag8DGh-fYhP_cge7zEob4147N_hQ=",
      "aid": "E6FE8272B83905DE588F08CFC65CBF48"
    }
  }
}
```
