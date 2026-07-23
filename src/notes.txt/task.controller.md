# Task Controller functions

## Create Task
- destructure data and project id from req
- check project exists
    - not checking might create problems
- extract files from `req.files` since multer is already in action in middleware
    - `req.files` gives an array which is to be looped on
    - simple map the array and return the files since those needs to be served and shown with the task
    - define `url`, `mimetype` and `size` all coming from (thanks to ) **Multer**.
- create a task with received values
- return response

## Get Task
- destructure `projectId` from params
- check project exists
- find tasks with `projectId`
- use populate method to fetch user details which is referenced as mongoose `ObjectId()` in the model itself.
- Syntax of ```. populate()```
``` javascript
await Task.find({
    // projectID
}).populate(
    "Field linked with other model/collection",
    "values seperated by space from the lined model/collection")
```

## Get Task By Id

``` mermaid
graph TD
task(Task)
subTask(Subtasks)
verify(Auth)
login(login)
logout(signOut)
assignee1(member1)
assignee2(member2)
assignee3(member3)

task -->subTask --> verify & login & logout
verify --> |assigned to| assignee1
login --> |assigned to| assignee2
logout --> |assigned to| assignee3
```

> Even the subtask and assignee details needs to be fetched when fetching a single task.

### Logic

> **Requires Aggregation Pipeline**

1. Pipeline - Match the task
    - Match the received id with collection
2. Pipeline - Find the assigned user
    - task is `assignedTo` a user whose details is in user's collection
    - simply `$lookup` from users collection by `_id`
    - another pipeline within the same lookup pipeline for projecting user detail
    - an `$addFields` to flatten the `assignedTo` field
3. Pipeline - find the subtasks
    - simply `$lookup` into subtask collection by `_id` of parent task
    - subtask has a property `createdBy` user
    - another pipeline within the same lookup for data projection 
    - an `$addFields` to flatten the `createdBy` field