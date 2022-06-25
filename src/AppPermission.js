import { Platform, Alert, I18nManager } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const PLATFORM_MICROPHONE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

const PLATFORM_READ_FILE_PERMISSIONS = {
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const PLATFORM_WRITE_FILE_PERMISSIONS = {
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const PLATFORM_ACCESS_LIBRARY_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const REQUEST_PERMISSION_TYPE = {
  microphone: PLATFORM_MICROPHONE_PERMISSIONS,
  readFile: PLATFORM_READ_FILE_PERMISSIONS,
  writeFile: PLATFORM_WRITE_FILE_PERMISSIONS,
  photo: PLATFORM_ACCESS_LIBRARY_PERMISSIONS,
};

const PERMISSION_TYPE = {
  microphone: 'microphone',
  readFile: 'readFile',
  writeFile: 'writeFile',
  photo: 'photo',
};

class AppPermission {
  checkPermission = async (type): Promise<booloean> => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };

  requestPermission = async (permissions): Promise<boolean> => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

const Permission = new AppPermission();

export { Permission, PERMISSION_TYPE };
