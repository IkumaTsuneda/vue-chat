<template>
  <v-app id="inspire">
    <sidebar />
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>ルーム一覧</v-toolbar-title>
      <CreateRoom />

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4">
            <router-link :to="{ path: '/chat', query: { room_id: room.id } }">
              <v-avatar color="indigo" size="128">
                <v-icon dark v-if="!room.thumbnailUrl">
                  mdi-account-circle
                </v-icon>
                <img :src="room.thumbnailUrl" alt="" v-if="room.thumbnailUrl" />
              </v-avatar>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/layouts/SidebarComponent";
import CreateRoom from "@/components/modal/CreateRoom";
import firebase from "@/firebase/firebase";

export default {
  components: {
    Sidebar,
    CreateRoom,
  },
  data: () => ({
    rooms: [],
  }),
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = [];
      const roomRef = firebase.firestore().collection("rooms");
      const snapshot = await roomRef.get();
      console.log("snapshot", snapshot);

      snapshot.docs.map((doc) => {
        const data = { ...doc.data() };
        data.id = doc.id;
        console.log(data);
        this.rooms.push(data);
      });
    },
  },
};
</script>
