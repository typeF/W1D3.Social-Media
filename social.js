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

function list(data){
  for (var people in data){
    // console.log(people);
    console.log("Name: " + data[people].name);
    console.log("Follows: " + followNameList(data[people].follows));
    console.log("Followed by: " + whoFollowsMe(people));

  }
}

function followNameList(nameList){
  followList = [];
  for (var i = 0; i < nameList.length; i++){
    nameId = nameList[i];
    person = data[nameId].name;
    followList.push(person);
  }
  return followList;
}

function whoFollowsMe(userName){
  followsMe = [];
  for (var people in data){
    for (var i = 0; i < data[people].follows.length; i++){
      follower = data[people]["follows"][i];
      if (follower === userName){
        console.log("found a match for:" + follower);
        followsMe.push(follower);
      }
    }
  }
  return followsMe;
}

list(data);

/*
List everyone and for each of them, list the names of who they follow and who follows them
Identify who follows the most people
Identify who has the most followers
Identify who has the most followers over 30
Identify who follows the most people over 30
List those who follow someone that doesn't follow them back
List everyone and their reach (sum of # of followers and # of followers of followers)
*/