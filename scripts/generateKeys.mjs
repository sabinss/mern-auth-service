import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certsDir = path.join(__dirname, "../", "certs");

if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
}

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});

console.log("Public Key", publicKey);
console.log("Private key", privateKey);

// fs.writeFileSync("certs/private.pem", privateKey);
// fs.writeFileSync("certs/public.pem", publicKey)
console.log(
    'path.join(certsDir, "private.pem")',
    path.join(certsDir, "private.pem"),
);
fs.writeFileSync(path.join(certsDir, "private.pem"), privateKey);
fs.writeFileSync(path.join(certsDir, "public.pem"), publicKey);
