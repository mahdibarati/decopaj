let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
const DB_NAME = 'myDB';

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum Stores {
  Plans = 'plans',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open(DB_NAME);

    request.onupgradeneeded = () => {
      db = request.result;

      console.log('db.objectStoreNames', db.objectStoreNames);
      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Plans)) {
        console.log('Creating users store');
        db.createObjectStore(Stores.Plans, { keyPath: 'id' });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME);

    request.onsuccess = (event) => {
      // console.log(event.target?.result);
      console.log('request.onsuccess - getAllData');
      //db = request.result;
      //@ts-ignore
      db = event.target?.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const deleteData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // again open the connection
    request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      console.log('request.onsuccess - deleteData', key);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      };
    };
  });
};
