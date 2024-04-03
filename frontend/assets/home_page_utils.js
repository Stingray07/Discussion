function openCommentForm(commentFormID) {
  var commentForm = document.getElementById(commentFormID);

  if (commentForm.style.display === "block") {
    commentForm.style.display = "none";
  } else {
    commentForm.style.display = "block";
  }
}

$(window).scroll(function () {
  //- 10 = desired pixel distance from the bottom of the page while scrolling)
  if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
    handleRefresh();
  }
});

function handleRefresh() {
  try {
    const body = "";
    const formType = "get_discussion";
    const reqType = "GET";
    submitForm(body, formType, reqType).then((data) => {
      showDiscussions(data);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function showDiscussions(discussions) {
  for (let i = 0; i < discussions.length; i++) {
    const main = document.getElementById("mainContent");
    const newSection = document.createElement("section");

    const newDiscussionDiv = createDiscussionDiv(discussions[i]);
    newSection.appendChild(newDiscussionDiv);

    const newCommentFormDiv = createCommentFormDiv(discussions[i]);
    newSection.appendChild(newCommentFormDiv);

    main.appendChild(newSection);
  }
}

function createDiscussionDiv(discussion) {
  const newDiscussionDiv = document.createElement("div");
  newDiscussionDiv.className = "discussion";

  const discussionTitle = document.createElement("h2");
  discussionTitle.textContent = discussion.title;
  newDiscussionDiv.appendChild(discussionTitle);

  const discussionContent = document.createElement("p");
  discussionContent.textContent = discussion.content;
  newDiscussionDiv.appendChild(discussionContent);

  const discussionCommentButton = document.createElement("button");
  discussionCommentButton.onclick = function () {
    openCommentForm(discussion.discussion_id);
  };
  discussionCommentButton.textContent = "Comment";
  newDiscussionDiv.appendChild(discussionCommentButton);

  return newDiscussionDiv;
}

function createCommentFormDiv(discussion) {
  const newCommentFormDiv = document.createElement("div");
  newCommentFormDiv.className = "commentForm";
  newCommentFormDiv.id = discussion.discussion_id;

  const newTextArea = document.createElement("textarea");
  newTextArea.id = "commentInput";
  newTextArea.placeholder = "Type your comment here...";
  newCommentFormDiv.appendChild(newTextArea);

  const newSubmitCommentButton = document.createElement("button");
  newSubmitCommentButton.textContent = "Submit Comment";
  newSubmitCommentButton.className = "submitButton";

  newSubmitCommentButton.onclick = submitComment;
  newCommentFormDiv.appendChild(newSubmitCommentButton);
  return newCommentFormDiv;
}
