<template>
  <div class="container">
    <h3 class="text-center">Please Register to Verify Your Id</h3>

    <form-wizard @on-complete="registerHandler">
      <tab-content title="Personal Details">
        <div class="row">
          <div class="col">
            <label class="float-left" for="givenName">First Name*</label>
            <input
              v-model="givenName"
              type="text"
              class="form-control"
              id="givenName"
              name="givenName"
              aria-required="true"
              placeholder="Enter First Name"
            />
          </div>
          <div class="col">
            <label for="middleNames">Middle Names</label>
            <input
              v-model="middleNames"
              type="text"
              class="form-control"
              id="middleNames"
              name="middleNames"
              aria-required="false"
              placeholder="Enter Middle Names"
            />
          </div>
        </div>
        <br />

        <div class="form-group">
          <label for="surname">Lastname Name*</label>
          <input
            v-model="surname"
            type="text"
            class="form-control"
            id="surname"
            name="surname"
            aria-required="true"
            placeholder="Enter Last Name"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input
            v-model="dob"
            type="date"
            class="form-control"
            id="dob"
            name="dob"
            aria-required="true"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            aria-required="false"
            name="email"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <br />
      </tab-content>
      <tab-content title="Additional Info">
        <div class="row">
          <div class="col">
            <label for="flatNumber">Flat Number</label>
            <input
              v-model="flatNumber"
              type="text"
              class="form-control"
              id="flatNumber"
              name="flatNumber"
              aria-required="false"
              placeholder="Enter Flat Number"
            />
          </div>
          <div class="col">
            <label for="streetNumber">Street Number</label>
            <input
              v-model="streetNumber"
              type="text"
              class="form-control"
              id="streetNumber"
              name="streetNumber"
              aria-required="true"
              placeholder="Enter street number"
            />
          </div>
        </div>

        <div class="form-group"></div>
        <br />
        <div class="row">
          <div class="col">
            <label for="streetName">Street Name</label>
            <input
              v-model="streetName"
              type="text"
              class="form-control"
              id="streetName"
              name="streetName"
              aria-required="true"
              placeholder="Enter street name"
            />
          </div>
          <div class="col h-25">
            <label for="streetNumber">Street Type</label>
            <br />
            <select
              name="streetType"
              v-model="streetType"
              id=""
              aria-required="false"
              class="form-select form-control overflow-auto"   
            >
              <option value="" selected="selected" disabled>
                Please select street type
              </option>
              <option value="AVE">Avenue</option>
              <option value="CIR">Circle</option>
              <option value="CCT">Circuit</option>
              <option value="CL">Close</option>
              <option value="CT">Court</option>
              <option value="CRES">Crescent</option>
              <option value="DR">Drive</option>
              <option value="ESP">Esplanade</option>
              <option value="EXP">Expressway</option>
              <option value="HWY">Highway</option>
              <option value="LANE">Lane</option>
              <option value="PDE">Parade</option>
              <option value="PL">Place</option>
              <option value="RD">Road</option>
              <option value="SQ">Square</option>
              <option value="ST">Street</option>
              <option value="TCE">Terrace</option>
              <option value="WAY">Way</option>
              <option value="">Other</option>
            </select>
          </div>
        </div>
        <br />

        <div class="form-group">
          <label for="suburb">Suburb or Town</label>
          <input
            v-model="suburb"
            type="text"
            class="form-control"
            id="suburb"
            name="suburb"
            aria-required="true"
            placeholder="Enter suburb name"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="state">State</label>
          <br />
          <select name="state" id="" v-model="state" aria-required="true" class="form-select overflow-auto h-25" aria-label="Default select example">
            <option value="" selected="selected" disabled>
              Please select State
            </option>
            <option value="NSW">New South Wales</option>
            <option value="VIC">Victoria</option>
            <option value="QLD">Queenslands</option>
            <option value="WA">Western Australia</option>
            <option value="SA">South Australia</option>
            <option value="TAS">Tasmania</option>
            <option value="ACT">Australian Capital Territory</option>
            <option value="NT">Northern Territory</option>
          </select>
        </div>
        <br />
        <div class="form-group">
          <label for="postcode">Postcode</label>
          <input
            v-model="postcode"
            type="number"
            class="form-control"
            id="suburb"
            name="suburb"
            aria-required="true"
          />
        </div>
      </tab-content>
      <tab-content title="Last Step">
        <!-- <button type="submit" class="btn btn-success">Submit</button> -->
        <p>Click Finish to Complete the Registration</p>
      </tab-content>
    </form-wizard>

    <form class="p-2 text-left" method="post" @submit.prevent="registerHandler">
      <br />

      <br />
    </form>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Register",
  data() {
    return {
      givenName: "",
      middleNames: "",
      surname: "",
      email: "",
      dob: "",
      flatNumber: "",
      streetNumber: "",
      streetName: "",
      streetType: "",
      suburb: "",
      state: "",
      postcode: "",
    };
  },
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
    registerHandler() {
      //  this.$refs.form.$el.submit()
      let payload = {
        givenName: this.givenName,
        middleNames: this.middleNames,
        surname: this.surname,
        dob: this.dob.replace(/-/g, "/"),
        email: this.email,
        flatNumber: this.flatNumber,
        streetNumber: this.streetNumber,
        streetName: this.streetName,

        streetType: this.streetType,
        suburb: this.suburb,
        state: this.state,
        postcode: this.postcode,
      };
      console.log(payload, " INI INPUT Register");

      axios
        .post(`https://iprojectgreenid.herokuapp.com/register`, payload)
        .then((resp) => {
          console.log(resp.data, "INI HASIL LOGIN");
          this.$store.commit("setRegistrationDetails", resp);
          this.$store.commit("setVerificationId");
          this.$store.commit("setRegister", true);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err, " INI ERROR");
          Swal.fire(err.message);
          //Vue.$toast.error(error.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>