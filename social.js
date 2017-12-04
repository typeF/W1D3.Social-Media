var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

// List everyone and for each of them, list the names of who they follow and who follows them
function list(data){
  for (var people in data){
    // console.log(people);
    console.log("Name: " + data[people].name);
    console.log("Follows: " + follows(data[people].follows));
    console.log("Followed by: " + whoFollowsMe(people));
    console.log("Followed by (over 30yrs): " + whoFollowsMe30(people));
  }
  console.log("----------------------------------------------------");
  console.log(followsTheMost(data) + " follows the most people");
  console.log("----------------------------------------------------");
  console.log(mostFollowers(data) + "has the most followers");
  console.log("----------------------------------------------------");
  console.log(mostFollowers30(data) + "has the most followers over 30");
  console.log("----------------------------------------------------");
  console.log(follows30(data) + " follows the most people over 30");
  console.log("----------------------------------------------------");
  console.log(oneSided(data) + " follow someone who isn't following them back");
  console.log("----------------------------------------------------");
  console.log(reach(data));
}

// Lists the name of people the user follows
function follows(nameList){
  followList = [];
  for (var i = 0; i < nameList.length; i++){
    nameId = nameList[i];
    person = data[nameId].name;
    followList.push(person);
  }
  return followList;
}

function follows30(nameList){
  followList30 = [];
  var newList = nameList;
  for (userId in nameList){
    for (following in nameList[userId]["follows"]){
      followingId = nameList[userId]["follows"][following];
      if (nameList[followingId]["age"] > 30){
        // followList30.push(nameList[followingId]["name"]);
        // console.log(newList)
        if (newList[userId]["follows30"] === undefined){
          newList[userId]["follows30"] = [];
        }
        newList[userId]["follows30"].push(nameList[followingId]["name"]);
      }
    }
  }
  var followsMostOver30 = followsTheMost(newList);

  return followsMostOver30;
}

// Lists names of followers
function whoFollowsMe(userName){
  followsMe = [];
  for (var people in data){
    for (var i = 0; i < data[people].follows.length; i++){
      follower = data[people]["follows"][i];
      followerName = data[people]["name"];
      if (follower === userName){
        followsMe.push(followerName);
      }
    }
  }
  return followsMe;
}

function whoFollowsMe30(userName){
  followsMe30 = [];
  for (var people in data){
    for (var i = 0; i < data[people].follows.length; i++){
      follower = data[people]["follows"][i];
      followerName = data[people]["name"];
      if (data[people]["age"] > 30){
        if (follower === userName) {
          followsMe30.push(followerName);
        }
      }
    }
  }
  return followsMe30;
}

// Finds who follows the most people
function followsTheMost(nameList){
  var followsCount = 0;
  var topFollower = "";
  for (var user in nameList) {
    var followed = nameList[user]["follows"].length;
    if (followed > followsCount){
      followsCount = followed;
      topFollower = nameList[user]["name"];
      // console.log(topFollower);
    }
  }
  return topFollower;
}

// Who has the most followers?
function mostFollowers(nameList){
  var numberOfFollows = 0;
  var hasMostFollowers = "";

  for (var userId in nameList){
    if (whoFollowsMe(userId).length > numberOfFollows){
      numberOfFollows = whoFollowsMe(userId).length;
    }
  }

  for (var userId in nameList){
    if (whoFollowsMe(userId).length >= numberOfFollows){
      hasMostFollowers += (nameList[userId]["name"] + " ");
    }
  }
  return hasMostFollowers;
}

function mostFollowers30(nameList){
  var numberOfFollows = 0;
  var hasMostFollowers30 = "";

  for (var userId in nameList){
    if (whoFollowsMe30(userId).length > numberOfFollows){
      numberOfFollows = whoFollowsMe(userId).length;
    }
  }

  for (var userId in nameList){
    if (whoFollowsMe30(userId).length >= numberOfFollows){
      hasMostFollowers30 += (nameList[userId]["name"] + " ");
    }
  }
  return hasMostFollowers30;
}

function oneSided(nameList){
  var noLove = [];
  var counter = 0;
  for (userId in nameList){
    counter = 0;
    for (followId in nameList[userId]["follows"]){
      var userIDf = nameList[userId]["follows"][followId];
      for (userId0 in nameList[userIDf]["follows"]){
        user2followingId = nameList[userIDf]["follows"][userId0];
        if(user2followingId === userId){
          counter += 1;
        }
      }
    }
    if (counter !== (nameList[userId]["follows"].length) ){
      noLove.push(nameList[userId]["name"]);
    }
  }
  return noLove;
}

function reach(nameList){
  var reachCount = {};
  for (userId in nameList){
    var reach = 0;
    reach += whoFollowsMe(userId).length;
    for (userIdfollow in nameList[userId]["follows"]){
      var followsId = nameList[userId]["follows"][userIdfollow];
      reach += whoFollowsMe(followsId).length;
    }
    reachCount[(nameList[userId]["name"])] = {};
    reachCount[(nameList[userId]["name"])]["reach"] = reach;

    // reachCount[(nameList[userId]["name"])] = reach;
  }
  return reachCount;
}

list(data);

/*
[DONE]List everyone and for each of them, list the names of who they follow and who follows them
[DONE[Identify who follows the most people
[DONE]Identify who has the most followers
[DONE]Identify who has the most followers over 30
[DONE]Identify who follows the most people over 30
[DONE]List those who follow someone that doesn't follow them back
[DONE]List everyone and their reach (sum of # of followers and # of followers of followers)
*/