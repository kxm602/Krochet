import foundationChainStep1 from "./assets/foundationChainStep1.jpeg";
import foundationChainStep2 from "./assets/foundationChainStep2.jpeg";
import foundationChainStep3 from "./assets/foundationChainStep3.jpeg";
import sc1 from "./assets/sc1.png";
import sc2 from "./assets/sc2.png";
import sc3 from "./assets/sc3.png";
import dc1 from "./assets/dc1.png";
import dc2 from "./assets/dc2.png";
import dc3 from "./assets/dc3.png";
import dc4 from "./assets/dc4.png";
import tr1 from "./assets/tr1.png";
import tr2 from "./assets/tr2.png";
import tr3 from "./assets/tr3.png";
import mr1 from "./assets/mr1.png";
import mr2 from "./assets/mr2.png";
import mr3 from "./assets/mr3.png";
import mr4 from "./assets/mr4.png";
import mr5 from "./assets/mr5.png";


const app = document.querySelector("#app");
const howToButtons = document.querySelectorAll(".howto-btn");
const patternsGrid = document.querySelector("#patternsGrid");
const projectsGrid = document.querySelector("#projectsGrid");
const socialGrid = document.querySelector("#socialGrid");
const PROJECTS_STORAGE_KEY = "krochet.projects.v1";
const SOCIAL_STORAGE_KEY = "krochet.social.v1";
const CUSTOM_PATTERNS_STORAGE_KEY = "krochet.custom-patterns.v1";
const PATTERNS_DATA_URL = `${import.meta.env.BASE_URL}patterns.json`;

const tutorials = {
    "foundation-chain": {
        title: "How To Create Foundation Chain",
        intro: "A strong chain gives your project the right width and flexibility.",
        steps: [
            {
                title: "Step 1: Make a slip knot",
                description:
                    "Create a loop, pull the working yarn through, and tighten gently on your hook.",
                image: foundationChainStep1,
            },
            {
                title: "Step 2: Yarn over",
                description:
                    "Wrap the yarn from back to front over the hook for each chain stitch.",
                image: foundationChainStep2,
            },
            {
                title: "Step 3: Pull through",
                description:
                    "Pull the yarn-over through the loop on your hook. Repeat until you reach your stitch count.",
                image: foundationChainStep3,
            },
        ],
        video: "https://youtu.be/O8ZQNvY-9FY?t=4",
        videoPage:
            "https://youtu.be/O8ZQNvY-9FY?t=4",
    },
    "single-crochet": {
        title: "How To Create Single Crochet (SC)",
        intro: "Single crochet makes a tight, neat fabric that is great for many beginner projects.",
        steps: [
            {
                title: "Step 1: Insert hook",
                description: "Insert your hook into the next stitch from front to back.",
                image: sc1,
            },
            {
                title: "Step 2: Yarn over and pull up a loop",
                description: "Yarn over, pull through the stitch. You now have two loops on the hook.",
                image: sc2,
            },
            {
                title: "Step 3: Yarn over and finish",
                description: "Yarn over again and pull through both loops on your hook.",
                image: sc3,
            },
        ],
        video: "https://youtu.be/7oSOQ_8l6O8?t=3",
    },
    "double-crochet": {
        title: "How To Create Double Crochet (DC)",
        intro: "Double crochet is taller than single crochet and works up quickly.",
        steps: [
            {
                title: "Step 1: Yarn over first",
                description: "Yarn over once before inserting your hook in the next stitch.",
                image: dc1,
            },
            {
                title: "Step 2: Pull up a loop",
                description: "Insert hook, yarn over, and pull up a loop. You now have three loops.",
                image: dc2,
            },
            {
                title: "Step 3: Two pull-throughs",
                description:
                    "Yarn over and pull through two loops",
                image: dc3,
            },
            {
                title: "Step 4: Last pull-throughs",
                description:
                    "Yarn over again and pull through the last two loops.",
                image: dc4,
            },
        ],
        video: "https://youtu.be/y3okh5TB90c?t=129",
    },
    "treble-crochet": {
        title: "How To Create Treble Crochet (TC)",
        intro: "Treble crochet adds height and airy texture to your rows.",
        steps: [
            {
                title: "Step 1: Yarn over twice",
                description: "Wrap yarn over the hook two times before inserting into the stitch.",
                image: tr1,
            },
            {
                title: "Step 2: Insert and pull up",
                description: "Insert hook, yarn over, and pull up a loop. You should have four loops.",
                image: tr2,
            },
            {
                title: "Step 3: Pull through in sets of two",
                description:
                    "Yarn over and pull through two loops three times until one loop remains.",
                image: tr3,
            },
        ],
        video: "https://www.youtube.com/watch?v=3KtzjAAZHVY",
    },
    "magic-ring": {
        title: "How To Create Magic Ring",
        intro: "The magic ring starts round projects with a tidy, adjustable center.",
        steps: [
            {
                title: "Step 1: Wrap yarn around fingers",
                description:
                    "Create an X shape with the yarn tail over the working yarn to form the ring.",
                image: mr1,
            },
            {
                title: "Step 2: Make up a loop",
                description:
                    "Insert hook under the first strand",
                image: mr2,
            },
            {
                title: "Step 3: Pull up a loop",
                description:
                    "Grab the second strand, and pull up a loop.",
                image: mr3,
            },
            {
                title: "Step 4: Crochet into the ring",
                description:
                    "Work your starting stitches into the ring",
                image: mr4,
            },
            {
                title: "Step 5: Crochet into the ring and tighten",
                description:
                    "Add more stitches if needed, then pull the tail to close the center.",
                image: mr5,
            },
        ],
        video: "https://youtu.be/zsWmVcp9RMU?t=55",
    },
};

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getSafePatternImageUrl(value) {
    if (!value) {
        return "";
    }

    if (/^data:image\/(?:jpeg|png|webp);base64,/i.test(value)) {
        return value;
    }

    try {
        const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);
        const url = new URL(value, appBaseUrl);
        if (!["http:", "https:"].includes(url.protocol)) {
            return "";
        }
        return url.toString();
    } catch {
        return "";
    }
}

function buildStepCards(steps) {
    return steps
        .map(
            (step) => `
                <article class="step-card">
                    <img src="${step.image}" alt="${escapeHtml(step.title)} image" loading="lazy" />
                    <div>
                        <h3 class="step-title">${escapeHtml(step.title)}</h3>
                        <p class="step-copy">${escapeHtml(step.description)}</p>
                    </div>
                </article>
            `,
        )
        .join("");
}

