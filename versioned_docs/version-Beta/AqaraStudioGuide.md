---
sidebar_position: 1
---

# Aqara Studio Guides

## System Overview

Aqara Studio is an advanced IoT operating system independently developed by Aqara, focusing on intelligent control and management of homes, spaces, smart buildings and campuses. By integrating AI intelligence, big data analysis and digital twin technology, Aqara Studio provides an open and highly integrated ecosystem.

#### Core Functions

* **Multi-protocol Support**: Supports multiple communication protocols to ensure seamless data integration between various systems and devices.
* **Modular Architecture**: Adapts to various application scenarios such as smart homes, building automation, and industrial automation, supporting seamless integration and intelligent control of professional subsystems including lighting, plumbing, environmental monitoring, and air conditioning.
* **Real-time Data Processing**: Supports real-time data transmission and logical processing, enabling data signal recombination to meet specific project requirements.
* **Flexible Data Statistics**: Provides flexible data statistics and customizable statistical functions to ensure precise control of key business metrics.
* **Tag Service**: Provides standard and custom tag data to enhance flexibility in permission management and data applications.

#### Graphic Configuration Capabilities

* **Zero-code Configuration**: Supports customization of basic graphic elements and component-based configuration in the graphic system, improving engineering graphic configuration efficiency to meet visualization needs in various application scenarios.
* **Cross-platform Support**: Graphic configuration is available on both Web and H5 mobile platforms, providing a consistent user experience.
* **Scripting Function**: Addresses secondary iteration needs in data display and supports advanced application development.

#### Visual Logic Control Programming

* **Priority Logic Function Blocks**: Provides priority logic function blocks for data processing and various data and logic functions, enabling real-time logic processing.
* **Complex Scenario Programming**: Based on logic function blocks, enables visual programming for complex automation application scenarios, supporting application needs with more measurement point data.

#### AI Intelligence and Energy Optimization

* **AI Intelligence**: Uses machine learning algorithms to automatically analyze device operation data, predict potential failures, optimize operation processes, and provide personalized user experiences.
* **AI Energy Saving**: Uses deep learning technology to monitor energy consumption patterns in real-time, automatically adjusts device operating status to achieve optimal energy efficiency, significantly reducing energy consumption and supporting green sustainable development.

#### Smart Services and Comprehensive Support

Aqara Studio also provides smart services such as intelligent space management, energy and carbon emission management, suitable for station control, centralized control, and comprehensive monitoring systems, offering users comprehensive support from device connection to application. Whether at the devices layer or application layer, Aqara Studio can achieve efficient, intelligent, and digital operational management, helps users easily build and maintain a smarter, more environmentally friendly, and efficient building environment.

## System Capabilities Introduction

### System Architecture

Aqara Studio adopts a combined distributed and centralized system architecture design, flexibly supporting multi-level distributed networking solutions based on customers' actual network requirements. The system supports joint deployment of cloud, edge, and terminal devices, ensuring seamless data interconnection and diverse service application needs in different network environments.

#### System Architecture Features

* **Combined Distributed and Centralized**: The hybrid architecture maintains the flexibility and high availability of distributed systems while simplifying operation and maintenance processes through centralized management.
* **Multi-level Distributed Networking**: Multi-level distributed network configuration can be customized according to project scale and complexity.
* **Cloud, Edge, and Device Integration**: Aqara Studio provides unified management integration solutions in both cloud and edge environments, ensuring efficient and secure data processing and transmission.
* **Meeting Diverse needs**: Aqara Studio can achieve various application scenario requirements, from basic connectivity to advanced data analysis, in different network environments in large parks, intelligent buildings, and home environments.

**Advantages are as follows**:

* **High Availability**: Services can be deployed to multiple nodes, ensuring system continues to operate normally even if a single point failure occurs.
* **Scalability**: Service deployment can be dynamically adjusted according to business needs, adapting to different application scenarios.
* **Flexibility**: Computing resources can be dynamically allocated based on task requirements.
* **High Performance**: Provides parallel processing and load balancing technology to achieve system processing speed and responsiveness.
* **Fault Tolerance**: Automatically detects and isolates faulty nodes to maximize system normal operation.
* **Geographic Distribution**: Allows system to span geographic boundaries, distributing computing resources to different locations for cross-region data or service assurance capabilities.

### System Installation Requirements

System security configuration must follow these basic requirements. Detailed configurations for specific projects need to be evaluated by technical engineers based on project device and data point volume as well as the basic functions that the project needs to implement.

