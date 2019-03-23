(function () {
  // render comments
  function renderComments(articleId) {
    $(".comments").empty();

    $.ajax({
      type: "GET",
      url: `/api/articles/${articleId}`
    }).then(data => {
      const dbNotes = data.note;

      dbNotes.forEach(note => {
        $(".comments").prepend(
          `<div class="comment" data-comment="${note._id}">
            <div>
              <strong>${note.author}:</strong> ${note.note}
            </div>
            <div>
              <button class="btn-delete" data-comment="${note._id}"><i class="fas fa-times"></i></button>
            </div>
          </div>`
        );
      });

      // delete a comment when a delete button is clicked
      $(".btn-delete").on("click", e => {
        const noteId = $(e.currentTarget).attr("data-comment");
        deleteComment(articleId, noteId);
      });
    }).catch(error => console.log(error));
  }

  // add comment
  function addComment(articleId) {
    const note = {
      author: $("#author").val().trim(),
      note: $("#comment").val().trim(),
      dateCreated: Date.now
    };

    $.ajax({
      type: "POST",
      url: `/api/articles/${articleId}`,
      data: note
    }).then(data => {
      $(".comments").prepend(
        `<div class="comment" data-comment="${note._id}">
          <div>
            <strong>${note.author}:</strong> ${note.note}
          </div>
          <div>
            <button class="btn-delete" data-comment="${note._id}"><i class="fas fa-times"></i></button>
          </div>
        </div>`
      );

      // delete a comment when a delete button is clicked
      $(".btn-delete").on("click", e => {
        const noteId = $(e.currentTarget).attr("data-comment");
        deleteComment(articleId, noteId);
      });

      $("#comment").val("");
    }).catch(error => console.log(error));
  }

  // delete comment
  function deleteComment(articleId, commentId) {
    $.ajax({
      type: "DELETE",
      url: `/api/articles/${articleId}/${commentId}`
    }).then(() => {
      $(`.comment[data-comment="${commentId}"]`).remove();
    });
  }

  // open modal when a comment button is clicked
  $(".btn-comment").on("click", e => {
    const articleId = $(e.currentTarget).attr("data-article");

    // render comments to show in modal
    renderComments(articleId);
    $(".modal").css("display", "block");

    $(".comment-form button").attr("data-article", articleId);
  });

  // close modal when the x is clicked
  $(".close").on("click", e => {
    $(".modal").css("display", "none");
  });

  // add comment on form submission
  $(".comment-form button").on("click", e => {
    e.preventDefault();

    const articleId = $(e.currentTarget).attr("data-article");
    addComment(articleId);
  });
})();
