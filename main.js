//load api data
const loadNews = ()=>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res=>res.json())
        .then(data=>showCategory(data.data.news_category))
}
//display categories
const showCategory = (newsCategory)=>{
    const category = document.getElementById('category');

    newsCategory.forEach(news=>{
        const div = document.createElement('div')
        div.innerHTML = `
        <ul>
            <li onclick="loadNewsCategory('${news.category_id}')"><a href="#">${news.category_name}</a></li>
        </ul>
        `;
        category.appendChild(div);
    });
}
// laod all news by categories
const loadNewsCategory = (category_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res=>res.json())
        .then(data=>displayNewsCatergory(data.data))
}

// display all news when click categories
const displayNewsCatergory = (news)=>{
    
    const categoryDetails = document.getElementById('category-details');
    //remove previes li list automatically.
    categoryDetails.innerHTML = ``;
    
    // show warning msg if no news found 
    const noNews = document.getElementById('no-news');
    noNews.innerHTML=``;
    if(news.length===0){
        noNews.innerHTML=`<h2>No News Updated!</h2>`;
        return; 
    }

    // apply loop to get data from api.
    news.forEach(news=>{
        
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card sm-12 md-6 mb-3">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 200) + "..."}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <img src="${news}" class="img-fluid rounded-start" alt="...">
                </div>
            </div>
            </div>
        </div>
        `;
        categoryDetails.appendChild(div)
    });
}





loadNews();