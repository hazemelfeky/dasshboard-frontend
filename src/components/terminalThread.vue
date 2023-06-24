<template>
  <div
    :id="`terminal-container-${tab.id}`"
    :class="`terminal-container terminal-container-${tab.id}`"
  />
</template>

<script setup>
  import { Terminal } from 'xterm';
  import { FitAddon } from 'xterm-addon-fit';
  import io from 'socket.io-client';
  import axios from 'axios';

  const props = defineProps({ tab: { type: Object } });

  // Open the terminal in #terminal-container
  onMounted(() => {
    const term = new Terminal({ cursorBlink: true });
    const terminalContainerRef = document.querySelector(
      `#terminal-container-${props.tab.id}`
    );
    term.open(terminalContainerRef);

    // Make the terminal's size and geometry fit the size of #terminal-container
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    term.focus();
    var resizeInterval;
    window.onresize = function () {
      clearTimeout(resizeInterval);
      resizeInterval = setTimeout(resize, 400);
    };

    // Recalculates the terminal Columns / Rows and sends new size to SSH server + xtermjs
    function resize() {
      console.log('resize');
      if (term) {
        fitAddon.fit();
        term.focus();
      }
    }

    // TODO
    // this is a work around to hide div named helpers
    // when change it from scss file, the whole terminal component is disappered
    setTimeout(() => {
      const viewport = document.querySelector('.xterm-viewport');
      viewport.style.display = 'none';
      const helpers = document.querySelector('.xterm-helpers');
      helpers.style.display = 'none';
    });

    axios
      .post('http://localhost:8080/terminal', {
        host: '18.118.162.195',
        username: 'ubuntu',
        password: '1',
      })
      .then(() => {
        const socket = io('http://localhost:3000', {
          query: { EIO: 3, a7a: 4 },
        });
        socket.on('connect', function () {
          console.log('connected 🤙');

          // Browser -> Backend
          term.on('data', function (data) {
            socket.emit('data', data);
          });

          // Backend -> Browser
          socket.on('data', function (data) {
            term.write(data);
          });

          socket.on('disconnect', function () {
            term.write('\r\n*** Disconnected from backend***\r\n');
          });
        });
      });
  });
</script>

<style>
  #terminal-container {
    height: 100%;
  }
</style>
