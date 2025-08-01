# 🛒 Online Shopping Management System

This is a **Training Project** built as a full-stack web application for managing online shopping operations. The system supports customer and admin roles, allowing product browsing, order placement, and inventory management.

---

## 🔧 Tech Stack

- **Frontend**: Angular  
- **Backend**: ASP.NET Core Web API  
- **Database**: SQL Server (Database First Approach)  
- **Tools**: Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS)  

---

## 🎯 Features

### 👤 Customer
- User Registration & Login  
- Browse/Search Products by Category  
- View Product Details  
- Add to Cart & Checkout  
- Track Orders & View Order History  
- Edit Profile  

### 🛠️ Admin
- Secure Admin Login  
- Add/Update/Delete Products  
- Manage Categories  
- Process Orders & View Sales Reports  
- Dashboard with Key Metrics  

---

## 📁 Project Structure

/Frontend - Angular components & services
/Backend - ASP.NET Core Web API controllers & models
/Database - DB-first entity models, connection configs
/Documents - SRS Document, PPT Presentation

yaml
Copy
Edit

---

## 📄 Documentation

- [SRS Document (PDF)](./OSMS%20SRS%20Upt.pdf)  
- [Project Presentation (PPTX)](./ShoppingManagementSystem%20ppt.pptx)  

These files include detailed functional and non-functional requirements, ER diagrams, UI flows, and system design specifications.

---

## 🚀 Getting Started

### Prerequisites
- Node.js & Angular CLI
- .NET SDK (for ASP.NET Core)
- SQL Server
- Visual Studio / VS Code

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/online-shopping-management-system.git
   cd online-shopping-management-system
Database Setup

Configure connection string in appsettings.json

Use Database-First approach with EF Core

Run Backend (ASP.NET Core Web API)

bash
Copy
Edit
dotnet restore
dotnet build
dotnet run
Run Frontend (Angular)

bash
Copy
Edit
cd /Frontend
npm install
ng serve


📌 Notes
This project demonstrates practical implementation of full-stack development using Angular and ASP.NET Core.

It includes secure authentication, responsive design, component-based UI, RESTful APIs, and database-first integration with Entity Framework.

All critical operations are logged and the system is designed to be scalable and maintainable.

🔐 Disclaimer: This is a training/demo project and not intended for production use without further enhancements to security, optimization, and testing.
