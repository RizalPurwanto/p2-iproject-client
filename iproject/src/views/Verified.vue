<template>
  <div class="container">
    <h3 class="text-center">Congratulations You Have been Verified</h3>
    <br />
    <div class="border p-2 text-align text-center bg-white">
      <p>
        Congratulations, you have been verified
      </p>
    </div>

    <form class="p-2" @submit.prevent="dnbSubmit">
      <div class="form-check">
        <input
          v-model="tandc"
          type="checkbox"
          class="form-check-input"
          id="tandc"
          name="tandc"
          value="on"
          unchecked-value=""
        />
        <label class="form-check-label" for="exampleCheck1"
          >I agree to provide consent and accept the above terms and
          conditions.</label
        >
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
      <button
        type="button"
        class="btn btn-warning"
        @click.prevent="backHandler"
      >
        Back
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Verified",
  methods: {
    backHandler() {
      this.$router.push("/");
    },
    dnbSubmit(submitEvent) {
      console.log(submitEvent, "INI SUBMIT DNB");
      //  this.$router.push("/");
      let body = {
        tandc: this.tandc ? "on" : "",
      };
      console.log(body);
      this.$store.dispatch("postDnb", body);
    },
  },
};
</script>

<style>
</style>