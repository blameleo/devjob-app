import React, { useState } from "react";
import Button from "../components/Button";
import FormModal from "../components/FormModal";

export default function Addjobs() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="flex justify-center">
        <Button
          event={handleOpen}
          style="hover:bg-light_primary ml-5  p-3 rounded-lg bg-violet-600 text-white  font-semibold text-primary "
          text="Post a job"
        />
      </div>
      <FormModal open={open} handleClose={handleClose} />
    </div>
  );
}
