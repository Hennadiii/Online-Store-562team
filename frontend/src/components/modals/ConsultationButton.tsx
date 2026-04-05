"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConsultationModal from "@/components/modals/ConsultationModal";

export default function ConsultationButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="w-[250px] sm:w-[297px]"
        variant="second"
        onClick={() => setIsOpen(true)}
      >
        Консультація
      </Button>

      <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}