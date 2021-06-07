export class JwtDTO {
  token: string;
  type: string;
  username: string;
  authority: string[];
  clientId: string;
  contractId: string;
  clientName: string;
  contractName: string;
}
