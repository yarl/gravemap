<template>
  <div class="columns" id="mail-app">
    <aside class="column is-2 aside hero is-fullheight">
      <div>
        <div class="compose has-text-centered">
          <a class="button is-danger is-block is-bold">
            <span class="compose">Compose</span>
          </a>
        </div>
        <div class="main">
          <a href="#" class="item active">
            <span class="icon">
              <i class="fa fa-inbox"></i>
            </span>
            <span class="name">Inbox</span>
          </a>
          <a href="#" class="item">
            <span class="icon">
              <i class="fa fa-star"></i>
            </span>
            <span class="name">Starred</span>
          </a>
          <a href="#" class="item">
            <span class="icon">
              <i class="fa fa-envelope-o"></i>
            </span>
            <span class="name">Sent Mail</span>
          </a>
          <a href="#" class="item">
            <span class="icon">
              <i class="fa fa-folder-o"></i>
            </span>
            <span class="name">Folders</span>
          </a>
        </div>
      </div>
    </aside>
    <div class="column is-4 messages hero is-fullheight" id="message-feed">
      <div class="action-buttons">
        <div class="control is-grouped">
          <a class="button is-small">
            <i class="fa fa-chevron-down"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-refresh"></i>
          </a>
        </div>
        <div class="control is-grouped">
          <a class="button is-small">
            <i class="fa fa-inbox"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-exclamation-circle"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-trash-o"></i>
          </a>
        </div>
        <div class="control is-grouped">
          <a class="button is-small">
            <i class="fa fa-folder"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-tag"></i>
          </a>
        </div>
        <div class="control is-grouped pg">
          <div class="title"></div>
          <a class="button is-link">
            <i class="fa fa-chevron-left"></i>
          </a>
          <a class="button is-link">
            <i class="fa fa-chevron-right"></i>
          </a>
        </div>
      </div>

      <div class="inbox-messages" id="inbox-messages">
        <div class="card">
          <div class="card-content">
            <div class="msg-header">
              <span class="msg-from">
                <small>From: {{ msg.from }}</small>
              </span>
              <span class="msg-timestamp"></span>
              <span class="msg-attachment">
                <i class="fa fa-paperclip"></i>
              </span>
            </div>
            <div class="msg-subject">
              <span class="msg-subject">
                <strong id="fake-subject-1">{{ msg.subject }}</strong>
              </span>
            </div>
            <div class="msg-snippet">
              <p id="fake-snippet-1">{{ msg.snippet }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-6 message hero is-fullheight is-hidden" id="message-pane">
      <div class="action-buttons">
        <div class="control is-grouped">
          <a class="button is-small">
            <i class="fa fa-inbox"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-exclamation-circle"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-trash-o"></i>
          </a>
        </div>
        <div class="control is-grouped">
          <a class="button is-small">
            <i class="fa fa-exclamation-circle"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-trash-o"></i>
          </a>
        </div>
        <div class="control is-grouped">
          <a class="button is-small">
            <i class="fa fa-folder"></i>
          </a>
          <a class="button is-small">
            <i class="fa fa-tag"></i>
          </a>
        </div>
      </div>
      <div class="box message-preview">
        <div class="top">
          <div class="avatar">
            <img src="https://placehold.it/128x128">
          </div>
          <div class="address">
            <div class="name">John Smith</div>
            <div class="email">someone@gmail.com</div>
          </div>
          <hr>
          <div class="content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style scoped>
@import '~bulma/css/bulma.css';

</style>
