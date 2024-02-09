//Description: MongoDB Shell Scripts for the people collection.
// db = connect('mongodb://localhost:27017/web420DB');

let john = {
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1111-01-01",
    "roles": [{
        "text": "admin"
    }],
    "dependents": [{
        "firstName": "June",
        "lastName": "Do"
    }]
}

let jane = {
    "firstName": "Jane",
    "lastName": "Doe",
    "birthDate": "1111-01-01",
    "roles": [{
        "text": "user"
    }],
    "dependents": [{
        "firstName": "Jimmy",
        "lastName": "Do"
    }]
}
let jean = {
    "firstName": "Jean",
    "lastName": "Doe",
    "birthDate": "1111-01-01",
    "roles": [{
        "text": "user"
    }],
    "dependents": [{
        "firstName": "Rosie",
        "lastName": "Do"
    }]
}
let joe = {
    "firstName": "Joe",
    "lastName": "Doe",
    "birthDate": "1111-01-01",
    "roles": [{
        "text": "user"
    }],
    "dependents": [{
        "firstName": "Rosie",
        "lastName": "Do"
    }]
}

db.people.insertOne(john)
db.people.insertOne(jane)
db.people.insertOne(jean)
db.people.insertOne(joe)