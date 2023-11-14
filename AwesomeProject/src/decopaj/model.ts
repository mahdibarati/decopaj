export enum CameraType {
  ExtremeLongShot = 'خیلی دور',
  LongShot = 'دور',
  MediumShot = 'دور متوسط',
  MediumCloseUp = 'نزدیک متوسط',
  CloseUp = 'نزدیک',
  ExtremeCloseUp = 'خیلی نزدیک',
  Insert = 'اینسرت',
}

export const getCameraType = (name: string) => {
  switch (name) {
    case 'خیلی دور':
      return 1;
    case 'دور':
      return 2;
    case 'دور متوسط':
      return 3;
    case 'نزدیک متوسط':
      return 4;
    case 'نزدیک':
      return 5;
    case 'خیلی نزدیک':
      return 6;
    case 'اینسرت':
      return 7;
    default:
      return 0;
  }
};

export const getCameraTypeValue = (name: number) => {
  switch (name) {
    case 1:
      return CameraType.ExtremeLongShot;
    case 2:
      return CameraType.LongShot;
    case 3:
      return CameraType.MediumShot;
    case 4:
      return CameraType.MediumCloseUp;
    case 5:
      return CameraType.CloseUp;
    case 6:
      return CameraType.ExtremeCloseUp;
    case 7:
      return CameraType.Insert;
  }
};
