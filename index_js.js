// const fetch = require('node-fetch');

async function getUserAsync(name) {
//   let response = await fetch(`https://codeforces.com/api/user.info?handles=${name}`);
  let response = await fetch(`https://codeforces.com/api/user.status?handle=${name}&from=1&count=10`);
  let data = await response.json()
  return data;
}
var participant_1 = 'samuraisam01';
var participant_2 = 'rdps20'
var data_participant = new Object();
data_participant[participant_1] = [-1, '#'];
data_participant[participant_2] = [-1, '#'];

var goalContestId = 1494;
var goalProblemIndex = 'C';
function periodic(participant) {
    getUserAsync(participant).then(function (data) {
        var contestId = data['result'][0].contestId;
        var problemIndex = data['result'][0]['problem']['index'];
        data_participant[participant] = [contestId, problemIndex];
        // console.log(data[participant]);
    });
}
var intervalId = setInterval(function(){
    periodic(participant_1);
    periodic(participant_2);
    if(data_participant[participant_1][0] != -1 && data_participant[participant_2][0] != -1) {
        if(data_participant[participant_1][0] == goalContestId && data_participant[participant_1][1] == goalProblemIndex) {
            console.log(participant_1 + " won!");
            clearInterval(intervalId);
        }
        if(data_participant[participant_2][0] == goalContestId && data_participant[participant_2][1] == goalProblemIndex) {
            console.log(participant_2 + " won!");
            clearInterval(intervalId);
        }
    }
}, 2000);
// periodic();