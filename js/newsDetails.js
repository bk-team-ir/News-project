import supabase from "/database/database.js";

const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("id");
const newsBox = document.getElementById("news--details");

async function loadNews() {
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("id", newsId)
    .single();

  const tag = news.tags.map((tag) => `<span>#${tag}</span>`).join("");
  const box = `
    <h1>${news.title}</h1>
    <img src="${news.image}" alt="${news.title}">
    <p>${news.text}</p>
    <div class="tags">
      ${tag}
    </div>
  `;
  newsBox.innerHTML += box;

  let { data: last_news } = await supabase
    .from("news")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  const lastNews = document.getElementById("last--news");
  last_news.forEach((news) => {
    const box = `
          <li>
            <a href="/news-details.html?id=${news.id}">
              <img
                src="${news.image}"
                alt="${news.title}"
              />
              <div class="details">
                <h2>${news.title}</h2>
                <p>${news.text}</p>
                <span>1403/09/27</span>
              </div>
            </a>
          </li>
        `;
    lastNews.innerHTML += box;
  });

  const categoriesBox = document.getElementById("categories--box");
  let { data: categories } = await supabase.from("news").select("categories");
  const uniqueCategories = [
    ...new Set(categories.flatMap((item) => item.categories)),
  ];
  uniqueCategories.forEach((item) => {
    const p = `<p>${item}</p>`;
    categoriesBox.innerHTML += p;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadNews();
});
