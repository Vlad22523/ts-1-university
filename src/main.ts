// Типи
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Модальне вікно
const openModalBtn = document.getElementById(
  "openModalBtn"
) as HTMLButtonElement;
const closeModalBtn = document.getElementById(
  "closeModalBtn"
) as HTMLSpanElement;
const modal = document.getElementById("modal") as HTMLDivElement;

openModalBtn.addEventListener("click", (): void => {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", (): void => {
  modal.style.display = "none";
});

window.addEventListener("click", (e: MouseEvent): void => {
  if (e.target === modal) modal.style.display = "none";
});

// Scroll подія
window.addEventListener("scroll", (): void => {
  console.log("Користувач скролить сторінку…");
});

// Fetch даних
const postsContainer = document.getElementById("posts") as HTMLDivElement;
const loadPostsBtn = document.getElementById(
  "loadPostsBtn"
) as HTMLButtonElement;

loadPostsBtn.addEventListener("click", async (): Promise<void> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await response.json();

  postsContainer.innerHTML = posts
    .slice(0, 5)
    .map((post: Post) => `<div><h3>${post.title}</h3><p>${post.body}</p></div>`)
    .join("");
});
