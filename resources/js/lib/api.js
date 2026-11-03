/**
 * Unified API Client for MySembako
 */

export const getCsrfToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
};

export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const apiFetch = async (endpoint, options = {}) => {
  const {
    method = "GET",
    headers = {},
    body = null,
    credentials = "same-origin",
    ...rest
  } = options;

  const csrfToken = getCsrfToken();
  const defaultHeaders = {
    Accept: "application/json",
    ...(method !== "GET" && { "Content-Type": "application/json" }),
    ...(csrfToken && { "X-CSRF-TOKEN": csrfToken }),
    ...headers,
  };

  const config = {
    method,
    headers: defaultHeaders,
    credentials,
    ...(body && typeof body === "object" && !(body instanceof FormData)
      ? { body: JSON.stringify(body) }
      : { body }),
    ...rest,
  };

  const response = await fetch(endpoint, config);

  let responseData = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    let errorMessage = "Terjadi kesalahan pada server.";
    if (response.status === 401) {
      errorMessage = "Sesi Anda telah berakhir atau belum masuk.";
    } else if (responseData?.message) {
      errorMessage = responseData.message;
    } else if (response.status === 404) {
      errorMessage = "Data tidak ditemukan.";
    }

    throw new ApiError(errorMessage, response.status, responseData);
  }

  return responseData;
};
