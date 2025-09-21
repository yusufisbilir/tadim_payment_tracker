"use client";
import { Button } from "@/components/ui/button";
import Routes from "@/constants/Routes";
import { PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";

const CreatePaymentButton = () => {
  return (
    <Link href={Routes.CREATE_PAYMENT}>
      <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded shadow">
        <PlusIcon className="inline-block mr-2" />
        Ödeme Ekle
      </Button>
    </Link>
  );
};

export default CreatePaymentButton;
