<%
const path = require('path');
const fileUrl = require('file-url');

const worldState = levelState["com.twilioquest.Bias"];
const candidates = worldState.Bias.biasStation.team.datascientist;

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
%>

# Think Critically!

In order to show full understanding of the topic of biases, you must pass the **Bias Simulator challenge**.

You will need to select at least three team members to bring with you on your adventure. Choose wisely, because these team members will need to have good 
chemistry with each other for them to be helpful on your team! 

To help you track your team member selection, Ele has provided you with a status table listing your current team loadout. You can view this table in the terminal in the middle of the room. You'll need to select a team member here, then go back to the main terminal and press "HACK" to run the bias simulator.

## Candidate List 

<br> 

<table style="border:none !important">
    <tr><th colspan=2 style="border:none !important"><h1>(a) No one</h1></th></tr>
    <tr>
        <td colspan=2 style="text-align:center; vertical-align: middle;">
            <strong>Select this option to keep this position on your team vacant.</strong>
        </td>
    </tr>
</table>

<br>

<table style="border:none !important">
    <tr><th colspan=2 style="border:none !important"><h1>(b) <%=candidates["b"]["name"]%></h1></th></tr>
    <tr>
        <td width="20%" style="text-align:center; vertical-align: middle;">
            <img src="<%=getImageUrl('images/objective_images/shield.png') %>" />
            <br>
            <strong style="font-size:16px"><%=candidates["b"]["name"]%></strong>
            <em>Option B</em>
        </td>
        <td>
            <ul>
                <li><strong>Education</strong><br><%=candidates["b"]["education"]%></li>
                <li><strong>Experience</strong><br><%=candidates["b"]["experience"]%></li>
            </ul>
        </td>
    </tr>
</table>


<br>

<table style="border:none !important">
    <tr><th colspan=2 style="border:none !important"><h1>(c) <%=candidates["c"]["name"]%></h1></th></tr>
    <tr>
        <td width="20%" style="text-align:center; vertical-align: middle;">
            <img src="<%=getImageUrl('images/objective_images/shield.png') %>" />
            <br>
            <strong style="font-size:16px"><%=candidates["c"]["name"]%></strong>
            <em>Option C</em>
        </td>
        <td>
            <ul>
                <li><strong>Education</strong><br><%=candidates["c"]["education"]%></li>
                <li><strong>Experience</strong><br><%=candidates["c"]["experience"]%></li>
            </ul>
        </td>
    </tr>
</table>


<br>

<table style="border:none !important">
    <tr><th colspan=2 style="border:none !important"><h1>(d) <%=candidates["d"]["name"]%></h1></th></tr>
    <tr>
        <td width="20%" style="text-align:center; vertical-align: middle;">
            <img src="<%=getImageUrl('images/objective_images/shield.png') %>" />
            <br>
            <strong style="font-size:16px"><%=candidates["d"]["name"]%></strong>
            <em>Option D</em>
        </td>
        <td>
            <ul>
                <li><strong>Education</strong><br><%=candidates["d"]["education"]%></li>
                <li><strong>Experience</strong><br><%=candidates["d"]["experience"]%></li>
            </ul>
        </td>
    </tr>
</table>

<br>

<table style="border:none !important">
    <tr><th colspan=2 style="border:none !important"><h1>(e) <%=candidates["e"]["name"]%></h1></th></tr>
    <tr>
        <td width="20%" style="text-align:center; vertical-align: middle;">
            <img src="<%=getImageUrl('images/objective_images/shield.png') %>" />
            <br>
            <strong style="font-size:16px"><%=candidates["e"]["name"]%></strong>
            <em>Option E</em>
        </td>
        <td>
            <ul>
                <li><strong>Education</strong><br><%=candidates["e"]["education"]%></li>
                <li><strong>Experience</strong><br><%=candidates["e"]["experience"]%></li>
            </ul>
        </td>
    </tr>
</table>

<br>

<table style="border:none !important">
    <tr><th colspan=2 style="border:none !important"><h1>(f) <%=candidates["f"]["name"]%></h1></th></tr>
    <tr>
        <td width="20%" style="text-align:center; vertical-align: middle;">
            <img src="<%=getImageUrl('images/objective_images/shield.png') %>" />
            <br>
            <strong style="font-size:16px"><%=candidates["f"]["name"]%></strong>
            <em>Option F</em>
        </td>
        <td>
            <ul>
                <li><strong>Education</strong><br><%=candidates["f"]["education"]%></li>
                <li><strong>Experience</strong><br><%=candidates["f"]["experience"]%></li>
            </ul>
        </td>
    </tr>
</table>