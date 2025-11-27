# 自动化配置

Aqara Studio提供灵活的可视化自动化配置能力，支持用户通过组合多种功能模块与数据流逻辑，快速实现物联网设备的智能化控制。

## 核心优势

- **灵活编排**：模块化设计支持自由组合逻辑、数学与控制功能，适应多样化物联场景。
- **直观操作**：图形化数据连接界面降低配置门槛，提升开发效率。
- **实时生效**：配置完成后立即生效，无需重启设备或系统。

## 创建自动化

1. 根据您当前的页面，选择以下方式进入自动逻辑页面：
    - 如果当前页面是**首页**：在 **引导导航** 下单击 **自动逻辑**。
      <img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/autologic-entrance1.png" alt="" style={{width: '80%'}} />
    - 如果当前页面是**其他功能页面**：单击页面左上角菜单按钮，在菜单中选择 **系统 > 自动逻辑**。
      <img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/autologic-entrance2.png" alt="" style={{width: '40%'}} />
2. 在左侧导航栏的右下方，单击“+”，即可添加一个`自动化`文件夹。
3. 右键点击该文件夹，选择`重命名`，即可修改自动化的名称。
4. 双击该文件夹，进入编辑页面；

    <img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/automation-autologic.png" alt="" style={{width: '80%'}} />

## 界面介绍

<img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/automation-UIIntro.png" />

如上图所示，自动化逻辑页面包含 2 个主要区域，分别是 [自动化列表](#自动化列表)（图中 1）和 [编辑页面](#编辑页面)（图中 2）。

### 自动化列表

您可以在自动化列表实现以下操作：
- 单击 “+” 新增自动化。
- 双击任意自动化打开其编辑页面。
- 右键单击任意自动化，即可重命名、复制、删除和在新标签页打开该自动化。

### 编辑页面

编辑页面由三个部分组成，分别是 [顶部菜单栏](#顶部菜单栏)、[画布](#画布) 和 [侧边栏](#侧边栏)。

#### 顶部菜单栏

<img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/automation-topbar.png" style={{width: '80%'}} />

顶部菜单栏支持以下操作：
- 缩放画布。
- 启用或禁用自动化。
- 查看当前自动化下的所有属性配置。

#### 画布

#### 侧边栏

<img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/automation-topbar.png" alt="自动化侧边栏示意图" style={{maxWidth: '40%'}} />

- 控制器：展示系统支持的所有功能逻辑块库；
- 组件库：待补充；
- 布局：当前自动化使用到的所有功能块列表；
- 模版：预设的自动化模版，拖到面板后可直接使用。


## 配置自动化
 
1. 传入自动化逻辑的触发器，即在左侧编辑栏添加：输入（in）节点属性框（Trigger）；以有人开灯为例，在输入节点位置配置有人的设备属性信息，单击左侧空白框的铅笔图标，弹框中按目录选择Communication-coap-人体传感器设备名称-Points-3.1.85有人无人状态，单击ok，可查看选中的属性信息，单击确定即可在面板左侧查看到有无人的属性信息；
2. 右侧编辑栏：输出（out）节点属性框（Action）；以有人开灯为例，在输出节点位置配置开灯的设备属性信息，单击右侧空白框的铅笔图标，弹框中按照同一方式选中灯的开关属性，配置后在面板右侧即可查看到开关灯的属性信息；
3. 中央画布：可拖拽功能逻辑块到画布中，进行逻辑块配置；将功能模块的输入（in）与输出（out）属性连接起来，即可构建自动化数据链路。

<img src="https://itad-aqara-docs-1300889962.cos.ap-beijing.myqcloud.com/dev/img/aqara-studio/zh/autologic-add.png" alt="" style={{width: '80%'}} />
