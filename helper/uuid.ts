import crypto from "crypto";

const generateUUID = (): String => {
    return crypto.randomUUID()
}

export default generateUUID