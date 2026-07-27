(() => {
  // js/cursor.js
  function initCursor() {
    const dot = document.getElementById("cursor-dot");
    const flashlight = document.getElementById("flashlight-cursor");
    document.body.style.cursor = "none";
    const cursorStyle = document.createElement("style");
    cursorStyle.textContent = "a, button, .interactive, .gallery-link, .map-hotspot.unlocked-region { cursor: none !important; }";
    document.head.appendChild(cursorStyle);
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let flashlightX = mouseX;
    let flashlightY = mouseY;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });
    function animate() {
      flashlightX += (mouseX - flashlightX) * 0.15;
      flashlightY += (mouseY - flashlightY) * 0.15;
      flashlight.style.left = `${flashlightX}px`;
      flashlight.style.top = `${flashlightY}px`;
      requestAnimationFrame(animate);
    }
    animate();
    document.addEventListener("mouseover", (e) => {
      const interactive = e.target.closest("a, button, .interactive");
      if (interactive) {
        document.body.classList.add("is-hovering");
      }
    });
    document.addEventListener("mouseout", (e) => {
      const interactive = e.target.closest("a, button, .interactive");
      if (interactive) {
        document.body.classList.remove("is-hovering");
      }
    });
  }

  // js/state.js
  var EMOTIONS = [
    "wonder",
    "courage",
    "joy",
    "love",
    "resilience",
    "hope"
  ];
  var EMOTION_REQUIREMENTS = {
    wonder: 3,
    courage: 3,
    joy: 3,
    love: 3,
    resilience: 3,
    hope: 3
  };
  var AppState = {
    userName: "",
    memberCount: 0,
    currentEmotionIndex: 0,
    viewedArtifacts: /* @__PURE__ */ new Set(),
    viewed360: /* @__PURE__ */ new Set(),
    quizCompleted: false,
    isEmotionUnlocked(emotionId) {
      return true;
    },
    markArtifactViewed(emotionId, artifactId) {
      this.viewedArtifacts.add(`${emotionId}_${artifactId}`);
      this.checkProgression(emotionId);
    },
    mark360Viewed(emotionId, artifactId) {
      this.viewed360.add(`${emotionId}_${artifactId}`);
      this.checkProgression(emotionId);
    },
    checkProgression(emotionId) {
      const index = EMOTIONS.indexOf(emotionId);
      if (index !== this.currentEmotionIndex) return;
      const requiredCount = EMOTION_REQUIREMENTS[emotionId];
      let hoverCount = 0;
      let view360Count = 0;
      for (let i = 1; i <= requiredCount; i++) {
        if (this.viewedArtifacts.has(`${emotionId}_${i}`)) hoverCount++;
        if (this.viewed360.has(`${emotionId}_${i}`)) view360Count++;
      }
      if (hoverCount === requiredCount && view360Count === requiredCount) {
        if (this.currentEmotionIndex < EMOTIONS.length - 1) {
          this.currentEmotionIndex++;
          document.dispatchEvent(new CustomEvent("regionUnlocked", {
            detail: { newRegion: EMOTIONS[this.currentEmotionIndex] }
          }));
        } else if (this.currentEmotionIndex === EMOTIONS.length - 1) {
          document.dispatchEvent(new CustomEvent("journeyComplete"));
        }
      }
    },
    isJourneyComplete() {
      return true;
    },
    reset() {
      this.userName = "";
      this.memberCount = 0;
      this.currentEmotionIndex = 0;
      this.viewedArtifacts.clear();
      this.viewed360.clear();
      this.quizCompleted = false;
    }
  };

  // js/views/wonder.js
  function renderWonder() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/map">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/courage" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Wonder \u2728</h1>
                <p>Architectural marvels and ancient ingenuity.</p>
            </header>

            <div class="artifacts-grid">
                <!-- Taj Mahal -->
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="wonder">
                    <div class="artifact-image" style="background-image: url('https://images.unsplash.com/photo-1548013146-72479768bada?w=800');"></div>
                    <div class="artifact-info">
                        <h3>Taj Mahal</h3>
                        <p>A pristine monument of marble, standing the test of centuries.</p>
                        <a href="https://artsandculture.google.com/streetview/taj-mahal/UwGKcX7FFM5U4g?sv_lng=78.04211969399677&sv_lat=27.17461874830608&sv_h=345.1412804841943&sv_p=1.3515483192169313&sv_pid=7b7Y5hk26s5OZrTqn9Sprg&sv_z=0.06636991142086879" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <!-- Ellora Caves -->
                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="wonder">
                    <div class="artifact-image" style="background-image: url('./assets/art5.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Ancient Rock Cut Temples</h3>
                        <p>Monolithic structures carved directly from the basalt cliffs.</p>
                        <a href="https://artsandculture.google.com/streetview/ajanta-caves/pQH62KxODVTBaw?sv_lng=75.7023124959711&sv_lat=20.55253786938109&sv_h=245.05883505712816&sv_p=-8.556948947348133&sv_pid=xMyxS9pYpToAAAQWjI_u-Q&sv_z=0.008619072153202456" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <!-- Stepwells -->
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="wonder">
                    <div class="artifact-image" style="background-image: url('./assets/art4.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Great Stepwells</h3>
                        <p>Intricate, descending subterranean architecture of ancient India.</p>
                        <a href="https://artsandculture.google.com/streetview/rani-ki-vav-the-queen-s-stepwell/SwHoqaQRCBDCdw?sv_lng=72.10189969833931&sv_lat=23.858919157951956&sv_h=274.2305195506384&sv_p=-1.8940452090057107&sv_pid=mw-E3T4d8nEAAAQfCPVuUQ&sv_z=0.9999999999999997" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/wonder") {
      document.querySelectorAll('.artifact-card[data-emotion="wonder"]').forEach((card) => {
        const id = card.getAttribute("data-id");
        card.addEventListener("mouseenter", () => {
          AppState.markArtifactViewed("wonder", id);
        });
        const btn360 = card.querySelector(".experience-btn");
        if (btn360) {
          btn360.addEventListener("click", (ev) => {
            ev.stopPropagation();
            AppState.mark360Viewed("wonder", id);
            const imgUrl = btn360.getAttribute("data-img");
            const embedUrl = btn360.getAttribute("data-embed");
            // disabled open360 event
          });
        }
      });
      if (window.gsap) {
        gsap.fromTo(".gallery-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(
          ".artifact-card",
          { opacity: 0, scale: 0.9, rotationY: -15 },
          { opacity: 1, scale: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
        );
      }
    }
  });

  // js/views/courage.js
  function renderCourage() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/map">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/joy" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Courage \u{1F6E1}</h1>
                <p>The unyielding spirit of warriors and legendary forts.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="courage">
                    <div class="artifact-image" style="background-image: url('./assets/art6.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Rajputana Forts</h3>
                        <p>Impregnable bastions holding centuries of valor and siege history.</p>
                        <a href="https://youtu.be/eEFTIkq9VUA?si=Hi7laVoSTkGdOxKY" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="courage">
                    <div class="artifact-image" style="background-image: url('./assets/art7.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Maratha Empire</h3>
                        <p>Fierce cavalry and naval dominance under Chhatrapati Shivaji Maharaj.</p>
                        <a href="https://earth.google.com/web/search/raigad+fort/@18.2334802,73.44064497,868.85926138a,218.04171308d,35y,-0h,0t,0r/data=CmgaOhI0CiUweDNiZTgyODNlYjM4YjFjZTU6MHhmYzMxODI2YWQzNGE1YjcwKgtSYWlnYWQgRm9ydBgCIAEiJgokCePX_xCN6zNAEeLX_xCN6zPAGferlvcSUUlAIfWrlvcSUUnAQgIIAToDCgEwQgIIAEoNCP___________wEQAA" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="courage">
                    <div class="artifact-image" style="background-image: url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800');"></div>
                    <div class="artifact-info">
                        <h3>Freedom Struggle</h3>
                        <p>The relentless pursuit of independence by millions of brave souls.</p>
                        <a href="https://artsandculture.google.com/partner/india-photo-archive-foundation?hl=en" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/courage") {
      document.querySelectorAll('.artifact-card[data-emotion="courage"]').forEach((card) => {
        const id = card.getAttribute("data-id");
        card.addEventListener("mouseenter", () => {
          AppState.markArtifactViewed("courage", id);
        });
        const btn360 = card.querySelector(".experience-btn");
        if (btn360) {
          btn360.addEventListener("click", (ev) => {
            ev.stopPropagation();
            AppState.mark360Viewed("courage", id);
            const imgUrl = btn360.getAttribute("data-img");
            // disabled open360 event
          });
        }
      });
      if (window.gsap) {
        gsap.fromTo(".gallery-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(
          ".artifact-card",
          { opacity: 0, scale: 0.9, rotationX: 15 },
          { opacity: 1, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      }
    }
  });

  // js/views/joy.js
  function renderJoy() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/map">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/love" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Joy \u{1F389}</h1>
                <p>The vibrant colors of festivals and timeless celebrations.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="joy">
                    <div class="artifact-image" style="background-image: url('./assets/art11.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Colors of Holi</h3>
                        <p>A vintage depiction of the festival of colors, celebrating the triumph of good.</p>
                        <a href="https://youtu.be/FZ9ed-zDazk?si=-x7FJRDPjktmnMX4" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="joy">
                    <div class="artifact-image" style="background-image: url('./assets/art12.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Diwali Illuminations</h3>
                        <p>Ancient oil lamps lighting up the dark, symbolizing hope and joy.</p>
                        <a href="https://youtu.be/jQQ8DwKjKJI?si=MetLEMnp5Z2-D-Ka" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="joy">
                    <div class="artifact-image" style="background-image: url('./assets/art13.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Classical Dance Forms</h3>
                        <p>Bharatanatyam, Kathak, and Odissi\u2014expressing profound joy through movement.</p>
                        <a href="https://youtu.be/w0gamtoWxnE?si=SD_9LGGqX5OD619H" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/joy") {
      document.querySelectorAll('.artifact-card[data-emotion="joy"]').forEach((card) => {
        const id = card.getAttribute("data-id");
        card.addEventListener("mouseenter", () => {
          AppState.markArtifactViewed("joy", id);
        });
        const btn360 = card.querySelector(".experience-btn");
        if (btn360) {
          btn360.addEventListener("click", (ev) => {
            ev.stopPropagation();
            AppState.mark360Viewed("joy", id);
            const imgUrl = btn360.getAttribute("data-img");
            // disabled open360 event
          });
        }
      });
      if (window.gsap) {
        gsap.fromTo(".gallery-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(
          ".artifact-card",
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      }
    }
  });

  // js/views/love.js
  function renderLove() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/map">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/resilience" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Love \u2764\uFE0F</h1>
                <p>Tales of romance woven into art and architecture.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="love">
                    <div class="artifact-image" style="background-image: url('./assets/art8.png');"></div>
                    <div class="artifact-info">
                        <h3>Mughal Miniature Paintings</h3>
                        <p>Intricate, centuries-old art depicting epic tales of romance and courtly love.</p>
                        <a href="https://artsandculture.google.com/story/hwUB2ZXP7c1MLg" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="love">
                    <div class="artifact-image" style="background-image: url('./assets/art9.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Heer Ranjha Legends</h3>
                        <p>The tragic romance of Punjab, echoed through centuries of folk music.</p>
                        <a href="https://medium.com/@shariqbhai138/heer-ranjha-a-timeless-love-story-and-its-powerful-lessons-for-todays-world-7eb717fef424" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="love">
                    <div class="artifact-image" style="background-image: url('./assets/art10.png');"></div>
                    <div class="artifact-info">
                        <h3>The Poems of Meera Bai</h3>
                        <p>Immortal devotion and spiritual love etched in ancient manuscripts.</p>
                        <a href="https://www.poetryfoundation.org/poets/mirabai" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/love") {
      document.querySelectorAll('.artifact-card[data-emotion="love"]').forEach((card) => {
        const id = card.getAttribute("data-id");
        card.addEventListener("mouseenter", () => {
          AppState.markArtifactViewed("love", id);
        });
        const btn360 = card.querySelector(".experience-btn");
        if (btn360) {
          btn360.addEventListener("click", (ev) => {
            ev.stopPropagation();
            AppState.mark360Viewed("love", id);
            const imgUrl = btn360.getAttribute("data-img");
            // disabled open360 event
          });
        }
      });
      if (window.gsap) {
        gsap.fromTo(".gallery-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(
          ".artifact-card",
          { opacity: 0, scale: 0.9, rotationZ: 5 },
          { opacity: 1, scale: 1, rotationZ: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      }
    }
  });

  // js/views/resilience.js
  function renderResilience() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/map">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/hope" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Resilience \u{1F331}</h1>
                <p>Overcoming the darkest times to rise again.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="resilience">
                    <div class="artifact-image" style="background-image: url('./assets/art14.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Jallianwala Bagh</h3>
                        <p>A somber memorial of the tragic massacre that fueled the freedom movement.</p>
                        <a href="https://youtu.be/9cEAUxjA0rk?si=vxFRanCHsf-b7T2h" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="resilience">
                    <div class="artifact-image" style="background-image: url('./assets/art15.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Rebuilding After Earthquakes</h3>
                        <p>The remarkable survival and reconstruction of ancient temples across the subcontinent.</p>
                        <a href="https://youtube.com/shorts/-cdDE2IGock?si=_-Wp9lOXARFfn5wS" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="resilience">
                    <div class="artifact-image" style="background-image: url('./assets/art16.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Partition Archives</h3>
                        <p>Stories of profound loss, survival, and the enduring human spirit.</p>
                        <a href="https://youtu.be/u2cB-9uM90Y" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/resilience") {
      document.querySelectorAll('.artifact-card[data-emotion="resilience"]').forEach((card) => {
        const id = card.getAttribute("data-id");
        card.addEventListener("mouseenter", () => {
          AppState.markArtifactViewed("resilience", id);
        });
        const btn360 = card.querySelector(".experience-btn");
        if (btn360) {
          btn360.addEventListener("click", (ev) => {
            ev.stopPropagation();
            AppState.mark360Viewed("resilience", id);
            const imgUrl = btn360.getAttribute("data-img");
            // disabled open360 event
          });
        }
      });
      if (window.gsap) {
        gsap.fromTo(".gallery-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(
          ".artifact-card",
          { opacity: 0, scale: 0.9, x: -50 },
          { opacity: 1, scale: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      }
    }
  });

  // js/views/hope.js
  function renderHope() {
    return `
        <div class="gallery-container">
            <header class="gallery-header">
                <button class="back-btn interactive" data-link="/map">&#8592; Back to Museum Map</button>
                <button class="next-btn interactive" data-link="/quiz" style="position: absolute; right: 2rem; top: 2rem; background: transparent; color: var(--theme-color); border: 1px solid var(--theme-color); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; font-family: 'Lora', serif; font-weight: bold;">Go to Next Exhibit &rarr;</button>
                <h1 class="glow-text">Hope \u{1F305}</h1>
                <p>The dawn of a new era, carrying the legacy forward.</p>
            </header>

            <div class="artifacts-grid">
                <div class="artifact-card glass-panel interactive float-anim" data-id="1" data-emotion="hope">
                    <div class="artifact-image" style="background-image: url('./assets/art1.jpg');"></div>
                    <div class="artifact-info">
                        <h3>Varanasi Ghats at Dawn</h3>
                        <p>The eternal city waking up to the light, a symbol of spiritual rebirth.</p>
                        <a href="https://artsandculture.google.com/story/tAVBmspQUGinLw?hl=en" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>

                <div class="artifact-card glass-panel interactive float-anim" data-id="2" data-emotion="hope">
                    <div class="artifact-image" style="background-image: url('./assets/art2.jpg');"></div>
                    <div class="artifact-info">
                        <h3>The Bodhi Tree</h3>
                        <p>Where enlightenment was attained, spreading messages of peace and hope globally.</p>
                        <a href="https://youtu.be/FsWcaYZZ-zM?si=ckj_OK7MiCkIam1I" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
                
                <div class="artifact-card glass-panel interactive float-anim" data-id="3" data-emotion="hope">
                    <div class="artifact-image" style="background-image: url('./assets/art3.jpg'); background-position: top center;"></div>
                    <div class="artifact-info">
                        <h3>The Constitution of India</h3>
                        <p>The foundational manuscript promising justice, liberty, and equality.</p>
                        <a href="https://artsandculture.google.com/story/yQWhQ126iAYA8A" target="_blank" class="experience-btn interactive" style="display: inline-block; margin-top: 0.5rem; padding: 0.3rem 0.8rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-weight: bold; text-decoration: none;">Get Full Experience</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/hope") {
      document.querySelectorAll('.artifact-card[data-emotion="hope"]').forEach((card) => {
        const id = card.getAttribute("data-id");
        card.addEventListener("mouseenter", () => {
          AppState.markArtifactViewed("hope", id);
        });
        const btn360 = card.querySelector(".experience-btn");
        if (btn360) {
          btn360.addEventListener("click", (ev) => {
            ev.stopPropagation();
            AppState.mark360Viewed("hope", id);
            const imgUrl = btn360.getAttribute("data-img");
            // disabled open360 event
          });
        }
      });
      if (window.gsap) {
        gsap.fromTo(".gallery-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(
          ".artifact-card",
          { opacity: 0, scale: 0.9, y: -50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      }
    }
  });

  // js/views/start.js
  function renderStart() {
    return `
        <div class="gallery-container" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh;">
            <h1 class="glow-text" style="font-size: 3.5rem; margin-bottom: 1rem; text-align: center;">Welcome to Echoes</h1>
            <p style="font-size: 1.2rem; margin-bottom: 3rem; text-align: center; max-width: 600px; color: var(--text-secondary);">
                Before you begin your journey across the emotions of India, please register your group.
            </p>

            <div class="start-form glass-panel" style="padding: 3rem; width: 100%; max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem;">
                <div class="form-group">
                    <label for="userName" style="display: block; margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.1rem;">Lead Explorer Name</label>
                    <input type="text" id="userName" placeholder="Enter your name" class="interactive" style="width: 100%; padding: 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--panel-border); color: var(--text-primary); border-radius: 4px; font-family: 'Lora', serif; font-size: 1rem;" />
                </div>
                
                <div class="form-group">
                    <label for="memberCount" style="display: block; margin-bottom: 0.5rem; color: var(--text-primary); font-size: 1.1rem;">Number of Members</label>
                    <input type="number" id="memberCount" min="1" placeholder="e.g. 2" class="interactive" style="width: 100%; padding: 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--panel-border); color: var(--text-primary); border-radius: 4px; font-family: 'Lora', serif; font-size: 1rem;" />
                </div>

                <div class="fee-info" style="margin-top: 0.5rem; text-align: right; color: var(--text-secondary); font-size: 0.9rem; font-style: italic;">
                    (Entry fee for 1 person is Rs. 15)
                </div>
                <div class="fee-display" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.2rem; color: var(--text-secondary);">Total Entry Fee:</span>
                    <span id="totalFee" class="glow-text" style="font-size: 1.5rem; font-weight: bold; color: var(--theme-color);">Rs. 0</span>
                </div>
                
                <div id="form-error" style="color: #ff6b6b; font-weight: bold; font-size: 1.1rem; text-align: center; min-height: 1.5rem; display: none;"></div>

                <button id="startBtn" class="interactive" style="margin-top: 0.5rem; padding: 1rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-size: 1.1rem; font-weight: bold; font-family: 'Lora', serif; transition: transform 0.3s ease;">
                    Begin Journey
                </button>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/start") {
      const memberCountInput = document.getElementById("memberCount");
      const userNameInput = document.getElementById("userName");
      const totalFeeDisplay = document.getElementById("totalFee");
      const startBtn = document.getElementById("startBtn");
      const formError = document.getElementById("form-error");
      const showError = (msg) => {
        if (formError) {
          formError.textContent = msg;
          formError.style.display = "block";
          if (window.gsap) gsap.fromTo(formError, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
        }
      };
      if (memberCountInput && totalFeeDisplay) {
        memberCountInput.addEventListener("input", (e2) => {
          const count = parseInt(e2.target.value) || 0;
          const fee = count * 15;
          totalFeeDisplay.textContent = "Rs. " + fee;
          if (formError) formError.style.display = "none";
        });
        userNameInput.addEventListener("input", () => {
          if (formError) formError.style.display = "none";
        });
      }
      if (startBtn) {
        startBtn.addEventListener("click", () => {
          const name = userNameInput.value.trim();
          const count = parseInt(memberCountInput.value) || 0;
          if (!name) {
            showError("Please enter your Lead Explorer Name.");
            return;
          }
          if (count < 1) {
            showError("Please enter at least 1 member.");
            return;
          }
          AppState.userName = name;
          AppState.memberCount = count;
          navigateTo("/museum");
        });
      }
      if (window.gsap) {
        gsap.fromTo(
          ".start-form",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 }
        );
      }
    }
  });

  // js/views/quiz.js
  var questions = [
    {
      q: "Which monument is a pristine symbol of Wonder built from marble?",
      options: ["Ellora Caves", "Taj Mahal", "Stepwells"],
      ans: 1
    },
    {
      q: "The Maratha Empire represents which emotion in our journey?",
      options: ["Joy", "Love", "Courage"],
      ans: 2
    },
    {
      q: "Which festival celebrates Joy with vibrant colors?",
      options: ["Holi", "Diwali", "Navratri"],
      ans: 0
    },
    {
      q: "The Jallianwala Bagh memorial is a testament to what?",
      options: ["Resilience", "Hope", "Love"],
      ans: 0
    }
  ];
  function renderQuiz() {
    let html = `
        <div class="gallery-container" style="display: flex; flex-direction: column; align-items: center; min-height: 100vh;">
            <h1 class="glow-text" style="font-size: 3rem; margin-bottom: 2rem;">Journey Quiz</h1>
            <div id="quiz-container" class="glass-panel" style="padding: 2rem; width: 100%; max-width: 600px;">
    `;
    questions.forEach((q, i) => {
      html += `
            <div class="quiz-question" style="margin-bottom: 2rem;">
                <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem; color: var(--theme-color);">${i + 1}. ${q.q}</p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        `;
      q.options.forEach((opt, j) => {
        html += `
                <label style="font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                    <input type="radio" name="q${i}" value="${j}" />
                    ${opt}
                </label>
            `;
      });
      html += `</div></div>`;
    });
    html += `
                <button id="submit-quiz" class="interactive" style="width: 100%; padding: 1rem; background: var(--theme-color); color: #000; border: none; border-radius: 4px; font-size: 1.2rem; font-weight: bold; margin-top: 1rem;">Submit & Claim Certificate</button>
            </div>
        </div>
    `;
    return html;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/quiz") {
      const btn = document.getElementById("submit-quiz");
      if (btn) {
        btn.addEventListener("click", () => {
          let score = 0;
          let allAnswered = true;
          questions.forEach((q, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
              allAnswered = false;
            } else if (parseInt(selected.value) === q.ans) {
              score++;
            }
          });
          if (!allAnswered) {
            alert("Please answer all questions before submitting.");
            return;
          }
          AppState.quizCompleted = true;
          alert(`You scored ${score} out of ${questions.length}!`);
          navigateTo("/certificate");
        });
      }
      if (window.gsap) {
        gsap.fromTo("#quiz-container", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
      }
    }
  });

  // js/views/certificate.js
  function renderCertificate() {
    return `
        <div class="gallery-container" style="display: flex; flex-direction: column; align-items: center; min-height: 100vh;">
            <h1 class="glow-text" style="font-size: 3rem; margin-bottom: 1rem;">Congratulations!</h1>
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">You have successfully explored the Echoes of India.</p>
            
            <div id="certificate-wrapper" class="glass-panel" style="padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; max-width: 800px;">
                <canvas id="cert-canvas" width="800" height="600" style="width: 100%; max-width: 800px; border: 5px solid var(--theme-color); border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.8);"></canvas>
                <a id="download-cert" class="interactive" style="display: inline-block; padding: 1rem 2rem; background: var(--theme-color); color: #000; text-decoration: none; font-weight: bold; font-size: 1.2rem; border-radius: 4px; margin-top: 1rem;">Download Certificate</a>
            </div>
        </div>
    `;
  }
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/certificate") {
      const canvas = document.getElementById("cert-canvas");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, "#2a1b10");
        gradient.addColorStop(1, "#1a110a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#d4af37";
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
        ctx.strokeStyle = "#d4af37";
        ctx.lineWidth = 2;
        ctx.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);
        ctx.save();
        ctx.translate(canvas.width - 120, canvas.height - 60);
        ctx.beginPath();
        for (let i = 0; i < 30; i++) {
          const angle = i * Math.PI / 15;
          const r = i % 2 === 0 ? 45 : 40;
          ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fillStyle = "#d4af37";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fillStyle = "#b8860b";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = 'bold 12px "Lora", serif';
        ctx.textAlign = "center";
        ctx.fillText("ECHOES", 0, 4);
        ctx.restore();
        ctx.fillStyle = "#d4af37";
        ctx.textAlign = "center";
        ctx.font = 'bold 45px "Playfair Display", serif';
        ctx.fillText("CERTIFICATE OF EXPLORATION", canvas.width / 2, 110, canvas.width - 100);

        ctx.fillStyle = "#aaaaaa";
        ctx.font = '22px "Lora", serif';
        ctx.fillText("This certifies that", canvas.width / 2, 200);

        ctx.fillStyle = "#ffffff";
        ctx.font = 'italic bold 50px "Playfair Display", serif';
        const name = AppState.userName || "Valiant Explorer";
        ctx.fillText(name, canvas.width / 2, 280, canvas.width - 140);

        // Add decorative line under name
        const textWidth = ctx.measureText(name).width;
        const lineW = Math.min(textWidth + 60, canvas.width - 140);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - lineW / 2, 310);
        ctx.lineTo(canvas.width / 2 + lineW / 2, 310);
        ctx.strokeStyle = "#d4af37";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "#aaaaaa";
        ctx.font = '20px "Lora", serif';
        ctx.fillText("has successfully completed the immersive journey through", canvas.width / 2, 390, canvas.width - 100);

        ctx.fillStyle = "#d4af37";
        ctx.font = 'bold 34px "Playfair Display", serif';
        ctx.fillText("Echoes: A Museum of India's Emotions", canvas.width / 2, 450, canvas.width - 100);

        const date = (/* @__PURE__ */ new Date()).toLocaleDateString();
        ctx.fillStyle = "#888888";
        ctx.font = '16px "Lora", serif';
        ctx.fillText(`Date: ${date}`, canvas.width / 2, 540);
        const downloadBtn = document.getElementById("download-cert");
        if (downloadBtn) {
          downloadBtn.href = canvas.toDataURL("image/png");
          downloadBtn.download = `Echoes_Certificate_${name.replace(/\s+/g, "_")}.png`;
        }
      }
      if (window.gsap) {
        gsap.fromTo("#certificate-wrapper", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
      }
    }
  });

  // js/views/museum.js
  function renderMuseum() {
    const renderHotspot = (emotion, label, icon, top, left) => {
      const isUnlocked = AppState.isEmotionUnlocked(emotion);
      const lockIcon = isUnlocked ? "" : "\u{1F512} ";
      const cssClass = isUnlocked ? "interactive unlocked-region map-hotspot" : "locked-region map-hotspot";
      return `
            <div class="${cssClass}" style="position: absolute; top: ${top}%; left: ${left}%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem;" ${isUnlocked ? `data-link="/${emotion}"` : ""}>
                <div class="hotspot-pin" style="width: 20px; height: 20px; background: ${isUnlocked ? "var(--theme-color)" : "rgba(255,255,255,0.3)"}; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 10px ${isUnlocked ? "var(--theme-glow)" : "transparent"};"></div>
                <div class="hotspot-label" style="background: rgba(0,0,0,0.7); padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.9rem; color: ${isUnlocked ? "#fff" : "#888"}; white-space: nowrap; pointer-events: none;">${lockIcon}${icon} ${label}</div>
            </div>
        `;
    };
    return `
<div class="museum-wrapper">
    <!-- Navigation Ribbon -->
    <nav class="nav-ribbon">
        <div class="nav-brand">Museum of Emotions</div>
        <ul class="nav-links">
            <li><a href="#hero-text">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#exhibits">Exhibits</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#reviews" class="active">Leave a Review</a></li>
        </ul>
    </nav>

    <!-- Welcome Canopy -->
    <section class="hero-section" id="hero-text">
        <div class="hero-content">
            <h1>Where feelings find their architecture.</h1>
            <p>An experimental installation mapping the spaces within.</p>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Foundation</span>
            <h2 class="section-title">The Blueprint of Concept</h2>
        </div>
        
        <div class="about-carousel-viewport">
            <div class="about-carousel-slide slide-1">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>Our Mission</h4>
                    <p>To provide a tangible, architectural space mapping the intricate cartography of the human heart through raw volumetric structural arrangements.</p>
                </div>
            </div>
            <div class="about-carousel-slide slide-2">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>The Architecture</h4>
                    <p>Designed sensory installations meticulously crafted out of localized natural light, structural depth, stone texturing, and deliberate environmental airflows.</p>
                </div>
            </div>
            <div class="about-carousel-slide slide-3">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>The Experience</h4>
                    <p>Walk through structural paths curated to stir hidden internal memory layers, encourage personal reflection, and foster emotional clarity.</p>
                </div>
            </div>
            <div class="about-carousel-slide slide-4">
                <div class="slide-img-side"></div>
                <div class="slide-text-side">
                    <h4>Curator Note</h4>
                    <p>"We do not just build frames; we give material dimension to the quiet interior shifts that shape daily human experience."</p>
                </div>
            </div>
        </div>
        <p class="carousel-indicator-tip">\u2193 Scroll inside the frame to explore the blueprint \u2193</p>
    </section>

    <!-- Exhibits Section -->
    <section class="exhibits-section" id="exhibits">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Exhibitions</span>
            <h2 class="section-title">Active Wings Available</h2>
        </div>
        
        <div class="interactive-map-container" style="position: relative; width: 90vw; max-width: 1200px; margin: 2rem auto; aspect-ratio: 4/3; background: url('assets/rustic_india_map.png') center/cover; border: 2px solid var(--panel-border); border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
            ${renderHotspot("wonder", "Wonder", "\u2728", 30, 45)}
            ${renderHotspot("courage", "Courage", "\u{1F6E1}", 45, 30)}
            ${renderHotspot("joy", "Joy", "\u{1F389}", 55, 60)}
            ${renderHotspot("love", "Love", "\u2764\uFE0F", 75, 45)}
            ${renderHotspot("resilience", "Resilience", "\u{1F331}", 40, 75)}
            ${renderHotspot("hope", "Hope", "\u{1F305}", 85, 55)}

            <!-- Quiz hotspot, unlocked at the end -->
            ${AppState.isJourneyComplete() ? `
                <div class="map-hotspot interactive unlocked-region quiz-hotspot" style="position: absolute; top: 90%; left: 85%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem;" data-link="/quiz">
                    <div class="hotspot-pin" style="width: 25px; height: 25px; background: gold; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 15px gold;"></div>
                    <div class="hotspot-label" style="background: rgba(0,0,0,0.9); padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 1rem; color: gold; white-space: nowrap; font-weight: bold; pointer-events: none;">\u{1F3C6} Final Quiz</div>
                </div>
            ` : ""}
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section" id="gallery">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Archive</span>
            <h2 class="section-title">Atmospheric Studies</h2>
        </div>
        
        <div class="gallery-grid">
            <div class="gallery-item wide g-1">
                <div class="gallery-label">Jhansi Fort</div>
            </div>
            <div class="gallery-item tall g-2">
                <div class="gallery-label">Statue of Unity</div>
            </div>
            <div class="gallery-item g-3">
                <div class="gallery-label">Pushkar Camel Fair</div>
            </div>
            <div class="gallery-item g-4">
                <div class="gallery-label">Victoria Memorial</div>
            </div>
            <div class="gallery-item wide g-5">
                <div class="gallery-label">Cellular Jail</div>
            </div>
            <div class="gallery-item g-6">
                <div class="gallery-label">Vrindavan</div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section" id="reviews">
        <div class="section-heading-container">
            <span class="section-subtitle-tag">Testimonials</span>
            <h2 class="section-title">Visitor Reflections</h2>
        </div>

        <div class="review-carousel-container">
            <div class="review-track" id="review-track">
                <div class="review-card">
                    <p class="review-text">"The Hall of Sorrow completely recalibrated my understanding of minimalist architecture. Breathtaking."</p>
                    <span class="review-author">\u2014 Elena R., Athens</span>
                </div>
                <div class="review-card">
                    <p class="review-text">"Walking through the reflection pools brought a stillness I haven\u2019t encountered in modern galleries anywhere else."</p>
                    <span class="review-author">\u2014 Julian K., Copenhagen</span>
                </div>
                <div class="review-card">
                    <p class="review-text">"A masterclass in environmental curation. The color palettes and structural airflows truly tell a story."</p>
                    <span class="review-author">\u2014 Mateo B., Valencia</span>
                </div>
            </div>
        </div>

        <div class="review-controls">
            <button class="rev-btn" id="rev-left">&#10094;</button>
            <button class="rev-btn" id="rev-right">&#10095;</button>
        </div>

        <!-- Submission Cluster Box -->
        <div class="review-form-wrapper">
            <h4>Leave a Reflection</h4>
            <div class="form-cluster">
                <textarea id="user-review-text" class="input-element" placeholder="Share your experience within the installations..."></textarea>
                <input type="text" id="user-review-name" class="input-element" placeholder="Your Name & Origin (e.g., Sophia M., Rome)">
                <button class="submit-review-btn" id="submit-review-btn">Submit Reflection</button>
            </div>
        </div>
    </section>

    <!-- Custom System Modal Overlay Toast -->
    <div class="custom-toast-overlay" id="custom-toast">
        <div class="toast-box">
            <h5 id="toast-title">Thank You</h5>
            <p id="toast-message">Your artistic perspective has been permanently cataloged into our active visitor archive tracks.</p>
            <button class="toast-close-btn" id="toast-close-btn">Close View</button>
        </div>
    </div>

    <!-- Contextual Information Footer -->
    <footer>
        <div class="footer-wrapper">
            <div class="footer-content">
                <h3>Museum of Emotions</h3>
                <p>1044 Sentient Boulevard, District of Sentiments</p>
                <p>Email: contact@museumofemotions.fic | Phone: +91 98765 43210</p>
                <p>Open Tuesday through Sunday from 10:00 AM to 8:00 PM. Closed major holidays.</p>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Museum of Emotions. Handcrafted architectural presentation interface.
            </div>
        </div>
    </footer>
</div>
    `;
  }
  var autoScrollTimer = null;
  var scrollListener = null;
  document.addEventListener("viewRendered", (e) => {
    if (e.detail.path === "/museum") {
      let updateReviewPosition = function () {
        if (reviewTrack) {
          reviewTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
        }
      }, nextReview = function () {
        let totalReviews = document.querySelectorAll(".review-card").length;
        if (totalReviews > 0) {
          activeIndex = (activeIndex + 1) % totalReviews;
          updateReviewPosition();
        }
      }, prevReview = function () {
        let totalReviews = document.querySelectorAll(".review-card").length;
        if (totalReviews > 0) {
          activeIndex = (activeIndex - 1 + totalReviews) % totalReviews;
          updateReviewPosition();
        }
      }, resetAutoScroll = function () {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(nextReview, 5e3);
      };
      const heroText = document.getElementById("hero-text");
      const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
      navLinks.forEach((link) => {
        link.addEventListener("click", function (ev) {
          ev.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
      scrollListener = () => {
        let scrollVal = window.scrollY;
        let windowHeight = window.innerHeight;
        if (scrollVal <= windowHeight && heroText) {
          let opacityFactor = 1 - scrollVal / (windowHeight * 0.5);
          let transformFactor = scrollVal * 0.35;
          heroText.style.opacity = Math.max(opacityFactor, 0);
          heroText.style.transform = `translateY(-${transformFactor}px)`;
        }
      };
      window.addEventListener("scroll", scrollListener);
      if (window.gsap && window.ScrollTrigger) {
        gsap.fromTo(
          ".interactive-map-container",
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: ".interactive-map-container",
              start: "top 80%"
            }
          }
        );
        gsap.fromTo(
          ".map-hotspot",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: ".interactive-map-container",
              start: "top 75%"
            }
          }
        );
      }
      const reviewTrack = document.getElementById("review-track");
      const revLeft = document.getElementById("rev-left");
      const revRight = document.getElementById("rev-right");
      let activeIndex = 0;
      if (revRight) {
        revRight.addEventListener("click", () => {
          nextReview();
          resetAutoScroll();
        });
      }
      if (revLeft) {
        revLeft.addEventListener("click", () => {
          prevReview();
          resetAutoScroll();
        });
      }
      resetAutoScroll();
      const submitBtn = document.getElementById("submit-review-btn");
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          const textField = document.getElementById("user-review-text");
          const nameField = document.getElementById("user-review-name");
          const reviewText = textField.value.trim();
          const authorName = nameField.value.trim();

          if (!reviewText || !authorName) {
            alert("Please fill in both fields before submitting your reflection.");
            return;
          }
          const newCard = document.createElement("div");
          newCard.className = "review-card";
          newCard.innerHTML = `
                    <p class="review-text">"${reviewText}"</p>
                    <span class="review-author">\u2014 ${authorName}</span>
                `;
          if (reviewTrack) reviewTrack.appendChild(newCard);
          const toastOverlay = document.getElementById("custom-toast");
          const toastTitle = document.getElementById("toast-title");
          const rawFirstName = authorName.split(",")[0].split(" ")[0];
          if (toastTitle) toastTitle.innerText = `Thank You, ${rawFirstName}`;
          if (toastOverlay) toastOverlay.classList.add("active");
          textField.value = "";
          nameField.value = "";
          let totalReviews = document.querySelectorAll(".review-card").length;
          activeIndex = totalReviews - 1;
          updateReviewPosition();
          resetAutoScroll();
        });
      }
      const closeToastBtn = document.getElementById("toast-close-btn");
      if (closeToastBtn) {
        closeToastBtn.addEventListener("click", () => {
          const toastOverlay = document.getElementById("custom-toast");
          if (toastOverlay) toastOverlay.classList.remove("active");
        });
      }
    } else {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
      if (scrollListener) {
        window.removeEventListener("scroll", scrollListener);
        scrollListener = null;
      }
    }
  });

  // js/router.js
  var routes = {
    "/start": renderStart,
    "/": renderMuseum,
    "/wonder": renderWonder,
    "/courage": renderCourage,
    "/joy": renderJoy,
    "/love": renderLove,
    "/resilience": renderResilience,
    "/hope": renderHope,
    "/quiz": renderQuiz,
    "/certificate": renderCertificate,
    "/museum": renderMuseum,
    "/map": renderMuseum
  };
  var themes = {
    "/start": "entrance",
    "/": "museum",
    "/wonder": "wonder",
    "/courage": "courage",
    "/joy": "joy",
    "/love": "love",
    "/resilience": "resilience",
    "/hope": "hope",
    "/quiz": "entrance",
    "/certificate": "entrance",
    "/museum": "museum",
    "/map": "museum"
  };
  async function navigateTo(url) {
    try {
      history.pushState(null, null, url);
    } catch (e) { }
    window.__currentRoute = url;
    await renderView();
  }
  async function renderView() {
    let path = window.__currentRoute || window.location.pathname;
    const lastPart = path.split('/').pop();

    if (path.endsWith(".html") || path === "/Echoes/") {
      path = "/start";
    } else if (lastPart && routes["/" + lastPart]) {
      path = "/" + lastPart;
    } else if (path.includes("/museum")) {
      path = "/museum";
    }

    // Allow / to remain / so Home link scrolls to top, while /museum scrolls to exhibits

    let routeFunc = routes[path] || routes["/start"];
    const appRoot = document.getElementById("app-root");
    if (appRoot.innerHTML.trim() !== "") {
      appRoot.classList.add("view-exit-active");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    const newTheme = themes[path] || themes["/start"];
    document.body.setAttribute("data-theme", newTheme);
    appRoot.innerHTML = routeFunc();
    if (path === "/map") {
      setTimeout(() => {
        const exhibits = document.getElementById("exhibits");
        if (exhibits) {
          exhibits.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    appRoot.classList.remove("view-exit-active");
    appRoot.classList.add("view-enter");
    void appRoot.offsetWidth;
    appRoot.classList.remove("view-enter");
    appRoot.classList.add("view-enter-active");
    setTimeout(() => {
      appRoot.classList.remove("view-enter-active");
      const event = new CustomEvent("viewRendered", { detail: { path } });
      document.dispatchEvent(event);
    }, 800);
  }

  // js/main.js
  initCursor();
  renderView();
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      const url = link.getAttribute("data-link");
      navigateTo(url);
    }
  });
  window.addEventListener("popstate", renderView);
  var viewer = null;
  document.addEventListener("open360", (e) => {
    const { imgUrl, embedUrl } = e.detail;
    const modal = document.getElementById("viewer-modal");
    const panoDiv = document.getElementById("panorama");
    modal.style.display = "block";
    if (viewer) {
      viewer.destroy();
      viewer = null;
    }
    panoDiv.innerHTML = "";
    if (embedUrl) {
      const iframeContainer = document.createElement("div");
      iframeContainer.style.width = "100%";
      iframeContainer.style.height = "100%";
      iframeContainer.style.overflow = "hidden";
      iframeContainer.style.position = "relative";
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.style.position = "absolute";
      iframe.style.top = "-50px";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "calc(100% + 180px)";
      iframe.frameBorder = "0";
      iframe.setAttribute("allowfullscreen", "true");
      iframeContainer.appendChild(iframe);
      panoDiv.appendChild(iframeContainer);
    } else if (imgUrl) {
      viewer = pannellum.viewer("panorama", {
        type: "equirectangular",
        panorama: imgUrl,
        autoLoad: true,
        compass: false,
        showZoomCtrl: false
      });
    }
  });
  document.getElementById("close-viewer").addEventListener("click", () => {
    document.getElementById("viewer-modal").style.display = "none";
    if (viewer) {
      viewer.destroy();
      viewer = null;
    }
    document.getElementById("panorama").innerHTML = "";
  });
  function showNotification(msg) {
    const el = document.getElementById("notification-overlay");
    el.innerHTML = msg;
    el.style.display = "block";
    if (window.gsap) {
      gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
      setTimeout(() => {
        gsap.to(el, {
          y: 50, opacity: 0, duration: 0.5, onComplete: () => {
            el.style.display = "none";
          }
        });
      }, 4e3);
    } else {
      setTimeout(() => {
        el.style.display = "none";
      }, 4e3);
    }
  }
  document.addEventListener("regionUnlocked", (e) => {
    const regionName = e.detail.newRegion.charAt(0).toUpperCase() + e.detail.newRegion.slice(1);
    // removed notification
  });
  document.addEventListener("journeyComplete", () => {
    showNotification(`Journey Complete! The Final Quiz is now unlocked on the Map.`);
  });
  function spawnDustParticles() {
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "dust-particle";
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 25;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `-${delay}s`;
      document.body.appendChild(particle);
    }
  }
  spawnDustParticles();
})();