function closeModal() {
    const openModal = document.querySelector(".modal-backdrop");
    if (!openModal) {
        return;
    }
    openModal.remove();
    document.body.classList.remove("modal-open");
}

function loadProjects() {
    try {
        const projects = JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY) || "[]");
        return Array.isArray(projects) ? projects : [];
    } catch {
        return [];
    }
}

function saveProjects(projects) {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function loadCustomPatterns() {
    try {
        const patterns = JSON.parse(localStorage.getItem(CUSTOM_PATTERNS_STORAGE_KEY) || "[]");
        return Array.isArray(patterns) ? patterns : [];
    } catch {
        return [];
    }
}

function saveCustomPatterns(patterns) {
    try {
        localStorage.setItem(CUSTOM_PATTERNS_STORAGE_KEY, JSON.stringify(patterns));
        return true;
    } catch {
        return false;
    }
}

function exportCustomPatterns() {
    const patterns = loadCustomPatterns();
    if (!patterns.length) {
        return false;
    }

    const exportData = {
        format: "krochet-pattern-export",
        version: 1,
        exportedAt: new Date().toISOString(),
        patterns,
    };
    const now = new Date();
    const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `krochet-patterns-${date}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    return true;
}

function loadAllPatterns() {
    return fetch(PATTERNS_DATA_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load pattern data");
            }
            return response.json();
        })
        .then((patterns) => {
            const repositoryPatterns = patterns.map((pattern) => ({
                ...pattern,
                isCustom: false,
            }));
            const repositoryIds = new Set(repositoryPatterns.map((pattern) => pattern.id));
            const storedPatterns = loadCustomPatterns();
            const browserOnlyPatterns = storedPatterns
                .filter((pattern) => !repositoryIds.has(pattern.id))
                .map((pattern) => ({ ...pattern, isCustom: true }));

            if (browserOnlyPatterns.length !== storedPatterns.length) {
                saveCustomPatterns(browserOnlyPatterns);
            }

            return [...browserOnlyPatterns, ...repositoryPatterns];
        });
}

function startProject(pattern) {
    const projects = loadProjects();
    const existingProject = projects.find((project) => project.patternId === pattern.id);

    if (existingProject) {
        return existingProject;
    }

    const project = {
        patternId: pattern.id,
        rowCount: 0,
        stitchCount: 0,
        instructionIndex: 0,
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    projects.unshift(project);
    saveProjects(projects);
    return project;
}

function updateProject(patternId, changes) {
    const projects = loadProjects();
    const projectIndex = projects.findIndex((project) => project.patternId === patternId);
    if (projectIndex === -1) {
        return null;
    }

    projects[projectIndex] = {
        ...projects[projectIndex],
        ...changes,
        updatedAt: new Date().toISOString(),
    };
    saveProjects(projects);
    return projects[projectIndex];
}

function getYouTubeEmbedUrl(videoUrl) {
    try {
        const url = new URL(videoUrl);
        const host = url.hostname.replace("www.", "");

        if (host === "youtu.be") {
            const videoId = url.pathname.slice(1);
            if (!videoId) {
                return null;
            }

            const startAt = url.searchParams.get("t");
            const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
            if (startAt) {
                embed.searchParams.set("start", startAt.replace(/s$/, ""));
            }
            return embed.toString();
        }

        if (host === "youtube.com" || host === "m.youtube.com") {
            if (url.pathname.startsWith("/embed/")) {
                return videoUrl;
            }

            if (url.pathname === "/watch") {
                const videoId = url.searchParams.get("v");
                if (!videoId) {
                    return null;
                }

                const startAt = url.searchParams.get("t");
                const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
                if (startAt) {
                    embed.searchParams.set("start", startAt.replace(/s$/, ""));
                }
                return embed.toString();
            }
        }
    } catch {
        return null;
    }

    return null;
}

function openTutorialModal(tutorialKey) {
    const lesson = tutorials[tutorialKey];
    if (!lesson) {
        return;
    }

    closeModal();

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", lesson.title);

    const youTubeEmbedUrl = getYouTubeEmbedUrl(lesson.video);
    const isEmbedVideo = Boolean(youTubeEmbedUrl);
    const sourceLink = lesson.videoPage || lesson.video;
    const videoMarkup = isEmbedVideo
        ? `
                <iframe
                    class="video-frame"
                    src="${youTubeEmbedUrl}"
                    title="${escapeHtml(lesson.title)} video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            `
        : `
                <video class="video-player" controls preload="metadata">
                    <source src="${lesson.video}" type="video/mp4" />
                    Your browser does not support HTML5 video playback.
                </video>
            `;

    modal.innerHTML = `
        <div class="modal-panel" role="document">
            <div class="modal-head">
                <h2 class="modal-title">${escapeHtml(lesson.title)}</h2>
                <button type="button" class="modal-close" aria-label="Close tutorial">Close</button>
            </div>
            <p class="modal-intro">${escapeHtml(lesson.intro)}</p>
            <section class="modal-steps">
                ${buildStepCards(lesson.steps)}
            </section>
            <section class="lesson-video" aria-label="Video lesson">
                <h3>Watch the full tutorial</h3>
                ${videoMarkup}
                <p class="video-help-link">
                    If the player does not load, open it directly:
                    <a href="${sourceLink}" target="_blank" rel="noopener noreferrer">Watch source video</a>
                </p>
            </section>
        </div>
    `;

    modal.addEventListener("click", (event) => {
        const clickedBackdrop = event.target === modal;
        const clickedCloseButton = event.target.closest(".modal-close");
        if (clickedBackdrop || clickedCloseButton) {
            closeModal();
        }
    });

    document.body.append(modal);
    document.body.classList.add("modal-open");
}

function patternCardTemplate(pattern) {
    const tags = pattern.tags
        .map((tag) => `<span class="pattern-tag">${escapeHtml(tag)}</span>`)
        .join("");

    const imageUrl = getSafePatternImageUrl(pattern.image);
    const imageMarkup = imageUrl
        ? `<img class="pattern-card-image" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(pattern.title)}" loading="lazy" />`
        : '<div class="pattern-card-image pattern-card-image-placeholder" aria-hidden="true"></div>';
    const customActions = pattern.isCustom
        ? `
                <div class="pattern-owner-actions" aria-label="Manage ${escapeHtml(pattern.title)}">
                    <button class="pattern-manage-button pattern-edit" type="button" data-pattern-id="${escapeHtml(pattern.id)}">Edit</button>
                    <button class="pattern-manage-button danger pattern-remove" type="button" data-pattern-id="${escapeHtml(pattern.id)}">Remove</button>
                </div>
            `
        : "";

    return `
        <article class="pattern-card">
            <div class="pattern-card-media">
                ${imageMarkup}
                ${customActions}
                <header class="pattern-head pattern-card-heading">
                    <h3>${escapeHtml(pattern.title)}</h3>
                    <span class="pattern-pill">${escapeHtml(pattern.difficulty)}</span>
                </header>
            </div>
            <div class="pattern-card-footer">
                <div class="pattern-tags">${tags}</div>
                <button class="btn pattern-open" type="button" data-pattern-id="${escapeHtml(pattern.id)}">
                    View Pattern Steps
                </button>
            </div>
        </article>
    `;
}

function openPatternModal(pattern) {
    if (!pattern) {
        return;
    }

    closeModal();

    const materialsMarkup = (pattern.materials || [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
    const instructionsMarkup = (pattern.instructions || [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
    const isStarted = loadProjects().some((project) => project.patternId === pattern.id);

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", pattern.title);

    modal.innerHTML = `
        <div class="modal-panel" role="document">
            <div class="modal-head">
                <h2 class="modal-title">${escapeHtml(pattern.title)}</h2>
                <button type="button" class="modal-close" aria-label="Close pattern">Close</button>
            </div>
            <p class="modal-intro">${escapeHtml(pattern.description)}</p>
            <p class="pattern-meta"><strong>${escapeHtml(pattern.category)}</strong> • ${escapeHtml(pattern.difficulty)} • ${escapeHtml(pattern.yarnWeight)} yarn</p>
            <section class="pattern-modal-block" aria-label="Materials">
                <h3>Materials</h3>
                <ul class="pattern-list">${materialsMarkup}</ul>
            </section>
            <section class="pattern-modal-block" aria-label="Instructions">
                <h3>Step-by-step instructions</h3>
                <ol class="pattern-list">${instructionsMarkup}</ol>
            </section>
            <div class="pattern-project-action">
                <button class="btn primary project-start" type="button" ${isStarted ? "disabled" : ""}>
                    ${isStarted ? "Project In Progress" : "Start Project"}
                </button>
                <a class="btn project-resume" href="projects.html" ${isStarted ? "" : "hidden"}>Open Projects</a>
            </div>
            <p class="pattern-license">${escapeHtml(pattern.licenseNote)}</p>
        </div>
    `;

    const startButton = modal.querySelector(".project-start");
    startButton.addEventListener("click", () => {
        startProject(pattern);
        startButton.disabled = true;
        startButton.textContent = "Opening Project…";
        window.location.href = `projects.html?project=${encodeURIComponent(pattern.id)}`;
    });

    modal.addEventListener("click", (event) => {
        const clickedBackdrop = event.target === modal;
        const clickedCloseButton = event.target.closest(".modal-close");
        if (clickedBackdrop || clickedCloseButton) {
            closeModal();
        }
    });

    document.body.append(modal);
    document.body.classList.add("modal-open");
}

function projectCardTemplate(project, pattern) {
    const instructionIndex = Math.min(
        Math.max(project.instructionIndex || 0, 0),
        Math.max(pattern.instructions.length - 1, 0),
    );
    const currentInstruction = pattern.instructions[instructionIndex] || "Review the pattern instructions.";
    const imageUrl = getSafePatternImageUrl(pattern.image);
    const imageMarkup = imageUrl
        ? `<img class="project-card-image" src="${escapeHtml(imageUrl)}" alt="" loading="lazy" />`
        : "";

    return `
        <article class="project-card">
            ${imageMarkup}
            <div class="project-card-content">
                <div class="project-card-topline">
                    <span class="pattern-pill">${escapeHtml(pattern.difficulty)}</span>
                    <span class="project-updated">Saved on this device</span>
                </div>
                <h3>${escapeHtml(pattern.title)}</h3>
                <p class="pattern-meta"><strong>${escapeHtml(pattern.category)}</strong> • ${escapeHtml(pattern.yarnWeight)} yarn</p>
                <div class="project-stats" aria-label="Current progress">
                    <span><strong>${project.rowCount || 0}</strong> rows</span>
                    <span><strong>${project.stitchCount || 0}</strong> stitches</span>
                    <span><strong>${instructionIndex + 1}</strong> of ${pattern.instructions.length} steps</span>
                </div>
                <div class="project-next">
                    <span>Next step</span>
                    <p>${escapeHtml(currentInstruction)}</p>
                </div>
                <button class="btn primary project-resume-button" type="button" data-pattern-id="${escapeHtml(pattern.id)}">
                    Resume Project
                </button>
            </div>
        </article>
    `;
}

function openProjectModal(project, pattern, onProgressChange) {
    closeModal();
    let fullPatternVisible = false;

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", `Resume ${pattern.title}`);

    const render = () => {
        const instructionIndex = Math.min(
            Math.max(project.instructionIndex || 0, 0),
            Math.max(pattern.instructions.length - 1, 0),
        );
        const currentInstruction = pattern.instructions[instructionIndex] || "Review the pattern instructions.";
        const followingInstruction = pattern.instructions[instructionIndex + 1];
        const fullPatternMarkup = pattern.instructions
            .map(
                (instruction, index) => `
                    <li class="full-pattern-step ${index === instructionIndex ? "current" : ""}">
                        <span>Step ${index + 1}</span>
                        <p>${escapeHtml(instruction)}</p>
                        ${index === instructionIndex ? '<strong class="current-step-label">Current step</strong>' : ""}
                    </li>
                `,
            )
            .join("");

        modal.innerHTML = `
            <div class="modal-panel project-modal" role="document">
                <div class="modal-head">
                    <div>
                        <span class="eyebrow">In progress</span>
                        <h2 class="modal-title">${escapeHtml(pattern.title)}</h2>
                    </div>
                    <button type="button" class="modal-close" aria-label="Close project">Close</button>
                </div>

                <div class="counter-grid">
                    ${counterTemplate("row", "Rows", project.rowCount || 0)}
                    ${counterTemplate("stitch", "Stitches", project.stitchCount || 0)}
                </div>

                <button class="btn full-pattern-toggle" type="button" aria-expanded="${fullPatternVisible}">
                    ${fullPatternVisible ? "Back to Current Step" : "View Full Pattern"}
                </button>

                ${fullPatternVisible ? `
                    <section class="full-pattern-panel" aria-labelledby="fullPatternHeading">
                        <div class="project-step-heading">
                            <span>All ${pattern.instructions.length} steps</span>
                            <h3 id="fullPatternHeading">Full pattern</h3>
                        </div>
                        <ol class="full-pattern-list">${fullPatternMarkup}</ol>
                    </section>
                ` : `
                    <section class="project-step-panel" aria-labelledby="currentStepHeading">
                        <div class="project-step-heading">
                            <span>Step ${instructionIndex + 1} of ${pattern.instructions.length}</span>
                            <h3 id="currentStepHeading">Where you left off</h3>
                        </div>
                        <p class="project-current-instruction">${escapeHtml(currentInstruction)}</p>
                        ${followingInstruction ? `<p class="project-following"><strong>Coming next:</strong> ${escapeHtml(followingInstruction)}</p>` : `<p class="project-following"><strong>Final step:</strong> You are at the end of this pattern.</p>`}
                        <div class="project-step-actions">
                            <button class="btn instruction-change" type="button" data-change="-1" ${instructionIndex === 0 ? "disabled" : ""}>Previous Step</button>
                            <button class="btn primary instruction-change" type="button" data-change="1" ${instructionIndex >= pattern.instructions.length - 1 ? "disabled" : ""}>Next Step</button>
                        </div>
                    </section>
                `}
            </div>
        `;

        modal.querySelector(".modal-close").addEventListener("click", closeModal);
        modal.querySelector(".full-pattern-toggle").addEventListener("click", () => {
            fullPatternVisible = !fullPatternVisible;
            render();
        });

        for (const button of modal.querySelectorAll(".counter-change")) {
            button.addEventListener("click", () => {
                const field = button.dataset.counter === "row" ? "rowCount" : "stitchCount";
                const nextValue = Math.max(0, (project[field] || 0) + Number(button.dataset.change));
                project = updateProject(pattern.id, { [field]: nextValue });
                onProgressChange();
                render();
            });
        }

        for (const button of modal.querySelectorAll(".counter-reset")) {
            button.addEventListener("click", () => {
                const field = button.dataset.counter === "row" ? "rowCount" : "stitchCount";
                project = updateProject(pattern.id, { [field]: 0 });
                onProgressChange();
                render();
            });
        }

        for (const button of modal.querySelectorAll(".instruction-change")) {
            button.addEventListener("click", () => {
                const nextIndex = Math.min(
                    Math.max(instructionIndex + Number(button.dataset.change), 0),
                    pattern.instructions.length - 1,
                );
                project = updateProject(pattern.id, { instructionIndex: nextIndex });
                onProgressChange();
                render();
            });
        }
    };

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    render();
    document.body.append(modal);
    document.body.classList.add("modal-open");
}

function counterTemplate(counter, label, value) {
    return `
        <section class="counter-panel" aria-label="${label} counter">
            <span>${label}</span>
            <strong aria-live="polite">${value}</strong>
            <div class="counter-actions">
                <button class="counter-button counter-change" type="button" data-counter="${counter}" data-change="-1" aria-label="Decrease ${label.toLowerCase()}">−</button>
                <button class="counter-button counter-change" type="button" data-counter="${counter}" data-change="1" aria-label="Increase ${label.toLowerCase()}">+</button>
            </div>
            <button class="counter-reset" type="button" data-counter="${counter}">Reset ${label}</button>
        </section>
    `;
}

function applyPatternFilters(patterns, controls) {
    const search = controls.search.value.trim().toLowerCase();
    const difficulty = controls.difficulty.value;
    const yarn = controls.yarn.value;

    return patterns.filter((pattern) => {
        const matchesDifficulty = difficulty === "all" || pattern.difficulty === difficulty;
        const matchesYarn = yarn === "all" || pattern.yarnWeight === yarn;

        const haystack = [pattern.title, pattern.description, ...(pattern.tags || [])]
            .join(" ")
            .toLowerCase();
        const matchesSearch = !search || haystack.includes(search);

        return matchesDifficulty && matchesYarn && matchesSearch;
    });
}

function splitPatternLines(value) {
    return value
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean);
}

function splitPatternTags(value) {
    return [...new Set(
        value
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean),
    )];
}

function parseRowLabel(line) {
    const match = line.match(
        /^(?:row|rows|round|rounds|rnd|rnds|r)\s*\.?\s*(\d+)(?:\s*(?:-|–|—|to)\s*(\d+))?\s*[:.)-]?\s*(.*)$/i,
    );
    if (!match) {
        return null;
    }

    const isRound = /^(?:round|rounds|rnd|rnds|r)\b/i.test(line);
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    const range = end === start ? `${start}` : `${start}-${end}`;
    return {
        start,
        end,
        text: `${isRound ? "Round" : "Row"} ${range}: ${match[3].trim()}`.trim(),
    };
}

function getExplicitStitchCount(step) {
    const match = step.match(/\((\d+)\)\s*[.!]?$/);
    return match ? Number(match[1]) : null;
}

function getVerifiableStitchChange(step) {
    const repeatMatch = step.match(/\(([^()]*)\)\s*(?:x|×)\s*(\d+)/i);
    if (!repeatMatch) {
        return null;
    }

    const repeat = repeatMatch[1].toLowerCase();
    const repeatCount = Number(repeatMatch[2]);
    const increases = (repeat.match(/\binc\b/g) || []).length;
    const decreases = (repeat.match(/\bdec\b/g) || []).length;
    if (increases + decreases === 0) {
        return null;
    }
    return (increases - decreases) * repeatCount;
}

function formatPatternInstructions(value) {
    const cleanedLines = value
        .replaceAll("\u00a0", " ")
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/^[-*•]+\s*/, "").replace(/\s+/g, " "))
        .filter(Boolean);
    const steps = [];
    const rowDetails = [];
    let currentStep = "";
    let currentDetail = null;

    for (const line of cleanedLines) {
        const rowLabel = parseRowLabel(line);
        if (rowLabel) {
            if (currentStep) {
                steps.push(currentStep);
                rowDetails.push(currentDetail);
            }
            currentStep = rowLabel.text;
            currentDetail = rowLabel;
        } else if (currentStep) {
            currentStep = `${currentStep} ${line}`;
        } else {
            steps.push(line);
            rowDetails.push(null);
        }
    }

    if (currentStep) {
        steps.push(currentStep);
        rowDetails.push(currentDetail);
    }

    const warnings = [];
    const labeledRows = rowDetails.filter(Boolean);
    if (!labeledRows.length && steps.length) {
        warnings.push("No Row or Round labels were found. Each non-empty line was kept as its own step.");
    }

    for (let index = 1; index < labeledRows.length; index += 1) {
        const previous = labeledRows[index - 1];
        const current = labeledRows[index];
        if (current.start <= previous.end) {
            warnings.push(`Check numbering near ${current.text.split(":")[0]}: it repeats or overlaps an earlier row.`);
        } else if (current.start > previous.end + 1) {
            const missingStart = previous.end + 1;
            const missingEnd = current.start - 1;
            const missingRange = missingStart === missingEnd
                ? `${missingStart}`
                : `${missingStart} through ${missingEnd}`;
            warnings.push(`Check numbering: ${missingRange} may be missing.`);
        }
    }

    let previousCount = null;
    for (const step of steps) {
        const expectedCount = getExplicitStitchCount(step);
        const stitchChange = getVerifiableStitchChange(step);
        if (previousCount !== null && expectedCount !== null && stitchChange !== null) {
            const calculatedCount = previousCount + stitchChange;
            if (calculatedCount !== expectedCount) {
                warnings.push(
                    `${step.split(":")[0]} says (${expectedCount}), but the written increases/decreases appear to produce ${calculatedCount}.`,
                );
            }
        }
        if (expectedCount !== null) {
            previousCount = expectedCount;
        }
    }

    return { steps, warnings: [...new Set(warnings)] };
}

