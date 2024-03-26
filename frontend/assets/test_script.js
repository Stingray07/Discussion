function openCommentForm() {
  var commentForm = document.querySelector(".comment-form");

  if (commentForm.style.display === "block") {
    commentForm.style.display = "none";
  } else {
    commentForm.style.display = "block";
  }
}
