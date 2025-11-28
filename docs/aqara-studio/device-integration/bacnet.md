# BACnet 设备接入

## 协议配置

1. 进入Communication页面，在左侧导航栏的右下方，单击“+”；
2. 在Library栏，将BacnetNetwork拖拽到左侧导航栏；
3. 双击BacnetNetwork，单击双向箭头图标，选择baseConfig；
4. 展开“Private”，按需要填写配置。

| 参数                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| Ip Address               | IP地址                                                       |
| Udp Port                 | 端口                                                         |
| Ip Device Type           | **Standard**（标准设备）：通用BACnet设备（如控制器、服务器、客户端等），使用UDP端口 47808（默认）。 <br />**Foreigndevice**（外部设备）：非本地子网设备，需通过BBMD注册以实现跨子网通信。 <br />**BBMD**（BACnet Broadcast Management Device）：用于跨子网广播转发（需配置BBMD表和Foreign Device注册）。 |
| Bbmd Ip Address          | BBMD的IP地址                                                 |
| Bbmd Udp Port            | BBMD的端口，通常为47808                                      |
| Object Id                | 设备ID，值唯一                                               |
| Max APDU Length Accepted | 设备可接收的最大APDU长度                                     |
| Segmentation Supported   | 是否支持报文分段<br />**SEGMENTED_BOTH**：设备**完全支持分段**（可发送和接收分段报文）。 <br />**SEGMENTED_TRANSMIT**：设备可以**发送分段报文**，但**不能接收分段报文**（较少使用）。 <br />**SEGMENTED_RECEIVE**：设备可以**接收分段报文**，但**不能发送分段报文**（较少使用）。 <br />**NO_SEGMENTATION**：设备**不支持**任何分段（默认值）。只能发送/接收不超过APDU最大长度的报文。 |
| Apdu Segment Timeout     | 分段传输中等待单个分段ACK的超时时间                          |
| Apdu Timeout             | 等待完整APDU响应的超时时间（非分段通信）                     |
| Character Set            | 字符串编码格式                                               |



## 设备自发现与配置

1. 双击BacnetNetwork，在右侧页面单击“Discover Settings”，根据需要进行设置；

2. 单击“Discovering”，将自动发现局域网内的Bacnet协议设备；

3. 勾选需要添加的设备，单击“+”进行添加；

4. 添加完成，在左侧菜单栏的BacnetNetwork树下可找到添加的设备；

5. 双击任一设备，在右侧页面的右上角单击双向箭头图标，选择baseConfig；

6. 展开“Private”，按需要填写配置。

| 参数                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| Address Type                    | 地址类型：unknown、ethernet、ip、mstp、sc                    |
| Network Number                  | 网络编号                                                     |
| Mac Address                     | Mac地址                                                      |
| Poll Frequency                  | 轮询频率                                                     |
| Status                          | 设备状态：未开启、故障、宕机、告警中、过期、挂起、未设置、告警未确认 |
| Fault Cause                     | 故障原因                                                     |
| Object Id                       | 设备id                                                       |
| Object Name                     | 设备名称                                                     |
| Object Type                     | 设备类型                                                     |
| System Status                   | 系统状态                                                     |
| Vendor Name                     | 厂商名称                                                     |
| Vendor Identifier               | 厂商ID（由BACnet国际分配）                                   |
| Model Name                      | 模型名称                                                     |
| Firmware Revision               | 固件修订                                                     |
| Application Software Version    | 应用软件版本                                                 |
| Protocol Version                | 协议版本                                                     |
| Protocol Revision               | 协议修订                                                     |
| Protocol Services Supported     | 支持哪些BACnet服务                                           |
| Protocol Object Types Supported | 支持哪些BACnet对象类型                                       |
| Max APDU Length Accepted        | 设备可接收的最大APDU长度                                     |
| Segmentation Supported          | 是否支持报文分段<br />**SEGMENTED_BOTH**：设备**完全支持分段**（可发送和接收分段报文）。 <br />**SEGMENTED_TRANSMIT**：设备可以**发送分段报文**，但**不能接收分段报文**（较少使用）。 <br />**SEGMENTED_RECEIVE**：设备可以**接收分段报文**，但**不能发送分段报文**（较少使用）。 <br />**NO_SEGMENTATION**：设备**不支持**任何分段（默认值）。只能发送/接收不超过APDU最大长度的报文。 |
| Apdu Timeout                    | 等待完整APDU响应的超时时间（非分段通信）                     |
| Number Of APDU Retries          | 超时后的重试次数                                             |
| Database Revision               | 数据库修订                                                   |

<img src="https://itad-aqara-docs-1300889962.aqara.com/dev/img/aqara-studio/zh/bacnetDevice.png" alt="bacnetDevice" style={{width: '80%'}} />

## 点自发现与配置

1. 依次双击设备-Points；
2. 单击“Discovering”，将自动发现Bacnet协议设备的点；
3. 双击已发现的点，可根据设备说明书修改点的信息，如名称、类型等；
4. 勾选需要添加的点，单击“+”进行添加；
5. 添加完成，在左侧菜单栏的Points文件夹下可找到添加的点；
6. 双击任一点，在右侧页面的右上角单击双向箭头图标，选择baseConfig；
7. 展开“Private”，按需要填写配置：
   | 参数                 | 说明         |
   | -------------------- | ------------ |
   | Object Id            | 对象id       |
   | Property Id          | 属性id       |
   | Property Array Index | 属性数据索引 |
   | Data Type            | 数据类型     |

<img src="https://itad-aqara-docs-1300889962.aqara.com/dev/img/aqara-studio/zh/bacnetPoint.png" alt="bacnetPoint" style={{width: '80%'}} />