function openPatternImporter(onSaved, patternToEdit = null) {
    closeModal();
    const isEditing = Boolean(patternToEdit);

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", `${isEditing ? "Edit" : "Add"} a crochet pattern`);
    modal.innerHTML = `
        <div class="modal-panel pattern-import-modal" role="document">
            <div class="modal-head">
                <div>
                    <span class="eyebrow">Personal library</span>
                    <h2 class="modal-title">${isEditing ? "Edit" : "Add"} a crochet pattern</h2>
                </div>
                <button type="button" class="modal-close" aria-label="Close pattern importer">Close</button>
            </div>
            <p class="modal-intro">Upload a photo and paste instructions you own or have permission to save.</p>
            <form class="pattern-import-form">
                <label class="pattern-import-photo">
                    <span>Pattern photo</span>
                    <input type="file" name="photo" accept="image/*" ${isEditing ? "" : "required"} />
                    <img class="pattern-import-preview" alt="Selected pattern preview" ${isEditing ? `src="${escapeHtml(patternToEdit.image)}"` : "hidden"} />
                </label>
                <div class="pattern-import-fields">
                    <label><span>Title</span><input name="title" maxlength="90" required /></label>
                    <label><span>Difficulty</span><select name="difficulty" required><option>Beginner</option><option>Easy</option><option>Intermediate</option><option>Advanced</option></select></label>
                    <label><span>Yarn weight</span><select name="yarnWeight" required><option>Lace</option><option>Fingering</option><option>Sport</option><option>DK</option><option selected>Worsted</option><option>Bulky</option></select></label>
                </div>
                <label><span>Tags, separated by commas</span><input name="tags" maxlength="160" placeholder="cozy, winter, quick gift" required /></label>
                <label><span>Description</span><textarea name="description" rows="2" maxlength="280" required></textarea></label>
                <label><span>Materials, one per line</span><textarea name="materials" rows="4" placeholder="Worsted yarn&#10;5 mm hook&#10;Yarn needle" required></textarea></label>
                <label><span>Pattern rows or rounds</span><textarea name="instructions" rows="8" placeholder="Round 1: 6 sc in a magic ring (6)&#10;Round 2: (inc) x6 (12)" required></textarea></label>
                <button class="btn pattern-format-button" type="button">Format &amp; Preview Rows</button>
                <section class="pattern-format-preview" aria-labelledby="patternPreviewHeading" hidden>
                    <div class="pattern-format-heading">
                        <h3 id="patternPreviewHeading">Formatted steps</h3>
                        <span class="pattern-format-count"></span>
                    </div>
                    <ol class="pattern-format-list"></ol>
                    <div class="pattern-format-warnings" hidden>
                        <h4>Review these warnings</h4>
                        <ul></ul>
                    </div>
                    <div class="pattern-format-actions">
                        <button class="btn pattern-format-cancel" type="button">Keep Original</button>
                        <button class="btn primary pattern-format-apply" type="button">Use Formatted Steps</button>
                    </div>
                </section>
                <p class="pattern-import-note">Each non-empty instruction line becomes a trackable project step.</p>
                <p class="pattern-import-status" role="alert"></p>
                <button class="btn primary pattern-import-save" type="submit">${isEditing ? "Save Changes" : "Save Pattern"}</button>
            </form>
        </div>
    `;

    const form = modal.querySelector(".pattern-import-form");
    const photoInput = form.elements.photo;
    const preview = modal.querySelector(".pattern-import-preview");
    const status = modal.querySelector(".pattern-import-status");
    const formatPreview = modal.querySelector(".pattern-format-preview");
    let previewUrl = "";
    let formattedSteps = [];

    if (isEditing) {
        form.elements.title.value = patternToEdit.title;
        form.elements.difficulty.value = patternToEdit.difficulty;
        form.elements.yarnWeight.value = patternToEdit.yarnWeight;
        form.elements.tags.value = (patternToEdit.tags || []).join(", ");
        form.elements.description.value = patternToEdit.description;
        form.elements.materials.value = patternToEdit.materials.join("\n");
        form.elements.instructions.value = patternToEdit.instructions.join("\n");
    }

    const closeImporter = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        closeModal();
    };

    modal.querySelector(".modal-close").addEventListener("click", closeImporter);

    photoInput.addEventListener("change", () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        const file = photoInput.files[0];
        if (!file) {
            preview.hidden = true;
            return;
        }
        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
        preview.hidden = false;
    });

    modal.querySelector(".pattern-format-button").addEventListener("click", () => {
        const result = formatPatternInstructions(form.elements.instructions.value);
        if (!result.steps.length) {
            status.textContent = "Paste some rows or rounds before formatting.";
            return;
        }

        status.textContent = "";
        formattedSteps = result.steps;
        modal.querySelector(".pattern-format-count").textContent = `${result.steps.length} ${result.steps.length === 1 ? "step" : "steps"}`;
        modal.querySelector(".pattern-format-list").innerHTML = result.steps
            .map((step) => `<li>${escapeHtml(step)}</li>`)
            .join("");
        const warningsPanel = modal.querySelector(".pattern-format-warnings");
        warningsPanel.hidden = result.warnings.length === 0;
        warningsPanel.querySelector("ul").innerHTML = result.warnings
            .map((warning) => `<li>${escapeHtml(warning)}</li>`)
            .join("");
        formatPreview.hidden = false;
    });

    modal.querySelector(".pattern-format-cancel").addEventListener("click", () => {
        formatPreview.hidden = true;
        formattedSteps = [];
    });

    modal.querySelector(".pattern-format-apply").addEventListener("click", () => {
        form.elements.instructions.value = formattedSteps.join("\n");
        formatPreview.hidden = true;
        status.textContent = `${formattedSteps.length} formatted steps are ready to save.`;
        formattedSteps = [];
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const materials = splitPatternLines(form.elements.materials.value);
        const instructions = splitPatternLines(form.elements.instructions.value);
        const tags = splitPatternTags(form.elements.tags.value);
        const saveButton = modal.querySelector(".pattern-import-save");

        if (!tags.length || !materials.length || !instructions.length) {
            status.textContent = "Add at least one tag, material, and pattern step.";
            return;
        }

        saveButton.disabled = true;
        saveButton.textContent = "Saving…";
        status.textContent = "";

        try {
            const image = photoInput.files[0]
                ? await resizePostImage(photoInput.files[0])
                : patternToEdit.image;
            const customPatterns = loadCustomPatterns();
            const pattern = {
                id: patternToEdit?.id || createLocalId("custom-pattern"),
                title: form.elements.title.value.trim(),
                category: patternToEdit?.category || "Personal",
                difficulty: form.elements.difficulty.value,
                yarnWeight: form.elements.yarnWeight.value,
                tags,
                image,
                description: form.elements.description.value.trim(),
                sourceName: "Personal library",
                licenseNote: "Saved privately on this device. Confirm you have permission to use this content.",
                materials,
                instructions,
                isCustom: true,
            };
            const existingIndex = customPatterns.findIndex((item) => item.id === pattern.id);
            if (existingIndex === -1) {
                customPatterns.unshift(pattern);
            } else {
                customPatterns[existingIndex] = pattern;
            }

            if (!saveCustomPatterns(customPatterns)) {
                throw new Error("This device is out of storage. Try a smaller image.");
            }

            closeImporter();
            onSaved(pattern, isEditing);
        } catch (error) {
            status.textContent = error.message;
            saveButton.disabled = false;
            saveButton.textContent = isEditing ? "Save Changes" : "Save Pattern";
        }
    });

    document.body.append(modal);
    document.body.classList.add("modal-open");
}

