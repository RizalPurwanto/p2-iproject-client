import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2"
import router from '../router'


const baseURL = 'https://iprojectgreenid.herokuapp.com'
//const localURL = 'http://localhost:3000'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isRegister: localStorage.verificationId ? true : false,
    registrationDetails: {},
    fieldData: '',
    sourceList: {},
    driverLicence: '',
    individualResult:{}


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
      console.log(state.fieldData, "INI FIELD DATA STORE")
    },
    setSourceList(state, sourceList) {
      state.sourceList = Object.assign({}, ...sourceList.data.sources)
      console.log(sourceList.data.sources, "INI SOURCE LIST STATE AWAL")
      state.individualResult = sourceList.data.individualResult
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
        let resp = await axios.get(`${baseURL}/verify/sources`, {
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
      console.log(verificationId, id, "INI VERIFICATION ID FIELD DATA")
      axios.get(`${baseURL}/verify/sources/${id}`, {
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI FIELD DATA")
          context.commit("setFieldData", resp)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchSourceList(context) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      axios.get(`${baseURL}/verify/sources`, {
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
      console.log(payload, "INI PAYLOAD DL")
      const verificationId = localStorage.getItem("verificationId")
      const driverLicenceType = payload.driverLicenceType
      console.log(verificationId, driverLicenceType, "INI VERIFICATION ID DAN DRIVER LICENCE TYPE")
      const headers = {
        "verificationId": verificationId
      }
      let body = {
        driverLicenceNumber: payload.driverLicenceNumber,
        givenName: payload.givenName,
        middleNames: payload.middleNames,
        surname: payload.surname,
        dob: payload.dob,
        tandc: payload.tandc
      }
      console.log(body, "INI BODY POST DRIVER LICENCE")
      axios.post(`${baseURL}/verify/driverlicence/${driverLicenceType}`, body, {

        headers: headers
      })
        .then((resp) => {
          console.log(resp, "INI DRIVER LICENCE AFTER POST")
          Swal.fire('Successfully submitted')
          router.push("/verification-au");
        })
        .catch((err) => {
          Swal.fire(err.response.data.error)
          console.log(err, "INI ERROR");
        });
    },
    async postAec(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID di AEC")
      let body = payload
      const headers = {
        "verificationId": verificationId
      }
      axios.post(`${baseURL}/verify/aec`, body, {

        headers: headers
      })
        .then((resp) => {
          console.log(resp, "INI AEC")
          Swal.fire('Successfully submitted')
          router.push("/verification-au")

        })
        .catch((err) => {
          console.log(err);
          Swal.fire(err.response.data.error)
        });
    },

    async postDnb(context, payload) {
      console.log(payload.tandc, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = {
        tandc: payload.tandc
      }
      const headers = {
        "verificationId": verificationId
      }
      axios.post(`${baseURL}/verify/dnb`, body, {

        headers: headers
      })
        .then((resp) => {
          router.push("/verification-au")
          console.log(resp, "INI DNB")
          Swal.fire('Successfully submitted')
        })
        .catch((err) => {

          console.log(err);
          Swal.fire(err.response.data.error)
        });
    },
    async mailVerified() {
      try {
        console.log(this.state.registrationDetails, "INI PAYLOAD MAIL")
        
        const body = this.state.registrationDetails
        console.log(body, "INI BODY MAIL")
        let resp = await axios.post(`${baseURL}/verify/mail`, body)
        let respMailgun = await axios.post (`${baseURL}/verify/mailgun`, body)
        console.log(resp.data, "INI  RESP Mail")
        console.log(respMailgun.data, "INI  RESP Mail GUN")
        
      } catch (err) {
        console.log(err);
      }
    },

    async mailUnverified() {
      try {
        console.log(this.state.registrationDetails, "INI PAYLOAD MAIL")
        
        const body = {
          registrationDetails : this.state.registrationDetails,
          sourceList: this.state.sourceList,
          individualResult: this.state.individualResult
          
        }
        console.log(body, "INI BODY MAIL")
        let resp = await axios.post(`${baseURL}/verify/mail/unverified`, body)
        let respMailgun = await axios.post (`${baseURL}/verify/mailgun`, body)
        console.log(resp.data, "INI  RESP Mail")
        console.log(respMailgun.data, "INI  RESP Mail GUN")
        
      } catch (err) {
        console.log(err);
      }
    },
    async addVerifiedCustomer() {
      try {
        
        const verificationId = localStorage.getItem("verificationId")
       
        console.log(this.state.registrationDetails, "INI PAYLOAD MAIL")
        const body = this.state.registrationDetails
        
        
        console.log(body, "INI BODY MAIL")
        let resp = await axios.post(`${baseURL}/verify/add`, body, {
          headers: {
            verificationId: verificationId
          }
        }) 
        console.log(resp, "INI  RESP ADD CUSTOMER")
        Swal.fire('Congratulations! You have been verified!! We will email you the results of your verification')
      } catch (err) {
        console.log(err);
      }
    },
    

    async postVisa(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = payload
      const headers = {
        "verificationId": verificationId
      }
      axios.post(`${baseURL}/verify/visa`, body, {
        headers: headers
      })
        .then((resp) => {
          console.log(resp, "INI Visa")
          router.push("/verification-au");
        })
        .catch((err) => {
          Swal.fire(err.response.data.error)
          console.log(err.response.data, "INI ERROR");
        });
    }


  },
  modules: {},
});
