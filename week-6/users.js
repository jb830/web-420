//Description: MongoDB Shell Scripts for the users collection.

let john = {
    "userName" : "john123",
    "password" : "fsdk@!DSDe",
    "emailAddresses" : [
        "johndoe@example.com"
    ]
}

let jane = {
    "userName" : "jane38",
    "password" : "nfd$FDS3f!",
    "emailAddresses" : [
        "janedoe@example.com",
        "janedoe@jane.com"
    ]
}

let jean = {
    "userName" : "jeanbean",
    "password" : "fvcxv$DCa32",
    "emailAddresses" : [
        "jeanbean123@example.com"
    ]
}

let joe = {
    "userName" : "jojo11",
    "password" : "B3fds54@3",
    "emailAddresses" : [
        "joejoe123@example.com",
        "joe.d@joescars.com"
    ]
}

db.users.insertOne(john)
db.users.insertOne(jane)
db.users.insertOne(jean)
db.users.insertOne(joe)