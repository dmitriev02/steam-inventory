const request = require("request");

const loadInventoryLink = (steamid, appId, contextId) => {
  return "http://steamcommunity.com/inventory/" + steamid + "/" + appId + "/" + contextId + "?l=english&count=5000";
}

const getItemImage = (appId, classId) => {
  return "https://steamcommunity-a.akamaihd.net/economy/image/class/" + appId + "/" + classId + "/";
}

const getItemId = (classId, array) => {
  for(let key in array) {
    if(classId == array[key].classid) {
      return key;
    }
  }
}

const loadSteamInventory = (steamid, appId, contextId, callback) => {
  request(loadInventoryLink(steamid, appId, contextId), (error, response) => {
    if(error || response.body == "null" || response.statusCode != 200) {
      let error = true;
      callback([], error);
    } else {
      let userInventory = [];
      let items = JSON.parse(response.body);
      items.assets.forEach((item, i) => {
        let itemKey = getItemId(item.classid, items.descriptions);
        let color;
        for(let key in items.descriptions[itemKey]["tags"]) {
          if(items.descriptions[itemKey]["tags"][key].category == "Rarity") {
            color = items.descriptions[itemKey]["tags"][key].color;
          }
        }
        let itemModel = {
          "assetid": item.assetid,
          "classid": item.classid,
          "instanceid": item.instanceid,
          "contextid": item.contextid,
          "tradable": items.descriptions[itemKey]["tradable"],
          "type": items.descriptions[itemKey]["type"],
          "name": items.descriptions[itemKey]["name"],
          "market_hash_name": items.descriptions[itemKey]["market_hash_name"],
          "market_name": items.descriptions[itemKey]['market_name'],
          "image": getItemImage(appId, item.classid),
          "icon_url": items.descriptions[itemKey]["icon_url"],
          "color": color
        };
        userInventory.push(itemModel);
      });
      let error = false;
      callback(userInventory, error);
    }
  });
}

module.exports = loadSteamInventory;