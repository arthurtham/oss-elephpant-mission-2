<%
const worldState = levelState["com.twilioquest.Bias"];
const biasStation = worldState.Bias.biasStation;
%>

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>list element</li>
</ul>
</div>

Description

To help you out, Ele has provided you with a status table:

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
  background: rgb(180,58,58);
  background: linear-gradient(90deg, rgba(180,58,58,1) 0%, rgba(253,29,29,1) 39%, rgba(252,78,69,1) 100%);
}

.puzzle-grid td.solved-station {
  border: 1px solid black !important;
  line-neight: 1.0 !important;
  background: rgb(62,214,167);
  background: linear-gradient(90deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%);
}


</style>

<table class="puzzle-grid" style="border:none">
<tr><td colspan="5"><h1>Bias Simulator Team Members</h1></td></tr>
<tr><th colspan="5" style="text-align: center"><%= biasStation.stationsCompleted %> of 5 Team Members Selected</th></tr>
<tr>
  <td class="<%= biasStation.stationFlags.teammate_select_astrophysicist ? 'solved-station' : 'unsolved-station' %>">Astrophysicist<br>Name<br><small>1: Top Left</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_biochemist ? 'solved-station' : 'unsolved-station' %>">Biochemist<br>Name<br><small>2: Middle Left</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_datascientist ? 'solved-station' : 'unsolved-station' %>">Data Scientist<br>Name<br><small>3: Bottom Left</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_medicaldoctor ? 'solved-station' : 'unsolved-station' %>">Medical Doctor<br>Name<br><small>4: Top Right</small></td>
  <td class="<%= biasStation.stationFlags.teammate_select_xenobiologist ? 'solved-station' : 'unsolved-station' %>">Xenobiologist<br>Name<br><small>5: Middle Right</small></td>
</tr>
<% if (biasStation.canPass) { %>
<tr><td colspan="5" style="background-image: linear-gradient(0deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%); border: 1px solid black"><h2>Ready to simulate!</h2></td></tr>
<% } else { %>
<tr><td colspan="5" style="background-color: pink;font-size:18px">LOCKED: 3 TEAM MEMBERS REQUIRED</td></tr> 
<% } %>
</table>

<br />

<table style="border:none !important">

<tr><th style="border:none !important"><h1>Question Block</h1></th></tr>
<tr><td>
<strong>Header </strong>
<ol type="a">
<li>Description</li>

</ol>
</td></tr>

</table>