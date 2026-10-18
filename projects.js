/* ============================================================
   PROJECT DATA — edit this file to add or change projects.
   ------------------------------------------------------------
   id        : short name, used in the URL (#juggleshots)
   featured  : true = big tile in "Selected work", false = Archive
   category  : "design" or "art" (used by the Archive filter)
   image     : path to a cover image in /assets (16:10 works best).
   imageOnline: optional web address used if the /assets file is missing.
               If neither loads, a coloured title card is shown.
   youtube   : optional YouTube video id (the part after watch?v=)
   gallery   : optional screenshots: [{ src: "assets/x.png", online: "https://...", label: "optional name" }]
   videos    : optional extra videos: [{ src, poster, label, chapters: [{ t: seconds, label }] }]
   video     : optional .mp4 in /assets, plays in the project view
   sketchfab : optional Sketchfab model id, adds a 3D viewer
   hidden    : true = not shown yet (fill in the details first)
   ============================================================ */

window.PROJECTS = [
  {
    id: "juggleshots",
    featured: true,
    category: "design",
    title: "Juggle Shots",
    tagline: "2D physics fun",
    disciplines: ["Game design", "Mechanic design", "Game feel"],
    summary:
      "A small 2D physics toy where you shoot a ball that is also your moving target.",
    body: [
      "Juggle Shots is a simple 2D physics project: you play around by shooting a ball that acts as a moving target.",
      "The goal was to take one simple mechanic and push its player feedback as far as possible, so every hit feels satisfying to land."
    ],
    focus: [
      "Core mechanic iteration",
      "Hit feedback and juice",
      "Physics tuning",
      "Workflow planned in Miro"
    ],
    specs: { Type: "School project", Status: "Prototype", Time: "60 h", Role: "Solo", Engine: "Unity", Platform: "Browser" },
    tools: ["Unity", "Miro", "Procreate", "GitHub"],
    links: [
      { label: "Play on itch.io", url: "https://glassir.itch.io/juggle-shots" },
      { label: "Watch the trailer on YouTube", url: "https://www.youtube.com/watch?v=KhihAP-Jjto" },
    ],
    /* Design process section in the project page */
    process: {
      intro: "Made for a game design assignment: build a new prototype every two weeks, playtest it, and improve it through iterative design. I picked one mechanic from Full Metal Furies, where hitting an enemy in the air knocks it higher, and tried to build a whole game on that mechanic alone and make it as satisfying as possible. The biggest challenge was time, so I kept the scope small. Each round below goes: what players and teachers told me, what I decided, and what I changed.",
      miro: "https://miro.com/app/board/uXjVK8-sGPM=/",
      steps: [
        {
          title: "Round 1: a testing gym",
          text: [
            "The first prototype was just the core: move, jump and shoot a ball that flies up depending on where you hit it. I built a small gym with a hoop to test precision and a tall chimney to test keeping the ball in the air, but gave no rewards for either. I wanted to see what players do on their own before adding any feedback."
          ],
          video: "assets/js-process-1.mp4", poster: "assets/js-process-1.jpg"
        },
        {
          title: "What the first playtest told me",
          text: ["I sent playtesters a form about control, the ball's movement and what they enjoyed most. Players used to 2D shooters found it easy, newcomers wanted aiming help, the camera lost the ball on long shots, and the ball outran the player."],
          list: [
            "Camera: removed the upward bias and the zoom limit, so it keeps both the player and the ball in view.",
            "Ball: added squash and stretch so it reacts to every hit and shows its speed.",
            "Aiming: I chose clearer visual aim cues instead of making the ball easier to hit, to keep the satisfaction of landing a long shot."
          ],
          video: "assets/js-process-2.mp4", poster: "assets/js-process-2.jpg"
        },
        {
          title: "Round 2: fixing the basics",
          text: ["Players liked the new bouncy ball, but the camera still lost it sometimes and the movement was jittery. My teacher asked for smaller iterations, clearer reasoning, a goal for the player, and a reset when the ball flies out of bounds."],
          list: ["Added an out-of-bounds reset", "Added a hand that shows where you aim", "Added a skew to the player when moving", "Fixed the ball's odd floor bounce", "Added varied shooting sounds"]
        },
        {
          title: "Round 3: players just enjoyed shooting",
          text: ["The new audio and visual feedback was a hit: people spam-shot the ball high into the air and found the aiming hand funny, so I decided to lean into that goofiness. They also found the ball's look unintentionally funny, so it became orange."],
          list: ["Fixed camera padding so the ball and player always stay fully in view", "Changed the ball's colour to orange"]
        },
        {
          title: "Round 4: rewarding the player",
          text: [
            "Players said the ball floated down too slowly and suggested a laser sight. A bug where bullets didn't disappear after a hit made the ball easier to hit, and less experienced players loved it. That told me aim help belonged in the game, so I planned the laser sight and made the bullets' hitbox bigger instead.",
          ],
          list: ["Hoop now bursts into confetti with a cheering crowd", "Combo sound rises in pitch as the combo grows", "The character's glasses follow the ball", "Faster falling ball and a bigger bullet hitbox"],
          link: { label: "Watch this version", url: "https://www.youtube.com/watch?v=fi_UEbDJUKg" }
        },
        {
          title: "Round 5: making it look finished",
          text: ["My teacher said the game still looked unfinished and used Unity's default assets. This round was about polish and presentation."],
          list: ["Walking sounds, a gun recoil animation and a cartoon muzzle flash", "A toggleable laser sight and a custom cursor", "Set dressing, a parallax background and an intro scene", "Custom fonts instead of the defaults", "Faster walking so players can keep up with the ball"],
          link: { label: "Watch this version", url: "https://www.youtube.com/watch?v=ThTjxK1q8nE" }
        },
        {
          title: "Round 6: adding punch",
          text: [
            "Playtesters said the combo got repetitive, the gun recoil was hard to notice, bullets needed impact effects, and scoring in the hoop shouldn't break your combo. I picked the changes with the biggest effect on game feel that I could finish in time.",
            "I tried making the hand bigger to sell the recoil, but it didn't look good, so I moved it further from the body and in front of it instead. That made the recoil read much more clearly."
          ],
          list: ["Gun kickback, with the hand drawn in front of the body", "Sparks when bullets hit walls", "Scoring in the hoop no longer breaks your combo"],
          link: { label: "Watch the latest version", url: "https://www.youtube.com/watch?v=KhihAP-Jjto" }
        },
        {
          title: "What I learned",
          list: [
            "Visual and audio feedback add far more to game feel than I expected. People had fun even without a clear goal.",
            "Anonymous forms are great for builds close to release, but early prototypes need live playtests where I can ask follow-up questions.",
            "Small iterations with one change each are easier to test and explain than big ones.",
            "Scope early: decide what to focus on first based on the time I have.",
            "A good trailer and an easy browser build on itch.io bring in far more playtesters than a plain post."
          ]
        }
      ]
    },
    youtube: "KhihAP-Jjto",
    image: "assets/juggleshots.jpg",
    gallery: [
      { src: "assets/juggleshots-1.webp" },
      { src: "assets/juggleshots-2.webp" },
      { src: "assets/juggleshots-3.webp" },
      { src: "assets/juggleshots-4.webp" }
    ],
    hue: 8
  },
  {
    id: "cavern",
    featured: true,
    category: "design",
    title: "Cavern",
    tagline: "2D platformer",
    disciplines: ["Game design", "Level design"],
    summary:
      "My first finished game: a short pixel-art platformer where a crashed alien escapes a dangerous cave.",
    body: [
      "Cavern is a short side-scrolling platformer and my first finished game project. You play as Dew, an alien who crash-landed underground in a cave full of dangers. Venture deeper into the cavern to find an exit and escape.",
      "My programming skills were limited at the time, so most of the effort went into level design: building distinct experiences for the player out of a small set of mechanics.",
      "It has around three levels and takes between 10 minutes and an hour, depending on the player's skill. Players left detailed feedback on itch.io about the difficulty curve, ladders and spikes, which I'm using to plan the next version."
    ],
    focus: ["Level layout and pacing", "Teaching through level design", "Difficulty curve", "Iterating on player feedback"],
    specs: { Type: "Personal project", Status: "In development", Time: "3–4 months", Role: "Solo", Engine: "Godot 3.2", Playtime: "10–60 min", Platform: "Browser" },
    tools: ["Godot 3.2"],
    links: [
      { label: "Play on itch.io", url: "https://glassir.itch.io/cavern-alpha" },
      { label: "Watch the trailer on YouTube", url: "https://www.youtube.com/watch?v=cLI2PS588NE" }
    ],
    youtube: "cLI2PS588NE",
    image: "assets/cavern.png",
    imagePos: "center 20%",
    pixelArt: true,
    gallery: [
      { src: "assets/cavern-1.webp" },
      { src: "assets/cavern-2.webp" },
      { src: "assets/cavern-3.webp" }
    ],
    hue: 196
  },
  {
    id: "observatory",
    featured: true,
    category: "art",
    title: "Mountain Observatory",
    tagline: "Optimised HDRP environment",
    disciplines: ["Environment art", "Shaders", "Foliage", "Optimisation"],
    summary:
      "My Game Art 3 exam: a snowy mountain-top observatory at night, with my own snow shaders, a modular asset kit and an optimised Unity HDRP scene.",
    body: [
      "A stylized environment of an observatory complex on a snowy mountain peak at night: a brick main tower with a domed telescope, smaller observatories, a radio dish, pine trees and frosted grass, all lit by the moon.",
      "This was my exam project for the Game Art 3 course, which focused on three things: optimising a scene, building and using shaders in Shader Graph, and making foliage. I used batching and the Unity Profiler to find and reduce the performance cost of the scene, which has a lot of trees and grass.",
      "I made the shaders myself, including the snow effects, and modelled the buildings and props as a modular kit that I assembled into the final composition.",
      "The render flies in from the valley fog up to the summit to show the scene at different scales, from the full mountain silhouette down to details at ground level. The process video goes from the first blockout to the final scene, and the tech demo walks through the optimisation work and each shader in the Unity editor.",
      "Not made by me: the sky comes from the free Fantasy Skybox asset pack, and the trees were made with the Mtree add-on for Unity."
    ],
    focus: ["Snow shaders in Shader Graph", "Scene optimisation (batching, Profiler)", "Modular asset kit", "Composition and night lighting"],
    specs: { Type: "School project (exam)", Course: "Game Art 3, DAE", Time: "60 h", Engine: "Unity 6.3 HDRP", Role: "Solo" },
    tools: ["Unity 6.3 HDRP", "Shader Graph", "Unity Profiler", "Mtree"],
    video: "assets/observatory.mp4",
    videoLabel: "Render",
    videos: [
      { src: "assets/observatory-breakdown.mp4", poster: "assets/observatory-breakdown.jpg", label: "Process" },
      {
        src: "assets/observatory-techdemo.mp4", poster: "assets/observatory-techdemo.jpg", label: "Tech demo",
        chapters: [
          { t: 2, label: "Batch count" },
          { t: 22, label: "Volumetrics and shadow cascades" },
          { t: 62, label: "LODs" },
          { t: 84, label: "Static batching" },
          { t: 102, label: "GPU instancing" },
          { t: 134, label: "Universal shader" },
          { t: 194, label: "Grass shader" },
          { t: 230, label: "Bush shader" }
        ]
      }
    ],
    image: "assets/observatory.jpg",
    gallery: [
      { src: "assets/observatory-kit.webp", label: "Modular kit" },
      { src: "assets/observatory-1.webp" },
      { src: "assets/observatory-2.webp" },
      { src: "assets/observatory-3.webp" },
      { src: "assets/observatory-4.webp" },
      { src: "assets/observatory-5.webp" }
    ],
    hue: 222
  },
  {
    id: "alienplanet",
    hidden: true, // hidden for now
    featured: false,
    category: "art",
    title: "Fluffy Alien Planet",
    tagline: "Environment in HDRP",
    disciplines: ["Environment art", "Shaders", "Optimisation"],
    summary:
      "A sculpted alien terrain with a custom atmosphere, built and optimised in Unity HDRP.",
    body: [
      "My hand-in for Game Art 3. For this assignment I sculpted a terrain, set up LODs, wrote shaders in Shader Graph, created a custom atmosphere and optimised the Unity scene."
    ],
    focus: ["Terrain sculpting", "LODs", "Shader Graph", "Custom atmosphere", "Scene optimisation"],
    specs: { Type: "School project", Year: "DAE year 2", Date: "April 2026", Engine: "Unity HDRP" },
    tools: ["Unity", "Photoshop"],
    links: [],
    image: "assets/alienplanet.jpg",
    // video: "assets/alienplanet.mp4",  (turn on once the file is in assets)
    hue: 280
  },
  {
    id: "racingkart",
    featured: true,
    category: "art",
    title: "Stylized Racing Kart",
    tagline: "Game-ready 3D asset",
    disciplines: ["3D modeling", "PBR texturing", "Rigging", "Animation"],
    summary:
      "A full game-asset pipeline: high-to-low poly bake, PBR textures, rig and animation, tested in Unity.",
    body: [
      "The goal was to produce a game-ready asset with PBR textures. Modeling, rigging and animation were done in Blender, texturing in Substance Painter, and everything was exported and tested with custom shaders in Unity.",
      "The main things I learned were baking a high-poly model onto a low-poly one, making correct PBR textures, and setting up a game asset pipeline from start to finish."
    ],
    focus: ["High to low poly baking", "PBR texturing", "Rigging and animation", "Unity import pipeline"],
    specs: { Type: "School project", Year: "DAE year 2", Date: "January 2026", Role: "Solo" },
    tools: ["Blender", "Substance Painter", "Unity"],
    links: [
      {
        label: "View on Sketchfab",
        url: "https://sketchfab.com/3d-models/stylized-racing-kart-ccfc95eb41614cd087905d1a4f4bb5bc"
      }
    ],
    sketchfab: "ccfc95eb41614cd087905d1a4f4bb5bc",
    image: "assets/racingkart.jpg",
    hue: 42
  },

  /* ---------------- Archive ---------------- */
  {
    id: "robuddy",
    featured: true,
    category: "art",
    title: "Concierge Robuddy",
    tagline: "Rigged robot helper",
    disciplines: ["3D modeling", "PBR", "IK rigging"],
    summary: "A stylized robot helper, baked, textured and animated with inverse kinematics.",
    body: [
      "End assignment for Game Art 2. During this assignment I learned about PBR materials, baking a high-poly model onto a low-poly one, and rigging and animating with inverse kinematics."
    ],
    focus: ["PBR texturing", "High-to-low poly baking", "IK rigging and animation", "Real-time setup in Unity"],
    specs: { Type: "School project", Year: "DAE year 2", Date: "December 2025" },
    tools: ["Blender", "Substance Painter", "Unity"],
    links: [
      {
        label: "View on Sketchfab",
        url: "https://sketchfab.com/3d-models/concierge-robuddy-b04f40ee879f466ea3b6faaa8b97140e"
      }
    ],
    sketchfab: "b04f40ee879f466ea3b6faaa8b97140e",
    videos: [
      { src: "assets/robuddy-unity.mp4", poster: "assets/robuddy-unity.jpg", label: "Unity turntable" },
      { src: "assets/robuddy-blender.mp4", poster: "assets/robuddy-blender.jpg", label: "Blender render" }
    ],
    image: "assets/robuddy.jpg",
    gallery: [
      { src: "assets/robuddy-1.webp", label: "Blender render" },
      { src: "assets/robuddy-2.webp", label: "Back" },
      { src: "assets/robuddy-3.webp", label: "Front" }
    ],
    hue: 160
  },
  {
    id: "lighthouse",
    category: "art",
    title: "Lowpoly Lighthouse",
    tagline: "Stylized island scene",
    disciplines: ["3D modeling", "Stylization"],
    summary: "A small low-poly island built entirely in Blender. My introduction to stylized 3D.",
    body: [
      "A simple, stylized low-poly scene made entirely in Blender. It taught me the basics of stylization in 3D art."
    ],
    specs: { Type: "School project", Date: "March 2025", Role: "Solo" },
    tools: ["Blender"],
    links: [
      {
        label: "View on Sketchfab",
        url: "https://sketchfab.com/3d-models/simple-scene-island-lighthouse-fe541d1992884b14b21e95bd7ed0c03a"
      }
    ],
    sketchfab: "fe541d1992884b14b21e95bd7ed0c03a",
    image: "assets/lighthouse.jpg",
    hue: 190
  },
  {
    id: "farmdiorama",
    category: "art",
    title: "Small Farm Diorama",
    tagline: "Hillside farm diorama",
    disciplines: ["3D modeling", "Texturing", "Composition"],
    summary: "A small farm on a rocky hill: farmhouse, silo, chicken coop and stream, my end assignment for 3D1.",
    body: [
      "A 3D diorama of a small farm on the hills, made as my end assignment for the course 3D1.",
      "The scene packs a red farmhouse with a porch, a metal silo, a chicken coop, a cart, fences and a stream onto one rocky island, framed by trees so it reads well from every side."
    ],
    specs: { Type: "School project", Year: "DAE year 1", Date: "August 2024" },
    tools: ["Blender", "Photoshop"],
    links: [
      {
        label: "View on Sketchfab",
        url: "https://sketchfab.com/3d-models/dae-diorama-retake-small-farm-6fa7fe11fed04880ad051e65eec55293"
      }
    ],
    sketchfab: "6fa7fe11fed04880ad051e65eec55293",
    image: "assets/farmdiorama.jpg",
    gallery: [
      { src: "assets/farmdiorama-1.webp", label: "Front" },
      { src: "assets/farmdiorama-2.webp", label: "Silo side" },
      { src: "assets/farmdiorama-3.webp", label: "Yard" }
    ],
    hue: 95
  },

  /* Listed on the old site but without details yet.
     Fill in summary/body/specs, then set hidden: false. */
  { id: "jugglingcups", hidden: true, category: "design", title: "Juggling Cups", tagline: "Game jam", hue: 330 },
  { id: "pixelfighter", hidden: true, category: "design", title: "Pixel Fighter", tagline: "", hue: 0 },
  {
    id: "snake",
    category: "design",
    title: "Snackrifice",
    tagline: "Snake, but you dash",
    disciplines: ["Game design", "Game feel", "Design documentation"],
    summary: "A fast arcade spin on Snake: you're a serpent god dashing after human sacrifices before they escape your domain.",
    body: [
      "Snackrifice is a top-down 2D arcade game built on the classic Snake formula. You play a giant serpent god whose followers keep throwing sacrifices into your domain, and you can't let a single one escape off screen.",
      "The twist is the movement. The snake follows your mouse, but it's too slow to catch anyone that way. Clicking makes it dash: much faster, but it can't turn. The skill is in chaining the two: aim, dash, let the snake line up again, and dash again.",
      "I made this for my game design class, so I documented the whole design in a game design document: design pillars, systems, the core loop and the screen flow. Even the feedback was designed with a goal: to reward players for using the dash."
    ],
    focus: ["Core mechanic: aim and dash", "Rewarding feedback for dashing", "Difficulty that ramps with your score", "Writing a full design document"],
    specs: { Type: "School project", Status: "In progress", Time: "1 semester", Role: "Solo", Engine: "Unity", Platform: "PC" },
    tools: ["Unity", "Miro"],
    video: "assets/snake-trailer.mp4",
    videoLabel: "Gameplay trailer",
    image: "assets/snake.jpg",
    process: {
      intro: "I tracked my whole process for this project for my game design class. Before building it, I designed the game in a game design document; these are a few key parts of it.",
      steps: [
        { title: "Design pillars", text: "Simple controls, hard to master. Fast, overwhelming decisions that put the player in tight spots. And every action the player takes feeds back into the challenge." },
        { title: "Two movement states", text: "Regular movement is slow but easy to control, so you can aim. Dashing is fast but locks your direction. The snake turns red while dashing, with a whoosh sound, so you always know which state you're in.", image: "assets/snake-process-dash.webp" },
        { title: "Rewarding the dash", text: "Eating during a dash hits harder than eating normally: a bigger screen shake, a background flash and a bigger splat. I wanted players to feel rewarded every time they took the risk." },
        { title: "Core game loop", text: "Sacrifices spawn in the centre and run for the edges. Every one you eat makes the snake longer, which lets you block their escape routes, and every 10 eaten, more spawn at once.", image: "assets/snake-process-loop.webp" },
        { title: "Screen flow and layout", text: "The camera shows the whole level at all times, with the score kept in the side bars so it never covers the action.", image: "assets/snake-process-flow.webp" }
      ],
      doc: { label: "Read the full game design document (PDF)", url: "assets/snake-gdd.pdf" },
      miro: "https://miro.com/app/board/uXjVLK7LjKo=/"
    },
    hue: 120
  },
  { id: "loreal", hidden: true, category: "design", title: "L'Oréal game", tagline: "", hue: 340 },
  { id: "animalworld", hidden: true, category: "design", title: "Animal World", tagline: "Worldbuilding and building design", hue: 60 },
  { id: "defencetower", hidden: true, category: "art", title: "Upgradable Defence Tower", tagline: "", hue: 220 },
  { id: "morticiandesk", hidden: true, category: "art", title: "Stylized Mortician Desk", tagline: "", hue: 260 },
  { id: "wizarddesk", hidden: true, category: "art", title: "Stylized Wizard Desk", tagline: "", hue: 250 },
  { id: "tavern", hidden: true, category: "art", title: "Lowpoly Tavern", tagline: "", hue: 25 }
];

