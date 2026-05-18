const routes = [
  { id: "home", label: "Home", icon: "layout-dashboard" },
  { id: "search", label: "Search Results", icon: "search" },
  { id: "machine", label: "Machine DNA", icon: "scan-line" },
  { id: "vendors", label: "VendorVerse", icon: "store" },
  { id: "senior", label: "Senior Boxes", icon: "archive" },
  { id: "failures", label: "Failure Library", icon: "triangle-alert" },
  { id: "upload", label: "Upload Knowledge", icon: "upload-cloud" },
  { id: "profile", label: "User Profile", icon: "user-round" },
];

const knowledge = [
  {
    id: "k1",
    title: "Laser kerf map for 3mm birch ply",
    type: "Machine DNA",
    batch: "B.Des 2024",
    author: "Ira Sen",
    machine: "Epilog Fusion Pro",
    tags: ["laser", "wood", "kerf", "settings"],
    time: "18 min read",
    summary: "Tested speed and power grid with notes on smoke staining, masking tape, and final slot tolerances.",
    accent: "bg-blue-ibm",
    metric: "0.16mm kerf",
  },
  {
    id: "k2",
    title: "Where to buy archival foamboard near campus",
    type: "VendorVerse",
    batch: "M.Des 2025",
    author: "Dev Mehta",
    machine: "Vendor note",
    tags: ["vendor", "model-making", "budget"],
    time: "6 min read",
    summary: "Price comparison, delivery reliability, and which shop cuts cleaner edges for exhibition models.",
    accent: "bg-[#24a148]",
    metric: "4.7 rating",
  },
  {
    id: "k3",
    title: "Critique pattern: explain the jig before the artifact",
    type: "Crit Insight",
    batch: "B.Des 2023",
    author: "Maya Roy",
    machine: "Studio jury",
    tags: ["critique", "process", "presentation"],
    time: "4 min read",
    summary: "A recurring jury insight for fabrication-led projects: context of process prevents surface-level feedback.",
    accent: "bg-[#f1c21b]",
    metric: "42 saves",
  },
  {
    id: "k4",
    title: "Vacuum forming PETG: bubbles after reheating",
    type: "Failure Library",
    batch: "B.Des 2022",
    author: "Zara Patel",
    machine: "Formech 450DT",
    tags: ["vacuum-forming", "petg", "failure"],
    time: "9 min read",
    summary: "A failure case with moisture notes, timing photos, and the corrected pre-dry routine.",
    accent: "bg-[#da1e28]",
    metric: "Solved",
  },
  {
    id: "k5",
    title: "CNC tabs that do not snap during finishing",
    type: "Machine DNA",
    batch: "M.Des 2024",
    author: "Kabir Anand",
    machine: "ShopBot PRSalpha",
    tags: ["cnc", "tabs", "plywood", "finishing"],
    time: "11 min read",
    summary: "Recommended tab length, onion skin depth, and cleanup order for chair scale prototypes.",
    accent: "bg-blue-deep",
    metric: "12 trials",
  },
  {
    id: "k6",
    title: "Senior box: soft robotics material kit",
    type: "Senior Boxes",
    batch: "B.Des 2021",
    author: "Nidhi Rao",
    machine: "Archive shelf C3",
    tags: ["silicone", "molds", "borrowable"],
    time: "3 min read",
    summary: "Inventory list, missing items, project contact, and safety notes for reusing the kit.",
    accent: "bg-[#198038]",
    metric: "Available",
  },
];

const vendors = [
  { name: "Paper Bazaar Studio Supply", category: "Paper and boards", rating: 4.8, distance: "1.2 km", note: "Best for museum board, greyboard, and same-day bulk orders.", status: "Open today" },
  { name: "MetalWorks Lane", category: "Metal fabrication", rating: 4.5, distance: "5.6 km", note: "Clean TIG welds; ask for Rafiq for student rates.", status: "Call first" },
  { name: "Print Cellar", category: "Risograph and prints", rating: 4.7, distance: "2.1 km", note: "Knows critique deadlines and keeps paper swatches ready.", status: "Student discount" },
  { name: "North Timber Depot", category: "Wood and veneer", rating: 4.3, distance: "7.4 km", note: "Reliable birch ply; check sheet flatness before transport.", status: "Bulk only" },
];

