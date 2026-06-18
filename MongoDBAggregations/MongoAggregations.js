import mongoose from "mongoose";

// for getting only the active users and their count
db.users.aggregate([
    {
        // first stage of the pipeline
        $match: {
            isActive: true // only returns active users
        },
    }, {
        // second stage
        $count: "activeUsers" // any String which will represent the numbers
    }
])

// Return the average age of the users in the db
[
    {
        $group: {
            // always takes _id as first params where we can pass anything even null or properties like age, gender, salary etc.
            // _id:null // passing null gives you all the data/users in one documents
            _id: "null", // or $"gender"
            averageAge: { // we can define accumulators of received document
                // built in average calculator by mongoDb
                $avg: "$age"
            }
        }
    }
]

// List top 5 most common favorite fruits among the users
[
    {
        // group them based on the diffrent fruits
        $group: "$favoriteFruit",
        // define a var and then sum each and every doc based on the fruit
        count: {
            $sum: 1 // adds 1 (no. of increments) in the count var every time it finds fruits
        }
        // we have found all the count/values based on fruits now stage 2
    },
    {
        // since we have to find top 5 we'll sort the data by descending
        $sort: {
            // previously defined count var in the stage 1 is not available in the db but in the pipeline which can be used in the following stages
            count: -1 // give doc order by desc, 1 give default asc
        }
        // sorting done now stage 3
    },
    {
        $limit: 2 // returns first n docs
    }
]