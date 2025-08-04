class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: string;

  constructor(statusCode: number, data: any, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = `${statusCode}`;
  }
}

export default ApiResponse;