const machines = [
  { name: "Epilog Fusion Pro", code: "LD-M-014", use: "Laser cutting", status: "Ready", setting: "3mm birch: 32 speed / 78 power / 500 freq", qr: "QR-14" },
  { name: "ShopBot PRSalpha", code: "LD-M-006", use: "CNC routing", status: "In maintenance", setting: "6mm ply: 18000 rpm / 45 mm/s / 2 flute", qr: "QR-06" },
  { name: "Formech 450DT", code: "LD-M-022", use: "Vacuum forming", status: "Ready", setting: "PETG 1mm: 165 sec heat / fan medium", qr: "QR-22" },
];

const failures = [
  { title: "Acrylic cracked during press fit", cause: "Kerf ignored", fix: "Offset slots by measured sheet batch", severity: "Medium" },
  { title: "Resin clouded overnight", cause: "Humidity spike", fix: "Warm box cure with desiccant", severity: "High" },
  { title: "CNC chatter on curved legs", cause: "Long bit stickout", fix: "Shorter bit, climb finishing pass", severity: "Medium" },
  { title: "Vinyl peeled after critique", cause: "Dust on primer", fix: "IPA wipe and squeegee pressure grid", severity: "Low" },
];

const seniorBoxes = [
  { title: "Interaction prototyping drawer", batch: "2022", items: 38, owner: "Alumni Commons", tags: ["arduino", "sensors", "switches"] },
  { title: "Natural dye swatch archive", batch: "2021", items: 64, owner: "Textile Lab", tags: ["dye", "cotton", "mordant"] },
  { title: "Public signage research scans", batch: "2020", items: 112, owner: "Visual Design", tags: ["wayfinding", "photo", "fieldwork"] },
];

const suggestions = ["laser kerf for birch ply", "PETG vacuum forming bubbles", "budget metal vendor", "critique framing for process", "CNC tabs plywood", "senior box silicone molds"];
let activeFilter = "All";
let query = "";
let bookmarks = new Set(JSON.parse(localStorage.getItem("lored_bookmarks") || "[]"));

const app = document.querySelector("#app");
const navList = document.querySelector("#navList");
const sidebar = document.querySelector("#sidebar");
const overlay = document.querySelector("#overlay");
const toast = document.querySelector("#toast");

function init() {
  applySavedTheme();
  renderNav();
  bindChrome();
  route();
  window.addEventListener("hashchange", route);
}

function bindChrome() {
  document.querySelector("#openSidebar").addEventListener("click", () => toggleSidebar(true));
  document.querySelector("#closeSidebar").addEventListener("click", () => toggleSidebar(false));
  overlay.addEventListener("click", () => toggleSidebar(false));
  document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
  document.querySelectorAll("[data-goto]").forEach((button) => {
    button.addEventListener("click", () => go(button.dataset.goto));
  });
  document.querySelector("[data-action='simulate-sync']").addEventListener("click", () => {
    showToast("Archive sync started. New notes are being indexed.");
  });
  document.querySelector("#topSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    query = document.querySelector("#topSearch").value.trim();
    location.hash = "#search";
  });
}

function renderNav() {
  navList.innerHTML = routes
    .map(
      (item) => `
        <a href="#${item.id}" class="nav-link" data-route-link data-route="${item.id}">
          <i data-lucide="${item.icon}"></i>
          <span class="font-semibold">${item.label}</span>
        </a>
      `
    )
    .join("");
}

function route() {
  const id = location.hash.replace("#", "") || "home";
  const routeId = routes.some((item) => item.id === id) ? id : "home";
  toggleSidebar(false);
  document.querySelectorAll("[data-route]").forEach((link) => link.classList.toggle("active", link.dataset.route === routeId));
  app.innerHTML = document.querySelector("#skeletonTemplate").innerHTML;
  createIcons();
  setTimeout(() => {
    const views = {
      home: homeView,
      search: searchView,
      machine: machineView,
      vendors: vendorsView,
      senior: seniorView,
      failures: failuresView,
      upload: uploadView,
      profile: profileView,
    };
    app.innerHTML = `<section class="route-enter">${views[routeId]()}</section>`;
    bindPage(routeId);
    createIcons();
  }, 220);
}

