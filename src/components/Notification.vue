<template>
  <article class="message is-info">
    <div class="message-body">
      <h4 class="title is-5">
        <slot name="title"></slot>
      </h4>
      <slot></slot>
    </div>
  </article>
</template>
