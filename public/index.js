// Добавление поста
const { addPost } = document.forms;
const myPosts = document.querySelector('.myPosts');
const { postName, img } = addPost;

function insertPost(post) {
  return `
    <div class="myPost">
      <p>${post.title}</p>
      <img src=${post.img} alt="photo">
      <div data-dataId="${post.id}" class="myPost-inner">
        <button data-type="delete" id="${post.id}" class="myPosts_delete-btn">Удалить</button>
      </div>
    </div>
  `;
}

addPost.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await fetch('/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postName: postName.value,
      img: img.value,
    }),
  });

  if (response.ok) {
    const result = await response.json();
    myPosts.insertAdjacentHTML('afterbegin', insertPost(result));

    postName.value = '';
    img.value = '';
  }
});

// Удаление поста
myPosts.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.className === 'myPosts_delete-btn') {
    const response = await fetch(`/delete/${event.target.id}`, {
      method: 'delete',
    });
    if (response.ok) {
      const targetDiv = event.target.closest('.myPost');
      targetDiv.remove();
    }
  }
});
