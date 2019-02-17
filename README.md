# mojing-server
Mojing Backend Service - 魔镜后端服务

## Init
```
npm install
```

## Run
```
npm run start
```

## Daemon
```
npm run daemon-start
```

## Deploy in server
```
git clone https://github.com/Yueruiying/mojing-server.git && cd mojing-server && npm i && npm run daemon-start
```

## Nginx reverse proxy config
```
location /xiaobing/ {
    proxy_pass    http://127.0.0.1:9102/;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## Api usage
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
   -F "image=@\"./test_image.jpeg\";type=image/jpeg;filename=\"test_image.jpeg\"" \
 'http://127.0.0.1:9102/imageAnalyze?token=73a0d77a-bf6f-480a-b050-f68de0977e73'

{
  "status": 1,
  "msg": "ok",
  "data":{
    "text": "8.3分！小哥颜值好高，帅帅的，有点是我的菜[坏笑]",
    "imageUrl": "http://mediaplatform.trafficmanager.cn/image/fetchimage?key=UQAfAC8ABAAAAFcAFgAGABYAS...",
    "metadata":{
      "AnswerFeed": "FaceBeautyRanking",
      "w": "YEdSisHliuTohN_Ghvb9gMPzrOPZ.....",
      "aid": "E6FE8272B83905DE588..."
    }
  }
}
```
us1-sta103.qmxcgodie.site 33269 yEneBCSXPN3x9sL
