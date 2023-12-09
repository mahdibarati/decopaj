import {CameraType} from './model';

export const getCommaSeperatedNumber = (value: string) => {
  if (value)
    // if (isIOS) {
    //   return addCommas(value);
    // } else {
    return parseInt(value).toLocaleString();
  // }
};

export const getPersianString = (input: string | undefined | null) => {
  try {
    if (input === undefined || input === null) return '';

    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    if (input && input !== '') {
      var chars = input.split('');
      for (var i = 0; i < chars.length; i++) {
        if (/\d/.test(chars[i])) {
          chars[i] = farsiDigits[parseInt(chars[i])];
        }
      }
      return chars.join('');
    } else return input;
  } catch {
    return '';
  }
};

export const getPersianDigitString = (input: number | undefined | null) => {
  try {
    if (input === undefined || input === null) return '';

    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    if (input) {
      var chars = input.toLocaleString().split('');
      for (var i = 0; i < chars.length; i++) {
        if (/\d/.test(chars[i])) {
          chars[i] = farsiDigits[parseInt(chars[i])];
        }
      }
      return chars.join('');
    } else return '';
  } catch {
    return '';
  }
};

export const getEnglishDigitsString = (input: string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  if (input && input !== '') {
    var chars = input.split('');
    for (var i = 0; i < chars.length; i++) {
      for (var j = 0; j < 10; j++) {
        if (chars[i] === farsiDigits[j]) {
          chars[i] = j.toString();
        }
      }
    }
    return chars.join('');
  } else return input;
};

export const Data_Key = 'data';

// export const geData = () => {
//   try {
//     let u = localStorage.getItem(Data_Key);
//     if (u) return JSON.parse(u);
//   } catch {}
// };

// export const deletePlan = (index: any) => {
//   try {
//     let u = localStorage.getItem(Data_Key);
//     if (u) {
//       let c = JSON.parse(u);
//       let rem = c.splice(index, 1);
//       localStorage.setItem(Data_Key, JSON.stringify(c));
//     }
//   } catch (e) {}
// };

export const guid = () => {
  var w = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${w()}${w()}-${w()}-${w()}-${w()}-${w()}${w()}${w()}`;
};

export const getImage = (cameraType?: CameraType) => {
  if (cameraType) {
    switch (cameraType) {
      case CameraType.CloseUp:
        return require('../images/1.png');
      case CameraType.MediumShot:
        return require('../images/2.png');
      case CameraType.LongShot:
        return require('../images/3.png');
      case CameraType.ExtremeLongShot:
        return require('../images/4.png');
    }
  }
  return '';
};
