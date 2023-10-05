<template>
    <v-app>
        <div class="login-form">
            <v-card class="login-box">
                <v-card-title class="login-tittle">Login</v-card-title>
                <v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
                <v-btn text color="light-blue" to="signup">新規登録はこちら</v-btn>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
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
                    :disabled="isValid"
                    >
                        Login   
                    </v-btn>

                    <v-btn>Clear</v-btn>
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
    display:  inline-block;
}

.login-button {
    margin-right: 20px;
}
</style>

<script>
  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || 'メールアドレスが不正です',
      ],
      password:'',
    }),

    computed: {
        isValid() {
            return !this.valid;
        }
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>