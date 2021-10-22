<%
const worldState = levelState["com.twilioquest.CriticalThinking"];
const fallacies = worldState.CriticalThinking.fallacies;
%>

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>Interact with the 5 terminals or chalkboards to learn more about each fallacy.</li>
  <li>Click <em>HACK</em> after hacking 3 fallacy terminals or chalkboards.</li>
</ul>
</div>

In order to pass this gate, you must interact with at least 3 fallacy terminals or chalkboards
and get their questions correctly answered. Come back here and press __HACK__ once you
have enough of those objectives completed!

To help you out, Ele has provided you with a status table:

<style>
.puzzle-grid {

}

.puzzle-grid td {
  width: 33%;
  height:50px;
  text-align:center;
  font-weight:bold;
}
</style>

<table class="puzzle-grid" style="border:none">
<tr><td colspan="3"><h1>Fallacy Station Status</h1></td></tr>
<tr><th colspan="3" style="text-align: center"><%= fallacies.fallacyStationsCompleted %> of 5 Stations Solved</th></tr>
<tr>
  <td style="font-size: 36px; background-color:<%= fallacies.fallacyStation1 ? 'lime' : 'red' %>">1</td>
  <td style="font-size: 36px; background-color:<%= fallacies.fallacyStation2 ? 'lime' : 'red' %>">2</td>
  <td style="font-size: 36px; background-color:<%= fallacies.fallacyStation3 ? 'lime' : 'red' %>">3</td>
<tr>
  <td style="font-size: 36px; background-color:<%= fallacies.fallacyStation4 ? 'lime' : 'red' %>">4</td>
  <td style="font-size: 36px; background-color:<%= fallacies.fallacyStation5 ? 'lime' : 'red' %>">5</td>
  <td style="background-color:gray"></td>
</tr>
<% if (fallacies.canPass) { %>
<tr><td colspan="3" style="background-image: linear-gradient(0deg, rgba(62,214,167,1) 0%, rgba(0,255,59,1) 100%); border: 2px solid black"><h2>YOU CAN PASS! PRESS "HACK" NOW</h2></td></tr>
<% } else { %>
<tr><td colspan="3" style="background-color: pink">YOU CANNOT PASS</td></tr> 
<% } %>
</table>