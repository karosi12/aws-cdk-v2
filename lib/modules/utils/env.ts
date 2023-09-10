type Dict = Record<string, string>;
type Env = Partial<Dict>;

export function verifyEnv(
    vars: Env,
    message = "Environment variable %s must be set"
): {
    optional: Env;
    required: Dict;
} {
    return {
        optional: vars,
        required: new Proxy(vars as Dict, {
            get: (target, prop, receiver) => {
                if (typeof prop === "string") {
                    if (
                        typeof target[prop] === "undefined" ||
                        target[prop] === ""
                    ) {
                        throw new Error(message.replace("%s", prop));
                    }

                    return target[prop];
                }

                return Reflect.get(target, prop, receiver);
            },
        }),
    };
}