function openRemovePatternModal(pattern, onRemoved) {
    closeModal();

    const hasProject = loadProjects().some((project) => project.patternId === pattern.id);
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", `Remove ${pattern.title}`);
    modal.innerHTML = `
        <div class="modal-panel pattern-remove-modal" role="document">
            <div class="modal-head">
                <h2 class="modal-title">Remove pattern?</h2>
                <button type="button" class="modal-close" aria-label="Cancel removal">Close</button>
            </div>
            <p class="modal-intro"><strong>${escapeHtml(pattern.title)}</strong> will be permanently removed from this device.</p>
            ${hasProject ? '<p class="pattern-remove-warning">Its in-progress project and saved counters will also be removed.</p>' : ""}
            <div class="pattern-remove-actions">
                <button class="btn modal-close" type="button">Keep Pattern</button>
                <button class="btn pattern-remove-confirm" type="button">Remove Permanently</button>
            </div>
        </div>
    `;

    for (const closeButton of modal.querySelectorAll(".modal-close")) {
        closeButton.addEventListener("click", closeModal);
    }
    modal.querySelector(".pattern-remove-confirm").addEventListener("click", () => {
        saveCustomPatterns(loadCustomPatterns().filter((item) => item.id !== pattern.id));
        saveProjects(loadProjects().filter((project) => project.patternId !== pattern.id));
        closeModal();
        onRemoved(pattern);
    });
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.body.append(modal);
    document.body.classList.add("modal-open");
}

