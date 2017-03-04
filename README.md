# steam-inventory
This package helps you to load user steam inventory without limits and paying for it.
It is made for fast items loading, using Steam official API.

## Installing repository
```
npm install steam-inventory
```

## Adding repository to your code
```javascript
const li = require("steam-inventory");
```

## Getting user Steam inventory
```javascript
li("XXXXXXXXXXXXXXXXX", 730, 2, (items, error) => {
  if(error) {
    return console.log("Error, while getting user items. Please check settings or user inventory is hidden.");
  } else {
    // Write your code here...
  }
});
```