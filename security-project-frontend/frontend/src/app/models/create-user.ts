export class CreateUser {

  username: string;
  password: string;
  clientId: string;
  contractId: string;

  constructor(username: string, password: string, clientId: string, contractId: string) {
      this.username = username;
      this.password = password;
      this.clientId = clientId;
      this.contractId = contractId;
  }
}
