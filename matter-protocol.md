---
title: Matter (protocol)
description: Matter (protocol)
published: true
date: 2025-11-07T09:45:10.474Z
tags: 
editor: markdown
dateCreated: 2025-11-07T09:45:10.474Z
---

# Matter
Matter (formerly known as Project CHIP, or Connected Home over IP) is an open-source, royalty-free connectivity standard for smart home devices developed by the Connectivity Standards Alliance (CSA), formerly the Zigbee Alliance. Announced in 2019 and officially launched in October 2022, Matter aims to simplify smart home ecosystems by enabling reliable, secure, and interoperable communication between devices from different manufacturers—regardless of the underlying platforms or voice assistants they use (e.g., Apple HomeKit, Google Home, Amazon Alexa, or Samsung SmartThings).

Overview
Matter is built on Internet Protocol (IP) and operates primarily over Wi-Fi and Ethernet for high-bandwidth devices, and Thread—a low-power, mesh networking protocol—for battery-operated or energy-efficient devices. It uses Bluetooth Low Energy (BLE) for device commissioning (initial setup). By standardizing how devices communicate, Matter reduces fragmentation in the smart home market and improves user experience through seamless interoperability.

The protocol is designed to enhance compatibility without requiring users to replace existing devices. Many legacy smart home products can gain Matter support through firmware updates, while new Matter-certified devices carry a distinctive logo to indicate compliance.

Development and Governance
Matter was initiated in 2019 as Project CHIP by a consortium of major technology companies, including Amazon, Apple, Google, and the Zigbee Alliance. In 2021, the project was rebranded as Matter under the stewardship of the Connectivity Standards Alliance, which now oversees its development, certification, and promotion.

Key contributing members include Apple, Google, Amazon, Samsung, IKEA, Signify (Philips Hue), and many semiconductor and device manufacturers. The specification is open-source and hosted on GitHub, encouraging broad industry collaboration and transparency.

Technical Architecture
Matter leverages existing, proven technologies to ensure reliability and security:

Transport Layer: Runs over IP networks using Wi-Fi (for mains-powered devices) and Thread (for low-power devices).
Application Layer: Defines common device types (e.g., light bulbs, locks, thermostats, sensors) and their behaviors using a standardized data model.
Security: Mandatory end-to-end encryption using public-key cryptography. Devices must be certified and authenticated during setup. All communication is encrypted, and local control is prioritized to minimize cloud dependency.
Commissioning: Initial device pairing uses Bluetooth LE, after which the device joins the home network via Wi-Fi or Thread.
Local Control: Matter emphasizes on-device and local network communication, reducing latency and maintaining functionality during internet outages.
Supported Device Types (as of 2025)
Matter 1.0 (2022) and subsequent updates support a growing range of device categories, including:

Lighting (on/off, dimmable, color-tunable)
Electrical outlets and switches
Thermostats and HVAC controllers
Door locks
Window coverings
Sensors (motion, contact, temperature, humidity)
Smart speakers and displays (as controllers)
Media devices (TVs, streaming sticks)
Ranges and ovens (added in later specifications)
Adoption and Impact
Since its launch, Matter has gained rapid adoption across the smart home industry. Major platforms like Apple Home, Google Home, Amazon Alexa, and Samsung SmartThings all support Matter as a native integration layer. Leading brands—including Philips Hue, Nanoleaf, Eve, Aqara, and Yale—have released Matter-compatible products or updated existing ones via firmware.

By mid-2025, thousands of Matter-certified devices are available globally, and the protocol is increasingly seen as a foundational standard for the future of connected living.

Limitations and Criticisms
Despite its promise, Matter faces challenges:

Limited support for complex devices: Advanced features like multi-zone audio or robotic vacuums are not yet standardized.
Thread infrastructure requirement: Full benefits (especially for low-power devices) require a Thread border router, which may not be present in all homes.
Backward compatibility gaps: Not all legacy devices can be upgraded to support Matter due to hardware constraints.
See Also
Connectivity Standards Alliance
Thread (network protocol)
Zigbee
HomeKit
Google Home
Amazon Alexa
Internet of Things (IoT)
References
Connectivity Standards Alliance. (2022). Matter Specification v1.0. Retrieved from https://csa-iot.org
Apple Inc. (2022). Matter: A new standard for smart home accessories. Apple Newsroom.
Google Developers. (2023). Matter Overview. https://developers.google.com/
Amazon. (2023). Works with Alexa and Matter. Amazon Developer Portal.