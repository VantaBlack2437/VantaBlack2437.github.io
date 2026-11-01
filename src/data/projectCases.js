import racerFinal from "../../Screenshots+recordings/Racer/Final.mp4?url";
import racerGameDemo from "../../Screenshots+recordings/Racer/Game_Demo.mp4?url";
import racerTrackOne from "../../Screenshots+recordings/Racer/Track_1_model_demo.mp4?url";
import racerTrackTwo from "../../Screenshots+recordings/Racer/Track_2.mp4?url";

export const projectCases = [
  {
    id: "ml-racing-ai",
    number: "01",
    title: "ML Racing AI",
    subtitle: "Vanta Racer",
    category: "REINFORCEMENT LEARNING / GAME AI",
    summary: "I found an old Pygame racing game and decided to see if I could teach the car to drive it. The game grew into a reinforcement-learning project about sensing, rewards, and all the ways an agent can go wrong.",
    status: "Training experiment",
    stack: ["Python", "Pygame", "PPO"],
    visual: "racing",
    label: "AGENT / TRACK / FEEDBACK",
    video: racerFinal,
    poster: "/screenshots/vanta-racer/final.jpg",
    videoCaption: "The final Vanta Racer run, with the track, checkpoints, and policy visualizations on screen.",
    videoGallery: [
      {
        src: racerGameDemo,
        poster: "/screenshots/vanta-racer/game-demo.jpg",
        title: "The original game",
        caption: "This is me driving the early game with the keyboard. It is a controls demo, not an AI run."
      },
      {
        src: racerTrackOne,
        poster: "/screenshots/vanta-racer/track-one.jpg",
        title: "First track / PPO",
        caption: "After switching to PPO, the agent started completing the original circuit more consistently."
      },
      {
        src: racerTrackTwo,
        poster: "/screenshots/vanta-racer/track-two.jpg",
        title: "A harder track",
        caption: "A new circuit gave the trained agent another layout to learn."
      }
    ],
    sections: [
      {
        kicker: "WHERE IT STARTED",
        title: "An old Pygame project, with a new question.",
        paragraphs: [
          "Vanta Racer began with an old game I had made while learning Pygame. It already had a looping circuit, a car, WASD or arrow-key steering, and Space for the handbrake. I wanted to turn it into another way to learn something new: could I train the car to drive the circuit on its own?",
          "Before adding the AI, I made the game easier to observe and evaluate. I added collision detection, so the car turns red when it hits a wall, and checkpoints around the track so a run had smaller goals than simply finishing a lap."
        ]
      },
      {
        kicker: "WHAT THE CAR CAN SEE",
        title: "Six rays, a wall, and a reward signal.",
        paragraphs: [
          "For the agent's view of the track, I added six raycast sensors shooting out from the car in different directions. Each ray measures how far it travels before it meets a wall. That gives the model a rough sense of the space around the car instead of asking it to interpret the whole screen.",
          "Passing a checkpoint gives a reward, and finishing a lap gives a larger one. Hitting a wall ends the episode and gives a negative reward. The car's inputs, the checkpoints, and the collision rules all became part of what I could adjust when the behavior did not make sense."
        ],
        flow: ["Six raycast sensors", "Choose a control", "Move through the track", "Checkpoint or collision"]
      },
      {
        kicker: "FIRST TRAINING RUNS",
        title: "DQN could finish a lap. It could not repeat it.",
        paragraphs: [
          "I started with a deep Q-learning model. The early behavior was rough: the car spun in place, got stuck near the start, or missed checkpoints. After a lot of training it completed one lap, but could not manage another consistently. One lap was not enough, so I switched the approach to PPO.",
          "That change helped. At around one million training steps, the agent was completing the first track much more consistently. I then gave it a harder track and let it train overnight. During later testing it seemed to crash after lap four; after another overnight training session, that problem seemed to go away."
        ]
      },
      {
        kicker: "WHAT I ADDED NEXT",
        title: "Make the learning visible, not just the car.",
        paragraphs: [
          "I added visualizations for the model's inputs and neural network so I could see more of what was happening during a run. The recordings above show the original manual demo, the first trained track, the second track, and the later result.",
          "I learned that the training loop is only one part of the project. The observations, track, checkpoints, and reward all shape what the car can learn. I still want to compare runs more systematically, but Vanta Racer has already made those decisions much more concrete."
        ]
      }
    ]
  },
  {
    id: "kisan-tomodachi",
    number: "02",
    title: "Kisan-Tomodachi",
    category: "EMBEDDED SYSTEMS / AGRITECH / HACKATHON",
    summary: "We built Kisan-Tomodachi during a 12-hour hackathon: an Arduino sensor setup, a web app, and experiments with weather, local AI, and voice interaction, all aimed at making farm information easier to use.",
    status: "12-hour hackathon build",
    stack: ["Arduino UNO R4", "Python", "FastAPI", "Uvicorn", "PySerial", "React", "Vite", "Open-Meteo", "KoboldCpp", "Qwen3-4B", "IndicConformer"],
    visual: "kisan",
    label: "FIELD OVERVIEW / SOIL STATUS",
    image: "/screenshots/comfortable.png",
    imageAlt: "Kisan-Tomodachi dashboard showing a comfortable soil moisture status",
    gallery: [
      { src: "/screenshots/dry.png", alt: "Kisan-Tomodachi dashboard showing a dry-soil warning", caption: "A dry-soil state" },
      { src: "/screenshots/weather.png", alt: "Kisan-Tomodachi weather screen", caption: "Weather overview" },
      { src: "/screenshots/settings.png", alt: "Kisan-Tomodachi language and theme settings screen", caption: "Language and display settings concept" }
    ],
    repository: "https://github.com/VantaBlack2437/Kisan-Tomodachi",
    repositoryLabel: "Kisan-Tomodachi repository",
    sections: [
      {
        kicker: "WHERE IT STARTED",
        title: "A farmer's friend, built in twelve hours.",
        paragraphs: [
          "Our team got accepted into the India–Japan Innovation Regional Hackathon 2026, part of TechSurge HackIndia at MLRITM. We wanted to build something that could be useful to farmers, bringing IoT, software, and AI together. We called it Kisan-Tomodachi, roughly \"Farmer's Friend.\"",
          "We began with an Arduino UNO R4, a soil-moisture sensor, and a DHT11 for temperature and humidity. The board kept reading the sensors and sending their values over serial to a Python backend. We also connected an LCD for the readings, an RGB LED for a quick field-status signal, and a buzzer for alerts."
        ]
      },
      {
        kicker: "THE BACKEND",
        title: "Getting readings from the board into the app.",
        paragraphs: [
          "I worked on the backend in Python with FastAPI and PySerial. It reads the Arduino's serial output and exposes the latest sensor values through an API, so the frontend can request them instead of talking directly to the board.",
          "Not everything ran on one machine. We split the frontend, backend, and AI services across multiple systems and had them communicate over the local network. Getting those pieces to find each other and stay responsive became a project of its own."
        ],
        flow: ["Soil + DHT11", "Arduino UNO R4", "USB serial", "FastAPI + PySerial", "React frontend"]
      },
      {
        kicker: "THE INTERFACE",
        title: "Big controls, less dashboard noise.",
        paragraphs: [
          "The frontend was built with React and Vite. We kept it touch-friendly, with large controls and a straightforward layout instead of filling the screen with graphs and technical details. The goal was to help someone understand the field condition without needing to interpret raw readings first.",
          "We also started bringing in weather data from Open-Meteo so the system could consider more than the sensors alone. English, Telugu, Hindi, and Japanese were part of the multilingual design; that does not mean every language was fully wired through the finished app."
        ]
      },
      {
        kicker: "THE EXPERIMENTS",
        title: "More context, and another way to ask.",
        paragraphs: [
          "For the AI side, we experimented with a local language model using KoboldCpp and Qwen3-4B. The idea was to give it sensor readings and environmental context so its responses could be more specific than generic advice. We also worked on speech recognition with IndicConformer, so interaction would not depend on typing.",
          "It was a lot to connect in a 12-hour build, and the work ranged from hardware monitoring to the web app and these AI and voice experiments. Kisan-Tomodachi was also my first proper GitHub project. The part I keep coming back to is the original idea: information is more useful when people can understand and act on it."
        ]
      }
    ]
  },
  {
    id: "2d-tracker",
    number: "03",
    title: "2D-Tracker",
    category: "COMPUTER VISION / MOTION CONTROL",
    summary: "I wanted to see if old printer parts could follow a moving target. The current build tracks a colored object with a webcam and moves the salvaged mechanism along one physical axis.",
    status: "Working one-axis prototype · software can extend to 2D",
    stack: ["Python", "OpenCV", "NumPy", "Logitech C270", "Arduino UNO R4", "C++", "USB serial", "PD-style control"],
    visual: "tracker",
    label: "LIVE TRACKING DEMO",
    video: "/screenshots/2d-tracker/demo.mp4",
    poster: "/screenshots/2d-tracker/Centered.jpg",
    videoCaption: "The camera follows a colored target and the Arduino moves the printer mechanism along one axis.",
    imageAlt: "Computer-vision tracking view with the target near the center",
    gallery: [
      { src: "/screenshots/2d-tracker/Centered.jpg", alt: "Tracking interface with the detected target centered", caption: "Target near the center" },
      { src: "/screenshots/2d-tracker/tracking_left.jpg", alt: "Tracking interface with the target positioned to the left", caption: "Target offset to the left" }
    ],
    sections: [
      {
        kicker: "THE STARTING POINT",
        title: "Printer parts I did not want to leave in a box.",
        paragraphs: [
          "I had salvaged an old printer and kept some of its parts: the carriage mechanism, belts, and motors. I wanted to make them useful instead of letting them collect dust, so I started building a camera-based system that could physically follow an object.",
          "The current physical version follows movement along one axis. The software is arranged so it can be extended to 2D tracking later, but that is not what the hardware does yet."
        ]
      },
      {
        kicker: "THE VISION PIPELINE",
        title: "Find the target's center in each frame.",
        paragraphs: [
          "A Logitech C270 webcam provides the video. In Python and OpenCV, I convert each frame to HSV so I can isolate the colored target with a threshold. Morphological operations clean up the mask, then I find the contours and use image moments to calculate the target's centroid.",
          "From there, I compare the centroid with the center of the camera frame. That offset is the error the control part has to reduce."
        ],
        flow: ["Webcam frame", "HSV threshold", "Clean mask + contours", "Centroid error", "Motor command"]
      },
      {
        kicker: "GETTING THE MOTOR TO RESPOND",
        title: "Fixed pulses kept overshooting.",
        paragraphs: [
          "I used an Arduino UNO R4 to control the motor, with Python sending commands over USB serial. At first, the computer sent simple pulses: move in a direction for a set amount of time. It worked, but the motion was abrupt and the carriage often overshot, then moved back and forth trying to correct itself.",
          "I moved to a PD-style controller that considers both the target's position error and how quickly that error is changing. That lets it make larger corrections when the target is far from the center and smaller ones as it gets closer. I also added a deadband so the motor would not keep making tiny corrections when the target was already close enough."
        ]
      },
      {
        kicker: "WHERE IT STANDS",
        title: "A small closed loop, still being tuned.",
        paragraphs: [
          "After tuning, the movement became smoother and more accurate. The camera keeps checking where the target is, and the controller keeps correcting the motor's movement. It is not just detecting an object on a screen; the camera feedback moves a real mechanism.",
          "That is the part I find interesting: a small closed-loop control system made from computer vision, a motor, and repeated feedback. The physical build is still one-dimensional, but the software gives me a place to continue from if I take it toward 2D."
        ]
      }
    ]
  },
  {
    id: "magi",
    number: "04",
    title: "Magi",
    category: "EXPERIMENTAL / MULTI-AGENT AI",
    summary: "A decision-making experiment where three distinct perspectives deliberate on a question and return a collective vote.",
    status: "CLI experiment · separate UI exploration",
    stack: ["Python", "Gemini API", "JSON", "React", "Vite"],
    visual: "magi",
    label: "THREE PERSPECTIVES / ONE QUESTION",
    sections: [
      {
        kicker: "THE IDEA",
        title: "Let disagreement be part of the interface.",
        paragraphs: [
          "Magi takes inspiration from a fictional decision system built around three independent minds. In this experiment, three AI perspectives examine a question, deliberate in rounds, then vote YES, NO, or ABSTAIN.",
          "The point is not to claim that a group of model outputs produces an objectively correct answer. It is to make competing priorities visible and explore what structured disagreement can add to a decision-making tool."
        ]
      },
      {
        kicker: "THREE LENSES",
        title: "Different roles, one shared decision.",
        paragraphs: [
          "CASPER takes an analytical, scientist-like perspective. BALTHASAR is compassionate and human-centered. MELCHIOR is pragmatic. Each role is intended to give the discussion a distinct emphasis rather than merely produce three interchangeable responses.",
          "The flow separates independent analysis, multi-round deliberation, final votes, and a collective tally. Keeping these stages explicit makes the process easier to follow and gives the output a useful structure."
        ],
        flow: ["Independent analysis", "Deliberation rounds", "YES / NO / ABSTAIN", "Collective tally"]
      },
      {
        kicker: "IMPLEMENTATION",
        title: "A terminal-first experiment.",
        paragraphs: [
          "The main system is a Python command-line experiment using the Gemini API, including Gemini 2.0 Flash-Lite in the documented setup. Colored terminal output keeps each perspective legible, and deliberations and results can be saved to JSON.",
          "A separate React and Vite interface experiment explores a graphical presentation of the same concept. It is a distinct interface exploration, not evidence that the CLI has been replaced by a single finished product."
        ]
      },
      {
        kicker: "OPEN QUESTIONS",
        title: "More voices do not guarantee better judgment.",
        paragraphs: [
          "The most interesting questions are about orchestration: how roles stay meaningfully different, how discussion avoids simply repeating earlier responses, and how a final tally should represent unresolved disagreement.",
          "Magi is a prototype for exploring those questions. Its value is in the decision process it makes inspectable, not in presenting model consensus as a substitute for human judgment."
        ]
      }
    ]
  },
  {
    id: "baburu",
    number: "05",
    title: "Baburu",
    category: "AI CHARACTER / DESKTOP + DISCORD",
    summary: "An ongoing AI character experiment spanning Discord and desktop, with user-aware context, persistent memory, and voice exploration.",
    status: "Ongoing experiment",
    stack: ["Python", "discord.py", "Gemini API", "KoboldCPP", "PyQt6", "Edge TTS"],
    visual: "baburu",
    label: "CHAT / CONTEXT / MEMORY / VOICE",
    sections: [
      {
        kicker: "THE EXPERIMENT",
        title: "One character across more than one surface.",
        paragraphs: [
          "Baburu explores an anime-inspired AI chat companion that can appear in Discord and in a desktop interface. The ongoing work combines conversation with user-aware context and stored history, asking what makes an assistant feel continuous across sessions and interfaces.",
          "It is a collection of evolving experiments rather than a finished autonomous character. The model, interface, memory, and voice pieces have each been tried in different combinations."
        ]
      },
      {
        kicker: "INTERFACES",
        title: "A bot and a desktop character.",
        paragraphs: [
          "The Discord bot includes slash commands such as /chat, /join, and /leave, along with mention handling and voice-channel features. Earlier versions used Microsoft Edge TTS to speak generated replies through a connected voice channel.",
          "A separate PyQt6 desktop chat UI uses character assets, thinking indicators, incremental replies, and worker threads so longer operations do not freeze the interface."
        ]
      },
      {
        kicker: "CONTEXT + MEMORY",
        title: "Keep the useful parts of a conversation.",
        paragraphs: [
          "Conversation history and summaries are stored in JSON to retain useful context and distinguish participants. Experiments include the Gemini API and local KoboldCPP models, leaving room to compare different backends without presenting one as the only supported path.",
          "Context management is a practical constraint: retaining every message forever is not a useful design, so summaries become part of the system rather than an afterthought."
        ],
        flow: ["Discord / desktop", "Conversation context", "JSON history + summaries", "Model experiments"]
      },
      {
        kicker: "NEXT ITERATIONS",
        title: "Continuity is a system problem.",
        paragraphs: [
          "The project has working experiments across its interfaces, but remains in progress. Reliability, memory quality, responsiveness, and the handoff between text and voice are the areas that shape its next steps.",
          "Building Baburu has made the surrounding engineering feel as important as the generated reply: state, context, background work, and interface feedback all determine whether the interaction holds together."
        ]
      }
    ]
  },
  {
    id: "vantaplot",
    number: "06",
    title: "VantaPlot",
    category: "HARDWARE SALVAGE / MOTION CONTROL",
    summary: "An experimental XY drawing-machine direction built around mechanisms recovered from an HP DeskJet D1668.",
    status: "Hardware investigation · concept not yet complete",
    stack: ["Salvaged printer hardware", "DC motors", "Belts + pulleys", "Encoder sensors"],
    visual: "plotter",
    label: "RECLAIM / MEASURE / REPURPOSE",
    sections: [
      {
        kicker: "THE SPARK",
        title: "A printer already knows how to move.",
        paragraphs: [
          "VantaPlot began while salvaging an HP DeskJet D1668. The paper-feed and print-head assemblies contain rails, belts, pulleys, motors, and sensors: a compact set of mechanisms that invite a second use.",
          "The idea is to investigate whether those parts could form the basis of an XY drawing platform, reusing the machine's motion hardware instead of starting from a blank mechanical design."
        ]
      },
      {
        kicker: "ON THE BENCH",
        title: "Understand the mechanism before designing around it.",
        paragraphs: [
          "The exploration has focused on identifying the carriage and paper-feed mechanisms, looking at how the belts and pulleys transmit motion, and considering the encoder sensors and brushed DC motors as part of a possible control system.",
          "Those details matter because salvaged assemblies bring their own geometry and constraints. The useful first step is figuring out what the parts can reliably do before committing to a machine layout."
        ],
        flow: ["Printer assemblies", "Rails + belts", "Motor + feedback", "Possible XY platform"]
      },
      {
        kicker: "HONEST STATUS",
        title: "A direction, not a finished plotter.",
        paragraphs: [
          "VantaPlot is an experimental engineering project. The salvaged mechanisms and motion-control idea are the focus; a completed drawing machine is not being claimed.",
          "The next meaningful work would be characterizing the mechanisms and motors, establishing what feedback is available, and testing a small motion-control step before expanding the concept."
        ]
      },
      {
        kicker: "WHY KEEP IT",
        title: "Good engineering starts with curiosity about what exists.",
        paragraphs: [
          "The project connects electronics, mechanics, and control in a very tangible way. It is also a reminder that dismantling and measuring an existing machine can be its own form of design work.",
          "I want to keep documenting what is observed separately from what is only planned as the experiment develops."
        ]
      }
    ]
  }
];
