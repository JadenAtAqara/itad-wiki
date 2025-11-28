# KNX IP 设备接入

## 协议配置

1. 进入Communication页面，在左侧导航栏的右下方，单击“+”；
2. 在Library栏，将KnxNetwork拖拽到左侧导航栏；

## 添加设备配置

1. 右键单击KnxNetwork，单击“Add”，在Library栏将KnxDevice拖拽到左侧导航栏；
2. 双击KnxDevice，在右侧页面的右上角单击双向箭头图标，选择baseConfig；
3. 展开“Private”，按需要填写配置：

   | 参数                | 说明                                          |
   | ------------------- | --------------------------------------------- |
   | Ip Address          | 设备的网络IP地址                              |
   | Three Address       | 三层物理地址，KNX 设备的唯一物理地址          |
   | Address             | KNX数据通信的目标组地址                       |
   | Style               | 选择组地址的显示格式                          |
   | Mac Address         | Mac地址                                       |
   | Device Id           | 设备id                                        |
   | Control Port Number | 控制端口号，KNX/IP 网关的通信端口，默认为3671 |
   | Friendly Name       | 自定义设备描述，便于管理                      |

<img src="https://itad-aqara-docs-1300889962.aqara.com/dev/img/aqara-studio/zh/knxDevice.png" alt="knxDevice" style={{width: '80%'}} />

## 添加点配置

1. 双击展开KnxDevice文件夹，右键单击Points文件夹，选择添加；
2. 选择任一需要的数据类型拖拽到左侧导航栏，后缀为Writable的即可写，后缀为Point的即可读；
3. 双击该文件夹，在右侧页面的右上角单击双向箭头图标，选择baseConfig；
4. 展开“Private”，按需要填写配置。

   | 参数               | 说明                                      |
   | ------------------ | ----------------------------------------- |
   | Knx Id             | KNX设备id                                 |
   | Three Address      | 组地址，如1/1/1                           |
   | Address            | 设备物理地址1.1.1                         |
   | Style              | 选择组地址的显示格式                      |
   | Data Value Type Id | 数据类型标识，定义KNX组地址传输的数据类型 |
   | Poll Enable        | 是否启用轮询                              |
   | Poll Frequency     | 轮询频率                                  |
   | Write Only         | 是否启用只写模式                          |

<img src="https://itad-aqara-docs-1300889962.aqara.com/dev/img/aqara-studio/zh/knxPoint.png" alt="knxPoint" style={{width: '80%'}} />