function initPatternsPage() {
    if (!patternsGrid) {
        return;
    }

    const search = document.querySelector("#patternSearch");
    const difficulty = document.querySelector("#difficultyFilter");
    const yarn = document.querySelector("#yarnFilter");
    const empty = document.querySelector("#patternsEmpty");
    const addButtons = document.querySelectorAll(".pattern-add-button");
    const exportButtons = document.querySelectorAll(".pattern-export-button");

    const controls = { search, difficulty, yarn };

    loadAllPatterns()
        .then((patterns) => {
            const syncExportButtons = () => {
                const customPatternCount = loadCustomPatterns().length;
                for (const button of exportButtons) {
                    button.disabled = customPatternCount === 0;
                    button.title = customPatternCount
                        ? `Export ${customPatternCount} uploaded ${customPatternCount === 1 ? "pattern" : "patterns"}`
                        : "Add a personal pattern before exporting";
                }
            };

            const render = () => {
                const filtered = applyPatternFilters(patterns, controls);
                patternsGrid.innerHTML = filtered.map(patternCardTemplate).join("");
                empty.hidden = filtered.length > 0;

                for (const image of patternsGrid.querySelectorAll(".pattern-card-image:not(.pattern-card-image-placeholder)")) {
                    image.addEventListener("error", () => {
                        image.classList.add("pattern-card-image-placeholder");
                        image.removeAttribute("src");
                    });
                }

                for (const button of patternsGrid.querySelectorAll(".pattern-open")) {
                    button.addEventListener("click", () => {
                        const selected = patterns.find((pattern) => pattern.id === button.dataset.patternId);
                        openPatternModal(selected);
                    });
                }

                for (const button of patternsGrid.querySelectorAll(".pattern-edit")) {
                    button.addEventListener("click", () => {
                        const selected = patterns.find((pattern) => pattern.id === button.dataset.patternId);
                        openPatternImporter((updatedPattern) => {
                            const patternIndex = patterns.findIndex((pattern) => pattern.id === updatedPattern.id);
                            patterns[patternIndex] = updatedPattern;
                            render();
                            openPatternModal(updatedPattern);
                        }, selected);
                    });
                }

                for (const button of patternsGrid.querySelectorAll(".pattern-remove")) {
                    button.addEventListener("click", () => {
                        const selected = patterns.find((pattern) => pattern.id === button.dataset.patternId);
                        openRemovePatternModal(selected, (removedPattern) => {
                            const patternIndex = patterns.findIndex((pattern) => pattern.id === removedPattern.id);
                            patterns.splice(patternIndex, 1);
                            syncExportButtons();
                            render();
                        });
                    });
                }
            };

            syncExportButtons();
            render();

            for (const button of addButtons) {
                button.addEventListener("click", () => {
                    openPatternImporter((pattern) => {
                        patterns.unshift(pattern);
                        syncExportButtons();
                        render();
                        openPatternModal(pattern);
                    });
                });
            }

            for (const button of exportButtons) {
                button.addEventListener("click", exportCustomPatterns);
            }

            for (const control of Object.values(controls)) {
                control.addEventListener("input", render);
                control.addEventListener("change", render);
            }
        })
        .catch(() => {
            patternsGrid.innerHTML = "";
            empty.hidden = false;
            empty.textContent = "Pattern data could not be loaded right now.";
        });
}

