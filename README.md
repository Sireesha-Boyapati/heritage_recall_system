# Milk Recall System

A simple full-stack web application to manage milk collections, batch creation, and quality-based recall using **Node.js, Express, and JSON files**.

---

# Features

## Login System
- Simple hardcoded login
- Users: `admin / 1234`, `qa / 1234`

---

## Dashboard
- Displays:
  - Total batches
  - Safe batches
  - Recalled batches
- Shows recent batch activity

---

## Farmers Module
- Add farmer details in JSON file

---

## Collection Module
- Add milk collections (farmer, quantity, date)
- Auto-generates collection ID
- Tracks status:
  - SAFE
  - USED

---

## Batch Management (Core Feature)
- Create batches from selected collections
- View all batches in table
- Delete batches
- Recall batches (mark as RECALLED)

---

## Recall System
- Changes batch status to `RECALLED`
- Prevents unsafe batches from usage
- Highlights recalled batches in UI

---

## Backend API (Express)

- `GET /farmers`
- `POST /farmers`

- `GET /collections`
- `POST /collections`

- `GET /batches`
- `POST /batches`
- `DELETE /batches/:id`
- `PUT /batches/recall/:id`

---

## Tech Stack
- **Frontend:** HTML, JavaScript  
- **Backend:** Node.js, Express  
- **Database:** JSON files  

---

## Architecture

Frontend → Express API → JSON Files
