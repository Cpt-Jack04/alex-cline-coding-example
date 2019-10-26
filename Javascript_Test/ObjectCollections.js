/* Generic Methods */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Gets an item from a given array based on a given itemID.
// Returns -1 if itemID is not found.
var GetItemFromArray = function (itemID, itemArray) {
    "use strict";
    var currentIndex = Math.floor(itemArray.length / 2);

    while (Math.floor(currentIndex / 2) > 0) {
        if (itemArray[currentIndex].id === itemID) {
            return itemArray[currentIndex];
        } else if (itemArray[currentIndex].id > itemID) {
            currentIndex -= Math.floor(currentIndex / 2);
        } else {
            currentIndex += Math.floor(currentIndex / 2);
        }
    }
    return -1;
};

// Returns the give array.
var GetAllItemsFromArray = function (itemArray) {
    "use strict";
    return itemArray;
};

// Removes an item from a given array based on a given itemID.
// Returns true if itemID is removed. If item is not removed, returns false.
var RemoveItemFromArray = function (itemID, itemArray) {
    "use strict";
    var currentIndex = Math.floor(itemArray.length / 2);

    while (Math.floor(currentIndex / 2) > 0) {
        if (itemArray[currentIndex].id === itemID) {
            while (currentIndex < itemArray.length - 1) {
                itemArray[currentIndex] = itemArray[currentIndex + 1];
            }
            return true;
        } else if (itemArray[currentIndex].id > itemID) {
            currentIndex -= Math.floor(currentIndex / 2);
        } else {
            currentIndex += Math.floor(currentIndex / 2);
        }
    }
    return false;
};

var authors = {
    itemArray : [],
    
    GetItem : function (itemID) {
        "use strict";
        return new GetAllItemsFromArray(itemID, this.itemArray);
    };
};