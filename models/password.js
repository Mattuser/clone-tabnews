import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = await getNumberOfRounds();
  return await bcryptjs.hash(password, rounds);
}

async function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(password, storedPassword) {
  return await bcryptjs.compare(password, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
