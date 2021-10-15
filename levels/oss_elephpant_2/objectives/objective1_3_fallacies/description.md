<%
const worldState = levelState["com.twilioquest.osselephpant2"];
const fallacies = worldState.ossElephpant2.fallacies;
%>

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>Go to each terminal and learn more about each gate.</li>
  <li>Click <em>HACK</em> to reveal the answer.</li>
</ul>
</div>

Total: <%= fallacies.fallacyStationsCompleted %>

Fallacy 1: <%= fallacies.fallacyStation1 %>

Fallacy 2: <%= fallacies.fallacyStation2 %>

Fallacy 3: <%= fallacies.fallacyStation3 %>

Fallacy 4: <%= fallacies.fallacyStation4 %>

Fallacy 5: <%= fallacies.fallacyStation5 %>

Can Pass: <%= fallacies.canPass %>