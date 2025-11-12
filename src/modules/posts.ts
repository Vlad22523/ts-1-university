import { Post } from "../types/post.js";
import { createElement } from "./utils.js";

export function renderPosts(container: HTMLElement, posts: Post[]) {
  container.innerHTML = "";
  posts.forEach((post) => {
    const item = createElement("div", "post");
    item.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
    container.appendChild(item);
  });
}
