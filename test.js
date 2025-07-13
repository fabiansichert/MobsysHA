export function isAdmin(uid) {
  return uid === "vDAPqylOw0RcAUOnUJHPNZQwMQ23";
}

export function logTest(name, passed) {
  if (passed) {
    console.log(`✅ ${name}`);
  } else {
    console.error(`❌ ${name}`);
  }
}