<template>
  <v-app>
    <div class="login-form">
      <v-card class="login-box">
        <v-card-title class="login-tittle">Login</v-card-title>
        <v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
        <v-btn text color="light-blue" to="signup">新規登録はこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            label="password"
            required
          ></v-text-field>

          <v-btn
            color="success"
            class="login-button"
            @click="submit"
            :disabled="isValid"
          >
            Login
          </v-btn>

          <v-btn>Clear</v-btn>

          <v-alert
            dense
            text
            type="success"
            class="success-message"
            v-if="message"
          >
            {{ message }}
          </v-alert>

          <v-alert
            dense
            outlined
            type="error"
            class="error-message"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<style>
.login-from {
  margin: 150px;
  padding: 30px;
}

.login-box {
  width: 35%;
  margin: 0px auto;
  padding: 30px;
}

.login-tittle {
  display: inline-block;
}

.login-button {
  margin-right: 20px;
}

.success-message {
  margin-top: 20px;
}

.error-message {
  margin-top: 20px;
}
</style>

<script>
import firebase from "@/firebase/firebase";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
    ],
    password: "",
    message: "",
    errorMessage: "",
  }),

  mounted() {
    if (localStorage.message) {
      this.message = localStorage.message;
      localStorage.message = "";
    }
  },

  computed: {
    isValid() {
      return !this.valid;
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log("success", result);
          console.log("updated user", result.user);

          //トップページに遷移
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("fail", error);
          this.errorMessage = "ログインに失敗しました。";
        });
    },
  },
};
</script>
