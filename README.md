# 🏢 Enterprise Business Analytics Platform | Microsoft Fabric

An end-to-end **Enterprise Business Analytics Platform** engineered using **Microsoft Fabric** and the modern **Medallion Architecture (Bronze → Silver → Gold)**.

The project demonstrates how raw enterprise data from multiple sources can be ingested, cleaned, transformed, modeled, analyzed, and visualized to support **data-driven business decision-making**.

---

## 📌 Project Overview

Modern organizations often have business data distributed across spreadsheets, CSV files, CRM systems, and other sources.

This project demonstrates an enterprise analytics pipeline that consolidates these heterogeneous data sources into **Microsoft Fabric OneLake**, processes the data through a structured Medallion Architecture, creates an optimized analytical model, and delivers business insights through **Power BI**.

The platform also integrates **Machine Learning workflows** for customer segmentation and predictive business analysis.

---

## 🚀 Live Demo

👉 **[View Live Enterprise Analytics Platform](https://fabric-analytics-capstone-portal.vercel.app/)**

Explore the interactive dashboards, business KPIs, customer churn analysis,
and predictive analytics.

## 🚀 Key Highlights

* 🏗️ Built a complete **Bronze → Silver → Gold Medallion Architecture**
* ☁️ Centralized enterprise data using **Microsoft Fabric OneLake**
* 🔄 Designed data ingestion and orchestration pipelines
* ⚡ Used **PySpark and pandas** for data cleaning and transformation
* 🗃️ Developed **Fact and Dimension tables**
* ⭐ Implemented a clean **Star Schema**
* 📊 Built interactive **Power BI dashboards**
* 🧮 Created DAX-based business KPIs
* 🤖 Integrated Machine Learning workflows
* 👥 Performed customer segmentation using **K-Means**
* 📈 Applied **Linear Regression** for predictive analysis
* 🔍 Analyzed customer churn and retention patterns

---

# 🏗️ Medallion Architecture

The platform follows a three-layer architecture:

```text
                 Enterprise Data Sources
                          │
          ┌───────────────┼────────────────┐
          ▼               ▼                ▼
      CSV Files       Excel Files      CRM / JSON
          │               │                │
          └───────────────┼────────────────┘
                          ▼
                  ┌──────────────┐
                  │   ONELAKE    │
                  │    BRONZE    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │    SILVER    │
                  │ PySpark +    │
                  │    pandas    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │     GOLD     │
                  │ SQL Warehouse│
                  │  Star Schema │
                  └──────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Power BI                  ML
       Dashboards             Workflows
              │                     │
              └──────────┬──────────┘
                         ▼
                Business Insights
```

---

# 🥉 Bronze Layer — Data Ingestion

The Bronze layer acts as the centralized landing zone for raw enterprise data.

### Data Sources

* 📊 Corporate Excel spreadsheets
* 📄 Raw CSV transactions
* 🗂️ CRM JSON data
* 📁 Other structured business datasets

### Technologies

* Microsoft Fabric
* OneLake
* Data Factory Pipelines

The goal of this layer is to preserve incoming data in its raw form while creating a centralized foundation for downstream processing.

---

# 🥈 Silver Layer — Data Transformation

The Silver layer processes and standardizes raw data using **PySpark and pandas**.

### Data Processing

* Data type standardization
* Date normalization
* Missing-value handling
* Duplicate detection and removal
* Billing anomaly handling
* Data validation
* Transformation of raw records into analytical datasets

PySpark was used for scalable data processing, while pandas supported additional analytical transformations.

---

# 🥇 Gold Layer — Analytical Data Warehouse

The Gold layer transforms cleaned data into business-ready analytical structures.

### Data Modeling

Designed:

* Fact Tables
* Dimension Tables
* Star Schema
* Business-ready analytical tables

The model was structured to support efficient reporting and analytical queries.

### Example Model

```text
                 Dim Customer
                      │
                      │
Dim Product ──── Fact Sales ──── Dim Date
                      │
                      │
                Dim Region
```

This dimensional model enables efficient business reporting and simplifies Power BI analysis.

---

# 📊 Power BI Business Intelligence

The Gold-layer data was connected to **Power BI** to create interactive analytical dashboards.

## Executive Summary

The executive dashboard provides high-level KPIs including:

* 💰 Revenue
* 📈 Monthly Sales Growth
* 💵 Net Profit
* 🏷️ Revenue Streams
* 👥 Customer Metrics
* 📊 Business Performance

---

## 🎛️ Interactive Analysis

Interactive filters and slicers allow users to analyze business performance by:

* Sales Region
* Product Category
* Customer Segment
* Churn Indicators
* Time Period

This enables users to move from high-level KPIs to detailed business analysis.

---

# 👥 Customer Retention & Churn Analysis

Developed analytical views to identify potential customer retention risks.

The churn analysis examines relationships between:

* Customer satisfaction
* Customer behavior
* Churn indicators
* Customer segments

### Key Objective

Identify customer groups that may be at higher risk of disengagement and provide insights that can support retention strategies.

---

# 🤖 Machine Learning

The platform integrates machine learning workflows using **Python, PySpark, and Scikit-learn**.

## 👥 Customer Segmentation — K-Means

Applied **K-Means clustering** to segment enterprise customers based on relevant behavioral and business characteristics.

The segmentation can help identify groups such as:

* High-value customers
* Growth-oriented customers
* Low-engagement customers
* At-risk customer segments

---

## 📈 Predictive Analysis — Linear Regression

Implemented **Linear Regression** to analyze and predict business growth trends.

The workflow is designed to support:

* Growth trend analysis
* Quarter-over-quarter prediction
* Business performance forecasting

---

# 🔄 End-to-End Data Flow

```text
Raw Enterprise Data
        ↓
Microsoft Fabric OneLake
        ↓
Bronze Layer
        ↓
PySpark / pandas
        ↓
Data Cleaning & Transformation
        ↓
Silver Layer
        ↓
SQL Warehouse
        ↓
Fact & Dimension Modeling
        ↓
Gold Layer
        ↓
Power BI + Machine Learning
        ↓
Business Insights & Predictions
```

---

# 🛠️ Technical Stack

| Technology           | Purpose                        |
| -------------------- | ------------------------------ |
| **Microsoft Fabric** | Enterprise analytics platform  |
| **OneLake**          | Centralized data storage       |
| **Data Factory**     | Data ingestion & orchestration |
| **PySpark**          | Large-scale data processing    |
| **Python**           | Data analysis & ML             |
| **Pandas**           | Data transformation            |
| **NumPy**            | Numerical analysis             |
| **Scikit-learn**     | Machine Learning               |
| **SQL Warehouse**    | Analytical data storage        |
| **Power BI**         | BI dashboards & reporting      |
| **DAX**              | KPI calculations               |
| **Star Schema**      | Dimensional data modeling      |
| **Delta Tables**     | Analytical data storage        |

---

# 📁 Suggested Repository Structure

```text
Enterprise-Business-Analytics-Fabric/
│
├── data/
│   ├── raw/
│   └── processed/
│
├── notebooks/
│   ├── bronze_ingestion.ipynb
│   ├── silver_transformation.ipynb
│   └── machine_learning.ipynb
│
├── sql/
│   ├── dimension_tables.sql
│   ├── fact_tables.sql
│   └── analytical_queries.sql
│
├── powerbi/
│   └── Enterprise_Analytics_Dashboard.pbix
│
├── pipelines/
│   └── data_ingestion_pipeline/
│
├── screenshots/
│
├── documentation/
│   └── architecture.md
│
├── requirements.txt
└── README.md
```

> Update the structure according to the actual files and folders in your repository.

---

# 📈 Business Use Cases

This platform can support organizations with:

* 📊 Executive performance reporting
* 💰 Revenue analysis
* 📦 Sales analytics
* 👥 Customer segmentation
* 🔍 Churn analysis
* 📈 Business forecasting
* 🌎 Regional performance analysis
* 🏷️ Product/category analysis
* 🤖 Predictive analytics
* 📋 Enterprise KPI monitoring

---

# 🎯 Project Outcomes

This project provided hands-on experience with:

* Enterprise data architecture
* Microsoft Fabric
* OneLake
* Medallion Architecture
* ETL/ELT pipelines
* PySpark data processing
* SQL data warehousing
* Dimensional data modeling
* Star Schema design
* Power BI reporting
* DAX calculations
* Machine Learning
* Customer segmentation
* Predictive analytics
* Business intelligence

The project demonstrates how **raw, fragmented enterprise data can be transformed into a scalable analytical platform that delivers actionable business insights**.

---

# 🔮 Future Improvements

Potential enhancements include:

* [ ] Real-time data streaming
* [ ] Automated data quality monitoring
* [ ] Incremental data pipelines
* [ ] Advanced churn prediction
* [ ] Automated ML model retraining
* [ ] More advanced forecasting models
* [ ] Real-time Power BI reporting
* [ ] Data lineage and governance
* [ ] Role-based dashboard access
* [ ] Cloud deployment and CI/CD integration

---

# 📚 Skills Demonstrated

```text
Microsoft Fabric
OneLake
Medallion Architecture
Data Engineering
ETL / ELT
PySpark
Python
Pandas
NumPy
SQL
Data Warehousing
Star Schema
Dimensional Modeling
Power BI
DAX
Machine Learning
K-Means Clustering
Linear Regression
Business Intelligence
Data Analytics
```

---

# 👩‍💻 Author

**Kirti Solanki**

Aspiring **Data Analyst / BI Analyst** with an interest in Data Analytics, Business Intelligence, Microsoft Fabric, Data Engineering, and Machine Learning.

---

# 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐.

Feedback and suggestions are welcome!