function homeView() {
  return `
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="panel overflow-hidden rounded-[2rem] p-5 sm:p-7">
        <div class="grid gap-6 xl:grid-cols-[1fr_380px]">
          <div class="space-y-6">
            <div class="flex flex-wrap items-center gap-2">
              <span class="chip !border-blue-ibm/20 !bg-blue-ibm/10 !text-blue-deep dark:!border-blue-ibm/40 dark:!bg-blue-ibm/20 dark:!text-[#d0e2ff]"><i data-lucide="sparkles"></i>AI archive search</span>
              <span class="chip"><i data-lucide="graduation-cap"></i>Built by students for students</span>
            </div>
            <div class="max-w-4xl">
              <h1 class="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Search the practical memory of your design school.
              </h1>
              <p class="mt-4 max-w-2xl text-lg leading-8 text-black/75 dark:text-white/78">
                Preserve workshop techniques, vendor wisdom, machine settings, critique patterns, failure cases, and project process notes across batches.
              </p>
            </div>
            <form id="heroSearchForm" class="relative">
              <i data-lucide="search" class="pointer-events-none absolute left-5 top-6 h-5 w-5 text-[#525252] dark:text-[#c6c6c6]"></i>
              <input
                id="heroSearch"
                class="min-h-[76px] w-full rounded-[1.35rem] border border-[#e0e0e0] bg-white px-14 pr-32 text-base shadow-tile outline-none transition placeholder:text-[#8c8c8c] focus:border-blue-ibm focus:ring-4 focus:ring-blue-ibm/10 dark:border-white/15 dark:bg-[#262626] dark:placeholder:text-[#8d8d8d]"
                placeholder="Ask: What laser settings worked for 3mm birch ply?"
                autocomplete="off"
              />
              <button class="primary-button absolute right-3 top-3 h-[52px]" type="submit">Search</button>
              <div id="suggestions" class="absolute left-0 right-0 top-[86px] z-20 hidden rounded-2xl border border-[#e0e0e0] bg-paper p-2 shadow-soft dark:border-white/15 dark:bg-[#262626]"></div>
            </form>
            <div class="flex flex-wrap gap-2">
              ${suggestions.slice(0, 4).map((item) => `<button class="filter-pill" data-suggestion="${item}">${item}</button>`).join("")}
            </div>
          </div>
          <div class="rounded-[1.6rem] border border-[#e0e0e0] bg-[#f4f4f4] p-4 dark:border-white/15 dark:bg-[#262626]">
            <div class="grid grid-cols-2 gap-3">
              ${statCard("2,481", "knowledge cards", "book-open")}
              ${statCard("86", "machine DNAs", "scan-line")}
              ${statCard("193", "vendors rated", "store")}
              ${statCard("347", "failure saves", "triangle-alert")}
            </div>
            <div class="mt-4 rounded-2xl bg-paper p-4 dark:bg-[#161616]">
              <p class="text-sm font-bold">Today in the archive</p>
              <div class="mt-3 space-y-3">
                ${activity("M.Des 2025 added a ShopBot feed-speed note", "cnc")}
                ${activity("Two students bookmarked PETG bubble failure", "failure")}
                ${activity("Print Cellar updated risograph paper stock", "vendor")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div class="space-y-4">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-deep dark:text-blue-200">Knowledge feed</p>
              <h2 class="mt-1 text-2xl font-extrabold tracking-tight">Recently preserved</h2>
            </div>
            <button class="soft-button" data-goto="search">View all</button>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            ${knowledge.slice(0, 4).map(knowledgeCard).join("")}
          </div>
        </div>
        <aside class="space-y-4">
          ${batchArchive()}
          ${emptyState("No pending handovers", "Senior boxes with missing owners will appear here.", "archive-x")}
        </aside>
      </section>
    </div>
  `;
}

