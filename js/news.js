import supabase from "/database/database.js";

async function loadNews() {
  let { data: news } = await supabase.from("news").select("*");
  if (news) {
    const newsList = document.getElementById("news--list");
    news.forEach((news) => {
      const box = `
        <li>
          <img
            src="${news.image}"
            alt="${news.title}"
          />
          <div class="details">
            <h2>${news.title}</h2>
            <p>${news.text}</p>
            <span>1403/09/27</span>
          </div>
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
          <img
            src="${news.image}"
            alt="${news.title}"
          />
          <div class="details">
            <h2>${news.title}</h2>
            <p>${news.text}</p>
            <span>1403/09/27</span>
          </div>
        </li>
      `;
      lastNews.innerHTML += box
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadNews();
});
