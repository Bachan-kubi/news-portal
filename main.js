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
        .then(data=>displayNewsCatergory(data.data.sort((a, b)=> b.total_view - a.total_view)))
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
                    <p class="card-text">${news.details.slice(0, 150) + "..."}</p>
                    <div class="d-flex m-2">
                        <img src="${news.author.img
                        }" class="img-fluid rounded-start img-custom" alt="...">
                        <p class="ms-3">${news.author.name?news.author.name:"No Author"}</p>
                        <h6 class="mx-auto">Total View: ${news.total_view
                        }</h6>
                        <button onclick="loadNewsDetails('${news._id

                        }')" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        `;
        categoryDetails.appendChild(div)
    });
}

// load news details from api link

const loadNewsDetails=(news_id)=>{
 const url = `https://openapi.programming-hero.com/api/news/${news_id}`
 fetch(url)
    .then(res=>res.json())
    .then(data=>console.log(data.data))
}



// loadNewsDetails();

loadNews();