function initProjectsPage() {
    if (!projectsGrid) {
        return;
    }

    const empty = document.querySelector("#projectsEmpty");
    const count = document.querySelector("#projectCount");

    loadAllPatterns()
        .then((patterns) => {
            const patternsById = new Map(patterns.map((pattern) => [pattern.id, pattern]));
            const requestedPatternId = new URLSearchParams(window.location.search).get("project");
            let openedRequestedProject = false;

            const render = () => {
                const projects = loadProjects().filter((project) => patternsById.has(project.patternId));
                count.textContent = `${projects.length} ${projects.length === 1 ? "project" : "projects"} in progress`;
                empty.hidden = projects.length > 0;
                projectsGrid.hidden = projects.length === 0;
                projectsGrid.innerHTML = projects
                    .map((project) => projectCardTemplate(project, patternsById.get(project.patternId)))
                    .join("");

                for (const image of projectsGrid.querySelectorAll(".project-card-image")) {
                    image.addEventListener("error", () => {
                        image.closest(".project-card").classList.add("project-card-no-image");
                        image.remove();
                    });
                }

                for (const button of projectsGrid.querySelectorAll(".project-resume-button")) {
                    button.addEventListener("click", () => {
                        const project = projects.find((item) => item.patternId === button.dataset.patternId);
                        openProjectModal(project, patternsById.get(project.patternId), render);
                    });
                }

                if (!openedRequestedProject && requestedPatternId) {
                    openedRequestedProject = true;
                    const requestedProject = projects.find(
                        (project) => project.patternId === requestedPatternId,
                    );
                    if (requestedProject) {
                        openProjectModal(
                            requestedProject,
                            patternsById.get(requestedProject.patternId),
                            render,
                        );
                        window.history.replaceState({}, "", "projects.html");
                    }
                }
            };

            render();
        })
        .catch(() => {
            projectsGrid.innerHTML = "";
            empty.hidden = false;
            empty.querySelector("h3").textContent = "Projects could not be loaded";
            empty.querySelector("p").textContent = "Refresh the page to try again.";
        });
}

