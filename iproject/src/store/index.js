import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isRegister: localStorage.verificationId ? true : false,
    registrationDetails: {},
    fieldData: '',
    sourceList: {},


  },
  mutations: {
    setRegistrationDetails(state, registrationDetails) {
      state.registrationDetails = registrationDetails
      console.log(state.registrationDetails, "INI STATE REGISTRATION DETAILS")
      
    },
    setVerificationId(state) {
      console.log(state.registrationDetails.data, "INI STATE VERIF")
     localStorage.setItem("verificationId", state.registrationDetails.data.verificationId)
      
    },
    setFieldData(state, fieldData) {
      state.fieldData = fieldData
      console.log(state.fieldData, "INI FIELD DATA")
    },
    setSourceList(state, sourceList) {
      state.sourceList = Object.assign({}, ...sourceList.data.sources) 
      console.log(sourceList.data.sources, "INI SOURCE LIST STATE AWAL")
      console.log(state.sourceList, "INI SOURCE LIST STATE")
    },
    setRegister(state, boolean) {
      state.isRegister = boolean
      console.log(state.isRegister, "INI ISREGISTER")
    }
  },
  actions: {
     async fetchRegistrationDetails(context) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      try {
        let resp = await axios.get('http://localhost:3000/verify/sources', {
        headers: {
          verificationId: verificationId
        }
      })
      console.log(resp.data, "INI  RESP REGISTRATION DETAILs")
        context.commit("setRegistrationDetails", resp.data)
        console.log("sudah commit setregister")
      } catch (err) {
        console.log(err);
      }
      
        
    },
    async fetchFieldData(context, id) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      axios.get(`http://localhost:3000/verify/sources/${id}`, {
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI  FIELD DATA")
          context.commit("setFieldData", resp)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchSourceList(context) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      axios.get('http://localhost:3000/verify/sources', {
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI SOURCE LIST")
          context.commit("setSourceList", resp)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async postDriverLicence(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = {
        driverLicenceNumber: '',
        givenName: '',
        middlenames: '',
        surname: '',
        dob: '',
        tandc: ''
      }
      axios.post('http://localhost:3000/verify/driverlicence/actregodvs', {
        body,
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI SOURCE LIST")

        })
        .catch((err) => {
          console.log(err);
        });
    },
    async postAec(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID di AEC")
      let body = payload
      axios.post('http://localhost:3000/verify/aec', body, {
        
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI AEC")
          this.$router.push("/")
          
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async postDnb(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = {
        tandc: ''
      }
      axios.post('http://localhost:3000/verify/dnb', {
        body,
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI DNB")

        })
        .catch((err) => {
          console.log(err);
        });
    },

    async postVisa(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = payload
      const headers = {
        "verificationId": verificationId
      }
      axios.post('http://localhost:3000/verify/visa', body, {
       headers:headers        
      })
        .then((resp) => {
          console.log(resp, "INI Visa")

        })
        .catch((err) => {
          Swal.fire('error')
          console.log(err);
        });
    }


  },
  modules: {},
});
