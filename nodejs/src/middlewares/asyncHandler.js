const asyncHandler = (serviceFunction) => {
	return async (req) => {
		try {
			return await serviceFunction(req);
		} catch (error) {
			throw error;
		}
	};
};

export default asyncHandler;
