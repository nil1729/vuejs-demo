<template>
  <div class="container mb-4" id="main">
    <h1 class="text-center text-success">Vue JS Forms</h1>
    <hr class="my-3" />
    <div class="row">
      <div class="col-md-7">
        <form @submit.prevent="submitted = true">
          <!-- For requiring a Field  -->
          <h3 class="text-primary">File a Complaint</h3>
          <div class="form-group my-3">
            <label>Email address</label>
            <input
              required
              type="email"
              class="form-control"
              placeholder="Enter Email Address"
              :value="userInput.email"
              @input="userInput.email = $event.target.value"
            />
          </div>
          <div class="form-group my-3">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Password"
              v-model.lazy="userInput.password"
            />
            <!-- <small class="form-text text-muted">{{ userInput.password }}</small> -->
          </div>
          <div class="form-group my-3">
            <label>Age</label>
            <input
              type="Number"
              class="form-control"
              placeholder="Enter your Age"
              v-model="userInput.age"
            />
          </div>
          <div class="form-group my-3">
            <label>Message</label>
            <textarea class="form-control" rows="3" v-model="message"></textarea>
          </div>
          <fieldset class="form-group my-3">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  v-model="mailOptions"
                  value="Sending Mail"
                  class="form-check-input"
                  type="checkbox"
                />
                Sending Mail
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  v-model="mailOptions"
                  value="Sending Info Mail"
                  class="form-check-input"
                  type="checkbox"
                />
                Sending Info Mail
              </label>
            </div>
          </fieldset>
          <fieldset class="form-group my-3">
            <div class="form-check">
              <label class="form-check-label">
                <input v-model="gender" type="radio" class="form-check-input" value="Male" />
                Male
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input v-model="gender" type="radio" class="form-check-input" value="Female" />
                Female
              </label>
            </div>
          </fieldset>
          <div class="form-group my-3">
            <label for="exampleSelect1">Priority Level</label>
            <select v-model="selectedPriority" class="form-control">
              <option v-for="priority in priorities" :key="priority">{{ priority }}</option>
            </select>
          </div>
          <app-switch @switched="switchMode = $event" :switchMode="switchMode" />
          <br />
          <button class="btn-info btn" type="submit">Submit</button>
        </form>
      </div>
      <div v-if="submitted" class="col-md-5">
        <h3 class="text-primary">Submitted File</h3>
        <div class="container bg-light p-3 border">
          <p>
            <strong>Email Address:</strong>
            {{ ' ' }}
            {{ userInput.email }}
          </p>
          <p>
            <strong>Password:</strong>
            {{ ' ' }}
            {{ userInput.password }}
          </p>
          <p>
            <strong>Age:</strong>
            {{ ' ' }}
            {{ userInput.age }}
          </p>
          <p>
            <strong>Message:</strong>
            {{' '}}
            <span style="white-space: pre">{{ message }}</span>
          </p>
          <p>
            <strong>Mail Options:</strong>
            {{' '}}
            <span
              :key="mailOption"
              v-for="(mailOption, index) in mailOptions"
            >{{ index + 1 }}. {{ mailOption }} {{ ' ' }}</span>
          </p>
          <p>
            <strong>Gender:</strong>
            {{' '}}
            {{ gender }}
          </p>
          <p>
            <strong>Priority:</strong>
            {{' '}}
            {{ selectedPriority }}
          </p>
          <p>
            <strong>Switch Mode:</strong>
            {{' '}}
            {{ switchMode?'ON':'OFF' }}
          </p>
        </div>
      </div>
    </div>
    <hr class="my-3" />
  </div>
</template>

<script>
import Switch from "./components/Switch";
export default {
  name: "App",
  components: {
    appSwitch: Switch
  },
  data() {
    return {
      userInput: {
        email: "",
        password: "",
        age: 20
      },
      message: "",
      mailOptions: [],
      gender: "Male",
      priorities: ["High", "Medium", "Low"],
      selectedPriority: "Medium",
      switchMode: true,
      submitted: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
    }
  }
};
</script>

<style>
h3 {
  text-decoration: underline;
}
#main {
  width: 80%;
}
::-webkit-scrollbar {
  width: 0;
}
::selection {
  color: rgb(76, 0, 255);
  background-color: aliceblue;
}
</style>
