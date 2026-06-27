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
const top5favoritefruits = [
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

// list the average number of tags per user
const avgNoOfTagsPerUser = [
    // unwind (spread) the array
    {
        $unwind: { // creates seperate/individual docs based on the value/array provided
            path: "$tags"
        }
        // this creates duplicate records except for the field value provided n records for n no. of elements in the passed field/array
    },
    {
        // we'll group repetative records with the help of "_id" since that is the only unique value in all duplicated docs/records
        // this will give us _id + the count of how many times the field _id appeared which would be same as the value in the passed field/array in this case it's number of tags
        $group: {
            _id: "$_id",
            numberOfTags: {
                $sum: 1
            }
        }
    },
    {
        // now that we got individual docs with the tags count, we'll group all the records as one doc which will have field no. tags per user and avg them
        $group: {
            _id: null,
            avgNoOfTags: {
                $avg: "$numberOfTags"
            }
        }
    }
]

// another 2 stage pipeline method for the same problem
const wayTwoOfAvgTagsPerUser = [
    {
        $addFields: { // simply add a field of any name
            noOfTags: {
                // simple count the no. of element present in a specefic field
                $size: { $ifNull: ["$tags", []] }
            }
        }
    },
    {
        // regroup them into one doc and perform the average
        $group: {
            _id: null,
            avgNoOfTags: {
                $avg: "$noOfTags"
            }
        }
    }
]

const findUserWithEnimTag = [
    {
        $match: {
            tags: "enim"
        }
    },
    {
        $count: 'UsersWithEnimTag'
    }
]

const mostAgedBlueEyedUserOrUsers = [
    {
        $match: {
            eyeColor: "blue"
        }
    },
    {
        $sort: {
            age: -1
        }
    },
    {
        $match: {
            age: 40
        }
    },
    {
        $count: 'string'
    }
]

const displayNameAndAgeOfInactiveUsersWithVelitTag = [
    {
        $match: {
            isActive: false,
            tags: "velit"
        }
    },
    {
        $project: {
            _id: 0, // exclusion of a field
            name: 1, // inclusion of a field
            age: 1,
            hasVelitTag: "true" // adding a new field
        }
    }
]

const findUserWithSpecialNos = [
    {
        $match: {
            "company.phone": {
                $regex: "^\\+1 \\(940\\)"
            }
        }
    }
]

const nNoOfUsersRegisteredRecently = [
    {
        $sort: {
            registered: -1 // simply sort desc by registered timestamps
        }
    },
    {
        $limit: 3
    },
    {
        $project: {
            _id: false,
            name: true,
            registered: true,
            favoriteFruit: true
        }
    }
]

const categorizeUsersBasedOnFavoriteFood = [
    {
        $group: {
            _id: "$favoriteFruit",
            users: { $push: "$name" } // simply creates a field and then takes a value to push that into that field something similar to addFields but different
        }
    }
]

const usersWithSecTagAsAd = [
    {
        $match: {
            "tags.1": "ad" // simply access any element of the array
        }
    },
    {
        $count: 'usersWithSecTagAd'
    }
]

const usersWithEnimAndIdBothTags = [
    {
        $match: {
            tags: { $all: ["enim", "id"] }
        }
    }
]

const allCompaniesInUSAWithUserCount = [
    {
        $match: {
            "company.location.country": "USA"
        }
    },
    {
        $group: {
            _id: "$company.title",
            userInCompany: { $sum: 1 }
        }
    }
]

// Lookup Example using two collections authors and books

const lookupEg = [
    {
        $lookup: {
            from: "authors",
            localField: "author_id",
            foreignField: "_id",
            as: "author_details"
        }
    },
    {
        $addFields: {
            author_details: {
                // $first:"$author_details" // not recommended
                $arrayElemAt: ["$author_details", 0]
                // provide the array and then the element position
            }
        }
    }
]