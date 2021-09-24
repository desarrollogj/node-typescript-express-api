import * as dotenv from "dotenv";
import { encode, decode, TAlgorithm } from "jwt-simple";
import { Session, PartialSession, EncodeResult, DecodeResult, ExpirationStatus } from "./session.interface";

dotenv.config();

// Always use HS512 to sign the token
const TOKEN_ALGORITHM: TAlgorithm = "HS512";
const TOKEN_DURATION_MINUTES: number = parseInt(process.env.TOKEN_DURATION_MINUTES as string, 10);
const TOKEN_GRACE_PERIOD_HOURS: number = parseInt(process.env.TOKEN_GRACE_PERIOD_HOURS as string, 10);

export function encodeSession(secretKey: string, partialSession: PartialSession): EncodeResult {
    // Determine when the token should expire
    const issued = Date.now();
    const tokenTtl = TOKEN_DURATION_MINUTES * 60 * 1000;
    const expires = issued + tokenTtl;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        token: encode(session, secretKey, TOKEN_ALGORITHM),
        issued: issued,
        expires: expires
    };
}

export function decodeSession(secretKey: string, sessionToken: string): DecodeResult {
    let result: Session;

    try {
        result = decode(sessionToken, secretKey, false, TOKEN_ALGORITHM);
    } catch (_e) {
        const e: Error = _e;

        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }

        throw e;
    }

    return {
        type: "valid",
        session: result
    }
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();
    
    if (token.expires > now) return "active";

    // Find the timestamp for the end of the token's grace period
    const gracePeriodInMs = TOKEN_GRACE_PERIOD_HOURS * 60 * 60 * 1000;
    const gracePeriodAfterExpiration = token.expires + gracePeriodInMs;

    if (gracePeriodAfterExpiration > now) return "grace";

    return "expired";
}