### System Backup and Recovery

**System-level data protection solution**

**Core Functions**

Provides complete protection for system and data. When equipment damage or operation errors, business can be quickly restored through system backup to avoid data loss.

**Technical implementation path**

* **Full Backup**: Currently uses comprehensive backup mechanism to fully backup application data.
* **Quick Recovery**: One-click system restoration can be achieved by selecting specific backup files from a selectable backup list in the operation interface.

#### Multi-modal Backup Mechanism

**Scheduled Backup**

- Scheduled backup can be preset, and backup records can be viewed through the administrator console.

**Manual Backup**

- Immediate manual backup can be achieved through the administrator's operation controller.

**Disaster Recovery Backup**

- Supports data mutual backup between servers to implement various redundant disaster recovery solutions.

#### Multi-level Storage Architecture

##### Data Disaster Recovery Node Deployment

**Local Encrypted Storage**

- Supports scheduled data synchronization.

**Enterprise-level Cloud Storage Space**

- Provides Aqara StudioSecure exclusive service.
- Intelligent version retention policy.

**Third-party Secure Transfer Node**

- Standard SFTP protocol transmission.
- Data flow monitoring and audit tracking on transport layer.

#### License Management

Provides an authorization management platform built on a zero trust architecture, offering intellectual property protection and compliance risk control throughout software lifecycle, implementing triple protection barriers against unauthorized access, privilege escalation, and license abuse.

**Trial License**

- Provides full functionality free trial.

**Commercial License**

- Supports cluster license distribution.
- Real-time Operation Dashboard and Alert System

## Product Features Introduction

### Users and Permissions

The system provides comprehensive user identity and permission management capabilities, supporting multi-dimensional permission configuration and security policy management. Through three core technical modules - user management, role management, and authentication management to achieve - flexible user permission allocation, fine-grained resource access control, and secure login and session management to ensure system operation compliance and data security.

#### Core Advantages

* **Flexible Configuration**: Supports users, user groups, roles, role groups, and enables permission assignment based on multi-dimensional tags including data labels, attribute tags, and space tags for permission allocation.
* **Fine Control**: Implements the principle of least privilege through positive and negative rules, spaces and tags.
* **Security Compliance**: Features like mandatory password changes and automatic logout meet enterprise security requirements.

#### User Management

**User Creation and Maintenance**

* Supports direct user addition and complete basic information through the user management interface.
* Provides user group management functionality for batch user permission operations.

**Permission Assignment Methods**

* **Direct Assignment**: Bind pre-configured roles, user groups, or role groups to users.
* **Indirect Assignment**: Users inherit group permissions through user group associations.

**Password and Login Security**

* **Global Password Policy**: Supports setting password complexity requirements (e.g., length, special characters).
* **User-level Password Management**: Administrators can initialize passwords for users, requiring mandatory password change upon first login.

**Session Management**

* **Auto Logout**:
  + **Default Policy**: Global setting for inactivity timeout period
  + **Custom Policy**: Allows setting specific logout times for individual users.
* Supports simultaneous activation of default and custom policies.

**User Login Display Page Management**

* Supports global user login initialization/default console (management or monitoring page).

#### Role Management

**Role Permission Configuration**

* **Space Permissions**: Configure accessible views and function modules for roles within specified space ranges (takes effect immediately).
* **Positive Access Rules**: Explicitly define accessible modules (e.g., device management, data analysis).
* **Negative Exclusion Rules**: Exclude specific permissions based on positive access rules, final permissions are the difference between positive and negative rules.

**Tag-based Permission Control**

- Dynamically assign permissions based on tags, such as automatically matching permissions based on user department tags (e.g., "Development Team", "Operations Team").

**Role Assignment**

- Associate configured roles with users or user groups for quick permission deployment.

#### Authentication Management

**Identity Authentication**

- Supports password login, enhanced security through global and user-level password policies.

**Dynamic Permission Effect**

- Role permission configurations take effect immediately without service restart.
- Control user visible menus and operation scope through "view permissions + module permissions" combination.

**Security Audit**

- Automatic logout mechanism reduces unauthorized access risk, supports tracking user session duration.

### Protocol Support

**Multi-Protocol Data Hub Service**

Supports access and export through multiple standard protocols such as CoAP, MQTT, BACnet, KNX, Modbus, OPCUA, Matter, WebRTC, Aqara Studio SDK, etc.

**Core Responsibilities**

* Enable cross-system data interconnection
* Provide standardized protocol conversion and precise data routing

