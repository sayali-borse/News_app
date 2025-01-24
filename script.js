<<<<<<< HEAD
//const apiKey = "https://newsapi.org/v2/top-headlines?country=us&apiKey=2b3a77bbf9434928b010649ff991ddbe";
const url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&apiKey=2b3a77bbf9434928b010649ff991ddbe`;

=======
const apiKey = "https://newsapi.org/v2/top-headlines?country=us&apiKey=2b3a77bbf9434928b010649ff991ddbe";
>>>>>>> 2e6db1c09322c71bc8fc9780e39c1d35ea832752
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");

// Fetch top headlines
async function fetchNews(query = "") {
  newsContainer.innerHTML = `<p class="loading">Loading news...</p>`;
  try {
    const url = query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length === 0) {
      newsContainer.innerHTML = `<p class="loading">No news found.</p>`;
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p class="loading">Failed to load news. Please try again later.</p>`;
    console.error("Error fetching news:", error);
  }
}

// Display news
function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    newsCard.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x150'}" alt="News Image">
      <div class="content">
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
    newsContainer.appendChild(newsCard);
  });
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    fetchNews(query);
  } else if (query.length === 0) {
    fetchNews();
  }
});

// Load top headlines on page load
fetchNews();
