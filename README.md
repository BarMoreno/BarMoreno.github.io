# Bar Moreno — Portfolio

A hand-built static portfolio site. No build step, no framework: just HTML, CSS and JavaScript, ready for GitHub Pages.

```
index.html     page layout and text (hero, about, contact)
style.css      colours, fonts, layout
projects.js    ALL project data + your links  ← edit this most
main.js        renders projects, project pop-ups, juggling toy
icons.js       software logos shown in the About section
assets/        your images and videos go here
```

## 1. Add your images and videos

Put files in `assets/` with these names (or change the paths in `projects.js`).
Any image that's missing shows a coloured title card instead, so the site never looks broken.

| File | Used for |
| --- | --- |
| `assets/portrait.jpg` | About photo (portrait, about 4:5) |
| `assets/og-card.jpg` | Preview image when the link is shared (1200×630) (done) |
| `assets/reel.mp4` + `reel.jpg` | Looping reel in the top section (replaces the juggling toy automatically). Keep it short, silent, under ~10 MB |
| `assets/letter.pdf` (optional) | Motivational letter; or put a Google Drive link in `letter:` in `projects.js` |
| `assets/juggleshots.jpg` + `juggleshots-1…4.webp` | Juggle Shots cover + screenshots (done) |
| `assets/cavern.png` + `cavern-1/2/3.webp` | Cavern cover + screenshots (done) |
| `assets/alienplanet.jpg` / `alienplanet.mp4` | Fluffy Alien Planet cover / video |
| `assets/observatory*` (cover, 5 screenshots, kit image, render, process and tech demo videos + posters) | Mountain Observatory (done) |
| `assets/racingkart.jpg` | Racing Kart cover |
| `assets/robuddy.jpg`, `lighthouse.jpg`, `farmdiorama.jpg` | Archive covers |

Tips: keep images under ~400 KB (export as JPG or WebP), and videos under ~25 MB.
GitHub refuses single files over 100 MB.

## 2. Edit projects

Open `projects.js`. Each project is one block. To add one, copy a block and change the values.
- `featured: true` puts it in **Selected work**; leave it out for the **Archive**.
- Projects with `hidden: true` are listed from your old site but have no details yet. Fill them in and set `hidden: false`.
- `sketchfab: "model id"` adds a "Rotate in 3D" button to the project.

Each project has its own link: `yoursite/#juggleshots` opens that project directly.

## 3. Put it on GitHub Pages

**Option A — in the browser (no Git needed)**
1. Sign in at github.com and create a new repository.
   - Name it `YOUR-USERNAME.github.io` to get the site at `https://YOUR-USERNAME.github.io`.
   - Any other name (e.g. `portfolio`) works too; the site will be at `https://YOUR-USERNAME.github.io/portfolio`.
   - Set it to **Public**.
2. Click **Add file → Upload files**, drag in everything from this folder (including the `assets` folder and the `.nojekyll` file), and click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait a minute or two. The address appears at the top of the Pages settings.

**Option B — with Git on your computer**
```bash
cd portfolio
git init
git add .
git commit -m "First version of portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```
Then do step 3 above.

To update the site later, edit the files and upload or push again. Changes go live within a couple of minutes.

## Preview locally
Double-click `index.html`, or for videos and 3D embeds to behave exactly like online, run `python -m http.server` in this folder and open http://localhost:8000.
