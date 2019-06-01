const clientMidleWare = client => {
    return ({ dispatch, getState }) => {
        return next => action => {
            if (typeof action === "function") {
                action(dispatch, getState);
            }

            const { promise, types, ...rest } = action;
            if (!promise) {
                return next(action);
            }
            const [REQUEST, SUCCESS, FAILURE] = types;

            next({ ...rest, type: REQUEST });

            promise(client)
                .then(
                    result => {
                        return next({ ...rest, payload: result, type: SUCCESS });
                    },
                    error =>
                        next({
                            ...rest,
                            error: error.message || error,
                            type: FAILURE
                        })
                )
                .catch(error => {
                    return next({
                        ...rest,
                        error: error.message || error,
                        type: FAILURE
                    });
                });
        };
    };
};

export default clientMidleWare;