function getDemoSocialPosts() {
    return [
        {
            id: "demo-soft-chain",
            title: "Learning a softer foundation chain",
            caption: "Slowed down and focused on keeping every loop the same size. The edge already feels much better.",
            image: foundationChainStep2,
            author: "Anne",
            likes: 24,
            liked: false,
            comments: [
                { id: "demo-comment-1", author: "Nora", text: "The tension looks so even!" },
            ],
            createdAt: "2026-08-12T14:00:00.000Z",
            isDemo: true,
        },
        {
            id: "demo-first-rows",
            title: "First rows taking shape",
            caption: "A little progress after work today. I love how calm this color feels.",
            image: foundationChainStep3,
            author: "Jess",
            likes: 17,
            liked: false,
            comments: [
                { id: "demo-comment-2", author: "Sam", text: "Beautiful color choice." },
                { id: "demo-comment-3", author: "Jo", text: "Keep going!" },
            ],
            createdAt: "2026-08-10T18:30:00.000Z",
            isDemo: true,
        },
        {
            id: "demo-granny-colors",
            title: "Choosing colors for my granny square",
            caption: "Testing a cheerful contrast before I commit to the full blanket palette.",
            image: foundationChainStep1,
            author: "Daniel",
            likes: 31,
            liked: false,
            comments: [
                { id: "demo-comment-4", author: "Avery", text: "These colors look wonderful together." },
            ],
            createdAt: "2026-08-08T11:15:00.000Z",
            isDemo: true,
        },
        {
            id: "demo-weekend-practice",
            title: "Weekend stitch practice",
            caption: "A quiet morning, a warm drink, and a few rows to build muscle memory.",
            image: foundationChainStep2,
            author: "Khorshid",
            likes: 12,
            liked: false,
            comments: [
                { id: "demo-comment-5", author: "Luis", text: "Such a relaxing way to start the day." },
                { id: "demo-comment-6", author: "Tara", text: "Your stitches are looking consistent!" },
            ],
            createdAt: "2026-08-06T09:00:00.000Z",
            isDemo: true,
        },
    ];
}

function loadSocialPosts() {
    const demoPosts = getDemoSocialPosts();

    try {
        const storedPosts = JSON.parse(localStorage.getItem(SOCIAL_STORAGE_KEY) || "null");
        if (!Array.isArray(storedPosts)) {
            return demoPosts;
        }

        const storedIds = new Set(storedPosts.map((post) => post.id));
        const missingDemoPosts = demoPosts.filter((post) => !storedIds.has(post.id));
        const demosById = new Map(demoPosts.map((post) => [post.id, post]));
        const hydratedStoredPosts = storedPosts.map((post) => ({
            ...post,
            image: demosById.get(post.id)?.image || post.image,
            author: demosById.get(post.id)?.author || post.author,
        }));
        return [...hydratedStoredPosts, ...missingDemoPosts];
    } catch {
        return demoPosts;
    }
}

function saveSocialPosts(posts) {
    try {
        localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify(posts));
        return true;
    } catch {
        return false;
    }
}

function createLocalId(prefix) {
    const randomId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    return `${prefix}-${randomId}`;
}

function resizePostImage(file) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
            reject(new Error("Choose an image file."));
            return;
        }

        if (file.size > 12 * 1024 * 1024) {
            reject(new Error("Choose an image smaller than 12 MB."));
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            const maxSide = 1200;
            const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
            const width = Math.max(1, Math.round(image.naturalWidth * scale));
            const height = Math.max(1, Math.round(image.naturalHeight * scale));
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            context.fillStyle = "#fffdfb";
            context.fillRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            URL.revokeObjectURL(objectUrl);
            resolve(canvas.toDataURL("image/jpeg", 0.78));
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("That image could not be opened."));
        };

        image.src = objectUrl;
    });
}

