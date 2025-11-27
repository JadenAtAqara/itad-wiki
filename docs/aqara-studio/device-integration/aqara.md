# Aqara 设备接入

## 添加协议
1. 进入Communication页面，在左侧导航栏的右下方，单击“+”；
2. 在Library栏，将CoapNetwork拖拽到左侧导航栏。

## 导入五元组
1. 在左侧导航栏双击展开CoapNetwork文件夹-Five Code Data文件；
2. 在右侧页面的右上角，单击“...”-“Five Code Import”，上传五元组信息文件；
3. 单击“确定”，导入成功后，可在页面查看到具体的五元组信息；
4. 在BASIC页面，可查看设备的Did和Mac；
5. 在ADVANCED页面，可查看设备的Did、Mac、Lumi Key和Install Code。

## 添加设备
1. 下载Aqara Studio Tool APP（仅支持Andorid）；
2. 打开APP，填写网络请求信息：
   - BaseUrl：填写Studio web访问地址；
   - FastLinkUrl：填写IP或域名。
3. 提交后，选择网关入口，按页面提示添加网关；
4. 网关添加后，可三击网关本地开启子设备入网；
5. 添加完成后，可在Studio的CoapNetwork文件夹下查看到该设备。



## 添加点
1. 在左侧导航栏，依次双击展开CoapNetwork文件夹-选择任一设备-Points文件夹；
2. 在右侧页面左上角单击“发现”，系统会自发现该设备支持的资源点值；
3. 勾选需要的资源点值，单击中间的加号进行添加。

## 设备控制
1. 在左侧导航栏，依次双击展开CoapNetwork文件夹-选择任一设备-Points文件夹；
2. 双击选择任一需要控制的资源点值，在BASIC页面，Out为输出，即资源当前值，可读，In为输入，即控制值，可写；
3. 以开关为例，1为打开，0为关闭。修改任一In值为1，保存后将执行打开操作，执行成功，则Out值为1。In值有优先级之分，In1-In16，其中In1优先级最高，In16最低。In1写值成功，其他In值输入不生效。
