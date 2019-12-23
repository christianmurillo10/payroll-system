const jsonfile = require('jsonfile');

module.exports = {
  computeByPayFrequency: (amount, code) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data;
        let payrollSettingsJson = 'src/json/payrollSettings.json';
        let payrollSettingsJsonData = await jsonfile.readFile(payrollSettingsJson);
        let workingDays = payrollSettingsJsonData.fixedWorkingDays;
        let weekly = workingDays / 4;

        switch (code) {
          case 'DAILY':
            data = amount / workingDays;
            break;
          case 'WEEKLY':
            data = (amount / workingDays) * weekly;
            break;
          case 'BI_WEEKLY':
            data = ((amount / workingDays) * weekly) * 2;
            break;
          case 'MONTHLY':
            data = amount;
            break;
          case 'BI_MONTHLY':
            data = amount / 2;
            break;
          case 'QUARTERLY':
            data = amount * 4;
            break;
          case 'ANNUAL':
            data = amount * 12;
            break;
          default:
            data = amount;
            break;
        }
        
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
};