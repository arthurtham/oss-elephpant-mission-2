const { remove } = require("ramda");

const { processConversationEvents, setupConversation } = require("./events/conversations");

const levelJson = require("./level.json");

const { viewpointEvent } = require("./events/viewpointcutscenes");

const updateQuestLogWhenComplete = require("./events/updateQuestLogWhenComplete");

const { greenTileHelper } = require("./events/greenTileHelper");

const stationsCompletedTracker = require("./events/stationsCompletedTracker")


const packageInfo = require("../../package.json");

const DEFAULT_MISSION_STATE = {
  Bias: {
    conversations: {
      ele: {
        current: 'none',
        all: false,
        objective2_1_definebias_pre: {
          current: 'none',
          complete: false
        },
        objective2_2_unconsciousbiaspractice_pre: {
          current: 'none',
          complete: false
        },
        objective2_5_deepmaze_post: {
          current: 'none',
          complete: false
        },
        turtle_facts: {
          current: 'none',
          complete: false
        },
      },
      professor: {
        objective1_2_professor: false,
      }
    },
    photos: {
    },
    deepMaze: {
      stationsCompleted: 0,
      stationFlags : {
        objective2_5_deepmaze_1: false,
        objective2_5_deepmaze_2: false,
        objective2_5_deepmaze_3: false,
        objective2_5_deepmaze_4: false,
        objective2_5_deepmaze_5: false
      },
      canPass: false
    },
    biasStation: {
      stationsCompleted: 0,
      stationFlags : {
        teammate_select_astrophysicist: false,
        teammate_select_biochemist: false,
        teammate_select_datascientist: false,
        teammate_select_medicaldoctor: false,
        teammate_select_xenobiologist: false
      },
      team : {
        astrophysicist: {
          description: "Your team's astrophysicist will be responsible for keeping watch on your investigation satellites' navigation AI and sensor arrays to make adjustments as necessary to trajectories and anticipated physical events.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None",
            avatar: "images/objective_images/shield.png"
          },
          b: {
            archetype: "chad",
            name: "Jeremy",
            education: "Graduated with their masters from a private university with a strong Astrophysics program including a state of the art observatory endowed by their father and bearing their family name.",
            experience: "was awarded a highly competitive position in one of only three research teams within their focus field with access to orbital telescopes and has been cited as a contributor in multiple resulting publications.",
            avatar: "images/objective_images/shield.png"
          },
          c: {
            archetype: "karen",
            name: "Claudia",
            education: "Attended an Ivy League university for their undergraduate work before transferring as an international student to a private university with an Astrophysics program consistently rated in the top 5 globally.",
            experience: "Since graduating, continued to travel internationally as a speaker and guest lecturer at prestigious universities across Europe.",
            avatar: "images/objective_images/shield.png"
          },
          d: {
            archetype: "karen",
            name: "Sharon",
            education: "Early acceptance and graduation with a PhD from a prominent public university with a strong Astrophysics program through which they became a published researcher while still in their early 20s.",
            experience: "After graduating six years ago they were recruited as a subject matter expert and reviewer at a leading journal of scientific publishing and has been cited as a contributor in multiple issues.",
            avatar: "images/objective_images/shield.png"
          },
          e: {
            archetype: "khai",
            name: "Jerome",
            education: "Completed a Masters in Astrophysics at a local public university on an academic scholarship, and a PhD via a remote learning program at an international university in partnership with a regional observatory.",
            experience: "Created a significant upgrade to a popular open source software package for analyzing long range telescope images, and was recruited by a well funded tech startup and worked on their experimental deep space imaging equipment on a foreign worker visa.",
            avatar: "images/objective_images/shield.png"
          },
          f: {
            archetype: "yodit",
            name: "Becky",
            education: "Completed their undergraduate degree through a teacher recruiting program, and their Master in Astrophysics through a remote university program while fulfilling the five year commitment teaching math in secondary schools.",
            experience: "Provided remote analysis support to research projects with access to functional observatories. Recruited and relocated to work onsite at an observatory after several years of notable published contributions.",
            avatar: "images/objective_images/shield.png"
          }
        },
        biochemist: {
          description: "Your team's biochemist will be responsible for monitoring and maintaining the biochemical support systems in any artificial or augmented habitats utilized during transport, monitoring, or terraforming processes for the ecologies relied on by your team and potential future colonists.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None",
            avatar: "images/objective_images/shield.png"
          },
          b: {
            archetype: "imani",
            name: "Sydette",
            education: "Graduated with her BS in Biochemistry from a state university having obtained multiple scholarship awards through local and regional science competitions. recruited into a graduate program by a well respected research professor and worked through her MS and PhD over ten years by working as a teaching fellow, lab tech, and research assistant.",
            experience: "Hired by an international pharmaceutical company to work on a small cutting edge research team building on past experimental programs she assisted with during her studies.",
            avatar: "images/objective_images/shield.png"
          },
          c: {
            archetype: "karen",
            name: "Katie",
            education: "Graduated with a BS in Chemistry from a popular state school, and took a gap year focusing on scuba diving in Hawaii before completing her MS in Biochemistry from a university with a globally well regarded program.",
            experience: "Unavailable",
            avatar: "images/objective_images/shield.png"
          },
          d: {
            archetype: "karen",
            name: "Stephanie",
            education: "Graduated with a BS in Biophysics and an MS in Biochemistry from a prestigious private school as a third generation legacy student.",
            experience: "Unavailable",
            avatar: "images/objective_images/shield.png"
          },
          e: {
            archetype: "karen",
            name: "Claire",
            education: "Went straight through her undergraduate, MS, and PhD in Biochemistry at a top 10 school",
            experience: "Recruited into a well funded bioscience startup researching DNA therapies for anti-aging treatments. Promoted to leading her own team after three years and a division of teams after five years.",
            avatar: "images/objective_images/shield.png"
          },
          f: {
            archetype: "chad",
            name: "Brandon",
            education: "Graduated with a BS in Microbiology from an Ivy League university, and their MS in Biochemistry at a university consistently ranked top 10 in the world.",
            experience: "He returned to his undergraduate alma mater to join a widely respected research group where he was included in team publications for the three years preceding his enrollment in the colonization effort.",
            avatar: "images/objective_images/shield.png"
          }
        },
        datascientist: {
          description: "Your team's data scientist will be responsible for using programming and analysis to turn a combination of input from records, sensors, and the other team experts into actionable data in the form of maps and system models.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None",
            avatar: "images/objective_images/shield.png"
          },
          b: {
            archetype: "chad",
            name: "Kyle",
            education: "Graduated with a Masters from an Ivy League university.",
            experience: "Founded his own data analysis company with a couple of his university friends. Company tripled in size in a little over a year and was bought out by a big tech company. Kyle is still the director of this division under new ownership",
            avatar: "images/objective_images/shield.png"
          },
          c: {
            archetype: "khai",
            name: "Chee",
            education: "Initially graduated with an Education degree from a small college in the rural region of the economically challenged country in which they were born. Later received a grant from an international non profit to study Data Science via a new distance learning program pioneered by a well known university. They completed their Data Science degree while teaching locally.",
            experience: "In the three years since graduation they've been employed by their local government to analyze their public education system, advise on achievable changes, and provide teacher training on data driven curriculum development. They've received numerous awards for improvements to student outcomes in that time.",
            avatar: "images/objective_images/shield.png"
          },
          d: {
            archetype: "chad",
            name: "Chet",
            education: "Graduated from a private university with a strong Data Science program, receiving highly competitive unpaid internship positions during the summers preceding their Junior and Senior years.",
            experience: "Was hired on full time at the company where he completed his unpaid internships. Has been promoted repeatedly during their five year tenure, and given several technical talks at big name industry conferences.",
            avatar: "images/objective_images/shield.png"
          },
          e: {
            archetype: "chad",
            name: "Lance",
            education: "Early acceptance and graduation from a university with a strong Data Science program through which they became a published researcher while still in their early 20s.",
            experience: "Recruited into a well funded startup after graduation which had a successful IPO three years later. They've remained at the company as the paid maintainer of an open source software package they helped create for the company.",
            avatar: "images/objective_images/shield.png"
          },
          f: {
            archetype: "karen",
            name: "Debra",
            education: "Graduated from a university with a top 5 Data Science program, and recruited into a prestigious research project being led by a world renowned professor of data science for their graduate work. They have already been cited in multiple publications relating to this research and are about to graduate with their PhD.",
            experience: "Outside of their university experience, they have also been a paid speaker at numerous academic conferences.",
            avatar: "images/objective_images/shield.png"
          }
        },
        medicaldoctor: {
          description: "Your team's medical doctor will be responsible for monitoring the wellbeing of your team, intervening as necessary, and providing input on the suitability of potential situations and environments to the nurturance of humans across variable timescales and taking into account anticipated changes.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None",
            avatar: "images/objective_images/shield.png"
          },
          b: {
            archetype: "chad",
            name: "Craig",
            education: "Received his MS and MD from the top rated medical program in the region and served as the VP for the Student Medical Association chapter.",
            experience: "Performed internship and residency at a well equipped private hospital in the same region before accepting a position as a Physician specializing in internal medicine at an exclusive private clinic where they increased referrals by 17% through networking with other physicians and medical executives in the area.",
            avatar: "images/objective_images/shield.png"
          },
          c: {
            archetype: "chad",
            name: "David",
            education: "Graduated from an Ivy League university for his BS in Biology and his MD and served as the social chair for a prestigious student club.",
            experience: "Assistant professor in diagnostic and interventional radiology while maintaining an active Medical License and multiple certifications.",
            avatar: "images/objective_images/shield.png"
          },
          d: {
            archetype: "karen",
            name: "Elaine",
            education: "Graduated from a well known private university with a BS in Biology and Psychology. While pursuing her MD, with a focus on Microsurgery, she conducted experiments pertaining to reconstructive surgery and developed research data which led to improved surgical techniques.",
            experience: "Performed an internship and residency at a well respected teaching hospital before being recruited as a researcher for a private med-tech company where she oversaw a small team of medical interns and a large team of lab technicians developing cancer treatments.",
            avatar: "images/objective_images/shield.png"
          },
          e: {
            archetype: "yodit",
            name: "Yodit",
            education: "Obtained an MD from the top medical school in their country and, after relocating to a more economically prosperous and technologically advanced country, a second MD from a public university on a partial scholarship.",
            experience: "Before their relocation they were a physician in a regional hospital for three years. During their second MD studies they worked as a physician's assistant at the hospital associated with their university. After completing their internship and residency, they spent a year with Doctors without Borders before joining a private family practice clinic in a small town on the border with a large refugee community.",
            avatar: "images/objective_images/shield.png"
          },
          f: {
            archetype: "karen",
            name: "Ashley",
            education: "Graduated Magna Cum Laude with a BS in Biology and Cum Laude with their MD, with a focus on Sport Medicine, from the top public university in her region",
            experience: "Recruited after residency to serve as the on staff Sport Medicine Doctor overseeing the health, fitness, injury treatment, and recovery of student athletes across the extensive sporting programs of a top 10 regional school.",
            avatar: "images/objective_images/shield.png"
          }
        },
        xenobiologist: {
          description: "Your team's xenobiologist will be responsible for detecting, analyzing, and providing input on both any existing life detected during investigations as well as informing system models relating to adapting potential planets' environmental systems to the ecologies necessary to support human settlement.",
          selected : "a",
          a: {
            archetype: "No one",
            name: "No one",
            education: "None",
            experience: "None",
            avatar: "images/objective_images/shield.png"
          },
          b: {
            archetype: "imani",
            name: "Shea",
            education: "Graduated from a state university with an average Xenobiology program before transferring to another public school with better Xenobiology research opportunities where they completed their Masters on a merit scholarship.",
            experience: "Worked their way through college doing project management for a tech company until they started their masters program. Here they landed an internship with well known professionals in their field during university training. Recruited into a small private research institution after graduation which has since developed a positive reputation for the quality of research, including several publications on which they're a cited contributor.",
            avatar: "images/objective_images/shield.png"
          },
          c: {
            archetype: "karen",
            name: "Janet",
            education: "Graduated from top tier universities with strong Xenobiology programs where they obtained a PhD and assisted in multiple research projects resulting in publications as a contributor.",
            experience: "Janet went on to publish her own book and is now on staff at the university as a professor who continues to conduct research.",
            avatar: "images/objective_images/shield.png"
          },
          d: {
            archetype: "karen",
            name: "Courtney",
            education: "Early acceptance and graduation with a Masters from an Ivy League university with a strong Xenobiology program through which they became a published researcher while still in their early 20s.",
            experience: "She was quickly recruited by a large DNA commercial corporation. She now leads a team of biologists in maximizing the output and retention of DNA data as a business model to attract more customers.",
            avatar: "images/objective_images/shield.png"
          },
          e: {
            archetype: "chad",
            name: "Doug",
            education: "Graduated from a university with a Xenobiology program rated among the top 5 in the world.",
            experience: "Spent many summers attending camps at NASA as his father is a well known Physicist there. After his internship at NASA, he was offered a full time position and has been there for 4 years now.",
            avatar: "images/objective_images/shield.png"
          },
          f: {
            archetype: "chad",
            name: "Steve",
            education: "Graduated from an Ivy League university with a strong Xenobiology program.",
            experience: "Summer internships with well known professionals in their field during university training. Recruited into a private research institution funded by a multi-billion dollar pharmaceutical company immediately after graduation. Included as a contributor to a regular cadence of research publications. Fast tracked to leading their own research team after only five years.",
            avatar: "images/objective_images/shield.png"
          }
        }
      },
      canPass: false
    },
    missionComplete: {
      complete: false,
      dialogueCompleted:false,
      teleport: false
    },
    objective: {
      hasEnoughTimePassed: false,
      current: "none"
    }
  }
}

