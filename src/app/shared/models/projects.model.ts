import { ICompany } from './company.model';
import { IEmployee } from './employee.model';

export interface IProject {
  id: number;
  name: string;
  clientId: string;
  companyId: number;
  client: IEmployee;
  company: ICompany;
  isFinished: boolean;
}
