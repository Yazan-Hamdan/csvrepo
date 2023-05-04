# CSV Repo
This is a React project called `CSV Repo` that utilizes AWS services for user authorization and authentication, as well as all the backend services. This project allows users to upload and view CSV files.

## Prerequisites

Before running the application, you should create an `.env` file in the root directory of the project, which contains two environment variables:

- `REACT_APP_API_URL`: The base URL of the application hosted on AWS
- `REACT_APP_COGINTO_URL`: The Cognito page that the application uses

## Getting started

To get started, clone this repository and navigate to the project directory in your terminal. Run `npm install` to install all the dependencies. Then, run `npm start` to start the application on port `3000` by default.

```
git clone https://github.com/Yazan-Hamdan/csvrepo
npm install 
npm start
```

# Functionalities

This project is designed to provide users with the ability to manage CSV files on AWS. There are 5 main functionalities available:


## 1 Upload a CSV File to S3 and DynamoDB
Users can upload a CSV file to the AWS S3 bucket and DynamoDB database through `CSV Repo`. This will store the data in a structured format for easy retrieval and analysis.

## 2 Download a CSV File from S3
Users can download a CSV file from the AWS S3 bucket through `CSV Repo`. This will allow them to export data for use in other applications or for analysis.

## 3 List All Available CSV Files in S3 Bucket 
Users can list all the available CSV files in the AWS S3 bucket through `CSV Repo`. This will allow them to quickly find the files they need and access them easily.

## 4 Manage User Permissions
Admin users can manage user permissions in `CSV Repo`. This will allow them to control who has access to specific files and functions within the application. Writers and Readers do not have access to this functionality.

## 5 View CSV File Content in a JSON Format

Users can view the content of a CSV file in a JSON format through `CSV Repo`. This will allow them to quickly analyze the data and extract useful insights.



## Users

`CSV Repo` has 3 types of users: `Admins`, `Writers`, and `Readers`. Each type of user has a different set of permissions within the application:

* `Admins`: can perform all functionalities mentioned above, including upload, download, list, manage user permissions, and view file content in JSON format.

* `Writers`: can perform all functionalities except Delete and managing user permissions. This means they can upload, download, list, and view file content in JSON format.

* `Readers`: can only list the available CSV files, read a file in a JSON format, and download the file. They do not have access to any functionality related to uploading, managing user permissions, or deleting files.