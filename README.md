Task Manager API

How To?
Test all endpoints using Postman or curl to ensure proper functionality.

1. Before we start, make sure the task.json file is valid file.
   Set up the basic project structure and Install Express.js and other necessary NPM packages.Run below commands
    npm install express
    npm install --save-dev nodemon ( for automatic local server refreshes )

2. Implement GET /tasks: Retrieve all tasks.
    Use localhost:3000/tasks endpoint in postman to view all tasks
    Filtering & Sorting is applied.
    select method type as GET from top left dropdown.

3. Implement GET /tasks/:id: Retrieve a specific task by its ID.
    To get the details of specific id, use localhost:3000/tasks/:id in postman
    select method type as GET from top left dropdown.

4. Implement POST /tasks: Create a new task with the required fields (title, description, completed).
    To create the new task, add the description, title & completed values in body of the request, in json format.
    select method type as POST from top left dropdown.
    Remember, id will be auto generated.

5. Implement PUT /tasks/:id: Update an existing task by its ID.
    To update the value for specific task id, add the description, title & completed flag in the json body & select method type as PUT from top left dropdown.

6. Implement DELETE /tasks/:id: Delete a task by its ID.
    To delete the value for specific task id, Use localhost:3000/tasks/:id endpoint & select method type as DELETE from top left dropdown.
