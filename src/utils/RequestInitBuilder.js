export class RequestInitBuilder {
  #requestInit;

  constructor(requestInit = {}) {
    this.#requestInit = { ...requestInit };
  }

  method(methodType) {
    this.#requestInit.method = methodType;
    return this;
  }

  post() {
    this.method("POST");
    return this;
  }

  put() {
    this.method("PUT");
    return this;
  }

  patch() {
    this.method("PATCH");
    return this;
  }

  deleteMethod() {
    this.method("DELETE");
    return this;
  }

  addHeader(headerKey, headerValue) {
    const reqInit = this.#requestInit;
    if (!reqInit.headers) reqInit.headers = {};
    reqInit.headers[headerKey] = headerValue;
    return this;
  }

  jwtHeader(jwt) {
    this.addHeader("Authorization", `Bearer ${jwt}`);
    return this;
  }

  contentType(type) {
    this.addHeader("Content-Type", type);
    return this;
  }

  body(bodyObj) {
    this.#requestInit.body = bodyObj;
    return this;
  }

  bodyJson(bodyObj, setContentTypeHeader = false) {
    this.body(JSON.stringify(bodyObj));
    if (setContentTypeHeader) {
      this.contentType("application/json");
    }
    return this;
  }

  build() {
    const reqInit = { ...this.#requestInit };
    this.#requestInit = {};
    return reqInit;
  }
}

export function getRequestInitBuilder(requestInit = {}) {
  return new RequestInitBuilder(requestInit);
}