function searchView() {
  const filtered = getFilteredKnowledge();
  return `
    <div class="mx-auto max-w-7xl space-y-5">
      ${pageHeader("Search Results", "Find the exact setting, vendor, failure, or critique memory you need before studio closes.", "search")}
      <div class="sticky top-24 z-20 rounded-3xl border border-[#e0e0e0] bg-bone/95 p-3 backdrop-blur-xl dark:border-white/15 dark:bg-[#161616]/95">
        <form id="resultsSearchForm" class="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input id="resultsSearch" class="field" value="${escapeHtml(query)}" placeholder="Search practical knowledge..." />
          <button class="primary-button" type="submit"><i data-lucide="search"></i>Search archive</button>
        </form>
        <div class="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          ${["All", "Machine DNA", "VendorVerse", "Crit Insight", "Failure Library", "Senior Boxes"].map((filter) => `<button class="filter-pill ${activeFilter === filter ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}
        </div>
      </div>
      <div class="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside class="panel h-fit rounded-3xl p-4">
          <p class="font-bold">Filters</p>
          ${filterBlock("Batch", ["2025", "2024", "2023", "2022"])}
          ${filterBlock("Material", ["Plywood", "PETG", "Metal", "Paper"])}
          ${filterBlock("Evidence", ["Photo", "Settings", "Critique", "Vendor bill"])}
        </aside>
        <div>
          <div class="mb-3 flex items-center justify-between">
            <p class="text-sm font-semibold text-black/70 dark:text-white/72">${filtered.length} results found</p>
            <button class="soft-button" data-action="save-search"><i data-lucide="bell-plus"></i>Save search</button>
          </div>
          <div class="grid gap-4 xl:grid-cols-2">
            ${filtered.length ? filtered.map(knowledgeCard).join("") : emptyState("No memories found", "Try a broader phrase or clear a filter to explore the full archive.", "search-x")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function machineView() {
  return `
    <div class="mx-auto max-w-7xl space-y-5">
      ${pageHeader("Machine DNA", "QR-linked machine pages that preserve settings, quirks, maintenance notes, and successful material tests.", "scan-line")}
      <div class="grid gap-4 lg:grid-cols-3">
        ${machines.map(machineCard).join("")}
      </div>
      <div class="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section class="panel rounded-3xl p-5">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-extrabold">Setting timeline</h2>
            <button class="soft-button" data-action="download-qr"><i data-lucide="qr-code"></i>Export QR set</button>
          </div>
          <div class="mt-5 space-y-4">
            ${knowledge.filter((item) => item.type === "Machine DNA").map(timelineItem).join("")}
          </div>
        </section>
        <section class="tile rounded-3xl p-5">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-deep dark:text-[#d0e2ff]">QR preview</p>
          <div class="mt-4 grid aspect-square place-items-center rounded-3xl bg-white p-6 dark:bg-white">
            <div class="grid h-full w-full grid-cols-5 gap-2">
              ${Array.from({ length: 25 }, (_, i) => `<span class="${[0, 1, 3, 4, 5, 9, 10, 12, 14, 15, 18, 20, 21, 23, 24].includes(i) ? "bg-ink" : "bg-transparent"} rounded-sm"></span>`).join("")}
            </div>
          </div>
          <p class="mt-4 text-sm text-black/75 dark:text-white/75">Scan at the machine to open its living DNA page before starting a job.</p>
        </section>
      </div>
    </div>
  `;
}

function vendorsView() {
  return `
    <div class="mx-auto max-w-7xl space-y-5">
      ${pageHeader("VendorVerse", "A student-maintained directory of local suppliers, ratings, caveats, and deadline behavior.", "store")}
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        ${vendors.map(vendorCard).join("")}
      </div>
      <section class="panel rounded-3xl p-5">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-extrabold">Vendor map list</h2>
          <button class="primary-button" data-action="add-vendor"><i data-lucide="plus"></i>Add vendor</button>
        </div>
        <div class="mt-5 overflow-hidden rounded-2xl border border-[#e0e0e0] dark:border-white/15">
          ${vendors.map((vendor, index) => tableRow(vendor, index)).join("")}
        </div>
      </section>
    </div>
  `;
}

function seniorView() {
  return `
    <div class="mx-auto max-w-7xl space-y-5">
      ${pageHeader("Senior Boxes", "A batch archive for handover kits, process leftovers, research scans, swatches, jigs, and material libraries.", "archive")}
      <div class="grid gap-4 lg:grid-cols-3">
        ${seniorBoxes.map(boxCard).join("")}
      </div>
      ${batchArchive(true)}
    </div>
  `;
}

function failuresView() {
  return `
    <div class="mx-auto max-w-7xl space-y-5">
      ${pageHeader("Failure Library", "A gallery of things that broke, warped, burned, peeled, cracked, and taught the next batch what to do.", "triangle-alert")}
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        ${failures.map(failureCard).join("")}
      </div>
      <section class="panel rounded-3xl p-5">
        <h2 class="text-xl font-extrabold">Failure pattern board</h2>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          ${["Material behavior", "Machine setup", "Presentation risk"].map((title, i) => `<div class="rounded-2xl bg-[#f4f4f4] p-4 dark:bg-[#161616]"><p class="font-bold">${title}</p><p class="mt-2 text-sm text-black/70 dark:text-white/72">${[42, 31, 19][i]} linked cases with fixes, photos, and prevention tags.</p></div>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function uploadView() {
  return `
    <div class="mx-auto max-w-6xl space-y-5">
      ${pageHeader("Upload Knowledge", "Turn workshop discoveries into searchable memory cards with tags, evidence, and batch context.", "upload-cloud")}
      <div class="grid gap-5 lg:grid-cols-[1fr_340px]">
        <form id="uploadForm" class="panel rounded-3xl p-5">
          <div class="grid gap-4 md:grid-cols-2">
            ${inputField("Title", "uploadTitle", "e.g. Laser settings for 3mm acrylic")}
            ${selectField("Knowledge type", "uploadType", ["Machine DNA", "VendorVerse", "Senior Boxes", "Failure Library", "Crit Insight"])}
            ${inputField("Batch", "uploadBatch", "B.Des 2026")}
            ${inputField("Machine or location", "uploadMachine", "Epilog Fusion Pro / Local vendor")}
          </div>
          <label class="mt-4 block">
            <span class="mb-2 block text-sm font-bold">Process note</span>
            <textarea class="field min-h-36 resize-y" id="uploadNote" placeholder="What happened, what worked, what should the next student know?"></textarea>
          </label>
          <div class="mt-4">
            <span class="mb-2 block text-sm font-bold">Tags</span>
            <div class="flex flex-wrap gap-2" id="tagChoices">
              ${["laser", "cnc", "vendor", "failure", "critique", "wood", "metal", "paper", "budget"].map((tag) => `<button type="button" class="filter-pill" data-tag="${tag}">${tag}</button>`).join("")}
            </div>
          </div>
          <div class="mt-5 flex flex-wrap gap-3">
            <button class="primary-button" type="submit"><i data-lucide="send"></i>Publish to archive</button>
            <button class="soft-button" type="button" data-action="save-draft"><i data-lucide="file-pen-line"></i>Save draft</button>
          </div>
        </form>
        <aside class="space-y-4">
          <div class="tile rounded-3xl p-5">
            <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-deep dark:text-blue-200">Upload flow</p>
            <div class="mt-4 space-y-3">
              ${["Describe the discovery", "Attach evidence", "Tag for search", "Publish for batches"].map((step, i) => `<div class="flex items-center gap-3"><span class="grid h-8 w-8 place-items-center rounded-full bg-blue-ibm text-sm font-bold text-white">${i + 1}</span><span class="font-semibold">${step}</span></div>`).join("")}
            </div>
          </div>
          ${emptyState("Evidence attachments", "Static demo mode: photos, receipts, and PDFs can be wired to storage later.", "image-plus")}
        </aside>
      </div>
    </div>
  `;
}

function profileView() {
  return `
    <div class="mx-auto max-w-7xl space-y-5">
      ${pageHeader("User Profile", "Your contribution trail, saved searches, bookmarks, and batch identity.", "user-round")}
      <div class="grid gap-5 lg:grid-cols-[340px_1fr]">
        <section class="panel rounded-3xl p-5">
          <div class="flex items-center gap-4">
            <div class="grid h-20 w-20 place-items-center rounded-3xl bg-blue-ibm text-2xl font-extrabold text-white">LD</div>
            <div>
              <h2 class="text-2xl font-extrabold">Lore Keeper</h2>
              <p class="text-sm text-black/70 dark:text-white/72">B.Des 2026 · Product Design</p>
            </div>
          </div>
          <div class="mt-5 grid grid-cols-3 gap-3">
            ${miniMetric("42", "Uploads")}
            ${miniMetric(bookmarks.size, "Saves")}
            ${miniMetric("12", "Badges")}
          </div>
        </section>
        <section class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            ${knowledge.filter((item) => bookmarks.has(item.id)).map(knowledgeCard).join("") || emptyState("No bookmarks yet", "Save cards from the feed to build your personal studio memory.", "bookmark")}
          </div>
        </section>
      </div>
    </div>
  `;
}

function bindPage(routeId) {
  document.querySelectorAll("[data-goto]").forEach((button) => button.addEventListener("click", () => go(button.dataset.goto)));
  document.querySelectorAll("[data-bookmark]").forEach((button) => {
    button.addEventListener("click", () => toggleBookmark(button.dataset.bookmark));
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });

  if (routeId === "home") bindHomeSearch();
  if (routeId === "search") bindSearch();
  if (routeId === "upload") bindUpload();
}

function bindHomeSearch() {
  const input = document.querySelector("#heroSearch");
  const menu = document.querySelector("#suggestions");
  document.querySelector("#heroSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    query = input.value.trim();
    location.hash = "#search";
  });
  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    const matches = suggestions.filter((item) => item.includes(value)).slice(0, 5);
    menu.classList.toggle("hidden", !value || !matches.length);
    menu.innerHTML = matches.map((item) => `<button class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5" data-suggestion="${item}"><i data-lucide="corner-down-right"></i>${item}</button>`).join("");
    createIcons();
    menu.querySelectorAll("[data-suggestion]").forEach((button) => button.addEventListener("click", () => useSuggestion(button.dataset.suggestion)));
  });
  document.querySelectorAll("[data-suggestion]").forEach((button) => button.addEventListener("click", () => useSuggestion(button.dataset.suggestion)));
}