**Protocol Support Matrix**

| Protocol Type       | Access Capability          | Export Capability            |
|---------------------|----------------------------|------------------------------|
| Industrial Control  | Modbus TCP/Serial          | Modbus TCP Server            |
|                     | Siemens PPI                |                              |
| Building Automation | BACnet/KNX                 | KNX Server Protocol          |
| IoT                 | MQTT/Aqara CoAP            | Matter Smart Home Ecosystem  |
| Data Services       | OPC UA/Xinzhi Weather API  | Standardized Weather Data Output |
| Video Protocol      | WebRTC（RTSP）             |                              |

### Visual Logic Control Programming

Provides flexible visual automation and scene control configuration capabilities, allowing users to quickly implement intelligent control of various devices by combining various logic function modules and business data flow logic.

**Function Module Types**

* **Logic Operation Module**: Built-in basic logic operators such as AND, OR, NOT, supporting condition judgment and rule combination.
* **Advanced Control Module**: Provides extended capabilities such as loop (loop), hierarchical control, latch (latch), and custom script components to meet complex scenario requirements.

**Visual Data Flow Configuration**

Users can build automated data links by dragging and connecting the input (in) and output (out) properties of function modules.

- **Example**:
  * Connect the "out" property of logic judgment module A to the "inA" property of device control module B, then pass module B's "out" property to module C's "in16" property to form cascade control.
  * Supports real-time preview of data flow and logical relationships to ensure configuration accuracy.
- **Typical Scene Examples**
  - **Smart Lighting Control**:
    Configuration Logic: Connect the "out" property (presence/absence status) of the "Personnel Presence Detection Module" directly to the "in16" property of the "Lighting Control Module" (switch signal) to implement the automation strategy of "lights on when occupied, lights off when unoccupied."

**Core Advantages**

- **Flexible Orchestration**: Modular design supports free combination of logic, math and control functions, fitting diverse IoT scenarios.
- **Intuitive Operation**: Graphical data connection interface lowers configuration difficulty and boosts development efficiency.
- **Real-time Effect**: Takes effect immediately after configuration without restarting devices or system.

#### Schedule Planning

The system features a schedule time strategy engine with a visual timeline editor for configuring scheduled tasks by time or time periods, supporting full-cycle time rule configuration.

**Time Dimension Coverage**

