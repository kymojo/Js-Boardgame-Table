
var gameroom = gameroom || {};

//===============================================================

// Generic object list data structure
gameroom.ObjectList = function ObjectList(idName, startIndex) {

    this.idName = idName || "id";

    // Array of objects in the room
    // Add ensures IDs are always in ascending order 
    this.objectList = [];
    this.nextObjectId = (!startIndex && startIndex != 0 ? 1 : startIndex);

    // Adds a new object to the object list
    // Ensures array keeps ascending sort order
    // Returns new object's id
    //------------------------------------------------
    this.add = function(newObject) {
        newObject[this.idName] = this.nextObjectId;
        this.nextObjectId++;
        this.objectList.push(newObject);
        return newObject[this.idName];
    }

    // Get the index of an existing object by its id
    // Returns -1 if not found
    //------------------------------------------------
    this.find = function(searchId) {
        var start = 0;
        var end = this.objectList.length - 1;        
        var middle = Math.floor((start + end)/2);

        // While not found and more than one item
        while (this.objectList[middle][this.idName] !== searchId && start < end) {
            if (searchId < this.objectList[middle][this.idName]) {
                end = middle - 1;
            } else {
                start = middle + 1;
            }
            middle = Math.floor((start + end) / 2);
        }
        // After search, return result
        return (this.objectList[middle][this.idName] == searchId ? middle : -1);
    }

    // Get an existing object
    // Returns object when found; null if not found
    //------------------------------------------------
    this.get = function(searchId) {
        var indexOf = this.find(searchId);
        if (indexOf == -1) return null; 
        return this.objectList[indexOf];
    }

    // Delete an existing object
    // Returns object after successful delete
    // Returns null if it didn't exist
    //------------------------------------------------
    this.delete = function(deleteId) {
        var indexOf = this.find(deleteId);
        if (indexOf == -1) return null;
        return this.objectList.splice(indexOf, 1)[0];
    }    

}

//===============================================================

// Room object for holding objects
gameroom.Room = function Room() {

    this.objectList = new gameroom.ObjectList("id",1000);

    // Adds an object to the room
    // Returns a copy of it
    //------------------------------------------------
    this.addObject = function(newObject) {
        return this.objectList.add(newObject);
    }

    // Get an existing object in the room
    // Returns it when found, or null if not found
    //------------------------------------------------
    this.getObject = function(searchId) {
        return this.objectList.get(searchId);
    }

    // Deletes an object from the room
    // Returns a copy of the object after delete
    // or returns null if the object doesn't exist
    //------------------------------------------------
    this.deleteObject = function(deleteId) {
        return this.objectList.delete(deleteId);
    }
}

//===============================================================

// Basic game object
gameroom.GameObject = function GameObject(attributes) {

    this.id = null;
    this.position = {x: 0, y: 0, z: 0};
    this.angle = 0;
    this.sides = 1;
    this.sideUp = 1;
    // this.graphics = null;
    // this.permissions = 0;
}

//===============================================================