function bindSearch() {
  document.querySelector("#resultsSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    query = document.querySelector("#resultsSearch").value.trim();
    route();
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      route();
    });
  });
}

function bindUpload() {
  const selected = new Set();
  document.querySelectorAll("[data-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      selected.has(button.dataset.tag) ? selected.delete(button.dataset.tag) : selected.add(button.dataset.tag);
      button.classList.toggle("active");
    });
  });
  document.querySelector("#uploadForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#uploadTitle").value.trim();
    if (!title) {
      showToast("Add a title before publishing.");
      return;
    }
    showToast("Knowledge card published to the batch archive.");
    event.target.reset();
    document.querySelectorAll("[data-tag]").forEach((button) => button.classList.remove("active"));
  });
}

function useSuggestion(value) {
  query = value;
  location.hash = "#search";
}

function getFilteredKnowledge() {
  const tokens = query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return knowledge.filter((item) => {
    const filterMatch = activeFilter === "All" || item.type === activeFilter;
    const haystack = [item.title, item.summary, item.type, item.batch, item.author, item.machine, ...item.tags]
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ");
    const queryMatch = !tokens.length || tokens.every((token) => haystack.includes(token));
    return filterMatch && queryMatch;
  });
}

function knowledgeCard(item) {
  const saved = bookmarks.has(item.id);
  return `
    <article class="tile group rounded-3xl p-5">
      <div class="mb-4 flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="h-11 w-2 rounded-full ${item.accent}"></span>
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-black/75 dark:text-white/65">${item.type}</p>
            <h3 class="mt-1 text-lg font-extrabold leading-snug tracking-tight">${item.title}</h3>
          </div>
        </div>
        <button class="icon-button !h-10 !w-10" data-bookmark="${item.id}" aria-label="Bookmark ${item.title}">
          <i data-lucide="${saved ? "bookmark-check" : "bookmark"}" class="${saved ? "text-blue-ibm" : ""}"></i>
        </button>
      </div>
      <p class="text-sm leading-6 text-black/75 dark:text-white/75">${item.summary}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${item.tags.slice(0, 3).map((tag) => `<span class="chip">${tag}</span>`).join("")}
      </div>
      <div class="mt-5 flex items-center justify-between border-t border-[#e0e0e0] pt-4 text-sm dark:border-white/15">
        <span class="font-semibold">${item.author} · ${item.batch}</span>
        <span class="rounded-full bg-black/[0.04] px-3 py-1 font-bold dark:bg-white/[0.06]">${item.metric}</span>
      </div>
    </article>
  `;
}

