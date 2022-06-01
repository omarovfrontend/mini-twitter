// Добавление поста
const { addPost } = document.forms;
const myPosts = document.querySelector('.myPosts');

function insertPost(post) {
  return `
    <div class="myPost">
      <p class="title-post">${post.title}</p>
      <img class="img-post" src=${post.img} alt="photo">
      <div data-dataId="${post.id}" class="myPost-inner">
        <button data-type="delete" id="${post.id}" class="myPosts_delete-btn">Удалить</button>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Изменить
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div data-id="${post.id}" class="modal-body">
                <form name="editPost" class="editPost">
                  <div class="addPost_card">
                    <label for="name" class="form-label">Название Поста:</label>
                    <input class="input" required="required" type="text" name="postName" placeholder="name..." />
                  </div>

                  <div class="addPost_card">
                    <label for="name" class="form-label">Ссылка на картинку:</label>
                    <input class="input" required="required" type="text" name="img" placeholder="вставьте ссылку..." />
                  </div>

                  <div data-id="${post.id}" class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="submit" id="edit" class="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

addPost.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { postName, img } = addPost;

  const response = await fetch('/post/add', {
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
    myPosts.insertAdjacentHTML('beforeend', insertPost(result));

    postName.value = '';
    img.value = '';
  }
});

// Удаление поста
myPosts.addEventListener('click', async (event) => {
  event.preventDefault();

  if (event.target.className === 'myPosts_delete-btn') {
    const response = await fetch(`/post/delete/${event.target.id}`, {
      method: 'delete',
    });
    if (response.ok) {
      const targetDiv = event.target.closest('.myPost');
      targetDiv.remove();
    }
    // изменение поста
  } else if (event.target.id === 'edit') {
    const { editPost } = document.forms;
    const editId = event.target.parentNode.dataset.id;
    const editPosts = Object.fromEntries(new FormData(editPost));
    const res = await fetch(`/post/edit/${editId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editPosts),
    });
    const result = await res.json();
    console.log(result, 'frontend ------>>>');

    if (res.ok) {
      document.querySelector('.title-post').innerText = `${editPosts.postName}`;
      document.querySelector('.img-post').src = editPosts.img;
    }
  }
});
