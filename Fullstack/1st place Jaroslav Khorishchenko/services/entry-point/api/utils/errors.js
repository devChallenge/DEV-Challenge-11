class ErrorsHandler{

	// Constructors

	constructor(domain){
		this.domain = domain;
	}

	static withDomain(domain){
		return new ErrorsHandler(domain);
	}

	static withoutCode(err){
		if(err.code) delete err.code;
		return err;
	}

	// Errors

    apiNotFound(){
		return this.getError(404, 'API_NOT_FOUND', 'API not found');
	}

	apiInDev(){
		return this.getError(422, 'API_IN_DEV', 'API in development');
	}

	unknowErr(descr){
		return this.getError(400, 'UNKNOW_ERR', descr);
	}

	reqParamMissed(paramName){
		if(!paramName) throw new Error('param name required');
		return this.getError(422, 'REQ_PARAM_MISSED', 'param not found: ' + paramName);
	}

	reqParamError(descr){
		return this.getError(422, 'REQ_PARAM_ERR', descr);
	}

	reqBodyEmpty(paramName){
		return this.getError(422, 'REQ_BODY_EMPTY');
	}

	reqBodyFormatErr(descr){
		return this.getError(422, 'REQ_BODY_FORMAT_ERR', descr);
	}

	reqDataErr(descr){
		return this.getError(422, 'REQ_DATA_ERR', descr);
	}

	serviceErr(descr){
		return this.getError(500, 'SERVICE_ERR', descr);
	}

	wrongServiceResp(descr){
		return this.getError(500, 'WRONG_SERVICE_RESPONSE', descr);
	}

	dbErr(descr){
		return this.getError(500, 'DB_ERR', descr);
	}

	unauthorized(descr){
		return this.getError(401, 'UNAUTHORIZED', descr);
	}

	accessForbiden(descr){
		return this.getError(403, 'ACCESS_FORBIDDEN', descr || "You dont have premissions to make this operation");
	}

	notFound(descr){
		return this.getError(404, 'NOT_FOUND', descr);
	}

	userNotFound(descr){
		return this.getError(404, 'USER_NOT_FOUND', descr);
	}

	transactionNotFound(descr){
		return this.getError(404, 'TRANSACTION_NOT_FOUND', descr);
	}

	// Generating errors

	getError(code, name, descr){
		if(!code) throw new Error('code required');
		if(!name) throw new Error('name required');
		var err = {code: code, name: name};
		if(descr) err.descr = descr;
		if(this.domain) err.domain = this.domain;
		return err;
	}

}

// Exports

module.exports = ErrorsHandler;