function pageHeader(title, subtitle, icon) {
  return `
    <section class="panel rounded-[2rem] p-5 sm:p-7">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="chip"><i data-lucide="${icon}"></i>LoreDesk module</span>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">${title}</h1>
          <p class="mt-3 max-w-3xl text-base leading-7 text-black/75 dark:text-white/75">${subtitle}</p>
        </div>
        <button class="soft-button" data-action="copy-link"><i data-lucide="link"></i>Copy link</button>
      </div>
    </section>
  `;
}

function statCard(number, label, icon) {
  return `<div class="rounded-2xl bg-paper p-4 dark:bg-[#161616]"><i data-lucide="${icon}" class="mb-5 h-5 w-5 text-blue-ibm"></i><p class="text-2xl font-extrabold">${number}</p><p class="text-xs font-semibold text-black/75 dark:text-white/70">${label}</p></div>`;
}

function activity(text, type) {
  const icons = { cnc: "settings-2", failure: "triangle-alert", vendor: "store" };
  return `<div class="flex gap-3"><span class="grid h-8 w-8 place-items-center rounded-full bg-[#e0e0e0] text-blue-deep dark:bg-[#262626] dark:text-[#78a9ff]"><i data-lucide="${icons[type]}"></i></span><p class="text-sm leading-5 text-black/75 dark:text-white/75">${text}</p></div>`;
}

