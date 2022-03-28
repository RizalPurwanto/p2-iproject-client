/* eslint-disable */
import bus from './eventbus';

const afObject = {
  ready: false,

  afterInit() {
    afObject.ready = true;
    bus.$emit('afloaded');
    console.log("afloaded")
  },

  initialise() {
    const script = document.createElement('script');
    script.src = 'https://api.addressfinder.io/assets/v3/widget.js';
    script.async = true;
    script.onload = afObject.afterInit;
    document.body.appendChild(script);
  },
};

export default afObject;
