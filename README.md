# 🌍 Real-Time Location Map  

A real-time map application to find routes and directions between two locations using **React**, **Leaflet**, **OpenStreetMap**, and **Express**. Supports multiple transportation modes and real-time route updates.  

🚀 **Live Demo:** [Real-Time Location Map](https://realtime-map-git-main-shantanukulkarni853-gmailcoms-projects.vercel.app/)  

---

## ✨ Features  
- Real-time location tracking on the map  
- Multiple transportation modes (car, bike, walk)  
- Swap start and destination locations  
- Responsive and user-friendly interface  
- Deployed on **Vercel** (Frontend) and **Render** (Backend)  

---

## 💻 Tech Stack  
**Frontend:** React, Leaflet, React-Leaflet, Axios, React Router DOM, Mapbox GL, React Icons  
**Backend:** Node.js, Express, Axios, CORS  

---

## 🚀 Getting Started  

### Installation  
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/yourusername/real-time-map.git
   cd real-time-map
   ```
2. **Install frontend dependencies:**  
   ```bash
   npm install
   ```
3. **Install backend dependencies:**  
   ```bash
   cd server
   npm install
   ```
   
### Run Locally  
1. **Start the backend server:**  
   ```bash
   npm start
   ```
   Runs on **http://localhost:5000**  

2. **Start the frontend:**  
   ```bash
   npm start
   ```
   Runs on **http://localhost:3000**  

---

## 🌐 Deployment  

### Frontend (Vercel)  
1. Connect repo to Vercel and deploy.  
2. Build Command: `npm run build`  
3. Output Directory: `build`  

### Backend (Render)  
1. Create a **Web Service** on Render and connect your repo.  
2. Set commands:  
   - **Build:** `npm install`  
   - **Start:** `node server/server.js`  

---

## 🗺️ Usage  
1. Open the deployed frontend URL.  
2. Enter start and destination locations.  
3. Choose a transportation mode.  
4. View the route, distance, and duration.  
5. Swap locations if needed.  

---

## 📂 Project Structure  
```
real-time-map/
├── public/
├── src/
│   ├── components/
│   ├── pages/
├── server/
│   └── server.js
├── package.json
└── README.md
```

---

## 🙌 Acknowledgements  
- [OpenStreetMap](https://www.openstreetmap.org/)  
- [OSRM](http://project-osrm.org/)  
- [Leaflet](https://leafletjs.com/)  

---

Made with ❤️ by Shantanu Kulkarni  

Let me know if you want more improvements! 😊
