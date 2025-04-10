
import { CompanyData } from "@/types/upload";
import { toast } from "sonner";

export const processFileContent = (fileContent: string): CompanyData[] => {
  console.log("File content type:", typeof fileContent);
  console.log("File content preview:", String(fileContent).substring(0, 200));

  const lines = String(fileContent).split(/\r?\n/);
  console.log(`Found ${lines.length} lines in the file`);
  
  if (lines.length < 2) {
    throw new Error("File contains insufficient data (needs header row + at least one data row)");
  }
  
  let delimiter = ',';
  if (lines[0].includes(';')) {
    delimiter = ';';
  }
  
  const headers = lines[0].split(delimiter).map(h => h.trim().toLowerCase());
  console.log("Detected headers:", headers);
  
  const companiesData: CompanyData[] = [];
  let validCompaniesFound = false;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(delimiter).map(v => v.trim());
    if (values.length < 2) continue;
    
    const company: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      if (values[index]) {
        company[header] = values[index];
      }
    });
    
    let companyName = '';
    const possibleNameFields = ['company_name', 'company', 'name', 'organization', 'business', 'corp', 'corporation'];
    
    for (const field of possibleNameFields) {
      if (company[field]) {
        companyName = company[field];
        break;
      }
    }
    
    if (!companyName) {
      const firstNonEmptyKey = Object.keys(company).find(key => company[key] && company[key].length > 1);
      if (firstNonEmptyKey) {
        companyName = company[firstNonEmptyKey];
        console.log(`Using ${firstNonEmptyKey} as company name:`, companyName);
      }
    }
    
    if (companyName) {
      validCompaniesFound = true;
      
      const website = company.website || company.url || company.site || "";
      const industry = company.industry || company.sector || company.vertical || "";
      const size = company.size || company.employees || company.employee_count || "";
      const location = company.location || company.address || company.city || "";
      
      companiesData.push({
        company_name: companyName,
        website,
        industry,
        size,
        location
      });
    }
  }
  
  if (!validCompaniesFound) {
    console.log("No companies found. Headers:", headers);
    console.log("Sample data row:", lines.length > 1 ? lines[1] : "No data rows");
    throw new Error("No valid company data found in file. Please ensure your file has headers and company information.");
  }

  return companiesData;
};
