export class User {
  id: string;              
  username: string;    
  email: string; 
  createdAt: Date;   
  updatedAt: Date;     

  constructor(username: string, email: string, id?: string) {
    this.id = id || '';
    this.username = username;
    this.email = email;
    this.createdAt = new Date(); 
    this.updatedAt = new Date(); 
  }

  updateTimestamp() {
    this.updatedAt = new Date(); 
  }
}
