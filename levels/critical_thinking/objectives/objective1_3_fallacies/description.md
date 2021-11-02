<%
const worldState = levelState["com.twilioquest.CriticalThinking"];
const fallacies = worldState.CriticalThinking.fallacies;
%>

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>Interact with the five fallacy stations to learn more about each fallacy.</li>
  <li>Click <em>HACK</em> after hacking three fallacy stations.</li>
</ul>
</div>

In order to pass this gate, you must interact with at least 3 fallacy stations, shown as chalkboards, and get their questions correctly answered. Come back here and press __HACK__ once you have enough of those objectives completed!

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
<tr><td colspan="5"><h1>Fallacy Station Status</h1></td></tr>
<tr><th colspan="5" style="text-align: center"><%= fallacies.fallacyStationsCompleted %> of 5 Challenges Solved</th></tr>
<tr>
  <td class="<%= fallacies.objective1_3_fallacies_1 ? 'solved-station' : 'unsolved-station' %>">1</td>
  <td class="<%= fallacies.objective1_3_fallacies_2 ? 'solved-station' : 'unsolved-station' %>">2</td>
  <td class="<%= fallacies.objective1_3_fallacies_3 ? 'solved-station' : 'unsolved-station' %>">3</td>
  <td class="<%= fallacies.objective1_3_fallacies_4 ? 'solved-station' : 'unsolved-station' %>">4</td>
  <td class="<%= fallacies.objective1_3_fallacies_5 ? 'solved-station' : 'unsolved-station' %>">5</td>
</tr>
<% if (fallacies.canPass) { %>
<tr><td colspan="5" style="background-image: linear-gradient(0deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%); border: 1px solid black"><h2>HACKABLE: PRESS "HACK" BUTTON </h2></td></tr>
<% } else { %>
<tr><td colspan="5" style="background-color: pink;font-size:18px">LOCKED: 3 GREEN INDICATORS REQUIRED</td></tr> 
<% } %>
</table>