const apiKey = 'c1da2865545c41d89fdabc037dc19492';
const url = 'https://newsapi.org/v2/everything?q=';
const input = document.getElementById("inputData");

document.addEventListener('DOMContentLoaded', () => {
    fetchNews('India');
});

async function fetchNews(query) {
    const newsContainer = document.getElementById('newsContainer');
    if (query === '') newsContainer.innerHTML = 'Loading...';

    try {
        const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.articles.length === 0) {
            newsContainer.innerHTML = 'No news articles found.';
            return;
        }
        newsContainer.innerHTML = '';
        data.articles.forEach(article => {
            if (article.description && article.title !== "[Removed]") {
                const newsCard = document.createElement('div');
                newsCard.className = 'card';
                newsCard.innerHTML = `
                    <a href="${article.url}" target="_blank" style="text-decoration: none; color: inherit;">
                        <img src="${article.urlToImage}" alt="News Image">
                        <h2>${article.title}</h2>
                        <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                        <p>${article.description}</p>
                    </a>
                `;
                newsContainer.appendChild(newsCard);
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = 'Error loading news. Please try again later.';
    }
}
function fetchNewsByCategory(category) {
    fetchNews(category);
}
function navClick(id) {
    input.value = '';
    fetchNews(id);
}
function searchNews() {
    const query = input.value.trim();
    if (query) {
        fetchNews(query);
    }
}
function subscribeNewsletter() {
    const emailInput = document.getElementById('emailInput');
    const subscriptionMessage = document.getElementById('subscriptionMessage');

    if (validateEmail(emailInput.value)) {
        subscriptionMessage.innerText = 'Thank you for subscribing!';
        emailInput.value = '';
    } else {
        subscriptionMessage.innerText = 'Please enter a valid email address.';
    }
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
input.addEventListener('input', searchNews);
