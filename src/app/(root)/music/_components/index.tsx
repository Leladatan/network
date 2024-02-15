"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";

const MusicPage = () => {
  return (
    <div>
      <Box>
        <Tabs defaultValue={"main"}>
          <TabsList className="mb-3">
            <TabsTrigger value={"main"}>Main page</TabsTrigger>
            <TabsTrigger value={"my"}>My music</TabsTrigger>
          </TabsList>
          <InputSearch name={"search"} placeholder={"Search music..."} />
          <TabsContent value={"main"}>
            <div className="grid grid-cols-4 gap-10">

            </div>
          </TabsContent>
          <TabsContent value={"my"}>
            <div className="grid grid-cols-4 gap-10">

            </div>
          </TabsContent>
        </Tabs>
      </Box>
    </div>
  );
};

export default MusicPage;