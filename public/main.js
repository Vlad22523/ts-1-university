"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// dst: src/main.ts
// Примітивні типи
const userName = "Влад"; // *не* name, щоб уникнути конфлікту з глобальним 'name'
const userAge = 20;
const isStudent = true;
// DOM-елементи (типізовані)
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const loadBtn = document.getElementById("loadBtn");
const cardsContainer = document.getElementById("cards");
const backToTop = document.getElementById("backToTop");
// Безпечні утиліти
function showModal(message) {
    if (!modal || !modalText)
        return;
    modalText.textContent = message;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
    if (!modal)
        return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
}
// Події кліку
if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
        showModal(`Привіт, я ${userName}. Мені ${userAge} років. Студент: ${isStudent}`);
    });
}
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}
if (modal) {
    modal.addEventListener("click", (e) => {
        const target = e.target;
        // Закрити при кліку поза вікном
        if (target && target.id === "modal")
            closeModal();
    });
}
// Scroll: показ кнопки "back to top"
window.addEventListener("scroll", () => {
    if (!backToTop)
        return;
    if (window.scrollY > 300)
        backToTop.classList.add("show");
    else
        backToTop.classList.remove("show");
});
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok)
            throw new Error(`HTTP error ${res.status}`);
        const data = yield res.json();
        return data.slice(0, 8); // беремо 8 постів як приклад
    });
}
function renderPosts(posts) {
    if (!cardsContainer)
        return;
    cardsContainer.innerHTML = "";
    posts.forEach((p) => {
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
// load button handler
if (loadBtn) {
    loadBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            loadBtn.disabled = true;
            loadBtn.textContent = "Завантаження...";
            const posts = yield fetchPosts();
            renderPosts(posts);
        }
        catch (err) {
            console.error(err);
            showModal("Помилка при завантаженні постів");
        }
        finally {
            if (loadBtn) {
                loadBtn.disabled = false;
                loadBtn.textContent = "Завантажити пости (fetch)";
            }
        }
    }));
}
