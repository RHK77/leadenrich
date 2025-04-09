
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, Database, Table } from "lucide-react";
import FileUploadTab from "./FileUploadTab";
import NotionUploadTab from "./NotionUploadTab";
import AirtableUploadTab from "./AirtableUploadTab";

const UploadTabs = () => {
  const [activeTab, setActiveTab] = useState("file");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="file" className="flex items-center gap-1">
          <FileSpreadsheet className="h-4 w-4" />
          <span>File Upload</span>
        </TabsTrigger>
        <TabsTrigger value="notion" className="flex items-center gap-1">
          <Database className="h-4 w-4" />
          <span>Notion</span>
        </TabsTrigger>
        <TabsTrigger value="airtable" className="flex items-center gap-1">
          <Table className="h-4 w-4" />
          <span>Airtable</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="file">
        <FileUploadTab />
      </TabsContent>
      
      <TabsContent value="notion">
        <NotionUploadTab />
      </TabsContent>
      
      <TabsContent value="airtable">
        <AirtableUploadTab />
      </TabsContent>
    </Tabs>
  );
};

export default UploadTabs;
