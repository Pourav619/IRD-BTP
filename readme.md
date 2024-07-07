# IRD Research Paper Management System

## Description

This project is a Research Paper Management System developed for the IRD department. The system allows users to upload, view, edit, and manage metadata for their research papers.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## System Requirements

- Node.js
- MongoDB

## Installation

To run this project locally on your machine, follow these steps:

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/Pourav619/IRD-BTP.git
    ```

2. Navigate to the project directory:
    ```sh
    cd IRD-BTP
    ```

3. Install the required dependencies:
    ```sh
    npm install
    ```

4. Start the application:
    ```sh
    node index.js
    ```

5. Open your browser and go to `http://localhost:3000/`.

## Features

### User Authentication

- Secure login and signup processes to ensure that only authorized users can access the system's features.

### Add New Entries

- Users can manually upload a new research paper or upload a citation file containing metadata in a specified format.

### View, Edit, and Delete Data

- Users can view, edit, and delete their research papers from a table that retrieves data from MongoDB based on the username.

### Search Functionality

- Users can search data in MongoDB using keywords related to the model used.

## Backend Preprocessing

### Description

This part of the project handles the preprocessing of uploaded `citation.txt` files. It parses the essential data and converts it for storage in MongoDB.

### Steps

1. **Upload and Parse File**: The uploaded `citation.txt` file is read line by line to extract relevant metadata such as title, authors, journal, volume, pages, year, publisher, and number.
2. **Data Conversion**: The extracted data is formatted into a structured JSON format. Authors' names are processed to include additional information.
3. **Database Insertion**: The formatted data is then inserted into the MongoDB collection for further use.
4. **ID Conversion**: The user ID in the documents is converted from a string to an `ObjectId` type for proper MongoDB querying.

### Code Snippet

Here is a brief example of how the preprocessing is implemented:

```python
import pymongo
from bson import ObjectId
import json

# Load user information
userobj = {}
with open('username.json', 'r') as file:
    userobj = json.load(file)

user_id = userobj["_id"]

# Read and parse the citation file
with open("uploads/citations.txt", "r", encoding="mbcs") as my_file:
    data = my_file.readlines()

# Process the parsed data
article_list = []
# Code to parse the citations and convert them into a structured format

def convert_data_corrected(data):
    # Code to convert parsed data into JSON format suitable for MongoDB
    pass

# Insert data into MongoDB
mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo_client["irdBtp"]
collection = db["users"]
for document in data:
    collection.insert_one(document)

# Convert userID from string to ObjectId
for doc in collection.find({"userID": {"$exists": True, "$type": "string"}}):
    if ObjectId.is_valid(doc['userID']):
        new_id = ObjectId(doc['userID'])
        collection.update_one({'_id': doc['_id']}, {'$set': {'userID': new_id}})


```python



## Future Plans

### Security Enhancements

- Advanced Firewall Implementation
- Enhanced Authentication with LDAP
- Transition from FTPS to SFTP for secure file transfers

### Deployment Strategy

- Staged Deployment
- Scalability Plans

### DevOps Improvements

- Expanded Testing Protocols
- Enhanced Logging and Monitoring

### Codebase and Technology Upgrades

- Robust Form Handling with Django’s Forms and FormViews

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
