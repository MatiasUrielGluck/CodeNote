<template>
  <div class="external-window">
    <div class="internal-window">
      <div class="content">
        <h1>CodeNote Login</h1>
        <div class="input-container">
          <div class="input">
            <input type="text" name="username" id="username" placeholder="Enter your email" v-model="emailValue">
          </div>
            <div class="input">
            <input type="password" name="password" id="password" placeholder="Enter your password" v-model="passwordValue">
          </div>
          <p class="error" :class="showError ? 'show' : ''">Incorrect email or password</p>
          <button @click="submit">Login</button>
        </div>
        <p>Don't have an account? <router-link to="/register">Signup</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import usersApi from '../services/usersApi'

export default {
  name: 'LoginView',

  data: function() {
    return {
      emailValue: '',
      passwordValue: '',
      showError: false,
    }
  },

  methods: {
    async submit() {
      const res = await usersApi.login({
        username: this.emailValue,
        password: this.passwordValue
      })

      if (!res.data.success) {
        this.showError = true
        return
      } else {
        this.showError = false
        this.$router.push('/')
      }
    }
  }
}
</script>


<style scoped>
@import '../../public/styles.css';

.external-window {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: var(--background-color);
}

.internal-window {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  height: 25rem;
  width: 25rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: var(--secondary-color);
  border-radius: 16px;
}

.internal-window * {
  background: var(--secondary-color);
}

.content {
  margin: auto;
  padding: 2rem;
  width: 100%;
  height: 90%;
}

.content h1 {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 2rem;
}

.error {
  opacity: 0%;
  color:rgb(202, 28, 28);
  text-align: center;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.error.show {
  opacity: 100%;
}

.input-container {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-container input {
  font-size: 0.9rem;
  padding: 0.3rem;
  border-radius: 12px;
  border: 1px solid var(--selected-color);
  width: 100%;
}

.input-container input:focus {
  outline: none;
}

button {
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 12px;
  border: none;
  margin: auto;
  margin-top: 1rem;
  background: #848484 !important;
  transition: all 0.3s ease;
}

button:hover {
  background: #707070 !important;
}

p:last-of-type {
  text-align: center;
}

@media only screen and (max-width: 500px) {
  .internal-window {
    height: 30rem;
    width: 90%;
  }

  .content {
    padding: 1rem;
  }

  .input-container p {
    height: 2rem;
  }
}

</style>