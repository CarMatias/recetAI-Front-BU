import RNFS from 'react-native-fs';

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function deleteFile(filePath: string) {
  try {
    await RNFS.unlink(filePath);
    console.log(`${filePath} was deleted.`);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export function isDeepEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}
