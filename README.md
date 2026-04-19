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

## References
- https://developer.mozilla.org/
- https://nodejs.org/en/docs
- https://expressjs.com/
- https://www.json.org/


  ## References

### Core Technologies
- [Node.js Documentation](https://nodejs.org/en/docs)
- [JavaScript (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Express.js Documentation](https://expressjs.com/)
- [CSS (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

### YouTube
- Traversy Media – Node.js Crash Course  
  https://www.youtube.com/watch?v=fBNz5xF-Kx4

- Programming with Mosh – JavaScript Full Course  
  https://www.youtube.com/watch?v=W6NZfCO5SIk

- Tech Jeshwanth – Express.js Guide  
  [https://www.youtube.com/watch?v=L72fhGm1tfE](https://youtu.be/RpCliBS_xA4?si=gIA1IN4ziUM9xH7U)

---

### Udemy Courses
- NodeJS – The Complete Guide (MVC, REST APIs, GraphQL, Deno)  
  https://www.udemy.com/course/nodejs-the-complete-guide/

- The Complete JavaScript Course 2024: From Zero to Expert  
  https://www.udemy.com/course/the-complete-javascript-course/

- Electron From Scratch: Build Desktop Apps With JavaScript  
  https://www.udemy.com/course/electron-from-scratch/

- CSS - The Complete Guide (Flexbox, Grid, Sass)  
  https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/

---

### Additional Resources
- [npm (Node Package Manager)](https://www.npmjs.com/)
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Docs](https://docs.github.com/)

---

### AI chat link
- https://app.blackbox.ai/share/fdbe2efd-27fc-43c7-ac72-11e1c75df8fd
