'use client'
import { getAllRecordsAction } from "@/actions/admin/getRecordAction";
import TablaRecords from "@/components/Admin/Records/TablaRecords";
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'

export default () => {
  const [records, setRecords] = useState([]);

  const updateRecords = () => {
    getAllRecordsAction().then(response => {
      const nuevosRecords = JSON.parse(response)
      nuevosRecords.sort((a,b) => {
        if (a.aval == -2 && b.aval != -2) return -1;
        if (b.aval == -2 && a.aval != -2) return 1;
        if (a.aval == 0 && b.aval != 0) return -1;
        if (b.aval == 0 && a.aval != 0) return 1;
        if (a.aval == -1 && b.aval != -1) return 1;
        if (b.aval == -1 && a.aval != -1) return -1;
        return b.id - a.id;
      })
      setRecords(nuevosRecords)
    })
  }
  
  useEffect(updateRecords, [])
  return (
    <div className="component px-8 py-4">
      <div className="flex justify-between">
        <h2 className="pt-4 pb-2 text-2xl">Records</h2>
        <div className="flex">
          <Button onClick={updateRecords}>
            Refresh
          </Button>
        </div>
      </div>
      <TablaRecords records={records} updateRecords={updateRecords} />
    </div>
  );
};
