import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { PostsCollection } from "../imports/api/PostsCollection";

import "./main.html";

Template.postForm.events({
  "submit.new-post"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const description = target.code.value
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const user = Meteor.users.findOne(Meteor.userId());
    const githubUser = user.services.github;

    PostsCollection.insert({
      title: title,
      text: description,
      userProfilePic:
        "https://avatars.githubusercontent.com/u/" + githubUser.id + "?v=4",
      username: githubUser.username,
      date: new Date().getTime(),
      likedBy: []
    });

    // Clear form
    target.title.value = "";
    target.code.value = "";
  },
});

Template.posts.helpers({
  posts() {
    return PostsCollection.find({}, { skip: 0, limit: 25, sort: { date: -1 } });
  },
});

Template.like.helpers({
  likes() {
    const title = Template.instance().data.postTitle
    const post = PostsCollection.findOne({ title: title })
    return post.likedBy.length
  },
});

Template.like.onRendered(() => {
  // Grab post
  const title = Template.instance().data.postTitle
  const post = PostsCollection.findOne({ title: title })
  // Grab button
  const button = $(".likeButton")
  // Grab user data
  const user = Meteor.users.findOne(Meteor.userId());
  const githubUser = user.services.github;
  // Update button
  if (post?.likedBy.includes(githubUser.username)) {
    button.addClass('liked')
  }
})

Template.like.events({
  "click button"(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Grab post data
    const title = this.postTitle
    // Grab user data
    const user = Meteor.users.findOne(Meteor.userId());
    const githubUser = user.services.github;

    const post = PostsCollection.findOne({ title: title })

    if (post?.likedBy.includes(githubUser.username)) {
      PostsCollection.update({ _id: post._id }, {
        $pull: {
          likedBy: githubUser.username
        }
      })
      const button = $(".likeButton")
      button.removeClass("liked")
    } else {
      PostsCollection.update({ _id: post._id }, {
        $push: {
          likedBy: githubUser.username
        }
      })
    }

  },
});

