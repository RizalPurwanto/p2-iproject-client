<template>
  <div class="container mt-10">
    <h3 class="text-center mt-4">Please Select your Country of Origin</h3>

    <form class="p-2 text-left" method="post" @submit.prevent="countryHandler">
      <br />
      <div class="flex">
        <select
          name="country"
          v-model="country"
          id="country"
          aria-required="false"
          class="form-select form-control overflow-auto"
        >
          <option value="" selected="selected" disabled>
            Please select street type
          </option>
          <option value="AUS">Australia</option>
          <option value="INA">Indonesia</option>
        </select>
        <br />
        <div class="float-end">
          <button type="submit" class="btn btn-success float-start mb-2">
            Next
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

 
import addressFinder from "../utils/addressfinder";
import bus from "../utils/eventbus";
export default {
  name: "Register",
  data() {
    return {
      country: "",
    };
  },
  mounted() {
    bus.$on("afloaded", this.init);
    console.log(addressFinder.ready, this.init);
    // console.log()
    if (addressFinder.ready) {
      this.init();
    }
  },
  components: {},
  methods: {
    countryHandler() {
      //  this.$refs.form.$el.submit()
      console.log( "INI SUBMITENEVT");
      if (this.country == "AUS") {
        this.$router.push("/register");
      } else if (this.country == "INA") {
        this.$router.push("/register-id");
      } else {
        Swal.fire('Please Select a country')
      }
    },
  },
};
</script>

<style>
</style>