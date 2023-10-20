import { log } from "@/helpers/log";

export class RequestResult {
  constructor() {
    this.result = null;
    this.error = null;
    this.message = 'no message';
  }

  show() {
    if (this.error) {
      console.error('ERROR:', this.error);
      return;
    }
    console.log(this.result);
    
  }

  getRows() {
    if (this.error) {
        this.show();
        return [];
    }
    console.log(this.result.result.rows)
    return this.result.result.rows;
  }

  isError(logError = true) {
    if (this.error) {
        if (logError) this.show();
        return true;
    }
    return false
  }
}
