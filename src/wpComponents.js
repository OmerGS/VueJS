import { createApp } from 'vue';
import App from './App.vue';

window.renderVueApp = function (id) {
    createApp(App).mount(`#${id}`);
};