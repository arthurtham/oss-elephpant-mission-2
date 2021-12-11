<%
const path = require('path');
const fileUrl = require('file-url');

const worldState = levelState["com.twilioquest.Bias"];
const candidates = worldState.Bias.biasStation.team.medicaldoctor;

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

const avatarB = getImageUrl(candidates.b.avatar);
const avatarC = getImageUrl(candidates.c.avatar);
const avatarD = getImageUrl(candidates.d.avatar);
const avatarE = getImageUrl(candidates.e.avatar);
const avatarF = getImageUrl(candidates.f.avatar);

const emojis = {
    "chad" : "",
    "karen" : "👩",
    "imani" : "🧑🏽♿",
    "khai" : "🎖️♿",
    "yodit" : "🌈👩🏾"
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
            <img src=<%=avatarB%> />
            <br>
            <strong style="font-size:16px"><%=candidates["b"]["name"]%></strong>
            <em>Option B</em><br>
            <%=emojis[candidates["b"]["archetype"]]%>
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
            <img src=<%=avatarC%> />
            <br>
            <strong style="font-size:16px"><%=candidates["c"]["name"]%></strong>
            <em>Option C</em><br>
            <%=emojis[candidates["c"]["archetype"]]%>
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
            <img src=<%=avatarD%> />
            <br>
            <strong style="font-size:16px"><%=candidates["d"]["name"]%></strong>
            <em>Option D</em>
            <br>
            <%=emojis[candidates["d"]["archetype"]]%>
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
            <img src=<%=avatarE%> />
            <br>
            <strong style="font-size:16px"><%=candidates["e"]["name"]%></strong>
            <em>Option E</em><br>
            <%=emojis[candidates["e"]["archetype"]]%>
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
            <img src=<%=avatarF%> />
            <br>
            <strong style="font-size:16px"><%=candidates["f"]["name"]%></strong>
            <em>Option F</em><br>
            <%=emojis[candidates["f"]["archetype"]]%>
        </td>
        <td>
            <ul>
                <li><strong>Education</strong><br><%=candidates["f"]["education"]%></li>
                <li><strong>Experience</strong><br><%=candidates["f"]["experience"]%></li>
            </ul>
        </td>
    </tr>
</table>