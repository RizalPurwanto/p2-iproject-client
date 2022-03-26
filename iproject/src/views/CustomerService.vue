<template>
  <div class="container">
    <h3 class="text-center">Customer Service</h3>
    <br />
    <div class="border p-2 text-align text-center bg-white">
      <p>
        Contact us:
        Whatsapp :082136123337
        Email: customerservice@mail.com
      </p>
    </div>

    <button
        type="button"
        class="btn btn-warning"
        @click.prevent="backHandler"
      >
        Back
      </button>
  </div>
</template>

<script>
export default {
  name: "CustomerService",
  methods: {
    backHandler() {
      this.$router.push("/");
    },
    
  },
};
</script>

<style>
</style>