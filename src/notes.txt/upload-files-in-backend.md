# Uploading files/attachments in backend

## *Express* doesn't have any built in functionality to handle file uploads
- Actually express takes advantage of 3rd party uploaders like
    - *express uploader* and very famous one *multer*
- Whenever a file's need to uploaded express requires a middleware like multer

``` mermaid
graph LR
express(Express)
middleware(Multer)
attachments(
    Images
    PDF
    csv
)
express --> |reqs middleware| middleware
express --> |no direct upload| attachments
middleware --> |attachments| express
middleware --> |express attachment req| attachments
attachments --> |upload via multer| middleware
```

## Initialization of **Multer**

- Initialize it as a middleware import it
- second step is to declare where we want to store it
``` javascript
const storage = multer.diskStorage({
    // diskStorage takes an object as destination (of storage) which has
    destination: function(req, file, cb){
        // where "file" is added by multer itself and "cb" is a callback
        // cb is used inside the function
        cb(null, `./public/images`);
        // first param is errors if any
        // second is the path where we want to store the atachments
    },
    // next comes the filename issue, since many people might upload same name img
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
        // first param is errors if any
        // second is the name how we'll name the incoming attachment
    }
    
})

// export

export const upload = multer({
    storage, // main function
    limits:{
        fileSize:1*1000*1000;
    }
})
```