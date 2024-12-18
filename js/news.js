import supabase from "/database/database.js";

async function loadNews() {
  let { data: news } = await supabase.from("news").select("*");
  if (news) {
    const newsList = document.getElementById("news--list");
    news.forEach((news) => {
      const box = `
        <li>
          <a href="/news-details.html?id=${news.id}">
            <img src="${news.image}" alt="${news.title}" />
            <div class="details">
              <h2>${news.title}</h2>
              <p>${news.text}</p>
              <span>1403/09/27</span>
            </div>
          </a>
        </li>
      `;
      newsList.innerHTML += box;
    });
  }

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
            <img src="${news.image}" alt="${news.title}" />
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
    const p = `<p>${item}</p>`
    categoriesBox.innerHTML += p
  })
}

document.addEventListener("DOMContentLoaded", () => {
  loadNews();
});
