# Get all projects

## > Context, what to query
- We can fetch all projects for admin but most of the time it'll for the projects a user has created
- we can get the user id from `req.user._id`, with this id we can use `find()` and it'll return all the projects
- but when we fetch we get projects according to schema we get name and description of the project
- but wait... we don't only want the project **name and description we also want members and task** related to that project right?
- with the project id we can query users, note, task, etc. but that would **both complex and expensive**
- so instead we'll query the project members
    - so project member has **user, project and role**

## > Pipeline Implementation
- we'll filter all the doc based on the `req.user._id` it'll return all the docs matching this user/criteria
- when we match and filter project members on the criteria atleast the user field is created by the user itself
- basically anybody can use this controller get all projects and members of the project **irrespective of the role**
- once we got all the matching docs where current user is a member, we'll `$lookup` from *projects collections* referring to the localfield which is `_id (projectmember.project)` of the project
- that returns all the projects docs matching the `_id (project._id)` of the projects
- now we'll again `$lookup` into project members collection to find all the users present in all found projects, by taking the local field `_id (project._id)` with `_id (projectmember.project)`
- we'll save the count of the users per project, for that we'll use `$addFields`
- `$unwind` the projects from the returned doc and then project it