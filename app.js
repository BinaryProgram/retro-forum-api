const postCategory = async (categoryName) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/${categoryName}`,
  );
  const data = await response.json();
  const items = data.posts;
  displaySearchResult(items);
};
const latestPost = async (newPost) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/${newPost}`,
  );
  const data = await response.json();
  displayLatestNews(data);
};

// handle search button and input field value
const searchQuery = () => {
  const searchFieldValue = document.getElementById("input-value").value;
  if (searchFieldValue === "") {
    alert("Please enter a category name");
  } else {
    postCategory(`posts?category=${searchFieldValue}`);
  }
};
// handle display posts
const displaySearchResult = (posts) => {
  const searchResultContainer = document.getElementById("discuss-topic");
  // To clear previous search results
  searchResultContainer.innerHTML = "";
  document.getElementById("title-list").innerHTML = "";
  document.getElementById("read-count").innerText = 0;

  posts.forEach((post) => {
    const div = document.createElement("div");

    if (post.isActive) {
      div.innerHTML = `
      <div class = "flex flex-col gap-5 rounded-3xl bg-[#f3f3f5] p-10 lg:flex-row">
            <div class="avatar relative top-0 items-start">
              <div class="absolute h-24 w-24 avatar-online"></div>
              <div class="mask mask-squircle w-24">
                <img
                  src="${post.image}"
                />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex gap-4">
                <h5 class="font-[inter] text-sm font-medium text-[#12132dcc]">
                  # <span>${post.category}</span>
                </h5>
                <h5 class="font-[inter] text-sm font-medium text-[#12132dcc]">
                  #Author : <span>${post.author.name}</span>
                </h5>
              </div>
              <h2 class="mt-3 font-[mulish] text-xl font-bold text-[#12132d]">
                ${post.title}
              </h2>
              <p class="mt-4 font-[inter] text-[#12132d99]">
                ${post.description}

              </p>
              <div
                class="mt-5 border-b-2 border-dotted border-[#12132d40]"
              ></div>

              <div class="mt-6 flex justify-between">
                <div class="flex justify-around gap-2 sm:gap-10 lg:gap-20">
                  <div class="flex items-center gap-1 lg:gap-3">
                    <i class="fa-regular fa-comment-dots"></i>
                    <h5>${post.comment_count}</h5>
                  </div>
                  <div class="flex items-center gap-1 lg:gap-3">
                    <i class="fa-regular fa-eye"></i>
                    <h5>${post.view_count}</h5>
                  </div>
                  <div class="flex items-center gap-1 lg:gap-3">
                    <i class="fa-regular fa-clock"></i>
                    <h5><span>${post.posted_time}</span>min</h5>
                  </div>
                </div>
                <div
                onclick="markAsRead('${post.title.replace(/'/g, "\\'")}', '${post.view_count}')"
                  class="btn flex h-10 w-10 items-center justify-center rounded-full  bg-[#10b981] p-2"
                >
                  <i class="fa-regular fa-envelope-open text-white"></i>
                </div>
              </div>
            </div>
          </div>
    `;
    } else {
      div.innerHTML = `
      <div class = "flex flex-col gap-5 rounded-3xl bg-[#f3f3f5] p-10 lg:flex-row">
            <div class="avatar relative top-0 items-start">
              <div class="absolute avatar-offline h-24 w-24"></div>
              <div class="mask mask-squircle w-24">
                <img
                  src="${post.image}"
                />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex gap-4">
                <h5 class="font-[inter] text-sm font-medium text-[#12132dcc]">
                  # <span>${post.category}</span>
                </h5>
                <h5 class="font-[inter] text-sm font-medium text-[#12132dcc]">
                  #Author : <span>${post.author.name}</span>
                </h5>
              </div>
              <h2 class="mt-3 font-[mulish] text-xl font-bold text-[#12132d]">
                ${post.title}
              </h2>
              <p class="mt-4 font-[inter] text-[#12132d99]">
                ${post.description}

              </p>
              <div
                class="mt-5 border-b-2 border-dotted border-[#12132d40]"
              ></div>

              <div class="mt-6 flex justify-between">
                <div class="flex justify-around gap-2 sm:gap-10 lg:gap-20">
                  <div class="flex items-center gap-1 lg:gap-3">
                    <i class="fa-regular fa-comment-dots"></i>
                    <h5>${post.comment_count}</h5>
                  </div>
                  <div class="flex items-center gap-1 lg:gap-3">
                    <i class="fa-regular fa-eye"></i>
                    <h5>${post.view_count}</h5>
                  </div>
                  <div class="flex items-center gap-1 lg:gap-3">
                    <i class="fa-regular fa-clock"></i>
                    <h5><span>${post.posted_time}</span>min</h5>
                  </div>
                </div>
                <div onclick="markAsRead('${post.title.replace(/'/g, "\\'")}', '${post.view_count}')"
                  class="btn flex h-10 w-10 items-center justify-center rounded-full  bg-[#10b981] p-2"
                >
                  <i class="fa-regular fa-envelope-open text-white"></i>
                </div>
              </div>
            </div>
          </div>
    `;
    }
    searchResultContainer.append(div);
  });
};
const markAsRead = (title, viewCount) => {
  const readPost = document.getElementById("title-list");
  const readCount = document.getElementById("read-count").innerText;
  const count = parseInt(readCount) + 1;
  document.getElementById("read-count").innerText = count;
  console.log("Click hoicae");
  const div = document.createElement("div");
  div.innerHTML = `
            <div
              class="mt-5 flex justify-between gap-5 rounded-2xl bg-[#fff] p-5"
            >
              <p>${title}</p>
              <div class="flex items-center justify-center gap-2">
                <i class="fa-regular fa-eye"></i>
                <h5>${viewCount}</h5>
              </div>
            </div>
  `;
  readPost.append(div);
};
const displayLatestNews = (latestPost) => {
  console.log(latestPost);
  const latestNewsContainer = document.getElementById("latest-news");
  // To clear previous search results
  latestNewsContainer.innerHTML = "";
  latestPost.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-base-100 p-6 shadow-sm">
            <figure class="rounded-[20px]">
              <img
                src="${post.cover_image}"
                alt="games-module" 
              />
            </figure>
            <div class="card-body mt-6 space-y-1 p-0">
              <div class="flex gap-2">
                <span><i class="far fa-calendar"></i></span>
                <h5 class="font-[mulish] text-[#12132d99]">${post.author.posted_date ? post.author.posted_date : "Unknown"}</h5>
              </div>
              <h2
                class="card-title font-[mulish] text-lg font-extrabold leading-7 text-[#12132d]"
              >
                ${post.title}
              </h2>
              <p class="font-[mulish] leading-6 text-[#12132d99]">
                ${post.description}
              </p>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="w-14 rounded-full">
                    <img
                      src="${post.profile_image}"
                    />
                  </div>
                </div>
                <div class="space-y-1">
                  <h3>${post.author.name}</h3>
                  <h4>${post.author.designation ? post.author.designation : 'Unknown'}</h4>
                </div>
              </div>
            </div>
          </div>
    `;
    latestNewsContainer.append(div);
  });
  
};
postCategory("posts?category=coding");
latestPost("latest-posts");
