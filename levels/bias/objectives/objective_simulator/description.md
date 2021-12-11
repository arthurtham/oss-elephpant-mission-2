<%
const path = require('path');
const fileUrl = require('file-url');

const worldState = levelState["com.twilioquest.Bias"];
const biasStation = worldState.Bias.biasStation;

function getImageUrl(extRelativePath) {
  try {
    const imagePath = path.join(
      context.extensions.directory,
      'oss-elephpant-mission-2',
      extRelativePath
    );
    return fileUrl(imagePath)
  } catch (e) {
    console.log('embedded image path not found:', path);
    console.log(e);
    // A default image that exists in the app bundle
    return 'images/app/shield.png'; 
  }
}

const avatarAstrophysicist =  getImageUrl(biasStation["team"]["astrophysicist"][biasStation["team"]["astrophysicist"].selected]["avatar"]);
const avatarBiochemist =      getImageUrl(biasStation["team"]["biochemist"][biasStation["team"]["biochemist"].selected]["avatar"]);
const avatarDatascientist =   getImageUrl(biasStation["team"]["datascientist"][biasStation["team"]["datascientist"].selected]["avatar"]);
const avatarMedicaldoctor =   getImageUrl(biasStation["team"]["medicaldoctor"][biasStation["team"]["medicaldoctor"].selected]["avatar"]);
const avatarXenobiologist =   getImageUrl(biasStation["team"]["xenobiologist"][biasStation["team"]["xenobiologist"].selected]["avatar"]);

%>

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>Select your <strong>team members</strong> that you would like to bring on your adventure by 
  going to each individual <strong>team selection station</strong>.</li>
  <li>Confirm your team members on this screen.</li>
  <li>Press <i>HACK</i> to start your adventure with your supportive team.</li>
</ul>
</div>

In order to show full understanding of the topic of biases, you must pass the **Bias Simulator challenge**.

You will need to select at least three team members to bring with you on your adventure. Choose wisely, because these team members will need to have good 
chemistry with each other for them to be helpful on your team! 

To help you track your team member selection, Ele has provided you with a status table listing your current team loadout. When you're ready to start the adventure simulation, press the __HACK__ button!

<style>
.puzzle-grid {

}

.puzzle-grid td {
  width: 20%;
  height:50px;
  text-align:center;
  font-weight:bold;
}

.puzzle-grid td.unsolved-station {
  border: 1px solid black !important;
  line-neight: 1.0 !important;
  background: rgb(128,128,128);
}

.puzzle-grid td.solved-station {
  border: 1px solid black !important;
  line-neight: 1.0 !important;
  background: rgb(62,214,167);
  background: linear-gradient(90deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%);
}


</style>

<table class="puzzle-grid" style="border:none">
<tr><td colspan="5"><h1>Bias Simulator</h1></td></tr>
<tr><th colspan="5" style="text-align: center"><%= biasStation.stationsCompleted %> Team Members Selected</th></tr>
<tr>
  <td class="<%= biasStation.stationFlags.teammate_select_astrophysicist ? 'solved-station' : 'unsolved-station' %>"><img src=<%=avatarAstrophysicist %> style="width:100px;height:100px;background-color:white"><br>Astrophysicist<br><%=biasStation["team"]["astrophysicist"][biasStation["team"]["astrophysicist"].selected]["name"] %><br><small>Top Left</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_biochemist ? 'solved-station' : 'unsolved-station' %>"><img src=<%=avatarAstrophysicist %> style="width:100px;height:100px;background-color:white">Biochemist<br><%=biasStation["team"]["biochemist"][biasStation["team"]["biochemist"].selected]["name"] %><br><small>Middle Left</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_datascientist ? 'solved-station' : 'unsolved-station' %>"><img src=<%=avatarDatascientist %> style="width:100px;height:100px;background-color:white">Data Scientist<br><%=biasStation["team"]["datascientist"][biasStation["team"]["datascientist"].selected]["name"] %><br><small>Bottom Left</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_medicaldoctor ? 'solved-station' : 'unsolved-station' %>"><img src=<%=avatarMedicaldoctor %> style="width:100px;height:100px;background-color:white">Medical Doctor<br><%=biasStation["team"]["medicaldoctor"][biasStation["team"]["medicaldoctor"].selected]["name"] %><br><small>Top Right</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_xenobiologist ? 'solved-station' : 'unsolved-station' %>"><img src=<%=avatarXenobiologist %> style="width:100px;height:100px;background-color:white">Xenobiologist<br><%=biasStation["team"]["xenobiologist"][biasStation["team"]["xenobiologist"].selected]["name"] %><br><small>Middle Right</small></td>
</tr>
<% if (biasStation.canPass) { %>
<tr><td colspan="5" style="background-image: linear-gradient(0deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%); border: 1px solid black"><h2>Ready to simulate!</h2></td></tr>
<% } else { %>
<tr><td colspan="5" style="background-color: pink;font-size:18px">LOCKED: 3 TEAM MEMBERS REQUIRED</td></tr> 
<% } %>
</table>