function socialPostTemplate(post) {
    const comments = (post.comments || [])
        .map(
            (comment) => `
                <li>
                    <strong>${escapeHtml(comment.author)}</strong>
                    <span>${escapeHtml(comment.text)}</span>
                </li>
            `,
        )
        .join("");

    return `
        <article class="social-post" data-post-id="${escapeHtml(post.id)}">
            <img class="social-post-image" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />
            <div class="social-post-content">
                <div class="social-post-author">
                    <span class="social-avatar" aria-hidden="true">${escapeHtml(post.author.charAt(0).toUpperCase())}</span>
                    <span><strong>${escapeHtml(post.author)}</strong><small>${post.isDemo ? "Community maker" : "Posted on this device"}</small></span>
                </div>
                <h3>${escapeHtml(post.title)}</h3>
                <p>${escapeHtml(post.caption)}</p>
                <div class="social-actions">
                    <button class="heart-button ${post.liked ? "liked" : ""}" type="button" aria-label="${post.liked ? "Unlike" : "Like"} ${escapeHtml(post.title)}" aria-pressed="${post.liked}">
                        <span aria-hidden="true">${post.liked ? "♥" : "♡"}</span>
                        <strong>${post.likes || 0}</strong>
                    </button>
                    <span>${(post.comments || []).length} ${(post.comments || []).length === 1 ? "comment" : "comments"}</span>
                </div>
                <section class="comment-section" aria-label="Comments on ${escapeHtml(post.title)}">
                    <ul class="comment-list">${comments || '<li class="comment-empty">Be the first to comment.</li>'}</ul>
                    <form class="comment-form">
                        <label class="sr-only" for="comment-${escapeHtml(post.id)}">Add a comment</label>
                        <input id="comment-${escapeHtml(post.id)}" name="comment" maxlength="180" placeholder="Add a kind comment…" required />
                        <button type="submit">Post</button>
                    </form>
                </section>
            </div>
        </article>
    `;
}

function openSocialPostModal(onCreated) {
    closeModal();

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Share a crochet project");
    modal.innerHTML = `
        <div class="modal-panel social-compose-modal" role="document">
            <div class="modal-head">
                <div>
                    <span class="eyebrow">New post</span>
                    <h2 class="modal-title">Share your crochet</h2>
                </div>
                <button type="button" class="modal-close" aria-label="Close new post">Close</button>
            </div>
            <form class="social-compose-form">
                <label class="social-photo-field">
                    <span>Project photo</span>
                    <input type="file" name="photo" accept="image/*" required />
                    <img class="social-photo-preview" alt="Selected project preview" hidden />
                </label>
                <label>
                    <span>Post title</span>
                    <input name="title" maxlength="80" placeholder="What are you making?" required />
                </label>
                <label>
                    <span>Caption</span>
                    <textarea name="caption" maxlength="400" rows="4" placeholder="Share the story or progress behind it…" required></textarea>
                </label>
                <p class="social-form-status" role="alert"></p>
                <button class="btn primary social-publish" type="submit">Publish Post</button>
            </form>
        </div>
    `;

    const form = modal.querySelector(".social-compose-form");
    const photoInput = form.elements.photo;
    const preview = modal.querySelector(".social-photo-preview");
    const status = modal.querySelector(".social-form-status");
    let previewUrl = "";

    const closeComposer = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        closeModal();
    };

    modal.querySelector(".modal-close").addEventListener("click", closeComposer);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeComposer();
        }
    });

    photoInput.addEventListener("change", () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        const file = photoInput.files[0];
        if (!file) {
            preview.hidden = true;
            return;
        }
        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
        preview.hidden = false;
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const publishButton = modal.querySelector(".social-publish");
        publishButton.disabled = true;
        publishButton.textContent = "Publishing…";
        status.textContent = "";

        try {
            const image = await resizePostImage(photoInput.files[0]);
            const posts = loadSocialPosts();
            posts.unshift({
                id: createLocalId("post"),
                title: form.elements.title.value.trim(),
                caption: form.elements.caption.value.trim(),
                image,
                author: "You",
                likes: 0,
                liked: false,
                comments: [],
                createdAt: new Date().toISOString(),
                isDemo: false,
            });

            if (!saveSocialPosts(posts)) {
                throw new Error("This device is out of space for another photo. Try a smaller image.");
            }

            closeComposer();
            onCreated();
        } catch (error) {
            status.textContent = error.message;
            publishButton.disabled = false;
            publishButton.textContent = "Publish Post";
        }
    });

    document.body.append(modal);
    document.body.classList.add("modal-open");
}

function initSocialPage() {
    if (!socialGrid) {
        return;
    }

    const postCount = document.querySelector("#socialPostCount");
    const shareButtons = document.querySelectorAll(".social-share-button");

    const render = () => {
        const posts = loadSocialPosts();
        if (!localStorage.getItem(SOCIAL_STORAGE_KEY)) {
            saveSocialPosts(posts);
        }
        socialGrid.innerHTML = posts.map(socialPostTemplate).join("");
        postCount.textContent = `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;

        for (const card of socialGrid.querySelectorAll(".social-post")) {
            const postId = card.dataset.postId;

            card.querySelector(".heart-button").addEventListener("click", () => {
                const nextPosts = loadSocialPosts();
                const post = nextPosts.find((item) => item.id === postId);
                post.liked = !post.liked;
                post.likes = Math.max(0, (post.likes || 0) + (post.liked ? 1 : -1));
                saveSocialPosts(nextPosts);
                render();
            });

            card.querySelector(".comment-form").addEventListener("submit", (event) => {
                event.preventDefault();
                const input = event.currentTarget.elements.comment;
                const text = input.value.trim();
                if (!text) {
                    return;
                }
                const nextPosts = loadSocialPosts();
                const post = nextPosts.find((item) => item.id === postId);
                post.comments.push({ id: createLocalId("comment"), author: "You", text });
                saveSocialPosts(nextPosts);
                render();
            });
        }
    };

    for (const button of shareButtons) {
        button.addEventListener("click", () => openSocialPostModal(render));
    }

    render();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

for (const button of howToButtons) {
    button.addEventListener("click", () => {
        openTutorialModal(button.dataset.tutorial);
    });
}

initPatternsPage();
initProjectsPage();
initSocialPage();

if (app) {
    console.log("Korchet is ready");
}