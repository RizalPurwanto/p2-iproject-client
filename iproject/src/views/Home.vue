<template>
  <div class="container">
    <h3 class="text-center">Profile</h3>
    <div class="border mb-1 bg-white">
      <ul>
        <li>
          <b>Nama</b>:

          {{ this.registerDetails.registrationDetails.name.givenName._text || ''}}
          {{ this.registerDetails.registrationDetails.name.surname._text || ''}}
        </li>
        <li>
          <b>Address</b>:
          {{this.registerDetails.registrationDetails.currentResidentialAddress.streetName || ' ' }}
          {{ this.registerDetails.registrationDetails.currentResidentialAddress.streetType || ' ' }}
          {{this.registerDetails.registrationDetails.currentResidentialAddress.streetNumber || ' ' }}
          {{this.registerDetails.registrationDetails.currentResidentialAddress.suburb || ' ' }}
          {{this.registerDetails.registrationDetails.currentResidentialAddress.state || ' ' }}
          {{this.registerDetails.registrationDetails.currentResidentialAddress.country || ' ' }}
        </li>
        <li>
          <b>Date of Birth</b>:
          {{ ordinal(this.registerDetails.registrationDetails.dob.day._text ) || '' }}
          {{
            getMonthName(
              this.registerDetails.registrationDetails.dob.month._text
            ) || ''
          }}
          {{this.registerDetails.registrationDetails.dob.year._text || '' }}
        </li>
        <li>
          <b>Email address</b>:
          {{ this.registerDetails.registrationDetails.email._text || ''}}
        </li>
      </ul>
    </div>
    <p></p>
    <div
    v-if="this.registerDetails.overallVerificationStatus !== 'VERIFIED' && this.registerDetails.overallVerificationStatus !== 'VERIFIED_WITH_CHANGES'"
      class="
        text-center
        mb-2
        bg-gradient bg-secondary
        border
        rounded
        text-white
        h-auto
      "
      style="height: 80px"
    >
      <p class="mt-3 mb-0">You are not verified yet</p>
      <p class="">Verify yourself by filling in data sources below</p>
     
    </div>
    <div
    v-if="this.registerDetails.overallVerificationStatus !== 'VERIFIED' && this.registerDetails.overallVerificationStatus !== 'VERIFIED_WITH_CHANGES'"
      class="
        text-center
        mb-2
        bg-gradient bg-secondary
        border
        rounded
        text-white
        h-auto
      "
      style="height: 80px"
    >
      <strong>
        {{ this.registerDetails.fullNameRequired }} full names,
        {{ this.registerDetails.dobRequired }} date of birth and
        {{ this.registerDetails.fullAddressRequired }} full address are required
        from at least {{ this.registerDetails.minSourceAmount }} sources
      </strong>
    </div>
    <div
      v-if="this.registerDetails.overallVerificationStatus == 'VERIFIED' || this.registerDetails.overallVerificationStatus =='VERIFIED_WITH_CHANGES'"
      class="
        text-center
        mb-2
        bg-gradient bg-success
        border
        rounded
        text-white
        h-auto
      "
      style="height: 100px"
    >
      <div class="float-left"></div>

      <p class="mt-3 mb-0">Congratulations!</p>
      <p class="mb-0">You are verified</p>
      <p>
        Click Next to finish the process
        
      </p>
    </div>
    <p>Verification Progress</p>
     <p>{{this.registerDetails.overallVerificationStatus}}</p>
    <div
      class="progress mb-2 bg-light border border-dark"
      style="width: 50%; height: 30px"
    >
      <div
        :style="{ width: `${this.percentage}%` }"
        ref="progressBar"
        style="height: 30px; text-align: center"
        class="progress-bar bg-success"
        role="progressbar"
        aria-valuenow="2"
        aria-valuemin="0"
        aria-valuemax="5"
      >
        {{ this.percentage }}%
      </div>
      <br />
      <br />
      <br />
    </div>
    
    <button
      v-bind:class="[
        this.sourceList.nswregodvs === 'VERIFIED'
          ? 'btn-success disabled'
          : this.sourceList.nswregodvs === 'PENDING'
          ? 'btn-warning disabled'
          : this.sourceList.nswregodvs === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      @click="driverLicenseHandler('nswregodvs')"
      type="button"
      data-toggle="tooltip"
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
    <p v-if="this.sourceList.nswregodvs === 'PENDING'">PENDING</p>
      <svg
        v-if="this.sourceList.nswregodvs === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>

      <svg
        v-if="this.sourceList.nswregodvs === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >New South Wales Driver's Licence - DVS (name, date of birth)
    </button>
    <button
      v-bind:class="[
        sourceList.vicregodvs === 'VERIFIED'
          ? 'btn-success disabled'
           : sourceList.vicregodvs === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.vicregodvs === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      
      @click="driverLicenseHandler('vicregodvs')"
      type="button"
      data-toggle="tooltip"
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
    <p v-if="this.sourceList.vicregodvs === 'PENDING'">PENDING</p>
      <svg
        v-if="sourceList.vicregodvs === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.vicregodvs === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Victorian Driver's Licence - DVS (name, date of birth)
    </button>

    <button
      v-bind:class="[
        sourceList.qldregodvs === 'VERIFIED'
          ? 'btn-success disabled'
           :sourceList.qldregodvs === 'PENDING'
          ? 'btn-warning'
          : sourceList.qldregodvs === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      @click="driverLicenseHandler('qldregodvs')"
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
    <p v-if="this.sourceList.qldregodvs === 'PENDING'">PENDING</p>
      <svg
        v-if="sourceList.qldregodvs === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.qldregodvs === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Queenslands Driver's Licence - DVS (name, date of birth)
    </button>

    <button
      v-bind:class="[
        sourceList.saregodvs === 'VERIFIED'
          ? 'btn-success disabled'
           : sourceList.saregodvs === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.saregodvs === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      @click="driverLicenseHandler('saregodvs')"
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
    <p v-if="this.sourceList.saregodvs === 'PENDING'">PENDING</p>
      <svg
        v-if="sourceList.saregodvs === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.saregodvs === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >South Australian Driver's Licence - DVS (name, date of birth)
    </button>

    <button
      v-bind:class="[
        sourceList.waregodvs === 'VERIFIED'
          ? 'btn-success disabled'
           : sourceList.saregodvs === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.waregodvs === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      @click="driverLicenseHandler('waregodvs')"
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
    <p v-if="this.sourceList.waregodvs === 'PENDING'">PENDING</p>
      <svg
        v-if="sourceList.waregodvs === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.waregodvs === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Western Australian Driver's Licence - DVS (name, date of birth)
    </button>

    <button
      @click="driverLicenseHandler('actregodvs')"
      v-bind:class="[
        sourceList.actregodvs === 'VERIFIED'
          ? 'btn-success disabled'
           : this.sourceList.actregodvs === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.actregodvs === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
    <p v-if="this.sourceList.actregodvs === 'PENDING'">PENDING</p>
      <svg
        v-if="sourceList.actregodvs === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.actregodvs === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Australian Capital Territory Driver's Licence - DVS (name, date of birth) 
    </button>

    <button
      @click="visaHandler"
      v-bind:class="[
        sourceList.visa === 'VERIFIED'
          ? 'btn-success disabled'   
           : sourceList.visa === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.visa === 'FAILED'
          ? 'btn-danger disabled'
          : 'btn-secondary',
      ]"
     
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        v-if="sourceList.visa === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.visa === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Australian Visas (Date of Birth)
    </button>

    <button
      @click="aecHandler"
      v-bind:class="[
        sourceList.aec === 'VERIFIED' ||  sourceList.aec === 'VERIFIED_WITH_CHANGES'
          ? 'btn-success disabled'
          
           : sourceList.aec === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.aec === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        v-if="sourceList.aec === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.aec === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Australian Electoral Roll (name, address)
    </button>

    <button
      @click="dnbHandler"
      v-bind:class="[
        sourceList.dnb === 'VERIFIED'
          ? 'btn-success disabled'
           : sourceList.dnb === 'PENDING'
          ? 'btn-warning disabled'
          : sourceList.dnb === 'FAILED'
          ? 'btn-danger'
          : 'btn-secondary',
      ]"
      type=""
      class="btn btn-secondary mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        v-if="sourceList.dnb === 'FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        v-if="sourceList.dnb === 'VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Credit History File (name, and/or address and/or date of birth)
    </button>

    <br />
    {{individualResult['GDC Asic Person Name']}}
    <button
     
      v-if="individualResult['GDC Asic Person Name'] == 'VERIFIED'"
      type=""
      class="btn btn-success mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >GDC Asic Person Name
    </button>
    <br>
    <button
     
      v-if="individualResult['GDC Tenancy File'] == 'VERIFIED'"
      type=""
      class="btn btn-success mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >GDC Tenancy File
    </button>
    <br>
    <button
     
      v-if="individualResult['PND'] == 'VERIFIED'"
      type=""
      class="btn btn-success mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >PND
    </button>
    <br>
    <button
     
      v-if="individualResult['ACD'] == 'VERIFIED'"
      type=""
      class="btn btn-success mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >ACD
    </button>
    <br>
    <button
     
      v-if="individualResult['Aec'] == 'VERIFIED'"
      type=""
      class="btn btn-success mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Aec
    </button>
    <br>
    <button
      
      v-if="individualResult['ExtendedPEPWatchlist'] = 'FOUND_ON_LIST'"
      type=""
      class="btn btn-danger mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      Found on ExtendedPEPWatchlist
    </button>
    <br>
    <button
      
      v-if="individualResult['OFAC Watchlist'] = 'FOUND_ON_LIST'"
      type=""
      class="btn btn-danger mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      Found on OFAC Watchlist
    </button>
    <br>
    <button
      
      v-if="individualResult['PEP Watchlist'] = 'FOUND_ON_LIST'"
      type=""
      class="btn btn-danger mb-2"
      style="display: inline-block; width: 100%"
    >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
      Found on PEP Watchlist
    </button>
    <br>
    <button
      v-if="this.registerDetails.overallVerificationStatus === 'VERIFIED' || this.registerDetails.overallVerificationStatus ==='VERIFIED_WITH_CHANGES'"
      type="button"
      class="btn btn-success float-right mb-2"
      @click.prevent="nextHandler"
    >
      Next
    </button>
    <button
        type="button"
        class="btn btn-danger float-left mb-2"
        @click.prevent="exitHandler"
      >
        Exit
      </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      registers: undefined,
      sourceNames: [
        `New South Wales Driver's Licence - DVS`,
        `Victorian Driver's Licence - DVS`,
        `Queensland Driver's Licence`,
        `South Australian Driver's Licence`,
        `Western Australian Driver's Licence`,
        `Australian Capital Territory Driver's Licence`,
        `Australian Visas`,
        `Australian Electoral Roll`,
        `Credit History File`,
      ],
    };
  },
  created() {
    this.fetchRegistrationDetails();
    console.log(this.$store.state.registrationDetails, "INI REGIST DI CREATED");
    this.fetchSourceList();
    console.log(this.$store.state.sourceList, "INI SOURCE DI CREATED");
  },
  // beforeCreated() {
  //   this.fetchRegistrationDetails();
  //   console.log(this.$store.state.registrationDetails, "INI REGIST DI CREATED")
  //    this.fetchSourceList()
  //   console.log(this.$store.state.sourceList, "INI SOURCE DI CREATED")
  // },

  methods: {
    async nextHandler() {
      await this.$store.dispatch('mailVerified')
      await this.$store.dispatch('addVerifiedCustomer')
      localStorage.clear();
      this.$router.push("/register")
    },
    exitHandler(){
      localStorage.clear();
      console.log('successfully exit session')
      this.$router.push("/register")
    },
    async fetchRegistrationDetails() {
      await this.$store.dispatch("fetchRegistrationDetails");
      console.log("ini fetch registration");
    },
    async fetchSourceList() {
      console.log("masuk sourcelist");
      await this.$store.dispatch("fetchSourceList");
    },
    getMonthName(month) {
      const d = new Date();
      d.setMonth(month - 1);
      const monthName = d.toLocaleString("default", { month: "long" });
      return monthName;
    },
    ordinal(number) {
      const ordinalRules = new Intl.PluralRules("en", {
        type: "ordinal",
      });
      const suffixes = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th",
      };
      const suffix = suffixes[ordinalRules.select(number)];
      return number + suffix;
    },
    driverLicenseHandler(id) {
      console.log(id, "INI METHOD DRIVERLICENCE DI HOME")
      
      this.$router.push({
        // name: "DriverLicence",
        // params: {
        //   id: id
        // }
        path: `/driverlicence/${id}`
      });
    },
    aecHandler() {
      this.$router.push("/aec");
    },
    visaHandler() {
      this.$router.push("/visa");
      //
    },
    dnbHandler() {
      this.$router.push("/dnb");
    },
    // setProgressBarWidth() {
    //   console.log()
    //   this.$refs['progressBar'].style.width = '100%';
    // }
  },
  computed: {
    registerDetails() {
      console.log(this.$store.state.registrationDetails, "INI DI COMPUTED");

      return this.$store.state.registrationDetails;
    },
    percentage() {
      console.log("INI RATIO",  (Math.floor((this.$store.state.registrationDetails.fullNameCount +
          this.$store.state.registrationDetails.fullAddressCount +
          this.$store.state.registrationDetails.dobCount)/5)*5) /
          5)
      return (
        (((2-this.$store.state.registrationDetails.fullNameRequired) +
          (2-this.$store.state.registrationDetails.fullAddressRequired) +
          (1-this.$store.state.registrationDetails.dobRequired)) /
          5) *
        100
      );
    },
    sourceList() {
      console.log(this.$store.state.sourceList.actregodvs, "SOURCE LIST HOME");
      return this.$store.state.sourceList;
    },
    individualResult() {
      console.log(this.$store.state.individualResult, " INDIVIDUAL RESULT HOME");
      return this.$store.state.individualResult;
    },
  },
};
</script>
