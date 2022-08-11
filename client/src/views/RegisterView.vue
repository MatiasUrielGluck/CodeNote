<template>
  <div class="external-window">
    <div class="internal-window">
      <div class="content">
        <h1>CodeNote Signup</h1>
        <div class="input-container">
          <div class="input">
            <input type="text" name="email" id="email" placeholder="Enter your email" v-model="emailValue">
            <p class="error" :class="emailClass">{{emailErrorMsg}}</p>
          </div>
            <div class="input">
            <input type="password" name="password" id="password" placeholder="Enter your password" v-model="passwordValue">
            <p class="error" :class="passwordClass">{{passwordErrorMsg}}</p>
          </div>
          <button @click="submit">Signup</button>
        </div>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import usersApi from '../services/usersApi'

export default {
  name: 'RegisterView',

  data: function() {
    return {
      emailValue: '',
      emailErrorMsg: '.',
      emailClass: '',
      passwordValue: '',
      passwordErrorMsg: '.',
      passwordClass: '',
    }
  },

  watch: {
    emailValue(newValue) {
      if (!newValue) {
        this.emailErrorMsg = 'Please enter your email'
        this.emailClass = 'show'
      } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
        this.emailErrorMsg = '.'
        this.emailClass = ''
      } else {
        this.emailErrorMsg = 'Enter a valid email: example@example.com'
        this.emailClass = 'show'
      }
    },

    passwordValue(newValue) {
      if (!newValue) {
        this.passwordErrorMsg = 'Please enter a password'
        this.passwordClass = 'show'
      } else if (/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/.test(newValue)) {
        this.passwordErrorMsg = '.'
        this.passwordClass = ''
      } else {
        this.passwordErrorMsg = 'You need at least one number and four characters'
        this.passwordClass = 'show'
      }
    }
  },

  methods: {
    async submit() {
      let emailOk = false
      let passwordOk = false

      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailValue)) {
        emailOk = true
      } else {
        this.emailErrorMsg = 'Enter a valid email: example@example.com'
        this.emailClass = 'show'
      }

      if (/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/.test(this.passwordValue)) {
        passwordOk = true
      } else {
        this.passwordErrorMsg = 'You need at least one number and four characters'
        this.passwordClass = 'show'
      }

      if (emailOk && passwordOk) {
        const res = await usersApi.createUser({
          email: this.emailValue,
          password: this.passwordValue
        })

        alert(res)
        if (res === 'Successfully registered') {
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>


<style scoped>
@import '../../public/styles.css';

h1, p, input, button {
  font-family: 'Poppins', sans-serif;
}

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