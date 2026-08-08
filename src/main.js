const app = document.querySelector("#app");
const howToButtons = document.querySelectorAll(".howto-btn");

const tutorials = {
    "foundation-chain": {
        title: "How To Create Foundation Chain",
        intro: "A strong chain gives your project the right width and flexibility.",
        steps: [
            {
                title: "Step 1: Make a slip knot",
                description:
                    "Create a loop, pull the working yarn through, and tighten gently on your hook.",
                image:
                    "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 2: Yarn over",
                description:
                    "Wrap the yarn from back to front over the hook for each chain stitch.",
                image:
                    "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 3: Pull through",
                description:
                    "Pull the yarn-over through the loop on your hook. Repeat until you reach your stitch count.",
                image:
                    "https://images.unsplash.com/photo-1619806038302-9c2b04d26f1d?auto=format&fit=crop&w=900&q=80",
            },
        ],
        video: "https://www.youtube.com/embed/aAxGTnVNJiE",
    },
    "single-crochet": {
        title: "How To Create Single Crochet (SC)",
        intro: "Single crochet makes a tight, neat fabric that is great for many beginner projects.",
        steps: [
            {
                title: "Step 1: Insert hook",
                description: "Insert your hook into the next stitch from front to back.",
                image:
                    "https://images.unsplash.com/photo-1596722554383-1f9d4c75b121?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 2: Yarn over and pull up a loop",
                description: "Yarn over, pull through the stitch. You now have two loops on the hook.",
                image:
                    "https://images.unsplash.com/photo-1611391182214-cc7d4ba40682?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 3: Yarn over and finish",
                description: "Yarn over again and pull through both loops on your hook.",
                image:
                    "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=900&q=80",
            },
        ],
        video: "https://www.youtube.com/embed/Ik-GSXWoSak",
    },
    "double-crochet": {
        title: "How To Create Double Crochet (DC)",
        intro: "Double crochet is taller than single crochet and works up quickly.",
        steps: [
            {
                title: "Step 1: Yarn over first",
                description: "Yarn over once before inserting your hook in the next stitch.",
                image:
                    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 2: Pull up a loop",
                description: "Insert hook, yarn over, and pull up a loop. You now have three loops.",
                image:
                    "https://images.unsplash.com/photo-1617957743098-9dd30e0a4f86?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 3: Two pull-throughs",
                description:
                    "Yarn over and pull through two loops, then yarn over again and pull through the last two loops.",
                image:
                    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
            },
        ],
        video: "https://www.youtube.com/embed/JRwsT5iM0xk",
    },
    "treble-crochet": {
        title: "How To Create Treble Crochet (TC)",
        intro: "Treble crochet adds height and airy texture to your rows.",
        steps: [
            {
                title: "Step 1: Yarn over twice",
                description: "Wrap yarn over the hook two times before inserting into the stitch.",
                image:
                    "https://images.unsplash.com/photo-1616594039964-3cb5d8d9e3ef?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 2: Insert and pull up",
                description: "Insert hook, yarn over, and pull up a loop. You should have four loops.",
                image:
                    "https://images.unsplash.com/photo-1618417878474-4504b2a19f0e?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 3: Pull through in sets of two",
                description:
                    "Yarn over and pull through two loops three times until one loop remains.",
                image:
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
            },
        ],
        video: "https://www.youtube.com/embed/3y7VwP4-5x8",
    },
    "magic-ring": {
        title: "How To Create Magic Ring",
        intro: "The magic ring starts round projects with a tidy, adjustable center.",
        steps: [
            {
                title: "Step 1: Wrap yarn around fingers",
                description:
                    "Create an X shape with the yarn tail over the working yarn to form the ring.",
                image:
                    "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 2: Pull up a loop",
                description:
                    "Insert hook under the first strand, grab the second strand, and pull up a loop.",
                image:
                    "https://images.unsplash.com/photo-1567459169668-95d355371bda?auto=format&fit=crop&w=900&q=80",
            },
            {
                title: "Step 3: Crochet into the ring and tighten",
                description:
                    "Work your starting stitches into the ring, then pull the tail to close the center.",
                image:
                    "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=900&q=80",
            },
        ],
        video: "https://www.youtube.com/embed/zsWmVcp9RMU",
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
                <iframe
                    class="video-frame"
                    src="${lesson.video}"
                    title="${escapeHtml(lesson.title)} video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
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

if (app) {
    console.log("Korchet is ready");
}