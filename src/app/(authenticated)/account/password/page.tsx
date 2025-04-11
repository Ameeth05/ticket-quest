import React from "react";
import Heading from "@/components/heading";
import AccountTabs from "@/app/(authenticated)/account/_navigation/account-tabs";

export default function page() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="keep your account secure"
        tabs={<AccountTabs />}
      />
    </div>
  );
}