function batchArchive(expanded = false) {
  return `
    <section class="panel rounded-3xl p-5">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-extrabold">Batch archive</h2>
        <button class="soft-button" data-action="open-archive"><i data-lucide="folder-open"></i>Open</button>
      </div>
      <div class="mt-5 space-y-3">
        ${["2026", "2025", "2024", "2023", "2022"].map((year, index) => `
          <button class="flex w-full items-center justify-between rounded-2xl border border-[#e0e0e0] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-ibm/40 dark:border-white/15 dark:bg-[#262626]">
            <span><span class="block font-bold">Batch ${year}</span><span class="text-sm text-black/75 dark:text-white/70">${320 - index * 34} cards · ${18 - index} boxes</span></span>
            <i data-lucide="arrow-right"></i>
          </button>
        `).join("")}
      </div>
      ${expanded ? `<p class="mt-4 text-sm text-black/70 dark:text-white/72">Each batch can preserve handover notes, thesis process archives, and vendor discoveries before graduating.</p>` : ""}
    </section>
  `;
}

function emptyState(title, text, icon) {
  return `
    <div class="tile rounded-3xl p-5 text-center">
      <div class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e0e0e0] text-blue-deep dark:bg-[#161616] dark:text-[#78a9ff]"><i data-lucide="${icon}"></i></div>
      <p class="mt-3 font-extrabold">${title}</p>
      <p class="mt-1 text-sm leading-6 text-black/70 dark:text-white/72">${text}</p>
    </div>
  `;
}

function filterBlock(title, items) {
  return `<div class="mt-5"><p class="mb-2 text-sm font-bold">${title}</p><div class="space-y-2">${items.map((item) => `<label class="flex items-center gap-2 text-sm text-black/75 dark:text-white/75"><input type="checkbox" class="accent-blue-ibm" />${item}</label>`).join("")}</div></div>`;
}

function machineCard(machine) {
  return `
    <article class="tile rounded-3xl p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-deep dark:text-blue-200">${machine.code}</p>
          <h3 class="mt-2 text-xl font-extrabold">${machine.name}</h3>
          <p class="mt-1 text-sm text-black/70 dark:text-white/72">${machine.use}</p>
        </div>
        <span class="rounded-full ${machine.status === "Ready" ? "bg-[#defbe6] text-[#0e6027]" : "bg-yolk-soft text-ink"} px-3 py-1 text-xs font-bold">${machine.status}</span>
      </div>
      <p class="mt-5 rounded-2xl bg-[#f4f4f4] p-4 text-sm font-semibold leading-6 dark:bg-[#161616]">${machine.setting}</p>
      <div class="mt-4 flex gap-2">
        <button class="primary-button flex-1" data-action="open-machine"><i data-lucide="scan-line"></i>Open DNA</button>
        <button class="icon-button" data-action="copy-qr" aria-label="Copy QR"><i data-lucide="qr-code"></i></button>
      </div>
    </article>
  `;
}

function timelineItem(item) {
  return `<div class="flex gap-4 rounded-2xl border border-[#e0e0e0] bg-white p-4 dark:border-white/15 dark:bg-[#262626]"><span class="mt-1 h-3 w-3 rounded-full ${item.accent}"></span><div><p class="font-bold">${item.title}</p><p class="mt-1 text-sm text-black/70 dark:text-white/72">${item.author} · ${item.batch} · ${item.time}</p></div></div>`;
}

function vendorCard(vendor) {
  return `
    <article class="tile rounded-3xl p-5">
      <div class="flex items-center justify-between">
        <span class="chip"><i data-lucide="star"></i>${vendor.rating}</span>
        <span class="text-xs font-bold text-black/75 dark:text-white/65">${vendor.distance}</span>
      </div>
      <h3 class="mt-5 text-lg font-extrabold">${vendor.name}</h3>
      <p class="mt-1 text-sm font-semibold text-blue-deep dark:text-blue-200">${vendor.category}</p>
      <p class="mt-3 text-sm leading-6 text-black/70 dark:text-white/72">${vendor.note}</p>
      <button class="soft-button mt-5 w-full" data-action="vendor-call"><i data-lucide="phone"></i>${vendor.status}</button>
    </article>
  `;
}

function tableRow(vendor, index) {
  return `<button class="grid w-full gap-2 border-b border-[#e0e0e0] p-4 text-left transition last:border-b-0 hover:bg-black/[0.035] dark:border-white/15 dark:hover:bg-white/[0.04] md:grid-cols-[1.3fr_1fr_0.6fr_0.8fr]"><span class="font-bold">${vendor.name}</span><span class="text-black/70 dark:text-white/72">${vendor.category}</span><span>${vendor.rating} stars</span><span>${index % 2 ? "Verified" : "Needs update"}</span></button>`;
}

