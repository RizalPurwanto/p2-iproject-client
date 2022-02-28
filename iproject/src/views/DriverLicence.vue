<template>
  <div class="container">
    <h3 class="text-center">Please Fill in your {{getDriverLicenceName(driverLicenceType)}} Driver's Licence Data</h3>
    <form class="p-2" @submit.prevent="submitHandler">
      <div class="form-group">
         
         
         <p>{{this.$store.state.fieldData.data.sourceFields[0][`greenid_${driverLicenceType}_givenname`]}}</p>
         
        <label for="driverLicenceNumber">Licence Number*</label>
        <input
       
          type="text"
          class="form-control"
          id="driverLicenceNumber"
          name="driverLicenceNumber"
          aria-required="true"
          placeholder="Enter Licence Number"
        />
        <br />
      </div>
       <!-- <div class="form-group">
           
        <label for="driverLicenceNumber">Card Number*</label>
        <input
       v-if="Object.keys(this.$store.state.fieldData.data.sourceFields[0])[0] == `greenid_${this.$route.params.id}_number`"
          type="number"
          class="form-control"
          id="driverLicenceNumber"
          name="driverLicenceNumber"
          aria-required="true"
          placeholder="Enter Licence Number"
        />
        <br />
      </div> -->
      <div class="form-group">
        <label for="givenName">First Name*</label>
        <input
       v-model="this.sourceFields[`greenid_${driverLicenceType}_givenname`]" 
          type="text"
          class="form-control"
          id="givenName"
          name="givenName"
          aria-required="true"
          placeholder="Enter First Name"
        />
        <br />
      </div>
      <div class="form-group">
        <label for="middleNames">Middle Names</label>
        <input
         v-model="this.sourceFields[`greenid_${driverLicenceType}_middlename`]"
          type="text"
          class="form-control"
          id="middleNames"
          name="middleNames"
          aria-required="false"
          placeholder="Enter Middle Names"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="surname">Lastname Names</label>
        <input
        v-model="this.sourceFields[`greenid_${driverLicenceType}_surname`]"
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
         v-model="this.dobOutput"
         
          type="date"
          class="form-control"
          id="dob"
          name="dob"
          aria-required="true"
          placeholder="Enter Last Name"
        />
      </div>

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
          >I agree to have the information above checked with the Issuer or
          Official Record Holder</label
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
  name: "DriverLicence",
  data() {
    return {
      driverLicenceType: this.$route.params.id,
    };
  },
  created() {
    this.fetchRegistrationDetails();
    console.log("INI CREATED")
    console.log(this.$route.params.id, "INI PARAMS ID")
    this.fetchFieldData()
    console.log("INI CREATED")
  },
  methods: {
    async fetchRegistrationDetails() {
      await this.$store.dispatch("fetchRegistrationDetails");
    },
    
    backHandler() {
      this.$router.push("/");
    },
    async fetchFieldData() {
      console.log(this.$route.params.id, "INI PARAMS ID MTHODS");
      await this.$store.dispatch("fetchFieldData", this.$route.params.id);
    },
     submitHandler(submitEvent){
      console.log(submitEvent, "INI SUBMIT HANDLER")
       console.log(
        submitEvent.target.elements.surname.value,
        "INI MASUK Visa"
      );
      let body = {
        driverLicenceType: this.driverLicenceType,
        driverLicenceNumber: submitEvent.target.elements.driverLicenceNumber.value,
        givenName: submitEvent.target.elements.givenName.value,
        middleNames: submitEvent.target.elements.middleNames.value,
        surname: submitEvent.target.elements.surname.value,
        
        dob: submitEvent.target.elements.dob.value.split('-').reverse().join('/'),
        tandc: this.tandc ? 'on' : ''
      };
     
      console.log(body, "INI BODY FORM ");
    this.$store.dispatch("postDriverLicence", body);
    
    },
    getDriverLicenceName(id) {
        console.log(id, "INI DI METHODS DL")
      switch (id) {
        case "nswregodvs":
          return `New South Wales Driver's Licence - DVS`;
          
        case "vicregodvs":
          return `Victorian Driver's Licence - DVS`;
          
        case "qldregodvs":
          return `Queensland Driver's Licence`;
         
        case "saregodvs":
          return `South Australian Driver's Licence`;
          
        case "waregodvs":
          return `Western Australian Driver's Licence`;
          
        case "actregodvs":
          return `Australian Capital Territory Driver's Licence`;
          

        default:
          return "";
          
      }
    },
  },
  computed: {
      sourceFields(){
          console.log(this.$store.fieldData, "INI DL DI FIELD DATA DL")
          let arrayOfObjects = this.$store.state.fieldData.data.sourceFields
          let combinedObject = Object.assign({}, ...arrayOfObjects);
          console.log(combinedObject, "INI SOURCEFIELDS DL")
          return  combinedObject
      },
      dobOutput(){
           let date = Object.assign({}, ...this.$store.state.fieldData.data.sourceFields)[`greenid_${this.driverLicenceType}_dob`].split('/').reverse().join('-')
          console.log("INI MASUK DOB OUTPUT")
          return date
      },
      id(){
          console.log(this.$route.params.id, "INI PARAMS ID")
          return this.$route.params.id
      }
  }
};
</script>

<style>
</style>