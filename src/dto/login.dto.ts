export class LoginDto {
    username: string;
    password: string;
  
    constructor(data: Partial<LoginDto>) {
      if (!data.username || !data.password) {
        throw new Error("Both username and password are required");
      }
      this.username = data.username;
      this.password = data.password;
    }
  }
  