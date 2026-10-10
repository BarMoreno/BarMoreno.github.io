/* ============================================================
   PROJECT DATA — edit this file to add or change projects.
   ------------------------------------------------------------
   id        : short name, used in the URL (#juggleshots)
   featured  : true = big tile in "Selected work", false = Archive
   category  : "design" or "art" (used by the Archive filter)
   image     : path to a cover image in /assets (16:10 works best).
               If the file is missing, a coloured title card is shown.
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
    specs: { Type: "School project", Time: "60 h", Role: "Solo", Engine: "Unity" },
    tools: ["Unity", "Miro", "Procreate"],
    links: [
      { label: "Play on itch.io", url: "https://glassir.itch.io/juggle-shots" },
      { label: "Design board on Miro", url: "https://miro.com/app/board/uXjVK8-sGPM=/" }
    ],
    image: "assets/juggleshots.jpg",
    video: "assets/juggleshots-trailer.mp4",
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
      "My first finished game: three levels built to get the most out of a few mechanics.",
    body: [
      "Cavern is a 2D platformer and my first finished game project.",
      "My programming skills were limited at the time, so most of the effort went into level design: building distinct experiences for the player out of a small set of mechanics.",
      "It has around three levels and takes between 10 minutes and an hour, depending on the player's skill."
    ],
    focus: ["Level layout and pacing", "Teaching through level design", "Difficulty curve"],
    specs: { Type: "Personal project", Length: "10–60 min", Role: "Solo", Levels: "3" },
    tools: ["Unity"],
    links: [{ label: "Play on itch.io", url: "https://glassir.itch.io/cavern-alpha" }],
    image: "assets/cavern.jpg",
    hue: 196
  },
  {
    id: "alienplanet",
    featured: true,
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
    video: "assets/alienplanet.mp4",
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
    category: "art",
    title: "Concierge Robuddy",
    tagline: "Rigged robot helper",
    disciplines: ["3D modeling", "PBR", "IK rigging"],
    summary: "A stylized robot helper, baked, textured and animated with inverse kinematics.",
    body: [
      "End assignment for Game Art 2. During this assignment I learned about PBR materials, baking a high-poly model onto a low-poly one, and rigging and animating with inverse kinematics."
    ],
    specs: { Type: "School project", Year: "DAE year 2", Date: "December 2025" },
    tools: ["Blender", "Substance Painter", "Unity"],
    links: [
      {
        label: "View on Sketchfab",
        url: "https://sketchfab.com/3d-models/concierge-robuddy-b04f40ee879f466ea3b6faaa8b97140e"
      }
    ],
    sketchfab: "b04f40ee879f466ea3b6faaa8b97140e",
    image: "assets/robuddy.jpg",
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
    title: "Lowpoly Farm Diorama",
    tagline: "Hand-painted diorama",
    disciplines: ["3D modeling", "Texturing"],
    summary: "A low-poly farmhouse diorama, the end assignment for 3D1.",
    body: ["A low-poly diorama of a farmhouse, made as my end assignment for the course 3D1."],
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
    hue: 95
  },

  /* Listed on the old site but without details yet.
     Fill in summary/body/specs, then set hidden: false. */
  { id: "jugglingcups", hidden: true, category: "design", title: "Juggling Cups", tagline: "Game jam", hue: 330 },
  { id: "pixelfighter", hidden: true, category: "design", title: "Pixel Fighter", tagline: "", hue: 0 },
  { id: "snake", hidden: true, category: "design", title: "Snake", tagline: "", hue: 120 },
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
  cv: "https://drive.google.com/file/d/1H6hs0b543XY6tiSbYTuLnwnp2SnrOofI/view",
  photo: "assets/portrait.jpg",
  socials: [
    { label: "itch.io", note: "Play my games", url: "https://glassir.itch.io/" },
    { label: "LinkedIn", note: "Work history and contact", url: "https://www.linkedin.com/in/bar-moreno-6a90782b7/" },
    { label: "Sketchfab", note: "3D models you can rotate", url: "https://sketchfab.com/BarMoreno" },
    { label: "ArtStation", note: "Art and renders", url: "https://www.artstation.com/belbs" }
  ],
  software: ["Unity", "Blender", "Substance Painter", "Photoshop", "Procreate", "Miro"],
  skills: {
    "Game design": ["Mechanic design", "Game feel and feedback", "Level design", "Rapid prototyping", "Playtesting"],
    "Art": ["Low and high poly modeling", "PBR texturing and baking", "Rigging and animation", "Shader Graph", "Scene optimisation"]
  }
};
