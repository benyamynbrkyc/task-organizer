# Task Organizer

Task Organizer API with:

  - users, tasks (MongoDB, npm: mongoose)
  
  - user profile customization 
    - change name, email, password and avatar (profile picture)    
      - file upload / profile picture upload with multer - images standardized with npm: sharp (same height, width, file format is always PNG)
      
  - automatic email sending on creating and deleting account (SendGrid API)
  
  - authentication, registration, login (npm modules: JSONWebToken, bcrypt, validator)
  
  - task sorting (by timestamp or parameter/field)
  
  - development and production environments
  
  - test suites with npm modules: jest, env-cmd
    - http response testing with npm: supertest
    - mock libraries
