import React from "react";
import AccountTabs from "@/app/(authenticated)/account/_navigation/account-tabs";
import Heading from "@/components/heading";

export default function page() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={<AccountTabs />}
      />
    </div>
  );
}
