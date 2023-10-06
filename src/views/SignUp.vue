<template>
  <v-app>
    <div class="login-form">
      <v-card class="login-box">
        <v-card-title class="login-tittle">SignUp</v-card-title>
        <v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
        <v-btn text color="light-blue" to="login">ログイン画面はこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="UserName"
            required
          ></v-text-field>

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
            SignUp
          </v-btn>
          <v-btn>Clear</v-btn>

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

.error-message {
  margin-top: 20px;
}
</style>

<script>
import firebase from "@/firebase/firebase";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "名前を入力してください",
      (v) => (v && v.length <= 10) || "名前は10文字以内で入力してください",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
    ],
    password: "",
    errorMessage: "",
  }),

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
      console.log("submit");
      //ユーザー登録処理
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          console.log("success", result);
          //profileの更新
          await result.user.updateProfile({ displayName: this.name });
          console.log("updated user", result.user);

          localStorage.message = "新規作成に成功しました。";

          //ログイン画面に遷移
          this.$router.push("login");
        })
        .catch((error) => {
          console.log("fail", error);
          this.errorMessage = "ユーザーの新規作成に失敗しました。";
        });
    },
  },
};
</script>
