export default {
  methods: {
    getYesNoStatus(value) {
      let response = null;
      if (value == 0) {
        response = "NO";
      } else if (value == 1) {
        response = "YES";
      }

      return response;
    }
  }
}