module.exports = function(event, world) {
  console.log(`Bias: ${event.name}`);
  console.log(event);

  //DEBUG: Disable cache
  window.reloadExternalModules = true;

  let worldState = world.getState("com.twilioquest.Bias") || DEFAULT_MISSION_STATE;

  if (event.name === 'levelDidLoad') {
    console.log("levelDidLoad: resetting default state for debugging");
    worldState = DEFAULT_MISSION_STATE;
    //DEBUG: Reset all objectives
    console.log("Reset completed objectives:");
    levelJson.objectives.forEach (objective => {
      if (world.isObjectiveCompleted(objective)) {
        console.log(objective);
        world.removeObjective("bias", objective);
      }
    })
  }

  //const worldState = DEFAULT_MISSION_STATE;
  console.log("World State");
  console.log(worldState);


  //Interactable terminal
  /*if (
    event.name === 'playerDidInteract' &&
    event.target &&
    event.target.key === 'ele_terminal'
  ) {
    world.startConversation('ele', 'cedricNeutral.png');
  }*/


  // Some missions trigger after effects
  if (event.name === 'objectiveCompleted' || event.name === 'objectiveCompletedAgain') {
    // Some missions complete open or close conversation options even if they don't trigger new ones
    const preObjectiveConversations = ["", "", ""];
    if (preObjectiveConversations.includes(event.objective)) {
      let pre = event.objective + "_pre";
      worldState['Bias']['conversations']['ele'][pre]['current'] = "none";
      worldState['Bias']['conversations']['ele'][pre]['complete'] = true;
      worldState.Bias.conversations.ele.current = "none";
    }
    // Some missions can be completed and prompt a conversational dialogue from Ele.
    const postObjectiveConversations = ["", "", ""];
    if (postObjectiveConversations.includes(event.objective)) {
      let chat = event.objective + "_post";
      let post = 'ele_' + chat;
      setupConversation(world, worldState, post);
      worldState['Bias']['conversations']['ele'][chat]['current'] = "none";
      worldState['Bias']['conversations']['ele'][chat]['complete'] = true;
      worldState.Bias.conversations.ele.current = "none";
    }

    // Deep maze missions are tracked as their own category
    if (event.objective.indexOf("objective2_5_deepmaze_") >= 0) {
      console.log("Deep Maze");
      let deepMaze = worldState.Bias.deepMaze;
      deepMaze.stationFlags[event.objective] = true;
      worldState.Bias.deepMaze = stationsCompletedTracker(deepMaze, 4);
    }

    // Bias simulator team select mission stuff
    if (event.objective.indexOf("teammate_select_") >= 0) {
      console.log("Bias Simulator");
      let biasStation = worldState.Bias.biasStation;
      worldState.Bias.biasStation = stationsCompletedTracker(biasStation, 3);
    }

    // If the main bias simulator terminal is complete, set a flag
    if (event.objective.indexOf("objective_simulator") >= 0) {
      worldState.Bias.missionComplete.complete = true;
    }
  }

  // If the main bias simulator terminal is complete and a dialogue
  // with Cedric is complete, teleport out.
  if (event.name === "conversationDidEnd" && 
      event.npc.conversation === "cedric_simulator_pre") {
      //console.log("Check if we should teleport out");
      if (worldState.Bias.missionComplete.complete &&
        worldState.Bias.missionComplete.teleport) {
          worldState.Bias.missionComplete.teleport = false;
          world.warp("critical_thinking", "player_entry1", "default");
      }
  }

  // Green tile indicator
  greenTileHelper(world, worldState, event);

  // Green tile sorter
  if (
    event.name === "mapDidLoad" &&
    event.mapName === "cryo"
  ) {
    world.forEachEntities(entity => {
      if (!entity.instance || !entity.instance.key) { 
        return false;
      } else {
        return (
          entity.instance.key.indexOf("deepmaze_green") >= 0 ||
          entity.instance.key.indexOf("bias_pipe") >= 0
        );
      }
    }, instance => {
      //console.log("Found: ");
      //console.log(instance);
      instance.sprite.body.height = 0;
    })
  }

  // Some areas trigger Ele to say something
  if (
    event.name === 'triggerAreaWasEntered' &&
    event.target.name === 'eleDialogTrigger'
  ) {
    processConversationEvents(event, world, worldState, event.target.key);
    console.log("processConversationEvents completed");
  }

  // Viewpoint Cutscenes
  viewpointEvent(world, worldState, event);

  // Deep Maze: Timer events (objective must be open for long enough)
  // Open: track which one is opened and schedule a timer
  if (
    (event.name === "objectiveDidOpen") //&&
    //(event.target.objectiveName.indexOf("objective2_5_deepmaze_") >= 0)
  ) {
    worldState.Bias.objective.hasEnoughTimePassed = false;
    worldState.Bias.objective.current = event.target.objectiveName;
    world.scheduleTimerEvent(payload = {type: "objectiveTimer", objectiveName: event.target.objectiveName}, timeout = 1 * 1000);
    console.log("SCHEDULE TIMER");
  }
  // If the objective is closed, tell world state the objective isn't open anymore
  if (
    (event.name === "objectiveDidClose")
  ) {
    worldState.Bias.objective.current = "none";
    worldState.Bias.objective.hasEnoughTimePassed = false;
  }
  // Timer: track if the objective has been opened long enough
  if (
    event.name === "timerDidTrigger" &&
    event.type === "objectiveTimer"
  ) {
    if (event.objectiveName === worldState.Bias.objective.current) {
      worldState.Bias.objective.hasEnoughTimePassed = true;
      console.log("TIMER SUCCESS");
    } else {
      console.log("TIMER FAIL (objective name diff)");
    }
  }


  // If the bias simulator objective is closed and completed, trigger dialogue from Ele
  if (
    event.name === "objectiveDidClose" &&
    event.target.objectiveName === "objective_simulator" &&
    world.isObjectiveCompleted("objective_simulator") &&
    !worldState.Bias.missionComplete.dialogueCompleted
  ) {
    worldState.Bias.conversations.ele.current = "none";
    worldState.Bias.missionComplete.dialogueCompleted = true;
    var chat = "cedric_simulator_post";
    world.startConversation(chat, "cedricHappy.png");
  }

  // Get all textareas and wrap them around
  if (
    event.name === "objectiveDidOpen"
  ) {
    document.querySelectorAll("textarea").forEach( element => {
      element.style.whiteSpace = "normal";
    })
  }

  

  // Update Quest Log When Complete
  updateQuestLogWhenComplete({
    notification:
      'Yeah! I\'ve completed everything in the <span class="highlight">Bias challenge</span>!',
    log: "I've completed everything in the Bias challenge!",
    event,
    world,
    worldStateKey: "com.twilioquest.Bias",
    version: packageInfo.version,
  });

  // Save state
  world.setState("com.twilioquest.Bias", worldState);
}
