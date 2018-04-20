const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const MONGO_URL = "mongodb://localhost:27017";

// Database Name
const dbName = "impactodo";

// Use connect method to connect to the server
MongoClient.connect(MONGO_URL, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertTodo(db, function() {
    console.log("Inserted");
  });

  findTodo(db, result => {
    console.log(result);
  });

  findNumber(db, result => {
    console.log(result);
  });

  updateTodo(db, function() {
    console.log("Updated");
  });

  findTodo(db, result => {
    console.log(result);
  });

  deleteTodo(db, function() {
    console.log("Delete");
  });

  findTodo(db, result => {
    console.log(result);
  });

  client.close();
});

//Insert data to database
const insertTodo = function(db, callback) {
  // Get the documents collection
  const todo = db.collection("todo");
  // Insert some documents
  todo.insertMany(
    [{
        text: "Learn Mongo",
        number: 4
      },
      {
        text: "Mongo 2",
        number: 6
      },
      {
        text: "Mongo 3",
        number: 1
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      // assert.equal(3, result.result.n);
      // assert.equal(3, result.ops.length);
      console.log("Inserted 3 Todos into the collection");
      callback(result);
    }
  );
};

//Show All data in Database
const findTodo = function(db, callback) {
  db
    .collection("todo")
    .find()
    .toArray((err, result) => {
      assert.equal(err, null);
      console.log("All Todo");
      callback(result);
    });
};

//Find Data with number > 2
const findNumber = function(db, callback) {
  db
    .collection("todo")
    .find({
      number: {
        $gt: 2
      }
    })
    .toArray((err, result) => {
      assert.equal(err, null);
      console.log("Found Number");
      callback(result);
    });
};

//Update Selected Data
const updateTodo = function(db, callback) {
  db.collection("todo").updateOne({
      text: "Learn Mongo"
    }, {
      $set: {
        text: "Update to Mongo"
      }
    },
    function(err, result) {
      assert.equal(err, null);
      console.log("Data Updated");
      callback(result);
    }
  );
};

//Delete Selected Database
const deleteTodo = function(db, callback) {
  db.collection("todo").deleteOne({
      number: 1
    },
    function(err, result) {
      assert.equal(err, null);
      console.log("Data Deleted");
      callback(result);
    }
  );
};