<template>
  <div class="container mt-10">
    <h3 class="text-center mt-4">Please Register to Verify Your Id</h3>

    <form-wizard @on-complete="registerHandler" 
     color="#1F9048"
     title="Complete these Steps to Register"
     subtitle=""
     >
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
          <label for="surname">Last Name*</label>
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
        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <input
            v-model="phoneNumber"
            type="number"
            class="form-control"
            id="phoneNumber"
            aria-required="false"
            name="phoneNumber"
            placeholder=""
          />
          
        </div>
        <br />
        <div class="row">
          <div class="col">
            <label class="float-left" for="givenName">Identification Type</label>
           
            <select
              name="idType"
              v-model="idType"
              id="idType"
              aria-required="false"
              class="form-select form-control overflow-auto"   
            >
              <option value="" selected="selected" disabled>
                Please select Identification type
              </option>
              <option value="nationalId">National ID</option>
              <option value="drvingLicense">Driving License</option>
              <option value="taxNumber">Tax Number</option>
              
            </select>
          </div>
          <div class="col">
            <label for="idNumber">Identification Number</label>
            <input
              v-model="idNumber"
              type="text"
              class="form-control"
              id="idNumber"
              name="idNumber"
              aria-required="false"
              placeholder="Enter Identification Number"
            />
          </div>
        </div>
        <br />
        <br />
      </tab-content>
      <tab-content title="Address Info">
        <div class="row">
          <div class="col">
            <label for="flatNumber">Address</label>
            <input
              v-model="address"
              type="text"
              class="form-control"
              id="address"
              name="address"
              aria-required="false"
              placeholder="Enter Address"
            />
          </div>
        </div>
        <div class="d-none row">
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
        <div class="d-none row">
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
            <input type="text" name="streetType" id="streetType" v-model="streetType"
              
              aria-required="false"
              class=" form-control overflow-auto"   >
            
          </div>
        </div>
        

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
          <input type="text" name="state" id="state" v-model="state" class="form-control">
          <!-- <select name="state" id="" v-model="state" aria-required="true" class="form-select overflow-auto h-25" aria-label="Default select example">
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
          </select> -->
        </div>
        <br />
        <div class="form-group">
          <label for="postcode">Postcode</label>
          <input
            :v-model="postcode"
            type="number"
            class="form-control"
            id="postcode"
            name="postcode"
            
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
import addressFinder from '../utils/addressfinder';
import bus from '../utils/eventbus';
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
      ready: false,
      idType: "",
      idNumber:"",
      phoneNumber:0
    };
  },
  mounted() {
    bus.$on('afloaded', this.init);
    console.log(addressFinder.ready, this.init)
    // console.log()
    if (addressFinder.ready) {
      
      this.init();
    }
  },
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
    registerHandler(submitEvent) {
      //  this.$refs.form.$el.submit()
      console.log(submitEvent, "INI SUBMITENEVT")
      let payload = {
        givenName: this.givenName,
        middleNames: this.middleNames,
        surname: this.surname,
        dob: this.dob.replace(/-/g, "/"),
        email: this.email,
        flatNumber: document.getElementById("flatNumber").value,
        streetNumber: document.getElementById("streetNumber").value,
        streetName: document.getElementById("streetName").value,

        streetType: document.getElementById("streetType").value,
        suburb: document.getElementById("suburb").value,
        state: document.getElementById("state").value,
        postcode: document.getElementById("postcode").value,
      };
      console.log(payload, " INI INPUT Register");

      axios
        .post(`https://iprojectgreenid.herokuapp.com/register`, payload)
        .then((resp) => {
          console.log(resp, " INI ERROR THEN");
          console.log(resp.data, "INI HASIL LOGIN");
          this.$store.commit("setRegistrationDetails", resp);
          this.$store.commit("setVerificationId");
          this.$store.commit("setRegister", true);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.response.data.message, " INI ERROR");
          Swal.fire(err.response.data.message.join(', '));
          //Vue.$toast.error(error.response.data.message);
        });
    },
     init() {
       console.log(addressFinder.ready, "INITIATED")
      if (this.ready) {
        return;
      }
      this.ready = true;
 
      /* eslint-disable no-new */
      
      let widget = new window.AddressFinder.Widget(
        document.getElementById('address'),
        'ADDRESSFINDER_DEMO_KEY',
        'AU',
        {
                "address_params": {
                    "gnaf": "1"
                },
                // "show_locations": true,
                // "location_params": {
                //     "location_types": "street "
                // },
                // "empty_content": "No addresses were found. This could be a new address, or you may need to check the spelling. Learn more"
            });

                widget.on('address:select', function(fullAddress, metaData) {

          document.getElementById('address').value = metaData.full_address
          document.getElementById('flatNumber').value = metaData.unit_identifier

            document.getElementById('streetNumber').value = metaData.street_number_1

           document.getElementById('streetName').value = metaData.street_name

           document.getElementById('streetType').value = metaData.street_type


           document.getElementById('suburb').value = metaData.locality_name

            document.getElementById('state').value = metaData.state_territory

            document.getElementById('postcode').value = metaData.postcode

        });

        
        widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('flatNumber').value = metaData.unit_identifier

        });

         widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('streetNumber').value = metaData.street_number_1

        });

        widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('streetName').value = metaData.street_name

        });

        widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('streetType').value = metaData.street_type

        });

        widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('suburb').value = metaData.locality_name

        });

        widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('state').value = metaData.state_territory

        });

        widget.on('location:select', function(fullLocation, metaData) {
            document.getElementById('postcode').value = metaData.postcode

        });
    },
  },
};
</script>

<style>
</style>