* **Basic cycles**: Year/Month/Week/Day granularity recurring schedules (e.g., automatically start meeting room devices daily 9:00-10:00)
* **Special dates**: Precise holiday/anniversary scheduling (e.g., activate National Day protocol every Oct. 1-7)
* **Single events**: Execute tasks at specified absolute times (e.g., trigger shareholders' meeting mode on Jan 1, 2025 10:00-12:00)

**Execution Mode**

- Supports time period value output (switch/analog/memory variables)
- Can be linked to device on/off, scene mode switching, alarm threshold adjustment and other operations.
- Built-in conflict detection mechanism automatically avoids strategy time overlaps

### Alarm Configuration

Provides alarm configuration management and real-time alarm monitoring functions. Through preset rules and custom alarm strategies, it enables real-time monitoring of device operating conditions, device events, data limit exceedance, and logical space data events, providing real-time system risk awareness and quick response.

**User-defined Alarm Rules**

- **Flexible Condition Settings**: Configure alarm trigger conditions through logical expressions (such as "AND/OR/NOT"), value comparisons (greater than, less than, equal to), time ranges, etc.
- **Multi-dimensional Parameter Binding**: Can link device properties (like temperature, humidity), environmental variables (like time periods, geographic location) or business parameters (like device operating mode) to achieve dynamic alarm triggering.
- **Typical Example**:
  * Trigger "High Temperature Alarm" when device temperature exceeds 80°C continuously for 5 minutes.
  * Trigger "Low Power Abnormal Alarm" when device power consumption instantaneous value falls below 10W.
  * Trigger "Night Intrusion Alarm" when motion is detected while device is in "Night Mode".

### Historical Collection

Provides a full-chain device data management solution, supports user-defined data collection rule configuration, and has extended historical collection capabilities for ControlPoint components, enabling data capture through value fluctuation thresholds, timing cycles, and specific interval smart triggers. Built-in visual historical data tracking module supports multi-dimensional data query and dynamic maintenance (add/delete/modify), equipped with full operation log audit and anomaly warning mechanisms, achieving precise control and traceability assurance throughout the data collection, storage, and change management process.

### Logs

The system has three built-in core logs:

- **RunningLog**: Automatically records system running status, error messages, and resource usage to help quickly troubleshoot issues.
- **AuditLog**: Tracks all operation records including user login and feature usage for tracing human operations.
- **SecurityLog**: Specifically records security events such as login abnormal, permission changes, and configuration modifications to provide timely warnings of potential risks.

All logs support time filtering and keyword search, can be viewed and managed through the control panel, meeting daily operation and audit requirements.

### Tag Service

The system provides flexible tag management functionality, allowing creation of classification tags like "Lighting Devices", "Basic Devices" etc., for quick categorization of various components. Built-in Project Hystack standard tag library, supporting custom addition of new tags. Through tag combination search, locate relevant devices in seconds, and batch manage permission settings for components with the same tags, making device management more intuitive and efficient.

Easily achieve:

* Create/delete tag categories according to business needs.
* Add multiple identification tags to devices with one click.
* Quickly find target devices using "Tags + Keywords".
* Batch adjust configuration parameters for devices with the same tag.

### Search Service

**Resource Smart Retrieval System** Precisely locates devices to improve operation efficiency.

The system provides a multi-dimensional resource filtering system that supports quick device location through the following methods to meet precise operation needs in different scenarios:

**Filtering Dimensions Explained**

* **Path Filtering**: Locate devices by their system directory hierarchy (e.g., to find BACNET protocol devices → enter path “bacnet/communication protocol/services”)
* **Name Filtering**: Precise search through device full name/alias (e.g., enter "Corridor Main Light" to directly locate target device).
* **Type Filtering**: Search by device functional characteristics (e.g., filter "readable/writable devices" for batch permission configuration, or filter "alarm devices" to check abnormal points).
* **Tag Filtering**: Smart categorization based on business scenarios (e.g., combine tags [Light + Meeting Room] to quickly retrieve all meeting area lighting devices).

**Typical Application Scenarios**

* **Batch Operations**: Filter by [Tag:Light] to turn off all lighting devices with one click.
* **Troubleshooting**: Enter path equipment room/AC system + type temperature and humidity sensor to quickly locate abnormal monitoring points.
* **Permission Management**: Combine [Type:Writable Devices] + [Tag:High-Risk Area] to set operation permissions in batch.

**Technical Features**

* Supports custom logical operator combinations for query conditions.
* Provides automatic memory of frequently used filter schemes, saved as quick filter templates.
* Search results synchronize real-time device status (online/offline/alarm).
* Integrates with permission system to automatically filter devices without access rights.

> **Note**: All filter conditions support mixed Chinese and English input, with automatic case recognition and fuzzy matching).

### File Management

Provides configuration file management center, supporting online editing, version control, and secure download of configuration files, with traceable modification records.

### Homepage Configuration

Supports homepage navigation bar customization, users can freely configure frequently used function entries through drag-and-drop visual panels. Supports creating multiple navigation schemes like "Daily Mode" based on personal work habits or "Engineering Mode" based on project requirements, enabling one-click switching between different scenario shortcut combinations to ensure improved core function access efficiency.

### Visualization Introduction

Aqara Studio provides zero-code configuration to meet regular real-time or historical data monitoring capabilities, which can be flexibly configured for various system operations, project operations, equipment monitoring, system monitoring and other graphic monitoring functions.

**Zero-Code Configuration**

- No programming background needed. In the graphic editor, visualization dashboards for devices, spaces, and various business functions can be quickly edited using system preset graphic elements, device components, space components, and chart components, with support for customized business scenario configuration.

**Multi-Level Management Hub**

* Achieves comprehensive monitoring of device operating status, space energy consumption data, personnel movement lines and other elements, generating interactive operation management interfaces with one click.

**Smart Analysis Dashboard**

* Built-in various data visualization templates, supporting core management scenarios such as energy consumption analysis, equipment evaluation, and space utilization statistics.

##### Service Advantages

* **Quick Deployment**: Complete implementation from data access to visualization dashboard in 3 days.
* **Flexible Expansion**: Freely adjust monitoring dimensions and display logic according to business needs.

##### Application Scenarios

Manufacturing workshop equipment monitoring, building energy consumption management, campus comprehensive operation and maintenance, smart elderly care and other digital upgrade requirements

---

lumi Logo Copyright © 2023 Lumi United Technology Co., Ltd. all right reserved，powered by Gitbook  
File Modify: 2025-05-30 17:14:54

[Source](https://opendoc.aqara.cn/en/docs/Studio/Aqara%20Studio%20Guide.html#system-overview)