/* ---------------- Personal info ---------------- */
window.PROFILE = {
  name: "Bar Moreno",
  role: "Generalist game designer",
  school: "Independent Game Production at DAE, Belgium",
  email: "BarMoreno.Work@gmail.com",
  cv: "https://drive.google.com/file/d/17OH0tIP8kGEW408rLBfgUvzMPRKavyE4/view?usp=sharing",
  photo: "assets/portrait.jpg",
  /* Looping reel in the top section. Until assets/reel.mp4 exists, the juggling toy shows instead. */
  reel: "assets/reel.mp4",
  reelPoster: "assets/reel.jpg",
  /* Motivational letter: put a link (e.g. Google Drive) or "assets/letter.pdf". Leave "" to hide it. */
  letter: "",
  socials: [
    { label: "itch.io", note: "Play my games", url: "https://glassir.itch.io/" },
    { label: "LinkedIn", note: "Work history and contact", url: "https://www.linkedin.com/in/bar-moreno-6a90782b7/" },
    { label: "Sketchfab", note: "3D models you can rotate", url: "https://sketchfab.com/BarMoreno" },
    { label: "ArtStation", note: "Art and renders", url: "https://www.artstation.com/belbs" },
    { label: "GitHub", note: "Code and project repos", url: "https://github.com/barmoreno" }
  ],
  software: ["Unity", "Godot", "Blender", "Substance Painter", "Photoshop", "Procreate", "Miro", "GitHub"],
  /* "What I'm looking for" box in About. Delete this block (or set to null) to hide it. */
  lookingFor: {
    title: "Game design internship",
    when: "15 February – 16 June 2027",
    roles: ["Game design", "Level design", "Prototyping and game feel"],
    note: "Part of my bachelor's at DAE. I'd love to join a team that cares about making games feel great to play."
  },
  skills: {
    "Game design": ["Mechanic design", "Game feel and feedback", "Level design", "Rapid prototyping", "Playtesting"],
    "Art": ["Low and high poly modeling", "PBR texturing and baking", "Rigging and animation", "Shader Graph", "Scene optimisation"]
  }
};
