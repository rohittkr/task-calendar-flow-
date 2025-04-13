# 🗓️ Calendar Application - MyCourses

A full-stack calendar application built using **React.js**, **Redux**, and **MongoDB**. This application allows users to manage events, tasks, and goals, mimicking a **Google Calendar** experience with drag-and-drop functionality, event creation, and state management.

---

## 🚀 Features

- 📅 **Calendar View** with daily, weekly, and monthly event views.
- ➕ **Create Events** by clicking on the calendar and filling out event details (Title, Category, Date, Start and End Time).
- 🕒 **Time-Adjusted Events**: Events respect start and end times, displaying the duration on the calendar.
- ✍️ **Edit Events**: Expand or contract events to adjust duration.
- ❌ **Delete Events**: Remove events from the calendar.
- 🗂️ **Task Management**: Drag-and-drop tasks from a goal list onto the calendar to create events with pre-filled details.
- 🎨 **Event Categories**: Events categorized into 6 options: Exercise, Eating, Work, Relax, Family, and Social.
- 🔄 **Drag and Drop**: Move events across days and times.
- 💻 **Backend with MongoDB**: All event data is stored in a MongoDB database.
- 🛠️ **State Management with Redux**: Centralized state management for handling events, tasks, and goals.
- 🌐 **API Endpoints**:  
  - **POST**: Create an event  
  - **GET**: Fetch events and goals  
  - **PUT**: Update event details

---

## 🧰 Tech Stack

| **Tech**          | **Description**                      |
|-------------------|--------------------------------------|
| **React.js**      | Frontend framework for building UI   |
| **Redux**         | State management for the app         |
| **MongoDB**       | Database to store event data         |
| **Node.js**       | Backend runtime for server-side logic|
| **Express.js**    | Backend framework for API routes     |
| **MongoDB Compass** | Cloud database for data storage     |

---

## 🎯 Features Breakdown

### **Create and Manage Events**
- Events can be created with title, category (Exercise, Eating, Work, Relax, Family, Social), date, start, and end time.
- Events can be expanded, contracted, or deleted.

### **Drag and Drop Functionality**
- Users can drag and drop events on the calendar to change the time and date.
- Tasks from a goal list can be dragged to the calendar and automatically create events.

### **Category and Task Integration**
- Goals are color-coded and linked to specific tasks.
- Clicking on a goal populates a list of related tasks.
- Dragging a task to the calendar automatically creates an event using the task's details and color.

---

## 🛠️ API Endpoints

- **POST** `/api/events`: Create a new event.
- **GET** `/api/events`: Fetch all events.
- **GET** `/api/events/:id`: Fetch event by ID.
- **PUT** `/api/events/:id`: Update event details.

---


### Explanation:

- **Title**: Starts with a calendar-related title and describes the general purpose of the project.
- **Features**: Key features of the calendar app, such as event creation, task management, and drag-and-drop functionality.
- **Tech Stack**: Lists the technologies used in the project.
- **Features Breakdown**: Explains each feature in detail, with examples like the goal-task integration and event manipulation.
- **API Endpoints**: Details the POST, GET, and PUT endpoints for creating and managing events.
- **Getting Started**: Provides steps to set up the application locally, including installation of dependencies, MongoDB configuration, and starting both backend and frontend servers.



## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/mycourses-calendar.git
   cd mycourses-calendar
