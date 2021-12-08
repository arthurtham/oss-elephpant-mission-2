<%
const worldState = levelState["com.twilioquest.Bias"];
const candidates = worldState.Bias.biasStation.team.xenobiologist;
%>

# Teammate Select: Xenobiologist

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>Analyze the candidate list and deliberate on which candidate is best for this role.</li>
  <li>Confirm your selection by entering its answer label (a letter) on the right, and press <i>HACK</i>.</li>
</ul>
</div>

You will need to select at least three team members to bring with you on your adventure. Choose wisely, because these team members will need to have good chemistry with each other for them to be helpful on your team! 

At this station, you will select the following team member:

> <h1>Xenobiologist</h1>
> <%=candidates["description"]%>

The following is a candidate list for this position. Choose wisely and confirm your option on the right!

<br>

<table style="border:none !important">

<tr><th style="border:none !important"><h1>Candidate List</h1></th></tr>
<tr><td>
<strong>Select a team member: </strong>
<ol type="a">
<li><b>No one</b><br>Select this option to keep this team position vacant.</li>
<li><b><%=candidates["b"]["name"]%></b><br>
  Education: <%=candidates["b"]["education"]%><br>
  Experience: <%=candidates["b"]["experience"]%></li>
<li><b><%=candidates["c"]["name"]%></b><br>
  Education: <%=candidates["c"]["education"]%><br>
  Experience: <%=candidates["c"]["experience"]%></li>
<li><b><%=candidates["d"]["name"]%></b><br>
  Education: <%=candidates["d"]["education"]%><br>
  Experience: <%=candidates["d"]["experience"]%></li>
<li><b><%=candidates["e"]["name"]%></b><br>
  Education: <%=candidates["e"]["education"]%><br>
  Experience: <%=candidates["e"]["experience"]%></li>
<li><b><%=candidates["f"]["name"]%></b><br>
  Education: <%=candidates["f"]["education"]%><br>
  Experience: <%=candidates["f"]["experience"]%></li>

</ol>
</td></tr>

</table>