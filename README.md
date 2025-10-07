# 🏀 OpenCourt  
**Find a court. Join a game. Play more, search less.**

---

## 📘 Project Overview
**OpenCourt** is a full-stack web application that helps users find and organize open play events for sports such as **basketball, pickleball, tennis, and volleyball**.  
Users can host, join, and manage events—making it easier to stay active, socialize, and connect through sports.

---

## 🎯 Problem Statement
Many players struggle to find available courts or people to play with. OpenCourt solves this by providing a centralized platform to discover and organize sports events in their community.

---

## 👥 Target Users
- Players looking for local open-play sessions.  
- Community members organizing recreational sports.  
- Anyone who wants to play more and search less.

---

## ⚙️ Features

### ✅ MVP Features
| CRUD Action | Feature | Description |
|--------------|----------|-------------|
| **Create** | Host an Event | Users can create new sports events. |
| **Read** | View Events | Users can view all available events. |
| **Update** | Edit Events | Hosts can modify event details such as location or participants. |
| **Delete** | Remove Events | Hosts can delete their events. |

### 🌟 Extended Features (Future Goals)
1. User profiles (preferred sports, skill level, photos).  
2. Payments for court rentals or tournaments.  
3. Search and filtering by location or sport type.  
4. Private messaging between players.

---

## 🧱 Data Model

### Core Entities
- **Events**
- **Users**
- **Locations**

### Relationships
- A **user** can host many **events**.  
- An **event** can have multiple **users** (participants).  
- Each **event** belongs to one **location**, but locations can host multiple events.

---

## 💻 Local Development Setup

### 🧩 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

---