<%
const path = require('path');
const fileUrl = require('file-url');

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

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>View the <a href="https://www.youtube.com/watch?v=B-J9IHGivfQ">video</a> on the Just World Hypothesis. </li>
  <li>Think about the three questions listed below.</li>
  <li>Click <em>HACK</em> to reveal the answer.</li>
</ul>
</div>

Belief systems can also influence our biases, impact the way we interact with others, and how we make decisions. The Just World Hypothesis is one interesting theory prevalent in many societies worthy of a bit more thought and analysis. Let's examine this hypothesis and reflect how it might have impacted our own lives.

![image help text](<%= getImageUrl('images/objective_images/shapes.png') %>)

Watch the video and answer the reflection questions. Using the reflection protocol: triangle, square, and circle. 

- The question for the triangle is, “What three concepts am I taking away from this?” 
- For the square, “What about this squares with my beliefs?” 
- And for the circle, “What questions are still circling my mind?”

https://www.youtube.com/watch?v=B-J9IHGivfQ

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/B-J9IHGivfQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



