# steam-inventory
This package helps you to load user steam inventory without limits and paying for it.
It is made for fast items loading, using Steam official API.

## Adding repository to your code
```JAVASCRIPT
const li = require("steam-inventory");
```

## Getting user Steam inventory
```JAVASCRIPT
li("XXXXXXXXXXXXXXXXX", 730, 2, (items, error) => {
  if(error) {
    return console.log("Error, while getting user items. Please check appId, contextId, steamid or user inventory is hidden.");
  } else {
    // Write your code here...
  }
});
```
