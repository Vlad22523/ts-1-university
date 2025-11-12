const userName: string = "Влад";
const userAge: number = 20;
const isStudent: boolean = true;

const openModalBtn = document.getElementById(
  "openModalBtn"
) as HTMLButtonElement | null;
const closeModalBtn = document.getElementById(
  "closeModalBtn"
) as HTMLButtonElement | null;
const modal = document.getElementById("modal") as HTMLDivElement | null;
const modalText = document.getElementById(
  "modalText"
) as HTMLParagraphElement | null;
const loadBtn = document.getElementById("loadBtn") as HTMLButtonElement | null;
const cardsContainer = document.getElementById(
  "cards"
) as HTMLDivElement | null;
const backToTop = document.getElementById("backToTop") as HTMLDivElement | null;

function showModal(message: string): void {
  if (!modal || !modalText) return;
  modalText.textContent = message;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(): void {
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    showModal(
      `Привіт, я ${userName}. Мені ${userAge} років. Студент: ${isStudent}`
    );
  });
}
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}
if (modal) {
  modal.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && target.id === "modal") closeModal();
  });
}

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 300) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const data: Post[] = await res.json();
  return data.slice(0, 8);
}

function renderPosts(posts: Post[]): void {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";
  posts.forEach((p: Post) => {
    const card = document.createElement("article");
    card.className = "card";
    const h3 = document.createElement("h3");
    h3.textContent = p.title;
    const pEl = document.createElement("p");
    pEl.textContent = p.body;
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = "Відкрити";
    btn.addEventListener("click", () => showModal(p.title));
    card.append(h3, pEl, btn);
    cardsContainer.appendChild(card);
  });
}

if (loadBtn) {
  loadBtn.addEventListener("click", async () => {
    try {
      loadBtn.disabled = true;
      loadBtn.textContent = "Завантаження...";
      const posts = await fetchPosts();
      renderPosts(posts);
    } catch (err) {
      console.error(err);
      showModal("Помилка при завантаженні постів");
    } finally {
      if (loadBtn) {
        loadBtn.disabled = false;
        loadBtn.textContent = "Завантажити пости (fetch)";
      }
    }
  });
}
