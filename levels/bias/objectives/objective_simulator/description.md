<%
const worldState = levelState["com.twilioquest.Bias"];
const deepMaze = worldState.Bias.deepMaze;
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
  font-size: 36px !important;
  background: rgb(180,58,58);
  background: linear-gradient(90deg, rgba(180,58,58,1) 0%, rgba(253,29,29,1) 39%, rgba(252,78,69,1) 100%);
}

.puzzle-grid td.solved-station {
  border: 1px solid black !important;
  font-size: 36px !important;
  background: rgb(62,214,167);
  background: linear-gradient(90deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%);
}


</style>

<table class="puzzle-grid" style="border:none">
<tr><td colspan="5"><h1>Bias Simulator Team Members</h1></td></tr>
<tr><th colspan="5" style="text-align: center"># of 5 Team Members Selected</th></tr>
<tr>
  <td class="<%= deepMaze.objective2_5_deepmaze_1 ? 'solved-station' : 'unsolved-station' %>">Team member 1</td>
  <td>Team member 2</td>
  <td>Team member 3</td>
  <td>Team member 4</td>
  <td>Team member 5</td>
</tr>
<% if (true) { %>
<tr><td colspan="5" style="background-image: linear-gradient(0deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%); border: 1px solid black"><h2>Team is ready to be deployed!</h2></td></tr>
<% } else { %>
<tr><td colspan="5" style="background-color: pink;font-size:18px">Team is not full!</td></tr> 
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