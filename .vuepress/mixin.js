export default {
  created () {
  },
  mounted () {
    window.onload = function() {
      if (location.hash) {
        const element = document.getElementById(location.hash.slice(1));
        if (element && element.scrollIntoView) {
          element.scrollIntoView();
        }
      }
    }
  }
}