function boxCard(box) {
  return `
    <article class="tile rounded-3xl p-5">
      <div class="grid h-28 place-items-center rounded-2xl border border-[#e0e0e0] bg-[#f4f4f4] dark:border-white/15 dark:bg-[#161616]">
        <i data-lucide="archive" class="h-9 w-9 text-blue-deep dark:text-[#78a9ff]"></i>
      </div>
      <h3 class="mt-4 text-lg font-extrabold">${box.title}</h3>
      <p class="mt-1 text-sm text-black/70 dark:text-white/72">Batch ${box.batch} · ${box.items} items · ${box.owner}</p>
      <div class="mt-4 flex flex-wrap gap-2">${box.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
      <button class="primary-button mt-5 w-full" data-action="reserve-box"><i data-lucide="calendar-plus"></i>Reserve box</button>
    </article>
  `;
}

function failureCard(failure) {
  return `
    <article class="tile rounded-3xl p-5">
      <span class="chip ${failure.severity === "High" ? "!bg-[#ffe1dc] !text-[#8f1d12]" : ""}"><i data-lucide="activity"></i>${failure.severity}</span>
      <h3 class="mt-5 text-lg font-extrabold">${failure.title}</h3>
      <p class="mt-3 text-sm"><span class="font-bold">Cause:</span> <span class="text-black/70 dark:text-white/72">${failure.cause}</span></p>
      <p class="mt-2 text-sm"><span class="font-bold">Fix:</span> <span class="text-black/70 dark:text-white/72">${failure.fix}</span></p>
      <button class="soft-button mt-5 w-full" data-action="open-failure"><i data-lucide="image"></i>View case</button>
    </article>
  `;
}

function inputField(label, id, placeholder) {
  return `<label><span class="mb-2 block text-sm font-bold">${label}</span><input id="${id}" class="field" placeholder="${placeholder}" /></label>`;
}

function selectField(label, id, options) {
  return `<label><span class="mb-2 block text-sm font-bold">${label}</span><select id="${id}" class="field">${options.map((option) => `<option>${option}</option>`).join("")}</select></label>`;
}

function miniMetric(value, label) {
  return `<div class="rounded-2xl bg-[#f4f4f4] p-3 text-center dark:bg-[#262626]"><p class="text-xl font-extrabold">${value}</p><p class="text-xs font-bold text-black/75 dark:text-white/65">${label}</p></div>`;
}

function handleAction(action) {
  const messages = {
    "copy-link": "Module link copied.",
    "save-search": "Search saved. You will see new matching memories here.",
    "download-qr": "QR set prepared for machine labels.",
    "copy-qr": "Machine QR copied.",
    "open-machine": "Machine DNA page opened in demo mode.",
    "add-vendor": "Vendor form ready in Upload Knowledge.",
    "vendor-call": "Vendor contact copied.",
    "open-archive": "Batch archive opened.",
    "reserve-box": "Senior box reservation requested.",
    "open-failure": "Failure case opened.",
    "save-draft": "Draft saved locally.",
  };
  if (action === "add-vendor") {
    go("upload");
    setTimeout(() => showToast(messages[action]), 260);
    return;
  }
  showToast(messages[action] || "Action complete.");
}

function toggleBookmark(id) {
  bookmarks.has(id) ? bookmarks.delete(id) : bookmarks.add(id);
  localStorage.setItem("lored_bookmarks", JSON.stringify([...bookmarks]));
  showToast(bookmarks.has(id) ? "Saved to your profile." : "Removed from bookmarks.");
  route();
}

function showToast(message) {
  toast.innerHTML = `<div class="rounded-2xl bg-blue-ibm px-4 py-3 text-sm font-bold text-white shadow-soft">${message}</div>`;
  toast.classList.remove("translate-y-2", "opacity-0");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("translate-y-2", "opacity-0"), 2200);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("lored_theme", isDark ? "dark" : "light");
  updateThemeIcon();
}

function applySavedTheme() {
  const saved = localStorage.getItem("lored_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", saved ? saved === "dark" : prefersDark);
  updateThemeIcon();
}

function updateThemeIcon() {
  const button = document.querySelector("#themeToggle");
  if (!button) return;
  button.innerHTML = `<i data-lucide="${document.documentElement.classList.contains("dark") ? "sun" : "moon"}"></i>`;
  createIcons();
}

function toggleSidebar(open) {
  sidebar.classList.toggle("-translate-x-full", !open);
  overlay.classList.toggle("hidden", !open);
}

function go(routeId) {
  location.hash = `#${routeId}`;
}

function createIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

init();
