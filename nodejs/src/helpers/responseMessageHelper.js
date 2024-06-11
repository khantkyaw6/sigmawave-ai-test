const responseMessage = (res, message = "", result, errCode = 200) => {
	const response = {
		success: true,
		errCode,
		message: message,
	};

	if (result) {
		response.data = result;
	}

	res.status(errCode).json(response);
};

export default responseMessage;
