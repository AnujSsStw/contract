import { DataModel } from "@cvx/_generated/dataModel";

export type Subcontract = {
  date: string;
  subcontractor_name: string;
  subcontractor_address_line_1: string;
  subcontractor_address_line_2: string;
  subcontractor_phone: string;
  //   subcontractor_email: string;

  contract_value: string;

  project_name: string;
  project_owner_client_legal_name: string;
  project_number: string;
  project_address: string;

  subcontract_number: string; // project_number + cost_code
  architect_name: string;
  bond_needed: string;

  project_generated_user: string;
  project_generated_user_email: string;

  cost_code: string[];
  scope_of_work: DataModel["subcontracts"]["document"]["scopeOfWork"];

  divisions: DataModel["costCodes"]["document"][];

  exclusion: string[];
  cost_breakdown: string[];

  subvContactName: string;
};

export const dummy_data: Subcontract = {
  date: "2024-01-01",
  subcontractor_name: "Subcontractor Name",
  subcontractor_address_line_1: "Subcontractor Address Line 1",
  subcontractor_address_line_2: "Subcontractor Address Line 2",
  subcontractor_phone: "1234567890",
  contract_value: "100000",
  project_name: "Project Name",
  project_owner_client_legal_name: "Project Owner Client Legal Name",
  project_number: "123456",
  project_address: "Project Address",
  subcontract_number: "123456",
  architect_name: "Architect Name",
  bond_needed: "Yes",
  project_generated_user: "Project Generated User",
  project_generated_user_email: "Project Generated User Email",
  cost_code: ["123456"],
  scope_of_work: [
    {
      type: "Scope of Work 1",
      cost_code: "123456",
      text: "Scope of Work 1",
    },
  ],
  exclusion: [],
  cost_breakdown: [],
  divisions: [],
  subvContactName: "Subv Contact Name",
};
