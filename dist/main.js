import { renderPosts } from "./modules/posts.js";
import { scrollToTop } from "./modules/scroll.js";
import { showModal } from "./modules/modal.js";
const postsContainer = document.getElementById("posts");
const showBtn = document.getElementById("show-btn");
const scrollBtn = document.getElementById("scroll-btn");
const posts = [
    { id: 1, title: "Перший пост", body: "Це приклад тексту першого поста." },
    { id: 2, title: "Другий пост", body: "Ще один приклад запису." },
];
showBtn.addEventListener("click", () => {
    renderPosts(postsContainer, posts);
    showModal("Пости завантажено!");
});
scrollBtn.addEventListener("click", scrollToTop);
