import { adminUID } from './public/firebase/firebase-config.js';

export function isAdmin(uid) {
  return uid === adminUID;
}

export function logTest(name, passed) {
  if (passed) {
    console.log(`✅ ${name}`);
  } else {
    console.error(`❌ ${name}`);
  }
}