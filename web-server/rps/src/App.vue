<template>
  <div id="app">
    <p v-if="isShowing">
      치킨치킨치킨 디너
    </p>
    <button @click.prevent="test">Hide</button>
  </div>
</template>
<script>
import io from "socket.io-client";
import { setTimeout } from "timers";

export default {
  name: "app",
  data() {
    return {
      roomID: "",
      socket: io(),
      isShowing: true
    };
  },
  methods: {
    test(e) {
      this.isShowing = !this.isShowing;
    },
    roomConnect(e) {},
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
    }
  },
  components: {},
  mounted() {
    this.socket.on("ROOM_CONNECT", data => {
      // this.socket = [...this.messages, data];
      this.temp += `${data.name}가 ${data.room}번 방에 들어왔습니다.`;
      this.members = data.member;
      this.roomSize = data.size;
    });
  }
};
</script>
